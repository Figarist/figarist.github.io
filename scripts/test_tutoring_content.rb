# frozen_string_literal: true

# Synthetic, isolated tests for the tutoring data gate. Nothing created here is
# read by Jekyll or left in _site; the temporary directory is removed on exit.
require 'fileutils'
require 'jekyll'
require 'tmpdir'
require 'yaml'
require_relative '../_plugins/tutoring_content'

include Figarist::TutoringContent

def assert(condition, message)
  raise "FAIL: #{message}" unless condition
end

def copy_case
  Marshal.load(Marshal.dump({
    '_source_file' => '_data/tutoring/cases/synthetic-test.yml',
    'id' => 'synthetic-test-case',
    'slug' => 'synthetic-test-case',
    'direction' => 'unity',
    'order' => 10,
    'featured' => false,
    'status' => 'published',
    'permission' => true,
    'student_name' => nil,
    'age_or_grade' => nil,
    'duration' => nil,
    'media' => {'cover' => {'path' => nil}, 'additional_images' => [], 'video_url' => nil, 'playable_url' => nil},
    'translations' => {
      'uk' => {
        'ready' => true,
        'title' => 'Синтетичний тестовий кейс',
        'card_description' => 'Тестовий опис картки.',
        'full_description' => 'Тестовий докладний опис.',
        'starting_level' => 'Початковий рівень.',
        'goal' => 'Тестова ціль.',
        'created' => 'Тестовий результат.',
        'student_work' => 'Самостійна частина.',
        'tutor_help' => 'Допомога викладача.',
        'skills' => ['Тестова навичка'],
        'evidence' => 'Тестова перевірка.',
        'cover_alt' => nil
      },
      'en' => {'ready' => false}
    }
  }))
end

assert(validate_cases(Dir.pwd, []).empty?, 'an empty case base is valid')

draft = {'_source_file' => 'draft.yml', 'status' => 'draft'}
assert(validate_cases(Dir.pwd, [draft]).empty?, 'an incomplete draft is allowed')

without_permission = copy_case
without_permission['permission'] = false
assert(validate_cases(Dir.pwd, [without_permission]).any? { |e| e.include?('permission') }, 'published case without permission fails')

missing_required = copy_case
missing_required['translations']['uk'].delete('goal')
assert(validate_cases(Dir.pwd, [missing_required]).any? { |e| e.include?('translations.uk.goal') }, 'published case without required content fails with field path')

missing_media = copy_case
missing_media['media']['cover']['path'] = '/assets/images/tutoring/does-not-exist.webp'
assert(validate_cases(Dir.pwd, [missing_media]).any? { |e| e.include?('media.cover.path') }, 'published case with missing media fails with field path')

anonymous = copy_case
assert(validate_cases(Dir.pwd, [anonymous]).empty?, 'a valid anonymous case is accepted')
assert(publishable_cases([anonymous], 'uk').size == 1, 'a ready UK translation is publishable')
assert(publishable_cases([anonymous], 'en').empty?, 'a language without a ready translation stays hidden')

Dir.mktmpdir('figarist-tutoring-profile-test') do |tmp|
  profile_dir = File.join(tmp, '_data', 'tutoring')
  FileUtils.mkdir_p(profile_dir)
  File.write(File.join(profile_dir, 'profile.yml'), <<~YAML)
    status: published
    portrait:
      path: null
    translations:
      uk:
        ready: true
        short_description: "Тестовий короткий опис."
        long_description: "Тестовий розгорнутий опис."
        portrait_alt: null
    verified_facts:
      experience: []
      education: []
      certifications: []
  YAML
  assert(validate_profile(tmp).empty?, 'a published profile without a portrait is valid')
end

puts 'Tutoring content tests: PASS (empty base, draft, permission gate, required fields, missing media, anonymous UK-only case, ready translation and missing portrait)'

review = {'_source_file' => 'synthetic-review.yml', 'id' => 'qa', 'signature' => 'Anonymous', 'status' => 'published', 'permission' => true, 'ready' => true, 'mode' => 'exact_text', 'text' => 'QA only', 'language' => 'uk'}
assert(validate_testimonials(Dir.pwd, [review]).empty?, 'valid language-scoped testimonial')
review['language'] = nil
assert(validate_testimonials(Dir.pwd, [review]).any? { |e| e.include?('language') }, 'testimonial requires an explicit language')
