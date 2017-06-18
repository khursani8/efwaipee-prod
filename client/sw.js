var __wpo = {"assets":{"main":["/vendor.76d6aad12c2226bf8ac7.js","/polyfills.76d6aad12c2226bf8ac7.js","/app.76d6aad12c2226bf8ac7.js","/polyfills.76d6aad12c2226bf8ac7.js.gz","/app.76d6aad12c2226bf8ac7.js.gz","/vendor.76d6aad12c2226bf8ac7.js.gz","/../client/","https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/css/materialize.min.css","/assets/libs/introjs.min.css","/assets/libs/scripts.js"],"additional":[],"optional":[]},"externals":["https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/css/materialize.min.css","/assets/libs/introjs.min.css","/assets/libs/scripts.js"],"hashesMap":{"59db3105a50e47095123059aec826b8f72d4ec74":"/vendor.76d6aad12c2226bf8ac7.js","f64b7aa6a4d4dfaf77dfbe2405e6270b55fc8795":"/polyfills.76d6aad12c2226bf8ac7.js","5af6a22dcf06fc0bf54306623e34d2221b6dcf35":"/app.76d6aad12c2226bf8ac7.js","92693bc1884c1f2e71bc7538712e5855deddbe96":"/polyfills.76d6aad12c2226bf8ac7.js.gz","83aeeb1f4b55800e770f92b1bd98dc73151f03be":"/app.76d6aad12c2226bf8ac7.js.gz","792a6c4e5d679f6cf7434f00792b440e7e1f60ea":"/vendor.76d6aad12c2226bf8ac7.js.gz","6248ad87a1ba50829d412bb2ceab56acc9e4d107":"/../client/"},"strategy":"changed","responseStrategy":"cache-first","version":"2017-06-18 14:30:54","name":"webpack-offline","pluginVersion":"4.8.1","relativePaths":false};

!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="/",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function WebpackServiceWorker(params,helpers){function cacheAdditional(){if(!assets.additional.length)return Promise.resolve();var operation=void 0;return operation="changed"===strategy?cacheChanged("additional"):cacheAssets("additional"),operation.catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}function cacheAssets(section){var batch=assets[section];return caches.open(CACHE_NAME).then(function(cache){return addAllNormalized(cache,batch,{bust:params.version,request:params.prefetchRequest})}).then(function(){logGroup("Cached assets: "+section,batch)}).catch(function(e){throw console.error(e),e})}function cacheChanged(section){return getLastCache().then(function(args){if(!args)return cacheAssets(section);var lastCache=args[0],lastKeys=args[1],lastData=args[2],lastMap=lastData.hashmap,lastVersion=lastData.version;if(!lastData.hashmap||lastVersion===params.version)return cacheAssets(section);var lastHashedAssets=Object.keys(lastMap).map(function(hash){return lastMap[hash]}),lastUrls=lastKeys.map(function(req){var url=new URL(req.url);return url.search="",url.toString()}),sectionAssets=assets[section],moved=[],changed=sectionAssets.filter(function(url){return lastUrls.indexOf(url)===-1||lastHashedAssets.indexOf(url)===-1});Object.keys(hashesMap).forEach(function(hash){var asset=hashesMap[hash];if(sectionAssets.indexOf(asset)!==-1&&changed.indexOf(asset)===-1&&moved.indexOf(asset)===-1){var lastAsset=lastMap[hash];lastAsset&&lastUrls.indexOf(lastAsset)!==-1?moved.push([lastAsset,asset]):changed.push(asset)}}),logGroup("Changed assets: "+section,changed),logGroup("Moved assets: "+section,moved);var movedResponses=Promise.all(moved.map(function(pair){return lastCache.match(pair[0]).then(function(response){return[pair[1],response]})}));return caches.open(CACHE_NAME).then(function(cache){var move=movedResponses.then(function(responses){return Promise.all(responses.map(function(pair){return cache.put(pair[0],pair[1])}))});return Promise.all([move,addAllNormalized(cache,changed,{bust:params.version,request:params.prefetchRequest})])})})}function deleteObsolete(){return caches.keys().then(function(keys){var all=keys.map(function(key){if(0===key.indexOf(CACHE_PREFIX)&&0!==key.indexOf(CACHE_NAME))return console.log("[SW]:","Delete cache:",key),caches.delete(key)});return Promise.all(all)})}function getLastCache(){return caches.keys().then(function(keys){for(var index=keys.length,key=void 0;index--&&(key=keys[index],0!==key.indexOf(CACHE_PREFIX)););if(key){var cache=void 0;return caches.open(key).then(function(_cache){return cache=_cache,_cache.match(new URL(STORED_DATA_KEY,location).toString())}).then(function(response){if(response)return Promise.all([cache,cache.keys(),response.json()])})}})}function storeCacheData(){return caches.open(CACHE_NAME).then(function(cache){var data=new Response(JSON.stringify({version:params.version,hashmap:hashesMap}));return cache.put(new URL(STORED_DATA_KEY,location).toString(),data)})}function cacheFirstResponse(event,urlString,cacheUrl){return cachesMatch(cacheUrl,CACHE_NAME).then(function(response){if(response)return response;var fetching=fetch(event.request).then(function(response){return response.ok?(cacheUrl===urlString&&!function(){var responseClone=response.clone(),storing=caches.open(CACHE_NAME).then(function(cache){return cache.put(urlString,responseClone)}).then(function(){console.log("[SW]:","Cache asset: "+urlString)});event.waitUntil(storing)}(),response):response});return fetching})}function networkFirstResponse(event,urlString,cacheUrl){return fetch(event.request).then(function(response){if(response.ok)return response;throw new Error("Response is not ok")}).catch(function(){return cachesMatch(cacheUrl,CACHE_NAME)})}function handleNavigateFallback(fetching){return fetching.catch(function(){}).then(function(response){var isOk=response&&response.ok,isRedirect=response&&"opaqueredirect"===response.type;return isOk||isRedirect&&!navigateFallbackForRedirects?response:cachesMatch(navigateFallbackURL,CACHE_NAME)})}function mapAssets(){Object.keys(assets).forEach(function(key){assets[key]=assets[key].map(function(path){var url=new URL(path,location);return externals.indexOf(path)===-1?url.search="":url.hash="",url.toString()})}),Object.keys(loadersMap).forEach(function(key){loadersMap[key]=loadersMap[key].map(function(path){var url=new URL(path,location);return externals.indexOf(path)===-1?url.search="":url.hash="",url.toString()})}),hashesMap=Object.keys(hashesMap).reduce(function(result,hash){var url=new URL(hashesMap[hash],location);return url.search="",result[hash]=url.toString(),result},{}),externals=externals.map(function(path){var url=new URL(path,location);return url.hash="",url.toString()})}function addAllNormalized(cache,requests,options){var allowLoaders=options.allowLoaders!==!1,bustValue=options&&options.bust,requestInit=options.request||{credentials:"omit",mode:"cors"};return Promise.all(requests.map(function(request){return bustValue&&(request=applyCacheBust(request,bustValue)),fetch(request,requestInit).then(fixRedirectedResponse)})).then(function(responses){if(responses.some(function(response){return!response.ok}))return Promise.reject(new Error("Wrong response status"));var extracted=[],addAll=responses.map(function(response,i){return allowLoaders&&extracted.push(extractAssetsWithLoaders(requests[i],response)),cache.put(requests[i],response)});return extracted.length?!function(){var newOptions=copyObject(options);newOptions.allowLoaders=!1;var waitAll=addAll;addAll=Promise.all(extracted).then(function(all){var extractedRequests=[].concat.apply([],all);return requests.length&&(waitAll=waitAll.concat(addAllNormalized(cache,extractedRequests,newOptions))),Promise.all(waitAll)})}():addAll=Promise.all(addAll),addAll})}function extractAssetsWithLoaders(request,response){var all=Object.keys(loadersMap).map(function(key){var loader=loadersMap[key];if(loader.indexOf(request)!==-1&&loaders[key])return loaders[key](response.clone())}).filter(function(a){return!!a});return Promise.all(all).then(function(all){return[].concat.apply([],all)})}function matchCacheMap(request){var urlString=request.url,url=new URL(urlString),requestType=void 0;requestType="navigate"===request.mode?"navigate":url.origin===location.origin?"same-origin":"cross-origin";for(var i=0;i<cacheMaps.length;i++){var map=cacheMaps[i];if(map&&(!map.requestTypes||map.requestTypes.indexOf(requestType)!==-1)){var newString=void 0;if(newString="function"==typeof map.match?map.match(url,request):urlString.replace(map.match,map.to),newString&&newString!==urlString)return newString}}}var loaders=helpers.loaders,cacheMaps=helpers.cacheMaps,strategy=params.strategy,responseStrategy=params.responseStrategy,assets=params.assets,loadersMap=params.loaders||{},hashesMap=params.hashesMap,externals=params.externals,CACHE_PREFIX=params.name,CACHE_TAG=params.version,CACHE_NAME=CACHE_PREFIX+":"+CACHE_TAG,STORED_DATA_KEY="__offline_webpack__data";mapAssets();var allAssets=[].concat(assets.main,assets.additional,assets.optional),navigateFallbackURL=params.navigateFallbackURL,navigateFallbackForRedirects=params.navigateFallbackForRedirects;self.addEventListener("install",function(event){console.log("[SW]:","Install event");var installing=void 0;installing="changed"===strategy?cacheChanged("main"):cacheAssets("main"),event.waitUntil(installing)}),self.addEventListener("activate",function(event){console.log("[SW]:","Activate event");var activation=cacheAdditional();activation=activation.then(storeCacheData),activation=activation.then(deleteObsolete),activation=activation.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),event.waitUntil(activation)}),self.addEventListener("fetch",function(event){var requestUrl=event.request.url,url=new URL(requestUrl),urlString=void 0;externals.indexOf(requestUrl)!==-1?urlString=requestUrl:(url.search="",urlString=url.toString());var isGET="GET"===event.request.method,assetMatches=allAssets.indexOf(urlString)!==-1,cacheUrl=urlString;if(!assetMatches){var cacheRewrite=matchCacheMap(event.request);cacheRewrite&&(cacheUrl=cacheRewrite,assetMatches=!0)}if(!assetMatches&&isGET&&navigateFallbackURL&&isNavigateRequest(event.request))return void event.respondWith(handleNavigateFallback(fetch(event.request)));if(!assetMatches||!isGET)return void(url.origin!==location.origin&&navigator.userAgent.indexOf("Firefox/44.")!==-1&&event.respondWith(fetch(event.request)));var resource=void 0;resource="network-first"===responseStrategy?networkFirstResponse(event,urlString,cacheUrl):cacheFirstResponse(event,urlString,cacheUrl),navigateFallbackURL&&isNavigateRequest(event.request)&&(resource=handleNavigateFallback(resource)),event.respondWith(resource)}),self.addEventListener("message",function(e){var data=e.data;if(data)switch(data.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}function cachesMatch(request,cacheName){return caches.match(request,{cacheName:cacheName}).then(function(response){return isNotRedirectedResponse()?response:fixRedirectedResponse(response).then(function(fixedResponse){return caches.open(cacheName).then(function(cache){return cache.put(request,fixedResponse)}).then(function(){return fixedResponse})})}).catch(function(){})}function applyCacheBust(asset,key){var hasQuery=asset.indexOf("?")!==-1;return asset+(hasQuery?"&":"?")+"__uncache="+encodeURIComponent(key)}function isNavigateRequest(request){return"navigate"===request.mode||request.headers.get("Upgrade-Insecure-Requests")||(request.headers.get("Accept")||"").indexOf("text/html")!==-1}function isNotRedirectedResponse(response){return!response||!response.redirected||!response.ok||"opaqueredirect"===response.type}function fixRedirectedResponse(response){if(isNotRedirectedResponse(response))return Promise.resolve(response);var body="body"in response?Promise.resolve(response.body):response.blob();return body.then(function(data){return new Response(data,{headers:response.headers,status:response.status})})}function copyObject(original){return Object.keys(original).reduce(function(result,key){return result[key]=original[key],result},{})}function logGroup(title,assets){console.groupCollapsed("[SW]:",title),assets.forEach(function(asset){console.log("Asset:",asset)}),console.groupEnd()}!function(){var waitUntil=ExtendableEvent.prototype.waitUntil,respondWith=FetchEvent.prototype.respondWith,promisesMap=new WeakMap;ExtendableEvent.prototype.waitUntil=function(promise){var extendableEvent=this,promises=promisesMap.get(extendableEvent);return promises?void promises.push(Promise.resolve(promise)):(promises=[Promise.resolve(promise)],promisesMap.set(extendableEvent,promises),waitUntil.call(extendableEvent,Promise.resolve().then(function processPromises(){var len=promises.length;return Promise.all(promises.map(function(p){return p.catch(function(){})})).then(function(){return promises.length!=len?processPromises():(promisesMap.delete(extendableEvent),Promise.all(promises))})})))},FetchEvent.prototype.respondWith=function(promise){return this.waitUntil(promise),respondWith.call(this,promise)}}();WebpackServiceWorker(__wpo,{loaders:{},cacheMaps:[]}),module.exports=__webpack_require__(1)},function(module,exports){}]);