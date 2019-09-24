let currentTimestamp = 'initial';

self.addEventListener('message', (event)=>{
    console.log(event.data.application);
    if (event.data.application)
    {
        currentTimestamp = event.data.application;

        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.map((cacheName)=>{
                    if (cacheName !== currentTimestamp)
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        });
    }
});

self.addEventListener('fetch', (event:any) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                let responseClone = response.clone();
                if (!responseClone.redirected && responseClone.ok)
                {
                    caches.open(currentTimestamp).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            });
        }).catch(() => {
            return new Response('No internet');
        })
    );
});