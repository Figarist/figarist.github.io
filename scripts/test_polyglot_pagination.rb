# frozen_string_literal: true

require 'fileutils'
require 'tmpdir'
require 'open3'
require 'yaml'
require 'nokogiri'

source = Dir.pwd
languages = %w[en uk ru ko]
Dir.mktmpdir('polyglot-pagination') do |tmp|
  config = {
    'url' => 'https://sivochka.com', 'languages' => languages,
    'default_lang' => 'en', 'parallel_localization' => false,
    'plugins' => %w[jekyll-polyglot jekyll-paginate-v2],
    'pagination' => YAML.load_file(File.join(source, '_config.yml'))['pagination']
  }
  File.write(File.join(tmp, '_config.yml'), YAML.dump(config))
  FileUtils.mkdir_p(File.join(tmp, 'blog'))
  FileUtils.mkdir_p(File.join(tmp, '_posts'))
  FileUtils.mkdir_p(File.join(tmp, '_plugins'))
  FileUtils.cp(File.join(source, '_plugins/polyglot_read_lifecycle.rb'), File.join(tmp, '_plugins'))
  FileUtils.cp(File.join(source, 'blog/index.html'), File.join(tmp, 'blog/index.html'))
  FileUtils.cp_r(File.join(source, '_includes'), tmp)
  FileUtils.cp_r(File.join(source, '_data'), tmp)
  FileUtils.cp(File.join(source, 'service-worker.js'), tmp)
  languages.each do |lang|
    8.times do |index|
      day = index + 1
      data = {'title' => "QA-#{lang}-#{day}", 'lang' => lang, 'layout' => nil,
              'permalink' => "/blog/qa-#{day}/"}
      File.write(File.join(tmp, '_posts', "2026-01-#{format('%02d', day)}-qa-#{lang}.md"),
                 "#{YAML.dump(data)}---\nSynthetic pagination fixture.\n")
    end
  end
  out, err, status = Open3.capture3('bundle', 'exec', 'jekyll', 'build', '--source', tmp,
                                  '--destination', File.join(tmp, '_site'), '--disable-disk-cache')
  raise "Fixture build failed: #{out}\n#{err}" unless status.success?
  languages.each do |lang|
    prefix = lang == 'en' ? '' : "/#{lang}"
    pages = ["#{prefix}/blog/", "#{prefix}/blog/page/2/"]
    titles = pages.each_with_index.flat_map do |route, index|
      doc = Nokogiri::HTML(File.read(File.join(tmp, '_site', route.delete_prefix('/'), 'index.html')))
      entries = doc.css('.blog-list__title').map { |node| node.text.strip }
      raise "Wrong page size #{route}: #{entries.inspect}" unless entries.size == [6, 2][index]
      target = pages[1 - index]
      selector = index.zero? ? '.pagination-next' : '.pagination-prev'
      actual = doc.at_css(selector)&.[]('href')
      raise "Wrong pagination link #{route}: #{actual.inspect}, expected #{target}" unless actual == target
      entries
    end
    expected = (1..8).map { |day| "QA-#{lang}-#{day}" }
    raise "Missing/duplicate/foreign posts #{lang}: #{titles.inspect}" unless titles.sort == expected.sort
  end
end
puts 'PASS: 8 posts per locale, 6+2 pagination, no duplicates or language leaks, localized next/previous links'
