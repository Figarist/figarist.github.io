# frozen_string_literal: true

# Builds an isolated temporary Jekyll source with one deliberately broken,
# clearly synthetic record. The temp source and _site are removed automatically.
require 'fileutils'
require 'open3'
require 'tmpdir'
require 'yaml'

source = Dir.pwd
Dir.mktmpdir('figarist-tutoring-build-test') do |tmp|
  %w[_config.yml _plugins _data service-worker.js].each do |entry|
    FileUtils.cp_r(File.join(source, entry), tmp)
  end
  cases_dir = File.join(tmp, '_data', 'tutoring', 'cases')
  broken_case = {
    'id' => 'synthetic-build-bad',
    'slug' => 'synthetic-build-bad',
    'direction' => 'unity',
    'order' => 99,
    'featured' => false,
    'status' => 'published',
    'permission' => true,
    'media' => {'cover' => {'path' => '/assets/images/qa-does-not-exist.webp'}, 'additional_images' => []},
    'translations' => {
      'uk' => {
        'ready' => true,
        'title' => 'Synthetic test only',
        'card_description' => 'Synthetic test only',
        'full_description' => 'Synthetic test only',
        'starting_level' => 'Synthetic test only',
        'goal' => 'Synthetic test only',
        'created' => 'Synthetic test only',
        'student_work' => 'Synthetic test only',
        'tutor_help' => 'Synthetic test only',
        'skills' => ['Synthetic test only'],
        'evidence' => 'Synthetic test only'
      }
    }
  }
  File.write(File.join(cases_dir, 'synthetic-build-bad.yml'), YAML.dump(broken_case))

  destination = File.join(tmp, '_site')
  _stdout, stderr, status = Open3.capture3('bundle', 'exec', 'jekyll', 'build', '--source', tmp, '--destination', destination, '--disable-disk-cache', chdir: source)
  output = "#{_stdout}\n#{stderr}"
  expected = '_data/tutoring/cases/synthetic-build-bad.yml: media.cover.path'
  unless !status.success? && output.include?(expected)
    warn output
    raise "FAIL: isolated Jekyll build did not reject the synthetic missing-media record with #{expected}"
  end
  # Render the same synthetic case in a minimal isolated multilingual site.
  broken_case['media']['cover']['path'] = nil
  broken_case['translations']['uk']['title'] = 'QA-UK-ONLY-CASE'
  File.write(File.join(cases_dir, 'synthetic-build-bad.yml'), YAML.dump(broken_case))
  FileUtils.cp_r(File.join(source, '_includes'), tmp)
  File.write(File.join(tmp, 'index.html'), <<~LIQUID)
    ---
    layout: null
    course: unity
    ---
    {% include tutoring-cases.html %}
    {% include tutoring-profile.html %}
    {% include tutoring-testimonials.html %}
  LIQUID
  stdout, stderr, status = Open3.capture3('bundle', 'exec', 'jekyll', 'build', '--source', tmp, '--destination', destination, '--disable-disk-cache', chdir: source)
  raise "Valid isolated build failed: #{stdout}\n#{stderr}" unless status.success?
  %w[en uk ru ko].each do |lang|
    prefix = lang == 'en' ? '' : lang
    html = File.read(File.join(destination, prefix, 'index.html'))
    raise "Incorrect case localization: #{lang}" unless html.include?('QA-UK-ONLY-CASE') == (lang == 'uk')
    raise "Empty evidence section rendered: #{lang}" if html.include?('profile-title') || html.include?('testimonials-title')
  end
end

puts 'Tutoring build validation test: PASS (isolated invalid build rejected; valid UK-only case renders only in UK; absent profile/testimonials stay hidden)'
