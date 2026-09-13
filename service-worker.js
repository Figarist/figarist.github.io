// jekyll-pwa-workbox prepends the local Workbox loader and manifest.
const { precacheAndRoute, matchPrecache } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { NetworkFirst, CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

const pageStrategy = new NetworkFirst({
  networkTimeoutSeconds: 3,
  cacheName: 'pages-cache',
  plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 })]
});

// First matching route wins: online HTML must precede the precache route.
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      return await pageStrategy.handle({ event, request: event.request });
    } catch (error) {
      const url = new URL(event.request.url);
      if (url.pathname.endsWith('/')) url.pathname += 'index.html';
      url.search = '';
      const cached = await matchPrecache(url.href);
      if (cached) return cached;
      throw error;
    }
  }
);
precacheAndRoute(self.__precacheManifest || self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 })]
  })
);
