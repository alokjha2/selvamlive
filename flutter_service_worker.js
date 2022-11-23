'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "73fb4476e525ab8f495e68ef9031f852",
"assets/assets/fonts/akshar.ttf": "3d67df54a1ac4aaab086ffed7cfcc4ca",
"assets/assets/fonts/HindMadurai-Regular.ttf": "8de918aa296487a35da01f2793c5e463",
"assets/assets/fonts/Latha.ttf": "19849b527d6f39c0cfe67e6c9620caca",
"assets/assets/fonts/Lato-Regular.ttf": "122dd68d69fe9587e062d20d9ff5de2a",
"assets/assets/fonts/Mulish-VariableFont_wght.ttf": "2ea3e31b7bdb1314ce72fc8ecb4908a7",
"assets/assets/fonts/Noto-Sans-Tamil.ttf": "3934444583758d59a9f34e507533d1ef",
"assets/assets/fonts/TMOTCHN_Ship.TTF": "0202e34ca2c087c9be4a6cd14e67b988",
"assets/assets/fonts/vijaya.ttf": "e2febb205f1bda4c972f37857f327b82",
"assets/assets/icons/account-cash.svg": "2a4649fb31fe0fbda42f22a51c06ee7f",
"assets/assets/icons/account-hard-hat.svg": "bd269d413044c8621007832a9de564da",
"assets/assets/icons/attendance.svg": "cdf03eb6887073df2fc886d59259e3a6",
"assets/assets/icons/cash-100.svg": "6890d73ebed721a1bc5610d1e1c14007",
"assets/assets/icons/cash.svg": "cfc345556dc246bba307d87bb83d430c",
"assets/assets/icons/checkbook.svg": "b7709322c6e8838548b482fad07ba7b0",
"assets/assets/icons/driver.svg": "03a6489c7f297beeb7296571cb66b239",
"assets/assets/icons/farm.svg": "59ed38342ec89f1c53ff3a742d819d83",
"assets/assets/icons/grid.svg": "323a2b12fc078edd79b9589d1a026074",
"assets/assets/icons/list.svg": "6abb493d8117997c2aeb42cef535f1cb",
"assets/assets/icons/loadman.svg": "9478f28226588819f099ee010dd0f773",
"assets/assets/icons/logout.svg": "67f3367455be8ce2dec967b23b6c4788",
"assets/assets/icons/map-marker-path.svg": "e4782934b7271a8fa86c922cd1f1b994",
"assets/assets/icons/purchase.svg": "96cf3c8864c4864dec65183218d8dc60",
"assets/assets/icons/report.svg": "4b025242edde6ad7a860dcbf6bc1bfab",
"assets/assets/icons/route.svg": "1afc184c7100590bf2faf7c33669afb0",
"assets/assets/icons/sale.svg": "b4ee2c3aebdc92784f2c12f9bf2d0d3c",
"assets/assets/icons/shopping.svg": "820e4461085edd0fa0ac6ab3dce19435",
"assets/assets/icons/store.svg": "d71b6850768a20783e8e118169c10719",
"assets/assets/icons/trip.svg": "077ac38b1a55756b9deae8e99fd21db5",
"assets/assets/icons/vehicle.svg": "55ccb359076a31a731bf2075e9b046c6",
"assets/assets/images/logo.png": "8b669e2b18d219db7ce266fb8b796e8e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "c9ef51221bdf99e86ddf91c45610070f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/shaders/ink_sparkle.frag": "2ad5fabd6a36a6deff087b8edfd0c1f8",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "8ae00b472ec3937a5bee52055d6bc8b4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"img/logo.png": "8b669e2b18d219db7ce266fb8b796e8e",
"index.html": "a5ee9f2303cf3362298b283cf8a083a7",
"/": "a5ee9f2303cf3362298b283cf8a083a7",
"main.dart.js": "5d098f84a6b07b1ceb2051cd504a5728",
"manifest.json": "df5169d5ec5be44ab66f2b84085f10be",
"version.json": "e51393a02153a0c63dff2f5f813c118b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
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
