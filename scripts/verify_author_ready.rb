# frozen_string_literal: true
# Structural checks do not prove authorship, consent or qualifications.
require 'jekyll'
require_relative '../_plugins/tutoring_content'
source = File.expand_path('..', __dir__)
content = Figarist::TutoringContent
cases = content.case_records(source)
reviews = content.testimonial_records(source)
errors = content.validate_cases(source, cases) + content.validate_profile(source) +
         content.validate_testimonials(source, reviews)
profile = content.load_yaml(File.join(source, '_data/tutoring/profile.yml'), source)
pending = []
pending << 'No published author profile' unless profile['status'] == 'published'
pending << 'No author portrait configured' if content.blank?(profile.dig('portrait', 'path'))
pending << 'No published student cases' unless cases.any? { |item| item['status'] == 'published' }
pending << 'No published testimonials' unless reviews.any? { |item| item['status'] == 'published' }
cases.select { |item| item['status'] == 'published' }.each do |item|
  pending << "#{item['id']}: no cover configured" if content.blank?(item.dig('media', 'cover', 'path'))
end
errors.each { |message| warn "FAIL: #{message}" }
pending.each { |message| puts "PENDING: #{message}" }
puts "Structural errors: #{errors.size}; author content pending: #{pending.size}"
puts 'Author confirmation and publication consent must be reviewed separately.'
exit(errors.any? || (ARGV.include?('--strict') && pending.any?) ? 1 : 0)
