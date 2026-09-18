# frozen_string_literal: true

require 'json'
require 'nokogiri'
require 'uri'

ROOT = File.expand_path(ARGV.fetch(0, '_site'))
ORIGIN = 'https://sivochka.com'
LANGUAGES = %w[en uk ru ko].freeze
REDIRECTS = {
  '/education/' => '/blog/',
  '/uk/education/' => '/uk/blog/',
  '/ru/education/' => '/ru/blog/',
  '/ko/education/' => '/ko/blog/'
}.freeze
WORKSHOP_NAMES = {
  'en' => 'Workshop',
  'uk' => 'Майстерня',
  'ru' => 'Мастерская',
  'ko' => '워크숍'
}.freeze
WORKSHOP_SUBTITLES = {
  'en' => 'Notes, dev logs, technical deep dives, and resources for learning programming.',
  'uk' => 'Нотатки, девлоги, технічні розбори та матеріали про навчання програмуванню.',
  'ru' => 'Заметки, девлоги, технические разборы и материалы об обучении программированию.',
  'ko' => '노트, 개발 일지, 기술을 깊이 있게 다루는 글, 프로그래밍 학습 자료.'
}.freeze

def check(condition, message)
  raise message unless condition
end

def site_path(route)
  clean_route = route.sub(%r{^/}, '')
  route.end_with?('/') ? File.join(ROOT, clean_route, 'index.html') : File.join(ROOT, clean_route)
end

def read_page(route)
  path = site_path(route)
  check(File.file?(path), "Missing generated route: #{route}")
  Nokogiri::HTML(File.read(path))
end

def locale_prefix(lang)
  lang == 'en' ? '' : "/#{lang}"
end

config = File.read('_config.yml')
check(!config.match?(/^collections:\s*$/), 'Education collection configuration remains')
check(!config.include?('type: "education"'), 'Education collection defaults remain')
check(!File.exist?('_education'), 'Unused _education collection remains')
check(!File.exist?('education/index.html'), 'Education hub page remains')
check(!File.exist?('_layouts/education.html'), 'Education layout remains')

frontmatter = JSON.parse(File.read('frontmatter.json'))
page_folders = frontmatter.fetch('frontMatter.content.pageFolders')
content_types = frontmatter.fetch('frontMatter.taxonomy.contentTypes')
check(page_folders.none? { |folder| folder['title'] == 'Education' || folder['path'].to_s.include?('_education') }, 'Education CMS folder remains')
check(content_types.none? { |type| type['name'] == 'Education' }, 'Education CMS content type remains')

check(!File.read('search.json').include?('site.education'), 'Search source still references the removed collection')
check(!File.read('sitemap.xml').include?('site.education'), 'Sitemap source still references the removed collection')
check(JSON.parse(File.read('scripts/public_routes.json')).none? { |route| REDIRECTS.key?(route) }, 'Retired hub routes remain in public_routes.json')
check(!File.read('service-worker.js').include?('/education/'), 'Service worker source still references a retired hub route')

REDIRECTS.each do |source, target|
  doc = read_page(source)
  expected = ORIGIN + target
  canonical = doc.at_css('link[rel="canonical"]')&.[]('href')
  refresh = doc.at_css('meta[http-equiv="refresh"]')&.[]('content').to_s
  fallback = doc.at_css('a')&.[]('href')
  script = doc.at_css('script')&.text.to_s
  check(canonical == expected, "#{source}: canonical does not target #{target}")
  check(refresh.match?(/url=#{Regexp.escape(target)}/), "#{source}: missing immediate meta refresh to #{target}")
  check(fallback == target, "#{source}: missing crawlable fallback link to #{target}")
  check(script.include?(target), "#{source}: JavaScript target does not match #{target}")
  check(doc.at_css('meta[name="robots"]')&.[]('content') == 'noindex', "#{source}: redirect is not noindex")
end

LANGUAGES.each do |lang|
  prefix = locale_prefix(lang)
  blog_route = "#{prefix}/blog/".gsub(%r{/+}, '/')
  blog = read_page(blog_route)
  workshop_name = WORKSHOP_NAMES.fetch(lang)
  subtitle = WORKSHOP_SUBTITLES.fetch(lang)

  check(blog.at_css('h1')&.text.to_s.strip == workshop_name, "#{blog_route}: Workshop H1 drift")
  check(blog.at_css('.hub-page-subtitle')&.text.to_s.strip == subtitle, "#{blog_route}: Workshop subtitle drift")
  check(blog.at_css('meta[name="description"]')&.[]('content') == subtitle, "#{blog_route}: metadata description drift")
  check(blog.at_css('link[rel="canonical"]')&.[]('href') == ORIGIN + blog_route, "#{blog_route}: canonical")

  navigation = blog.at_css('.site-nav')
  nav_links = navigation.css('a').select { |link| link['href'] == blog_route }
  check(nav_links.size >= 2 && nav_links.all? { |link| link.text.strip == workshop_name }, "#{blog_route}: desktop/mobile Workshop labels drift")
  footer_link = blog.at_css(".hub-footer a[href='#{blog_route}']")
  check(footer_link && footer_link.text.strip == workshop_name, "#{blog_route}: footer Workshop label drift")
  breadcrumb = blog.at_css('.breadcrumbs')
  check(breadcrumb && breadcrumb.text.include?(workshop_name), "#{blog_route}: breadcrumb Workshop label drift")
  check(blog.css('a[href]').none? { |link| REDIRECTS.key?(link['href']) }, "#{blog_route}: retired Education link remains")

  %w[en uk ru ko x-default].each do |alternate|
    alternate_prefix = %w[en x-default].include?(alternate) ? '' : "/#{alternate}"
    expected_href = ORIGIN + alternate_prefix + '/blog/'
    link = blog.at_css("link[rel='alternate'][hreflang='#{alternate}']")
    check(link && link['href'] == expected_href, "#{blog_route}: incorrect hreflang #{alternate}")
  end

  search = JSON.parse(File.read(site_path("#{prefix}/search.json".gsub(%r{/+}, '/'))))
  expected_post = "#{prefix}/blog/minecraft-python/".gsub(%r{/+}, '/')
  check(search.any? { |entry| entry['url'] == expected_post && entry['tags'].to_s.include?('education') }, "#{lang}: educational blog post missing from search index")
  check(search.none? { |entry| entry['url'].to_s.match?(%r{(?:^|/)education/$}) }, "#{lang}: retired Education hub in search index")

  post = read_page(expected_post)
  post_breadcrumb = post.at_css(".breadcrumbs a[href='#{blog_route}']")
  check(post_breadcrumb && post_breadcrumb.text.strip == workshop_name, "#{expected_post}: post breadcrumb Workshop label drift")
  check(post.at_css('link[rel="canonical"]')&.[]('href') == ORIGIN + expected_post, "#{expected_post}: canonical")
end

sitemap = Nokogiri::XML(File.read(File.join(ROOT, 'sitemap.xml')))
sitemap_paths = sitemap.xpath('//*[local-name()="loc"]').map { |node| URI(node.text).path }
REDIRECTS.each_key { |route| check(!sitemap_paths.include?(route), "Retired route in sitemap: #{route}") }
LANGUAGES.each do |lang|
  prefix = locale_prefix(lang)
  %w[category tag].each do |archive_kind|
    archive_path = site_path("#{prefix}/blog/#{archive_kind}/education/")
    check(File.file?(archive_path), "#{lang} Education #{archive_kind} archive disappeared")
  end
end

html_files = Dir[File.join(ROOT, '**', '*.html')]
html_files.each do |file|
  html = File.read(file)
  REDIRECTS.each_key do |route|
    check(!html.include?("href=\"#{route}\""), "Retired internal link remains in #{file}: #{route}")
  end
end

puts 'PASS: NAV-01 Workshop naming, merged education content, redirects, archives, search and metadata'
