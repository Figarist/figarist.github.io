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
  File.write(File.join(tmp, '_data', 'tutoring', 'profile.yml'), YAML.dump({'status' => 'draft'}))
  File.write(File.join(tmp, '_data', 'tutoring', 'testimonials.yml'), YAML.dump({'items' => []}))
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
    raise "Raw Ruby Hash leak detected: #{lang}" if html.match?(/\{["'](?:uk|en|ru|ko)["']\s*=>/) || html.include?('=&gt;')
  end

  # Test multilingual profile facts and case metadata rendering without Cyrillic leaks in EN
  profile_data = {
    'status' => 'published',
    'translations' => {
      'uk' => {'ready' => true, 'short_description' => 'Короткий опис', 'long_description' => 'Довгий опис', 'portrait_alt' => nil},
      'en' => {'ready' => true, 'short_description' => 'Short description', 'long_description' => 'Long description', 'portrait_alt' => nil}
    },
    'verified_facts' => {
      'experience' => [
        {
          'title' => {'uk' => 'Досвід 7 років', 'en' => '7+ years experience'},
          'date' => {'uk' => '2019 — дотепер', 'en' => '2019 — present'},
          'status' => 'published'
        }
      ],
      'education' => [],
      'certifications' => []
    }
  }
  File.write(File.join(tmp, '_data', 'tutoring', 'profile.yml'), YAML.dump(profile_data))

  broken_case['translations']['en'] = {
    'ready' => true,
    'title' => 'QA-EN-CASE-TITLE',
    'student_name' => 'QA Student (12 yo)',
    'age_or_grade' => '12 years old',
    'duration' => '8 lessons',
    'card_description' => 'QA Desc',
    'full_description' => 'QA Full',
    'starting_level' => 'QA Level',
    'goal' => 'QA Goal',
    'created' => 'QA Result',
    'student_work' => 'QA Work',
    'tutor_help' => 'QA Help',
    'skills' => ['QA Skill'],
    'evidence' => 'QA Evidence'
  }
  broken_case['translations']['uk']['student_name'] = 'Учень (12 років)'
  broken_case['translations']['uk']['age_or_grade'] = '12 років'
  broken_case['translations']['uk']['duration'] = '8 занять'
  File.write(File.join(cases_dir, 'synthetic-build-bad.yml'), YAML.dump(broken_case))

  stdout, stderr, status = Open3.capture3('bundle', 'exec', 'jekyll', 'build', '--source', tmp, '--destination', destination, '--disable-disk-cache', chdir: source)
  raise "Multilingual isolated build failed: #{stdout}\n#{stderr}" unless status.success?

  en_html = File.read(File.join(destination, 'index.html'))
  uk_html = File.read(File.join(destination, 'uk', 'index.html'))

  [en_html, uk_html].each do |h|
    raise 'Raw Ruby Hash leak detected in HTML' if h.match?(/\{["'](?:uk|en|ru|ko)["']\s*=>/) || h.include?('=&gt;')
  end

  raise 'Cyrillic leaked into EN profile facts' if en_html.include?('Досвід 7 років') || en_html.include?('дотепер')
  raise 'EN profile facts missing translated text' unless en_html.include?('7+ years experience') && en_html.include?('2019 — present')
  raise 'Cyrillic leaked into EN case metadata' if en_html.include?('12 років') || en_html.include?('8 занять')
  raise 'EN case metadata missing translated text' unless en_html.include?('QA Student (12 yo)') && en_html.include?('12 years old') && en_html.include?('8 lessons')

  raise 'UK profile facts missing Ukrainian text' unless uk_html.include?('Досвід 7 років') && uk_html.include?('2019 — дотепер')
  raise 'UK case metadata missing Ukrainian text' unless uk_html.include?('Учень (12 років)') && uk_html.include?('12 років') && uk_html.include?('8 занять')
end

puts 'Tutoring build validation test: PASS (isolated invalid build rejected; valid UK-only case renders only in UK; absent profile/testimonials stay hidden; no Ruby Hash leaks; no Cyrillic leaks in EN)'
