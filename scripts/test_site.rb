# frozen_string_literal: true
require 'json'
require 'yaml'
require 'nokogiri'
require 'zlib'
require 'stringio'
root = ARGV.fetch(0, '_site')
origin = 'https://figarist.github.io'
def check(value, message)
  raise message unless value
end
sitemap = Nokogiri::XML(File.read("#{root}/sitemap.xml"))
urls = sitemap.xpath('//*[local-name()="loc"]').map(&:text)
check(urls.uniq == urls, 'Duplicate sitemap URLs')
cases = Dir['_data/tutoring/cases/*.yml'].map { |file| YAML.safe_load(File.read(file)) }
profile = YAML.safe_load(File.read('_data/tutoring/profile.yml'))
reviews = YAML.safe_load(File.read('_data/tutoring/testimonials.yml')).fetch('items')
titles = []; descriptions = []
%w[en uk ru ko].each do |lang|
  prefix = lang == 'en' ? '' : "/#{lang}"
  search = JSON.parse(File.read("#{root}#{prefix}/search.json"))
  ['', '/tutoring', '/tutoring/unity', '/tutoring/python', '/tutoring/scratch'].each do |route|
    path = "#{prefix}#{route}/"
    html = File.read("#{root}#{path}index.html")
    doc = Nokogiri::HTML(html)
    url = origin + path
    check(doc.css('h1').size == 1, "#{path}: H1")
    title = doc.at_css('title')&.text
    description = doc.at_css('meta[name="description"]')&.[]('content')
    check(title && !title.empty? && description && !description.empty?, "#{path}: missing metadata")
    titles << title; descriptions << description
    check(doc.at_css('link[rel="canonical"]')&.[]('href') == url, "#{path}: canonical")
    check(doc.at_css('meta[property="og:url"]')&.[]('content') == url, "#{path}: OG URL")
    %w[en uk ru ko x-default].each do |alternate|
      expected = origin + (%w[en x-default].include?(alternate) ? '' : "/#{alternate}") + route + '/'
      links = doc.css("link[hreflang='#{alternate}']")
      check(links.size == 1 && links.first['href'] == expected, "#{path}: hreflang #{alternate}")
    end
    check(urls.count(url) == 1, "#{path}: sitemap")
    check(!html.match?(/localhost|127\.0\.0\.1|aggregateRating|case-template|synthetic-build-bad|student_cases/), "#{path}: forbidden output")
    visible_cases = cases.count do |item|
      item['status'] == 'published' && item['permission'] == true && item.dig('translations', lang, 'ready') == true &&
        (route.empty? ? item['featured'] == true : route == "/tutoring/#{item['direction']}")
    end
    check(doc.css('.case-card').size == visible_cases, "#{path}: case publication gate")
    visible_profile = profile['status'] == 'published' && profile.dig('translations', lang, 'ready') == true
    check(!doc.css('.tutoring-section--profile').empty? == visible_profile, "#{path}: profile publication gate")
    visible_reviews = reviews.count { |item| item['status'] == 'published' && item['permission'] == true && item['ready'] == true && item['language'] == lang }
    check(doc.css('.testimonial-card').size == visible_reviews, "#{path}: testimonial publication gate")
    doc.css('script[type="application/ld+json"]').each { |block| JSON.parse(block.text) }
    next if route.empty?
    check(search.any? { |entry| entry['url'] == path }, "#{path}: search")
    graph = doc.css('script[type="application/ld+json"]').map { |b| JSON.parse(b.text) }.find { |b| b['@graph'] }['@graph']
    service = graph.find { |item| item['@type'] == 'Service' }
    check(service['url'] == url && service['offers']['price'].to_s == '1000' && service['offers']['priceCurrency'] == 'UAH', "#{path}: service offer")
    if lang == 'uk'
      check(doc.text.include?('Оплата на рахунок ФОП у гривнях, євро або доларах.'), "#{path}: localized payment")
    end
  end
end
check(titles.uniq == titles, 'Duplicate page titles')
check(descriptions.uniq == descriptions, 'Duplicate descriptions')
%w[docs scripts test .agents qa-screenshots frontmatter.json].each do |path|
  check(!File.exist?("#{root}/#{path}"), "Private development artifact in output: #{path}")
end
{'script.js' => 20_480, 'assets/css/styles.css' => 30_720}.each do |path, budget|
  buffer = StringIO.new
  writer = Zlib::GzipWriter.new(buffer)
  writer.write(File.binread("#{root}/#{path}")); writer.close
  size = buffer.string.bytesize
  check(size <= budget, "#{path}: exceeds gzip budget")
  puts "#{path}: #{size} gzip bytes / #{budget}"
end
check(File.read("#{root}/robots.txt").include?(origin + '/sitemap.xml'), 'robots sitemap')
puts 'PASS: 20 pages, 16 tutoring routes, metadata, hreflang, search, sitemap, JSON-LD, draft exclusion and budgets'
