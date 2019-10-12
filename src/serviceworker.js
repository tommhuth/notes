workbox.setConfig({ debug: false })

workbox.core.skipWaiting()
workbox.core.clientsClaim()
  
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])