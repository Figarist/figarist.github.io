# frozen_string_literal: true

# Capture and compare the generated-site contract used by the hardening work.
# This intentionally records routing and metadata surfaces rather than relying
# on a successful build as proof that the public output stayed compatible.

require 'digest'
require 'fileutils'
require 'json'
require 'nokogiri'
require 'time'
require 'uri'
require 'zlib'

USAGE = <<~TEXT
  Usage:
    bundle exec ruby scripts/capture_jekyll_contract.rb capture <site> <manifest> [build-log]
    bundle exec ruby scripts/capture_jekyll_contract.rb compare <site> <manifest> [--build-log=path] [--allowlist=path]

  The optional allowlist contains exact approved changes:
    {
      "routes_added": [], "routes_removed": [], "html_changed": [],
      "seo_changed": [], "sitemap_added": [], "sitemap_removed": [],
      "search_changed": [], "pwa_added": [], "pwa_removed": [],
      "size_changed": [], "warnings_changed": false
    }
TEXT

mode = ARGV.shift
abort USAGE unless %w[capture compare].include?(mode)

site_root = File.expand_path(ARGV.shift || '_site')
manifest_path = File.expand_path(ARGV.shift || 'contract.json')
build_log_path = nil
allow_path = nil
until ARGV.empty?
  argument = ARGV.shift
  case argument
  when /\A--build-log=(.+)\z/
    build_log_path = Regexp.last_match(1)
  when /\A--allowlist=(.+)\z/
    allow_path = Regexp.last_match(1)
  else
    build_log_path ||= argument if mode == 'capture'
    allow_path ||= argument if mode == 'compare'
  end
end

def fail_contract(message)
  warn "CONTRACT FAILURE: #{message}"
  exit 1
end

def normalized(value)
  case value
  when Hash
    value.keys.sort.each_with_object({}) { |key, result| result[key] = normalized(value[key]) }
  when Array
    value.map { |item| normalized(item) }
  else
    value
  end
end

def without_volatile_dates(value)
  case value
  when Hash
    value.each_with_object({}) do |(key, child), result|
      next if key == 'dateModified'

      result[key] = without_volatile_dates(child)
    end
  when Array
    value.map { |item| without_volatile_dates(item) }
  else
    value
  end
end

def sha256(path)
  Digest::SHA256.file(path).hexdigest
end

def gzip_size(path)
  Zlib::Deflate.deflate(File.binread(path), Zlib::BEST_COMPRESSION).bytesize
end

def route_for(path, root)
  relative = path.delete_prefix("#{root}\\").delete_prefix("#{root}/").tr('\\', '/')
  relative = relative.sub(/index\.html\z/, '')
  relative.empty? ? '/' : "/#{relative}"
end

def meta_content(document, selector)
  document.at_css(selector)&.[]('content').to_s
end

def html_contract(path, root)
  html = File.binread(path)
  document = Nokogiri::HTML(html)
  normalized_html = html.gsub(/\?v=\d+/, '?v=<build>')
  hreflang = document.css('link[rel="alternate"][hreflang]').map do |node|
    { 'lang' => node['hreflang'], 'href' => node['href'] }
  end.sort_by { |item| [item['lang'].to_s, item['href'].to_s] }
  refresh = document.at_css('meta[http-equiv="refresh"]')&.[]('content').to_s
  redirect_target = refresh[/\burl\s*=\s*(.+)\z/i, 1]&.strip

  {
    'route' => route_for(path, root),
    'html_sha256' => Digest::SHA256.hexdigest(normalized_html),
    'canonical' => document.css('link[rel="canonical"]').map { |node| node['href'] },
    'title' => document.at_css('title')&.text.to_s,
    'description' => meta_content(document, 'meta[name="description"]'),
    'og' => {
      'url' => meta_content(document, 'meta[property="og:url"]'),
      'title' => meta_content(document, 'meta[property="og:title"]'),
      'description' => meta_content(document, 'meta[property="og:description"]'),
      'image' => meta_content(document, 'meta[property="og:image"]')
    },
    'hreflang' => hreflang,
    'redirect_target' => redirect_target,
    'json_ld_sha256' => document.css('script[type="application/ld+json"]').map do |node|
      begin
        parsed = without_volatile_dates(JSON.parse(node.text))
        Digest::SHA256.hexdigest(JSON.generate(normalized(parsed)))
      rescue JSON::ParserError
        Digest::SHA256.hexdigest(node.text)
      end
    end.sort
  }
end

def lock_inventory
  lock = File.read('Gemfile.lock')
  locked = lock.each_line.filter_map do |line|
    match = line.match(/^    ([^\s(]+) \(([^)]+)\)$/)
    match && { 'name' => match[1], 'version' => match[2] }
  end
  dependencies = []
  in_dependencies = false
  lock.each_line do |line|
    in_dependencies = true if line.strip == 'DEPENDENCIES'
    next unless in_dependencies
    break if line.strip == 'CHECKSUMS'
    dependencies << line.strip if line.match?(/^  \S/)
  end
  {
    'direct' => dependencies,
    'locked' => locked,
    'bundled_with' => lock[/^  (\S+)\s*\z/, 1]
  }
end

def warnings_from(path)
  return { 'count' => 0, 'lines' => [] } unless path && File.file?(path)

  raw = File.binread(path)
  text = if raw.start_with?("\xFF\xFE".b)
           raw.force_encoding(Encoding::UTF_16LE).encode(Encoding::UTF_8)
         else
           raw.force_encoding(Encoding::UTF_8).scrub
         end
  lines = text.lines(chomp: true).filter_map do |line|
    clean = line.gsub(/\e\[[0-9;]*m/, '').strip
    if clean.match?(/ostruct/i)
      'warning: ostruct will no longer be a default gem in Ruby 4'
    elsif clean.match?(/fiddle\/import|fiddle.*default gem/i)
      'warning: fiddle will no longer be a default gem in Ruby 4'
    elsif clean.match?(/regular expression has redundant nested repeat/i)
      'warning: Polyglot regular expression has a redundant nested repeat operator'
    elsif clean.match?(/Jekyll Minifier:.*harmony/i)
      'Jekyll Minifier: legacy harmony option is ignored'
    end
  end.uniq.sort
  { 'count' => lines.length, 'lines' => lines }
end

abort "Generated site does not exist: #{site_root}" unless Dir.exist?(site_root)

html_files = Dir[File.join(site_root, '**', '*.html')].select { |path| File.file?(path) }.sort
pages = html_files.map { |path| html_contract(path, site_root) }

sitemap_path = File.join(site_root, 'sitemap.xml')
sitemap_document = Nokogiri::XML(File.read(sitemap_path))
sitemap = sitemap_document.xpath('//*[local-name()="url"]').map do |node|
  {
    'loc' => node.at_xpath('./*[local-name()="loc"]')&.text.to_s,
    'lastmod' => node.at_xpath('./*[local-name()="lastmod"]')&.text.to_s,
    'alternates' => node.xpath('./*[local-name()="link"]').map do |link|
      { 'lang' => link['hreflang'], 'href' => link['href'] }
    end.sort_by { |item| [item['lang'].to_s, item['href'].to_s] }
  }
end.sort_by { |item| item['loc'] }

search_indexes = Dir[File.join(site_root, '**', 'search.json')].sort.to_h do |path|
  relative = path.delete_prefix("#{site_root}\\").delete_prefix("#{site_root}/").tr('\\', '/')
  data = JSON.parse(File.read(path))
  [relative, {
    'sha256' => sha256(path),
    'entries' => normalized(data),
    'urls' => Array(data).filter_map { |entry| entry['url'] }.sort
  }]
end

sw_path = File.join(site_root, 'sw.js')
sw = File.read(sw_path)
precache_json = sw[/self\.__precacheManifest\s*=\s*(\[.*?\]);/m, 1]
precache = precache_json ? JSON.parse(precache_json) : []
precache_urls = precache.filter_map { |entry| entry['url'] }.sort

sizes = %w[script.js assets/css/styles.css].to_h do |relative|
  path = File.join(site_root, relative)
  [relative, {
    'raw_bytes' => File.size(path),
    'gzip_bytes' => gzip_size(path)
  }]
end

routes = pages.map { |page| page['route'] }.sort
archives = routes.select { |route| route.match?(%r{/blog/(category|tag)/}) }
pagination = routes.select { |route| route.match?(%r{/blog/page/}) }
redirects = pages.filter_map do |page|
  next if page['redirect_target'].to_s.empty?

  [page['route'], page['redirect_target']]
end.to_h

manifest = {
  'schema' => 1,
  'generated_at_utc' => Time.now.utc.iso8601,
  'runtime' => {
    'ruby' => `ruby --version`.strip,
    'bundler' => `bundle --version`.strip,
    'jekyll' => `bundle exec jekyll --version 2>&1`.lines.grep(/jekyll \d/i).first.to_s.strip
  },
  'dependencies' => lock_inventory,
  'routes' => routes,
  'html_pages' => pages.sort_by { |page| page['route'] },
  'sitemap' => {
    'locs' => sitemap.map { |item| item['loc'] }.sort,
    'entries' => sitemap
  },
  'redirects' => redirects.sort.to_h,
  'archives' => archives,
  'pagination' => pagination,
  'search_indexes' => search_indexes,
  'service_worker' => {
    'sha256' => sha256(sw_path),
    'raw_bytes' => File.size(sw_path),
    'precache_entries' => normalized(precache),
    'precache_urls' => precache_urls
  },
  'sizes' => sizes,
  'warnings' => warnings_from(build_log_path)
}

FileUtils.mkdir_p(File.dirname(manifest_path))
File.write(manifest_path, JSON.pretty_generate(manifest) + "\n") if mode == 'capture'

if mode == 'capture'
  puts "Captured Jekyll contract: #{manifest_path}"
  puts "Routes: #{routes.length}; HTML pages: #{pages.length}; sitemap locs: #{manifest['sitemap']['locs'].length}"
  puts "Redirects: #{redirects.length}; search indexes: #{search_indexes.length}; SW precache entries: #{precache.length}"
  exit 0
end

baseline = JSON.parse(File.read(manifest_path))
allow = allow_path && File.file?(allow_path) ? JSON.parse(File.read(allow_path)) : {}
allow_defaults = {
  'routes_added' => [], 'routes_removed' => [], 'html_changed' => [],
  'seo_changed' => [], 'sitemap_added' => [], 'sitemap_removed' => [],
  'search_changed' => [], 'pwa_added' => [], 'pwa_removed' => [],
  'size_changed' => [], 'warnings_changed' => false
}
allow = allow_defaults.merge(allow)

def diff_pages(before, after)
  before_by_route = before.each_with_object({}) { |page, result| result[page['route']] = page }
  after_by_route = after.each_with_object({}) { |page, result| result[page['route']] = page }
  routes = (before_by_route.keys | after_by_route.keys).sort
  html_changed = []
  seo_changed = []
  routes.each do |route|
    old_page = before_by_route[route]
    new_page = after_by_route[route]
    next if old_page.nil? || new_page.nil?

    html_changed << route if old_page['html_sha256'] != new_page['html_sha256']
    old_seo = old_page.slice('canonical', 'title', 'description', 'og', 'hreflang', 'redirect_target', 'json_ld_sha256')
    new_seo = new_page.slice('canonical', 'title', 'description', 'og', 'hreflang', 'redirect_target', 'json_ld_sha256')
    seo_changed << route if old_seo != new_seo
  end
  [
    (after_by_route.keys - before_by_route.keys).sort,
    (before_by_route.keys - after_by_route.keys).sort,
    html_changed,
    seo_changed
  ]
end

routes_added, routes_removed, html_changed, seo_changed = diff_pages(baseline['html_pages'], manifest['html_pages'])
sitemap_added = manifest['sitemap']['locs'] - baseline['sitemap']['locs']
sitemap_removed = baseline['sitemap']['locs'] - manifest['sitemap']['locs']
search_changed = (baseline['search_indexes'].keys | manifest['search_indexes'].keys).select do |path|
  baseline['search_indexes'][path] != manifest['search_indexes'][path]
end.sort
old_pwa = baseline.dig('service_worker', 'precache_urls') || []
new_pwa = manifest.dig('service_worker', 'precache_urls') || []
pwa_added = new_pwa - old_pwa
pwa_removed = old_pwa - new_pwa
size_changed = manifest['sizes'].keys.select { |key| manifest['sizes'][key] != baseline['sizes'][key] }.sort
warnings_changed = manifest['warnings'] != baseline['warnings']

diff = {
  'routes_added' => routes_added,
  'routes_removed' => routes_removed,
  'html_changed' => html_changed,
  'seo_changed' => seo_changed,
  'sitemap_added' => sitemap_added,
  'sitemap_removed' => sitemap_removed,
  'search_changed' => search_changed,
  'pwa_added' => pwa_added,
  'pwa_removed' => pwa_removed,
  'size_changed' => size_changed,
  'warnings_changed' => warnings_changed,
  'runtime_changed' => baseline['runtime'] != manifest['runtime'],
  'dependencies_changed' => baseline['dependencies'] != manifest['dependencies']
}
puts JSON.pretty_generate(diff)

unexpected = []
%w[routes_added routes_removed html_changed seo_changed sitemap_added sitemap_removed search_changed pwa_added pwa_removed size_changed].each do |key|
  unexpected.concat(diff[key] - Array(allow[key]))
end
unexpected << 'warnings_changed' if diff['warnings_changed'] && !allow['warnings_changed']
fail_contract("unexpected generated-site contract changes: #{unexpected.uniq.join(', ')}") unless unexpected.empty?

puts 'PASS: generated-site contract matches baseline or explicit allowlist'
