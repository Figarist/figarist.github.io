# frozen_string_literal: true

# Polyglot runs post_write once per language, while the PWA plugin writes a
# manifest relative to that language's destination. Regenerate the root worker
# only after all languages have finished, including on the very first build.
require 'jekyll-pwa-workbox'

module Figarist
  module FinalizeMultilingualPwa
    def process
      result = super
      helper = SWHelper.new(self, config.fetch('pwa', {}))
      helper.generate_workbox_precache
      helper.write_sw
      result
    end
  end
end

Jekyll::Site.prepend(Figarist::FinalizeMultilingualPwa)
