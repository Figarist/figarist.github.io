# frozen_string_literal: true

# Polyglot normally prepares language state in Site#process. Jekyll Doctor
# calls Site#read directly instead. Initialize only that missing state before
# Polyglot's post_read hooks run; normal builds retain their own preparation.
Jekyll::Hooks.register :site, :after_init do |site|
  site.prepare if site.respond_to?(:prepare) && site.respond_to?(:languages) && site.languages.nil?
end
