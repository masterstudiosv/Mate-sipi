const CACHE_NAME = 'mate-sipi-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/calculadora.html',
  '/style.css',
  '/cal.js',
  '/dd.png',
  '/logo.png',
  '/icon-192.png',
  '/icon-512.png'
];

// 🧩 Instalar y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Archivos guardados en caché');
      return cache.addAll(urlsToCache);
    })
  );
});

// 🧠 Interceptar solicitudes: usa caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 🧹 Borrar versiones viejas de la caché
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🧹 Eliminando caché vieja:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});
