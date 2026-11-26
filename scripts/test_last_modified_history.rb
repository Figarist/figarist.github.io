# frozen_string_literal: true

require 'open3'
require 'time'
require 'nokogiri'

ROOT = File.expand_path('..', __dir__)
SITEMAP = File.join(ROOT, '_site', 'sitemap.xml')
ORIGIN = 'https://sivochka.com'

def check(condition, message)
  raise message unless condition
end

def command(*args)
  stdout, status = Open3.capture2(*args, chdir: ROOT)
  check(status.success?, "Command failed: #{args.join(' ')}")
  stdout.strip
end

check(command('git', 'rev-parse', '--is-shallow-repository') == 'false', 'Checkout is shallow; full Git history is required for last_modified_at')

source_routes = {
  '/' => 'index.html',
  '/blog/' => 'blog/index.html',
  '/tutoring/' => 'tutoring/index.html',
  '/collection/' => 'collection/index.html'
}

# Posts do not use Git times (_plugins/explicit_post_updates.rb): lastmod is the owner-set
# last_modified_at when it is a later day than date, otherwise the publish date.
post_routes = {
  '/blog/minecraft-python/' => '_posts/2026-02-26-minecraft-python-en.md',
  '/blog/jekyll-spaceship-hub-architecture/' => '_posts/2026-03-01-jekyll-spaceship-hub-architecture-en.md'
}

def front_matter_time(path, key)
  front_matter = File.read(File.join(ROOT, path), encoding: 'UTF-8')[/\A---\s*\n(.*?)\n---/m, 1].to_s
  value = front_matter[/^#{key}:\s*"?([^"\n]+?)"?\s*$/, 1]
  value && value != 'null' ? Time.parse(value) : nil
end

document = Nokogiri::XML(File.read(SITEMAP))
sitemap_lastmods = document.xpath('//*[local-name()="url"]').to_h do |node|
  loc = node.at_xpath('./*[local-name()="loc"]')&.text.to_s
  lastmod = node.at_xpath('./*[local-name()="lastmod"]')&.text.to_s
  [loc.delete_prefix(ORIGIN), lastmod]
end

source_routes.each do |route, source_path|
  commit_timestamp = command('git', 'log', '-1', '--format=%ct', '--', source_path)
  check(commit_timestamp.match?(/\A\d+\z/), "No Git history found for #{source_path}")
  expected = Time.at(commit_timestamp.to_i).getlocal.iso8601
  actual = sitemap_lastmods.fetch(route) { raise "Missing sitemap route #{route}" }
  check(actual == expected, "#{route}: sitemap lastmod #{actual.inspect} does not match Git #{expected.inspect}")
end

post_routes.each do |route, source_path|
  published = front_matter_time(source_path, 'date')
  check(published, "No date in #{source_path}")
  updated = front_matter_time(source_path, 'last_modified_at')
  expected_time = updated && updated.getlocal.to_date > published.getlocal.to_date ? updated : published
  expected = expected_time.getlocal.iso8601
  actual = sitemap_lastmods.fetch(route) { raise "Missing sitemap route #{route}" }
  check(actual == expected, "#{route}: sitemap lastmod #{actual.inspect} does not match the post's own date #{expected.inspect}")
end

puts "PASS: full Git history, Git-derived lastmod for #{source_routes.length} pages and explicit post dates for #{post_routes.length} posts verified"
