'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "d37af0c49fdcbe99a341dbae74945fb5",
"assets/AssetManifest.bin.json": "867a430f4277dcccb67a3c363ce8ae72",
"assets/AssetManifest.json": "e14b408baadce92893d6a0d4f8d8a94b",
"assets/assets/airquality.png": "2878f572426c3b5a7de2d16ace14f5a5",
"assets/assets/Back.png": "c32a11ed11a8b35e861fe48f6cf019c4",
"assets/assets/background.png": "36eac1be622e7e5a65e580cd6603b65f",
"assets/assets/feelslike.png": "02e26d9fa462d4f94d13e4db6a96ea0b",
"assets/assets/house.png": "156f6fc69e7bef1419c1b3f993fd3afd",
"assets/assets/Hover.svg": "5c42ab288b5706f51f4f4d95e0a0d9b5",
"assets/assets/humidity.png": "1f2a7953036020fa19c83d85f822bece",
"assets/assets/List.svg": "70da5c6dd0baea14ff1daca39f713bac",
"assets/assets/Moon%2520cloud%2520fast%2520wind.png": "a8a39b3c866789124aeeb0792a8bdc4e",
"assets/assets/Moon%2520cloud%2520mid%2520rain.png": "66ec5eb0416816dad10d25d0351f3d5c",
"assets/assets/place1.png": "a4b6f486b619fcf7ba345191a1d6932d",
"assets/assets/place2.png": "9acd1737c06ea5557f0fec05692772ac",
"assets/assets/place3.png": "0e6152d5fb488bcb55a7250f8f701123",
"assets/assets/place4.png": "791e71c580f83be361666ca45998a2e2",
"assets/assets/place5.png": "3e4ce4d289534187813ebc19f2874a9f",
"assets/assets/place6.png": "8cb2cef24f39ca4683b306b11bfb5b0f",
"assets/assets/place7.png": "5711ae3160583738018f0a8d0006e26b",
"assets/assets/Plus.svg": "ed77a7c4b6a0bc40d65eccfd8c78f386",
"assets/assets/pressure.png": "42b68d1e21e0a35bc5ac6c3d0c1ec8cf",
"assets/assets/rainfall.png": "69b211816638183f6980c9daadaca850",
"assets/assets/Subtract.png": "b02fabcea5b891545a5fa5060b5e81fb",
"assets/assets/Sun%2520cloud%2520angled%2520rain.png": "b45a2cf2cc63d5ebedd952410aac3ca2",
"assets/assets/Sun%2520cloud%2520mid%2520rain.png": "6281b4ee112b965047c99c16753a844b",
"assets/assets/sunrise.png": "a8f716f37980950ca633a75aeb002e85",
"assets/assets/Tornado.png": "84f60566e2fe01ba5a5f3ae39c8fc536",
"assets/assets/visibility.png": "bac1b809d793a3c986e7300a54700c1f",
"assets/assets/wind.png": "9d5d6f6c46325bb3c9766bacd6a30f29",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "19c498ab28d1c3e998c4e141bbba25e0",
"assets/NOTICES": "a8e83dd6d17c0b79611299e4e26f3c5e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c88013dc66a3ebf092349fefd549aa2d",
"/": "c88013dc66a3ebf092349fefd549aa2d",
"main.dart.js": "5d82d88f436555f6e7360ec445305238",
"manifest.json": "b154a9364e1d3d2aa52c55b7a7863999",
"version.json": "cb52daa919d6aa3bbe5d0f27829cdad0"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
