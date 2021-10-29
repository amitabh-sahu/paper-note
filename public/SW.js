const staticCacheData = 'paper-note-static-v1';
const dynamicCacheData = 'paper-note-dynamic-v1';
const assets = [
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/vendors~main.chunk.js',
    '/static/media/logo.3a5719e6.png',
    '/icons/favicon.ico',
    '/edit/:noteId',
    'index.html',
    '/fallout',
    '/add',
    '/',
];

const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        cache.keys().then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheData).then((cache) => {
            cache.addAll(assets);
        }).then(this.skipWaiting())
    );
});

this.addEventListener('activate', event => {
    const currentCaches = [staticCacheData, dynamicCacheData];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => this.clients.claim())
    );
});

this.addEventListener('activate', (event) => {
    console.log('servies worker activated');
});

this.addEventListener('fetch', (event) => {
    if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
        event.respondWith(
            caches.match(event.request).then((res) => {
                return res || fetch(event.request).then((fetchRes) => {
                    return caches.open(dynamicCacheData).then((cache) => {
                        cache.put(event.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheData, 15);
                        return fetchRes;
                    });
                });
            }).catch(() => caches.match('/fallout'))
        );
    }
});