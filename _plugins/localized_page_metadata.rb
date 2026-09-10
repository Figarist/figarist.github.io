# Set real page data before jekyll-seo-tag reads it. Liquid assignments to
# page.title create a separate variable and do not update Jekyll's PageDrop.
Jekyll::Hooks.register :pages, :pre_render do |page, payload|
  language = page.site.active_lang
  localized = page.site.data.fetch(language, {})

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
  localized_path = page.url
  localized_path = "/#{language}#{page.url}" unless language == page.site.default_lang
  page.data['canonical_url'] = "#{page.site.config['url']}#{page.site.config['baseurl']}#{localized_path}"
  page.data['locale'] = {
    'en' => 'en_US',
    'uk' => 'uk_UA',
    'ru' => 'ru_RU',
    'ko' => 'ko_KR'
  }.fetch(language, language)
  payload['page']['title'] = page.data['title']
  payload['page']['description'] = page.data['description']
  payload['page']['canonical_url'] = page.data['canonical_url']
  payload['page']['locale'] = page.data['locale']
end
