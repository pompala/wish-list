const CACHE_NAME = 'wishlist-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo/logo_wishy.png'
];

// Instalacja Service Workera i cache'owanie plików
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Obsługa żądań sieciowych - strategia "cache first"
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jeśli zasób jest w cache, zwróć go
        if (response) {
          return response;
        }
        // W przeciwnym razie, pobierz z sieci
        return fetch(event.request);
      })
  );
});