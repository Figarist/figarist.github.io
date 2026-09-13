// Regression coverage for worker routing without external requests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const routes = [];
let offline = false;
let fallbackUrl;
const context = {
  URL,
  self: { __precacheManifest: [] },
  workbox: {
    precaching: {
      precacheAndRoute: () => routes.push('precache'),
      matchPrecache: async url => { fallbackUrl = url; return 'offline HTML'; }
    },
    routing: { registerRoute: (match, handler) => routes.push({match, handler}) },
    strategies: {
      NetworkFirst: class { async handle() { if (offline) throw Error('offline'); return 'fresh HTML'; } },
      CacheFirst: class {}
    },
    expiration: { ExpirationPlugin: class {} }
  }
};
vm.runInNewContext(fs.readFileSync('service-worker.js', 'utf8'), context);
(async () => {
  assert.equal(routes[0].match({request: {mode: 'navigate'}}), true);
  assert.equal(routes[1], 'precache');
  const event = { request: {url: 'https://example.test/uk/tutoring/?utm_source=test'} };
  assert.equal(await routes[0].handler({event}), 'fresh HTML');
  offline = true;
  assert.equal(await routes[0].handler({event}), 'offline HTML');
  assert.equal(fallbackUrl, 'https://example.test/uk/tutoring/index.html');
  console.log('PASS: navigation precedence, online response and offline localized fallback');
})().catch(error => { console.error(error); process.exitCode = 1; });
