# frozen_string_literal: true

require 'net/http'
require 'timeout'
require 'uri'

ORIGIN = 'https://sivochka.com'
RETRIES = 5

def request(url)
  uri = URI(url)
  Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https', open_timeout: 10, read_timeout: 20) do |http|
    http.request(Net::HTTP::Get.new(uri.request_uri, {'User-Agent' => 'sivochka.com deployment verifier'}))
  end
end

def fetch(url, expected_status: 200)
  last_response = nil
  RETRIES.times do |attempt|
    last_response = request(url)
    return last_response if last_response.code.to_i == expected_status
    sleep 5 if attempt < RETRIES - 1
  rescue IOError, SocketError, SystemCallError, Timeout::Error => error
    warn "Retrying #{url}: #{error.message}"
    sleep 5 if attempt < RETRIES - 1
  end
  raise "#{url}: expected HTTP #{expected_status}, got #{last_response&.code || 'no response'}"
end

home = fetch("#{ORIGIN}/")
raise 'Homepage canonical is incorrect' unless home.body.include?(%(<link rel="canonical" href="#{ORIGIN}/">))
raise 'Homepage still references the retired origin' if home.body.include?('https://figarist.github.io')

robots = fetch("#{ORIGIN}/robots.txt")
raise 'robots.txt sitemap is incorrect' unless robots.body.include?("Sitemap: #{ORIGIN}/sitemap.xml")

sitemap = fetch("#{ORIGIN}/sitemap.xml")
urls = sitemap.body.scan(%r{<loc>([^<]+)</loc>}).flatten
raise 'Live sitemap is empty' if urls.empty?
raise 'Live sitemap has duplicate URLs' unless urls.uniq == urls
raise 'Live sitemap contains a foreign origin' unless urls.all? { |url| url.start_with?("#{ORIGIN}/") }

errors = Queue.new
queue = Queue.new
urls.each { |url| queue << url }
workers = 8.times.map do
  Thread.new do
    loop do
      url = queue.pop(true)
      response = fetch(url)
      escaped_url = Regexp.escape(url)
      canonical_pattern = %r{<link\s+rel="canonical"\s+href="#{escaped_url}"\s*/?>}
      og_url_pattern = %r{<meta\s+property="og:url"\s+content="#{escaped_url}"\s*/?>}
      errors << "#{url}: canonical does not match the sitemap URL" unless response.body.match?(canonical_pattern)
      errors << "#{url}: og:url does not match the sitemap URL" unless response.body.match?(og_url_pattern)
      errors << "#{url}: retired origin is present" if response.body.include?('https://figarist.github.io')
      errors << "#{url}: sitemap page is noindex" if response.body.match?(%r{<meta name="robots" content="[^"]*noindex}i)
    rescue ThreadError
      break
    rescue StandardError => error
      errors << error.message
    end
  end
end
workers.each(&:join)

redirects = {
  'http://sivochka.com/tutoring/' => "#{ORIGIN}/tutoring/",
  'https://www.sivochka.com/tutoring/' => "#{ORIGIN}/tutoring/",
  'https://figarist.github.io/tutoring/' => "#{ORIGIN}/tutoring/"
}
redirects.each do |source, destination|
  response = fetch(source, expected_status: 301)
  errors << "#{source}: expected Location #{destination}, got #{response['location']}" unless response['location'] == destination
end

unless errors.empty?
  messages = []
  messages << errors.pop until errors.empty?
  raise "Live domain verification failed:\n- #{messages.join("\n- ")}"
end

puts "PASS: #{urls.size} live sitemap URLs and canonical domain redirects"
