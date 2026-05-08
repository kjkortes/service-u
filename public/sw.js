self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('service-u-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/images/app-logo.jpg',
        '/images/provider-maria.jpg',
        '/images/provider-jenny.jpg',
        '/images/provider-boyet.jpg',
        '/images/provider-mangjun.jpg',
        '/images/provider-ana.jpg',
      ])
    })
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})
