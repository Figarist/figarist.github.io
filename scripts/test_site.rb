# frozen_string_literal: true
require 'json'
require 'yaml'
require 'nokogiri'
require 'zlib'
require 'stringio'
require 'uri'
require 'time'
root = ARGV.fetch(0, '_site')
origin = 'https://sivochka.com'
retired_origin = 'https://figarist.github.io'
def check(value, message)
  raise message unless value
end
sitemap = Nokogiri::XML(File.read("#{root}/sitemap.xml"))
urls = sitemap.xpath('//*[local-name()="loc"]').map(&:text)
check(urls.uniq == urls, 'Duplicate sitemap URLs')
check(urls.all? { |url| url.start_with?(origin + '/') }, 'Sitemap contains a URL outside the canonical origin')
check(urls.none? { |url| url.start_with?(retired_origin) }, 'Sitemap contains the retired GitHub Pages origin')
check(urls.none? { |u| u.include?('/docs/') || u.include?('/drafts/') || u.include?('testedu') || u.include?('testpost') }, 'sitemap leaks docs or drafts')
urls.each do |url|
  path = URI(url).path
  file = path.end_with?('/') ? "#{root}#{path}index.html" : "#{root}#{path}"
  check(File.file?(file), "Sitemap target is missing: #{path}")
  doc = Nokogiri::HTML(File.read(file))
  check(doc.at_css('link[rel="canonical"]')&.[]('href') == url, "#{path}: sitemap page canonical")
  check(doc.at_css('meta[property="og:url"]')&.[]('content') == url, "#{path}: sitemap page og:url")
  og_description = doc.at_css('meta[property="og:description"]')&.[]('content')
  twitter_description = doc.at_css('meta[name="twitter:description"]')&.[]('content')
  check(twitter_description == og_description && !twitter_description.to_s.empty?, "#{path}: Twitter description differs from Open Graph")
  %w[title image].each do |field|
    check(doc.at_css("meta[name='twitter:#{field}']"), "#{path}: missing name-based Twitter #{field}")
    check(!doc.at_css("meta[property='twitter:#{field}']"), "#{path}: obsolete property-based Twitter #{field}")
  end
  og_image = doc.at_css('meta[property="og:image"]')&.[]('content')
  image_uri = URI(og_image)
  check(image_uri.scheme == 'https' && image_uri.host == URI(origin).host, "#{path}: social image is outside the canonical origin")
  image_path = image_uri.path.sub(%r{\A/}, '')
  check(File.file?(File.join(root, image_path)), "#{path}: social image target is missing: /#{image_path}")
  check(!doc.at_css('meta[name="robots"]')&.[]('content').to_s.include?('noindex'), "#{path}: noindex page in sitemap")
  structured_data = doc.css('script[type="application/ld+json"]').map { |block| JSON.parse(block.text) }
  seo_schema = structured_data.find { |schema| schema['url'] }
  check(!seo_schema || seo_schema['url'] == url, "#{path}: SEO JSON-LD URL")
  graph = structured_data.find { |schema| schema['@graph'] }&.fetch('@graph', nil)
  if graph
    breadcrumb = graph.find { |item| item['@type'] == 'BreadcrumbList' }
    check(breadcrumb && breadcrumb['@id'] == "#{url}#breadcrumb", "#{path}: breadcrumb JSON-LD ID")
    article = graph.find { |item| %w[Article BlogPosting].include?(item['@type']) }
    if article
      modified_time = doc.at_css('meta[property="article:modified_time"]')&.[]('content')
      check(modified_time && Time.iso8601(modified_time), "#{path}: missing or invalid article:modified_time")
      check(article['@id'] == "#{url}#article", "#{path}: article JSON-LD ID")
      check(article.dig('mainEntityOfPage', '@id') == url, "#{path}: article JSON-LD mainEntityOfPage")
      check(breadcrumb.fetch('itemListElement').last['item'] == url, "#{path}: breadcrumb current-page URL")
    end
  end
end
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
    check(doc.css('button[data-yt-src="https://www.youtube-nocookie.com/embed/3CxXkJ8ANbQ"]').size == 1, "#{path}: click-to-load video missing")
    check(doc.css('iframe[src*="youtube"]').empty?, "#{path}: YouTube iframe must load only after a click")
    check(doc.css(".tutoring-adult-note").empty?, "#{path}: adult aside leaked")
    next if route.empty?
    contact = doc.at_css('.tutoring-hero [data-goatcounter-click]')
    direction = route.split('/')[2] || 'overview'
    check(contact && contact['data-goatcounter-click'] == "tutoring-telegram-#{direction}-#{lang}", "#{path}: Telegram event identity")
    check(doc.text.include?('Unity Junior Programmer') && doc.text.include?('Unity Essentials'), "#{path}: approved credentials missing")
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
%w[docs scripts test .agents qa-screenshots frontmatter.json mise.toml renovate.json].each do |path|
  check(!File.exist?("#{root}/#{path}"), "Private development artifact in output: #{path}")
end
Dir["#{root}/**/*.html"].each do |path|
  check(!File.read(path).include?(retired_origin), "Retired GitHub Pages origin in #{path.delete_prefix(root)}")
end
{'script.js' => 20_480, 'assets/css/styles.css' => 30_720}.each do |path, budget|
  buffer = StringIO.new
  writer = Zlib::GzipWriter.new(buffer)
  writer.write(File.binread("#{root}/#{path}")); writer.close
  size = buffer.string.bytesize
  check(size <= budget, "#{path}: exceeds gzip budget")
  puts "#{path}: #{size} gzip bytes / #{budget}"
end
# A CSS minifier once rewrote calc(var(--x) + 8px) into calc(var( -  - x)+8px), which browsers drop.
css = File.read("#{root}/assets/css/styles.css")
check(!css.match?(/var\(\s*-\s+-/), 'assets/css/styles.css: var() mangled by a minifier')
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
robots_txt = File.read("#{root}/robots.txt")
check(robots_txt.include?(origin + '/sitemap.xml'), 'robots sitemap')

tools = YAML.safe_load(File.read('_data/tools.yml')) || []
tools.each do |tool|
  if tool['sitemap']
    check(robots_txt.include?("#{origin}#{tool['path']}sitemap.xml"), "robots.txt missing sitemap for #{tool['id']}")
  end
  next unless tool['home_tile']

  %w[en uk ru ko].each do |lang|
    prefix = lang == 'en' ? '' : "/#{lang}"
    home_doc = Nokogiri::HTML(File.read("#{root}#{prefix}/index.html"))
    tile = home_doc.at_css("a##{tool['id']}")
    suffix = tool['locale_paths'] ? tool['locale_paths'][lang].to_s : (tool['localized'] && lang != 'en' ? "#{lang}/" : '')
    expected_href = "#{origin}#{tool['path']}#{suffix}"
    check(tile && tile['href'] == expected_href, "Home tile ##{tool['id']} missing or wrong href for #{lang} (expected #{expected_href})")
  end
end

games = YAML.safe_load(File.read('_data/games.yml')) || []
%w[en uk ru ko].each do |lang|
  prefix = lang == 'en' ? '' : "/#{lang}"
  hub_file = "#{root}#{prefix}/games/index.html"
  check(File.file?(hub_file), "Missing games hub: #{prefix}/games/")
  hub_doc = Nokogiri::HTML(File.read(hub_file))
  check(hub_doc.css('h1').size == 1, "#{prefix}/games/: H1")
  hub_graph = hub_doc.css('script[type="application/ld+json"]').map { |b| JSON.parse(b.text) }.find { |b| b['@graph'] }&.fetch('@graph', nil)
  check(hub_graph && hub_graph.any? { |n| n['@type'] == 'CollectionPage' }, "#{prefix}/games/: CollectionPage JSON-LD")
  check(hub_graph && hub_graph.any? { |n| n['@type'] == 'BreadcrumbList' }, "#{prefix}/games/: BreadcrumbList JSON-LD")
end
games.each do |game|
  next unless game['status'] == 'published'

  check(game['permission'] == true, "Published game #{game['id']} must have permission: true")
  check(%w[1:1 16:9].include?(game['aspect_ratio'].to_s), "Published game #{game['id']} must set aspect_ratio to 1:1 or 16:9")
  check(%w[release prototype].include?(game['kind'].to_s), "Published game #{game['id']} must set kind to release or prototype")
  build_path = game['build_path'].to_s
  if build_path.start_with?('https://play.sivochka.com/')
    check(
      build_path.match?(%r{\Ahttps://play\.sivochka\.com/[a-z0-9-]+/v[0-9][a-z0-9._-]*/index\.html\z}),
      "Published game #{game['id']} has invalid play.sivochka.com build_path: #{build_path}"
    )
  else
    build_rel = build_path.sub(%r{\A/}, '')
    check(File.file?(File.join(root, build_rel)), "Published game #{game['id']} missing build_path: #{build_path}")
  end
  cover_rel = game['cover'].to_s.sub(%r{\A/}, '')
  check(File.file?(File.join(root, cover_rel)), "Published game #{game['id']} missing cover: #{game['cover']}")
  %w[en uk ru ko].each do |lang|
    prefix = lang == 'en' ? '' : "/#{lang}"
    gfile = "#{root}#{prefix}/games/#{game['slug']}/index.html"
    check(File.file?(gfile), "Missing localized game page: #{prefix}/games/#{game['slug']}/")
    gdoc = Nokogiri::HTML(File.read(gfile))
    check(gdoc.css('h1').size == 1, "#{prefix}/games/#{game['slug']}/: H1")
    player = gdoc.at_css('#game-player')
    check(player && !player['data-build-src'].to_s.empty?, "#{prefix}/games/#{game['slug']}/: player missing data-build-src")
  end
  if game['author_type'] == 'student'
    student_display = game['student_display'].to_s.strip
    check(!student_display.empty?, "Published student game #{game['id']} must define student_display")
    check(!student_display.match?(/\.(png|jpe?g|webp|gif)\b/i), "Student game #{game['id']} must not reference photos")
  end
end

puts 'PASS: 28 pages, 24 tutoring routes, metadata, hreflang, search, sitemap, JSON-LD, tools/games registries, draft exclusion and budgets'
