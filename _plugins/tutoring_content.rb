# frozen_string_literal: true

# Single source of truth for tutoring content records. Drafts are allowed to be
# incomplete; published records fail the build until their public evidence is
# complete and permission is explicitly recorded.
require 'json'
require 'psych'

module Figarist
  module TutoringContent
    LANGUAGES = %w[en uk ru ko].freeze
    DIRECTIONS = %w[unity python scratch].freeze
    REQUIRED_TRANSLATION_FIELDS = %w[
      title card_description full_description starting_level goal created
      student_work tutor_help skills evidence
    ].freeze

    module_function

    def blank?(value)
      value.nil? || (value.respond_to?(:strip) && value.strip.empty?) ||
        (value.respond_to?(:empty?) && value.empty?)
    end

    def relative_path(source, path)
      path.sub(%r{^#{Regexp.escape(source)}/?}, '')
    end

    def load_yaml(path, source)
      Psych.safe_load(File.read(path), aliases: false) || {}
    rescue Psych::Exception => e
      raise "#{relative_path(source, path)}: invalid YAML (#{e.message.lines.first.strip})"
    end

    def case_records(source)
      dir = File.join(source, '_data', 'tutoring', 'cases')
      Dir[File.join(dir, '*.yml')].sort.filter_map do |path|
        next if File.basename(path) == 'case-template.yml'

        record = load_yaml(path, source)
        unless record.is_a?(Hash)
          raise "#{relative_path(source, path)}: a case record must be a YAML mapping"
        end
        record['_source_file'] = relative_path(source, path)
        record
      end
    end

    def testimonial_records(source)
      path = File.join(source, '_data', 'tutoring', 'testimonials.yml')
      data = load_yaml(path, source)
      items = data['items'] || []
      unless items.is_a?(Array)
        raise "_data/tutoring/testimonials.yml: items must be a list"
      end

      items.each_with_index.map do |item, index|
        unless item.is_a?(Hash)
          raise "_data/tutoring/testimonials.yml: items[#{index}] must be a YAML mapping"
        end
        item.merge('_source_file' => "_data/tutoring/testimonials.yml: items[#{index}]")
      end
    end

    def local_asset_exists?(source, value)
      return false if blank?(value) || value.start_with?('http://', 'https://')

      File.file?(File.join(source, value.sub(%r{^/}, '')))
    end

    def add_error(errors, file, field, message)
      errors << "#{file}: #{field} — #{message}"
    end

    def validate_cases(source, records)
      errors = []
      ids = {}
      slugs = {}

      records.each do |record|
        file = record['_source_file']
        %w[id slug].each do |key|
          next if blank?(record[key])

          store = key == 'id' ? ids : slugs
          if store.key?(record[key])
            add_error(errors, file, key, "duplicate value; also used by #{store[record[key]]}")
          else
            store[record[key]] = file
          end
        end

        status = record['status']
        unless %w[draft published].include?(status)
          add_error(errors, file, 'status', "use draft or published (got #{status.inspect})")
          next
        end
        next unless status == 'published'

        %w[id slug direction order].each do |key|
          add_error(errors, file, key, 'is required for a published case') if blank?(record[key])
        end
        if !blank?(record['direction']) && !DIRECTIONS.include?(record['direction'])
          add_error(errors, file, 'direction', "must be one of #{DIRECTIONS.join(', ')}")
        end
        add_error(errors, file, 'permission', 'must be true before publishing') unless record['permission'] == true

        translations = record['translations']
        unless translations.is_a?(Hash)
          add_error(errors, file, 'translations', 'must contain at least one ready language')
          next
        end

        ready_languages = LANGUAGES.select do |lang|
          translation = translations[lang]
          translation.is_a?(Hash) && translation['ready'] == true
        end
        if ready_languages.empty?
          add_error(errors, file, 'translations.*.ready', 'set ready: true for at least one complete language')
        end

        ready_languages.each do |lang|
          translation = translations[lang]
          REQUIRED_TRANSLATION_FIELDS.each do |key|
            value = translation[key]
            valid = key == 'skills' ? value.is_a?(Array) && !value.empty? && value.none? { |item| blank?(item) } : !blank?(value)
            add_error(errors, file, "translations.#{lang}.#{key}", 'is required for a ready language') unless valid
          end

          media = record['media'].is_a?(Hash) ? record['media'] : {}
          cover = media['cover'].is_a?(Hash) ? media['cover']['path'] : nil
          if !blank?(cover)
            if cover.start_with?('http://', 'https://')
              add_error(errors, file, 'media.cover.path', 'must point to a local repository file')
            elsif !local_asset_exists?(source, cover)
              add_error(errors, file, 'media.cover.path', 'local file does not exist')
            end
            add_error(errors, file, "translations.#{lang}.cover_alt", 'is required when a cover is supplied') if blank?(translation['cover_alt'])
          end

          additional = media['additional_images'] || []
          unless additional.is_a?(Array)
            add_error(errors, file, 'media.additional_images', 'must be a list')
            additional = []
          end
          additional.each_with_index do |image, index|
            next unless image.is_a?(Hash)

            path = image['path']
            next if blank?(path)

            add_error(errors, file, "media.additional_images[#{index}].path", 'local file does not exist') unless local_asset_exists?(source, path)
            alt = image['alt']
            alt = alt[lang] if alt.is_a?(Hash)
            add_error(errors, file, "media.additional_images[#{index}].alt.#{lang}", 'is required for a ready language') if blank?(alt)
          end
        end
      end
      errors
    end

    def validate_profile(source)
      path = File.join(source, '_data', 'tutoring', 'profile.yml')
      data = load_yaml(path, source)
      errors = []
      return errors unless data['status'] == 'published'

      translations = data['translations'].is_a?(Hash) ? data['translations'] : {}
      ready = LANGUAGES.select { |lang| translations.dig(lang, 'ready') == true }
      add_error(errors, relative_path(source, path), 'translations.*.ready', 'set ready: true for at least one public profile language') if ready.empty?
      portrait = data['portrait'].is_a?(Hash) ? data['portrait']['path'] : nil
      if !blank?(portrait) && !local_asset_exists?(source, portrait)
        add_error(errors, relative_path(source, path), 'portrait.path', 'local file does not exist')
      end
      ready.each do |lang|
        translation = translations[lang]
        %w[short_description long_description].each do |key|
          add_error(errors, relative_path(source, path), "translations.#{lang}.#{key}", 'is required for a ready profile') if blank?(translation[key])
        end
        add_error(errors, relative_path(source, path), "translations.#{lang}.portrait_alt", 'is required when a portrait is supplied') if !blank?(portrait) && blank?(translation['portrait_alt'])
      end
      %w[experience education certifications].each do |group|
        Array(data.dig('verified_facts', group)).each_with_index do |item, index|
          next unless item.is_a?(Hash) && item['status'] == 'published'

          add_error(errors, relative_path(source, path), "verified_facts.#{group}[#{index}].title", 'is required') if blank?(item['title'])
        end
      end
      errors
    end

    def validate_testimonials(source, records)
      errors = []
      records.each do |item|
        next unless item['status'] == 'published'

        file = item['_source_file']
        %w[id signature].each { |key| add_error(errors, file, key, 'is required for a published testimonial') if blank?(item[key]) }
        add_error(errors, file, 'permission', 'must be true before publishing') unless item['permission'] == true
        add_error(errors, file, 'ready', 'must be true before publishing') unless item['ready'] == true
        add_error(errors, file, 'language', 'must be en, uk, ru or ko') unless LANGUAGES.include?(item['language'])
        mode = item['mode'] || 'exact_text'
        unless %w[exact_text source_only].include?(mode)
          add_error(errors, file, 'mode', 'use exact_text or source_only')
        end
        add_error(errors, file, 'text', 'is required for exact_text mode') if mode == 'exact_text' && blank?(item['text'])
        add_error(errors, file, 'source_url', 'is required for source_only mode') if mode == 'source_only' && blank?(item['source_url'])
      end
      errors
    end

    def publishable_cases(records, language)
      records.select do |record|
        translation = record.dig('translations', language)
        record['status'] == 'published' && record['permission'] == true && translation.is_a?(Hash) && translation['ready'] == true
      end.sort_by { |record| record['order'] || 999_999 }
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  begin
    cases = Figarist::TutoringContent.case_records(site.source)
    testimonials = Figarist::TutoringContent.testimonial_records(site.source)
    errors = Figarist::TutoringContent.validate_cases(site.source, cases)
    errors.concat(Figarist::TutoringContent.validate_profile(site.source))
    errors.concat(Figarist::TutoringContent.validate_testimonials(site.source, testimonials))
    raise Jekyll::Errors::FatalException, "Tutoring content validation failed:\n- #{errors.join("\n- ")}" unless errors.empty?

    site.data['tutoring']['case_records'] = cases
    site.data['tutoring']['testimonial_records'] = testimonials
  rescue Errno::ENOENT => e
    raise Jekyll::Errors::FatalException, "Tutoring content data is missing: #{e.message}"
  rescue RuntimeError => e
    raise Jekyll::Errors::FatalException, e.message
  end
end
