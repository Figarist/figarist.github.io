import { precacheAndRoute } from 'workbox-precaching';

// The jekyll-pwa-workbox plugin will inject the precache manifest here
precacheAndRoute(self.__WB_MANIFEST || []);
