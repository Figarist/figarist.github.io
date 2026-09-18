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
  '/collection/' => 'collection/index.html',
  '/blog/minecraft-python/' => '_posts/2026-02-26-minecraft-python-en.md'
}

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

puts "PASS: full Git history and Git-derived lastmod timestamps verified for #{source_routes.length} representative routes"
