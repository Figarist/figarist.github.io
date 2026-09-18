# frozen_string_literal: true

# Jekyll 4 may freeze rendered output before Polyglot normalizes URLs.
# Duplicate the document only at this compatibility boundary.
Jekyll::Hooks.register :site, :after_init do |site|
  if Jekyll::Site.instance_methods.include?(:correct_nonrelativized_urls)
    Jekyll::Site.class_eval do
      unless method_defined?(:original_correct_nonrelativized_urls_unfrozen)
        alias_method :original_correct_nonrelativized_urls_unfrozen, :correct_nonrelativized_urls

        def correct_nonrelativized_urls(document, url)
          if document.output && document.output.frozen?
            document.output = document.output.dup
          end
          original_correct_nonrelativized_urls_unfrozen(document, url)
        end
      end
    end
  end
end
