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
check(urls.none? { |u| u.include?('/docs/') || u.include?('/drafts/') || u.include?('testedu') || u.include?('testpost') }, 'sitemap leaks docs or drafts')
cases = Dir['_data/tutoring/cases/*.yml'].map { |file| YAML.safe_load(File.read(file)) }
profile = YAML.safe_load(File.read('_data/tutoring/profile.yml'))
reviews = YAML.safe_load(File.read('_data/tutoring/testimonials.yml')).fetch('items')
titles = []; descriptions = []
%w[en uk ru ko].each do |lang|
  prefix = lang == 'en' ? '' : "/#{lang}"
  search = JSON.parse(File.read("#{root}#{prefix}/search.json"))
  ['', '/tutoring', '/tutoring/unity', '/tutoring/python', '/tutoring/scratch', '/tutoring/informatics', '/tutoring/minecraft'].each do |route|
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
    og_title = doc.at_css('meta[property="og:title"]')&.[]('content')
    og_description = doc.at_css('meta[property="og:description"]')&.[]('content')
    og_image = doc.at_css('meta[property="og:image"]')&.[]('content')
    check(og_title && !og_title.strip.empty?, "#{path}: missing og:title")
    check(og_description && !og_description.strip.empty?, "#{path}: missing og:description")
    check(og_image && !og_image.strip.empty? && (og_image.start_with?('http://') || og_image.start_with?('https://')), "#{path}: missing or invalid og:image (#{og_image})")
    if ['', '/tutoring', '/tutoring/unity'].include?(route)
      lcp_img = doc.at_css('.home-hero img, .tutoring-hero img')
      check(lcp_img && lcp_img['fetchpriority'] == 'high', "#{path}: hero LCP image missing fetchpriority='high'")
    end
    doc.css('a[href^="#"]').each do |anchor|
      target_id = anchor['href'].sub(/^#/, '')
      next if target_id.empty?
      check(doc.at_css("##{target_id}"), "#{path}: anchor target ##{target_id} not found")
    end
    if route == '/tutoring'
      check(doc.at_css('#conditions'), "#{path}: missing #conditions section")
      check(doc.at_css('#details'), "#{path}: missing #details section")
      check(doc.at_css('#learning'), "#{path}: missing #learning anchor target")
    end
    %w[en uk ru ko x-default].each do |alternate|
      expected = origin + (%w[en x-default].include?(alternate) ? '' : "/#{alternate}") + route + '/'
      links = doc.css("link[hreflang='#{alternate}']")
      check(links.size == 1 && links.first['href'] == expected, "#{path}: hreflang #{alternate}")
    end
    check(urls.count(url) == 1, "#{path}: sitemap")
    s_node = sitemap.xpath("//*[local-name()='url'][*[local-name()='loc'][text()='#{url}']]").first
    if route == '/tutoring'
      check(s_node.at_xpath("*[local-name()='priority']")&.text == '1.0', "#{path}: sitemap priority 1.0")
      check(s_node.at_xpath("*[local-name()='changefreq']")&.text == 'weekly', "#{path}: sitemap changefreq weekly")
    elsif route.start_with?('/tutoring/')
      check(s_node.at_xpath("*[local-name()='priority']")&.text == '0.9', "#{path}: sitemap priority 0.9")
      check(s_node.at_xpath("*[local-name()='changefreq']")&.text == 'weekly', "#{path}: sitemap changefreq weekly")
    end
    check(!html.match?(/localhost|127\.0\.0\.1|aggregateRating|case-template|synthetic-build-bad|student_cases/), "#{path}: forbidden output")
    visible_cases = cases.count do |item|
      item['status'] == 'published' && item['permission'] == true && item.dig('translations', lang, 'ready') == true &&
        (route.empty? ? item['featured'] == true : route == "/tutoring/#{item['direction']}")
    end
    check(doc.css('.case-card').size == visible_cases, "#{path}: case publication gate")
    visible_profile = profile['status'] == 'published' && profile.dig('translations', lang, 'ready') == true
    check(!doc.css('.tutoring-section--profile').empty? == visible_profile, "#{path}: profile publication gate")
    visible_reviews = reviews.count { |item| item['status'] == 'published' && item['permission'] == true && item['ready'] == true }
    check(doc.css('.testimonial-card').size == (route.empty? ? 0 : visible_reviews), "#{path}: testimonial publication gate")
    doc.css('script[type="application/ld+json"]').each { |block| JSON.parse(block.text) }
    check(doc.css('iframe[src="https://www.youtube-nocookie.com/embed/3CxXkJ8ANbQ"]').size == 1, "#{path}: embedded video missing")
    check(doc.css(".tutoring-adult-note").empty?, "#{path}: adult aside leaked")
    next if route.empty?
    contact = doc.at_css('.tutoring-hero [data-goatcounter-click]')
    direction = route.split('/')[2] || 'overview'
    check(contact && contact['data-goatcounter-click'] == "tutoring-telegram-#{direction}-#{lang}", "#{path}: Telegram event identity")
    check(!html.include?('Unity Certified Programmer'), "#{path}: fictional credentials leaked")
    check(doc.text.include?('Unity Junior Programmer') && doc.text.include?('Unity Essentials'), "#{path}: approved credentials missing")
    check(!doc.text.include?('1200'), "#{path}: private weekend price leaked")
    check(doc.css('a[href="https://youtu.be/3CxXkJ8ANbQ"]').size == 1, "#{path}: video link missing")
    check(search.any? { |entry| entry['url'] == path }, "#{path}: search")
    graph = doc.css('script[type="application/ld+json"]').map { |b| JSON.parse(b.text) }.find { |b| b['@graph'] }['@graph']
    faq = graph.find { |item| item['@type'] == 'FAQPage' }
    visible_faq = doc.css('.tutoring-faq').map { |item| [item.at_css('summary').text.strip, item.at_css('p').text.strip] }
    schema_faq = faq.fetch('mainEntity').map { |item| [item['name'], item.dig('acceptedAnswer', 'text')] }
    check(visible_faq == schema_faq, "#{path}: visible FAQ differs from schema")
    check(!doc.at_css('meta[name="robots"]')&.[]('content').to_s.include?('noindex'), "#{path}: unexpectedly noindex")
    service = graph.find { |item| item['@type'] == 'Service' }
    check(service['url'] == url && service['offers']['price'].to_s == '1000' && service['offers']['priceCurrency'] == 'UAH', "#{path}: service offer")
    if lang == 'uk'
      check(doc.text.include?('Оплата на рахунок ФОП у гривні та іноземній валюті.'), "#{path}: localized payment")
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
sw_file = "#{root}/sw.js"
check(File.exist?(sw_file), 'Production sw.js is missing')
if File.exist?(sw_file)
  sw_content = File.read(sw_file)
  check(sw_content.include?('/tutoring/index.html') || sw_content.include?('/tutoring/'), 'sw.js: missing /tutoring/ precache')
  check(sw_content.include?('/uk/tutoring/index.html') || sw_content.include?('/uk/tutoring/'), 'sw.js: missing /uk/tutoring/ precache')
  check(sw_content.include?('/uk/tutoring/unity/index.html') || sw_content.include?('/uk/tutoring/unity/'), 'sw.js: missing /uk/tutoring/unity/ precache')
  manifest = JSON.parse(sw_content.match(/self\.__precacheManifest = (\[.*?\]);/m)[1])
  %w[en uk ru ko].each do |lang|
    prefix = lang == 'en' ? '' : "/#{lang}"
    ['', '/unity', '/python', '/scratch', '/informatics', '/minecraft'].each do |course_path|
      expected = "#{prefix}/tutoring#{course_path}/index.html"
      check(manifest.any? { |entry| entry['url'] == expected }, "sw.js: missing #{expected}")
    end
  end
  check(sw_content.include?('styles.css'), 'sw.js: missing styles.css precache')
  check(sw_content.include?('script.js'), 'sw.js: missing script.js precache')
end
styles_css = File.read("#{root}/assets/css/styles.css")
check(styles_css.include?('scroll-margin-top:120px') || styles_css.include?('scroll-margin-top: 120px'), 'styles.css: missing scroll-margin-top: 120px')
check(styles_css.include?('@media print'), 'styles.css: missing @media print')
check(File.read("#{root}/robots.txt").include?(origin + '/sitemap.xml'), 'robots sitemap')
puts 'PASS: 28 pages, 24 tutoring routes, metadata, hreflang, search, sitemap, JSON-LD, draft exclusion and budgets'
