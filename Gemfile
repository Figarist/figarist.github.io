source "https://rubygems.org"

# Use Jekyll directly (NOT github-pages) so custom plugins like Polyglot load
gem "jekyll", "~> 4.3"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-polyglot"
end

# Required for Ruby 3.x local dev server (WEBrick removed from stdlib)
gem "webrick", "~> 1.8"

# Windows local development server optimizations
platforms :mingw, :x64_mingw, :mswin do
  # Avoid polling for file changes
  gem "wdm", ">= 0.1.0"
  # Silence Ruby 4.0 'fiddle' deprecation warning
  gem "fiddle"
end
