# Set real page data before jekyll-seo-tag reads it. Liquid assignments to
# page.title create a separate variable and do not update Jekyll's PageDrop.
source_canonical_key = '_figarist_source_canonical_url'
localize_metadata = lambda do |page, payload|
  language = page.site.active_lang
  localized = page.site.data.fetch(language, {})

  unless page.data.key?(source_canonical_key)
    page.data[source_canonical_key] = page.data['canonical_url']
  end
  clean_path = page.url.sub(%r{index\.html$}, '')
  localized_path = clean_path
  localized_path = "/#{language}#{clean_path}" unless language == page.site.default_lang
  canonical_url = page.data[source_canonical_key] ||
                  "#{page.site.config['url']}#{page.site.config['baseurl']}#{localized_path}"
  locale = {
    'en' => 'en_US',
    'uk' => 'uk_UA',
    'ru' => 'ru_RU',
    'ko' => 'ko_KR'
  }.fetch(language, language)
  page.data['canonical_url'] = canonical_url
  page.data['locale'] = locale
  payload['page']['canonical_url'] = canonical_url
  payload['page']['locale'] = locale

  if page.data['title_key']
    title = localized.fetch('strings', {})[page.data['title_key']]
    page.data['title'] = title if title
    payload['page']['title'] = title if title
  end

  next unless page.data['tutoring'] || page.data['is_home']

  tutoring = localized.fetch('tutoring')
  course = tutoring.fetch('courses').find { |item| item['slug'] == page.data['course'] }
  metadata = if page.data['is_home']
               { 'title' => tutoring.fetch('home_title'), 'description' => tutoring.fetch('home_description') }
             else
               course || tutoring
             end
  page.data['title'] = metadata.fetch('title')
  page.data['description'] = metadata.fetch('description')
  if page.data['tutoring']
    image_path = page.data['tutoring_image'] ||
                 (page.data['image'] unless page.data['image'] == '/assets/images/default-social-card.webp') ||
                 'assets/images/games/dish-of-chaos-cover.png'
    page.data['image'] = image_path
    page.data['og_type'] = 'website'
    payload['page']['image'] = image_path
    payload['page']['og_type'] = 'website'
  end
  payload['page']['title'] = page.data['title']
  payload['page']['description'] = page.data['description']
end

Jekyll::Hooks.register :pages, :pre_render, &localize_metadata
Jekyll::Hooks.register :documents, :pre_render, &localize_metadata
