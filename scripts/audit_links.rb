# Frozen public routes and local link integrity are deployment gates.
require 'nokogiri'
require 'json'
require 'uri'
base = File.expand_path(ARGV.fetch(0, '_site'))
records = []
errors = []
files = Dir["#{base}/**/*.html"].select { |f| File.file?(f) }
documents = {}
files.each { |file| documents[file] = Nokogiri::HTML(File.read(file)) }
external_projects = %w[/OGCruncher/ /lego-catalog/]
files.each do |file|
  route = file.delete_prefix(base).sub(/index\.html$/, '')
  doc = documents[file]
  alternates = doc.css('link[hreflang]')
  unless alternates.empty?
    bare_route = route.sub(%r{^/(uk|ru|ko)/}, '/')
    %w[en uk ru ko x-default].each do |lang|
      prefix = %w[en x-default].include?(lang) ? '' : "/#{lang}"
      expected = "https://figarist.github.io#{prefix}#{bare_route}"
      matches = alternates.select { |link| link['hreflang'] == lang }
      errors << {source: route, error: "incorrect hreflang #{lang}"} unless matches.size == 1 && matches.first['href'].to_s.sub(/index\.html$/, '') == expected
    end
  end
  errors << {source: route, error: 'unprocessed static href'} unless doc.css('[ferh]').empty?
  doc.css('a[href], link[href], img[src], script[src], iframe[src], source[src], audio[src], video[src]').each do |node|
    value = node['href'] || node['src']
    next if value.nil? || value.empty? || value.match?(/^(mailto:|tel:|data:|about:)/)
    begin
      url = URI.join('https://figarist.github.io' + route, value)
      records << {source: route, tag: node.name, url: url.to_s}
      errors << {source: route, url: url.to_s, error: 'retired external rendering dependency'} if %w[polyfill.io mermaid.ink].include?(url.host)
      next unless url.host == 'figarist.github.io'
      next if external_projects.any? { |prefix| url.path.start_with?(prefix) }
      target = File.join(base, URI::DEFAULT_PARSER.unescape(url.path))
      target = File.join(target, 'index.html') if File.directory?(target)
      unless File.file?(target)
        errors << {source: route, url: url.to_s, error: 'missing local target'}
        next
      end
      if url.fragment && !url.fragment.empty? && target.end_with?('.html')
        target_doc = documents[target] || Nokogiri::HTML(File.read(target))
        fragment = URI::DEFAULT_PARSER.unescape(url.fragment)
        errors << {source: route, url: url.to_s, error: 'missing fragment'} unless target_doc.xpath('//*[@id or @name]').any? { |el| el['id'] == fragment || el['name'] == fragment }
      end
    rescue URI::Error => e
      errors << {source: route, url: value, error: e.message}
    end
  end
end
manifest = 'scripts/public_routes.json'
if File.file?(manifest)
  JSON.parse(File.read(manifest)).each do |route|
    target = File.join(base, route)
    target = File.join(target, 'index.html') if route.end_with?('/')
    errors << {source: route, error: 'previously published route removed'} unless File.file?(target)
  end
end
Dir.mkdir('qa-screenshots') unless Dir.exist?('qa-screenshots')
File.write('qa-screenshots/link-inventory.json', JSON.pretty_generate({pages: files.size, records: records, local_errors: errors}))
puts "#{files.size} HTML pages, #{records.size} link references, #{errors.size} errors"
puts JSON.pretty_generate(errors) unless errors.empty?
exit(errors.empty? ? 0 : 1)
