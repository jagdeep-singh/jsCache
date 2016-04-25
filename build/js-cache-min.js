var jsCache=function(){var e=this.disableCaching;e||(e=!1);var t=console,n="myCacheFactory",o={},r={};if(r=JSON.parse(localStorage.getItem(n))||{})for(var i in r)"memory"==r[i].storageMode&&(delete r[i],localStorage.setItem(n,JSON.stringify(r)));var a=function(e,o){return e in r?void t.info("Provided name to create cache obj is already exist. please try another one"):(r[e]=o,void localStorage.setItem(n,JSON.stringify(r)))},c=function(e){e in r?(delete r[e],localStorage.setItem(n,JSON.stringify(r))):t.info("Provided cache name does not exist in myCacheFactory collection.")},f=function(e){return r=JSON.parse(localStorage.getItem(n))||{},console.log(r),e in r?r[e]:void t.info("Provided cache name does not exist in myCacheFactory collection.")},u=function(e){var n=!0;return e||(t.info("Please provide cache name"),n=!1),n},l=function(e){return e},m={setItem:function(e,t){t&&localStorage.setItem(e,JSON.stringify(t))},getItem:function(e){return JSON.parse(localStorage.getItem(e))},removeItem:function(e){localStorage.removeItem(e)}},g={setItem:function(e,t){t&&sessionStorage.setItem(e,JSON.stringify(t))},getItem:function(e){return JSON.parse(sessionStorage.getItem(e))},removeItem:function(e){sessionStorage.removeItem(e)}},s=function(e){var t;return"localStorage"==e.storageMode?t=m:"sessionStorage"==e.storageMode?t=g:"memory"!=e.storageMode&&null!=e.storageMode||(t={setItem:function(e,t){o[e]=t},getItem:function(e){return e in o?o[e]:null},removeItem:function(e){e in o&&delete o[e]}}),t},d=function(e){e.config.timeoutId&&clearTimeout(e.config.timeoutId);var n=function(e){var n=s(e.config);e=n.getItem(l(e.config.name)),e&&(t.info("maxAge expired"),e.config.timeoutId&&(clearTimeout(e.config.timeoutId),delete e.config.timeoutId),e.config.deleteOnExpire&&b(e.config.name),e.config.removeOnExpire&&(e.cacheObj={}),n.setItem(l(e.config.name),e))};if(e.config.maxAge){t.info("Timeout !! started for cache obj");var o=new Date(e.createdDate).getTime()+parseInt(e.config.maxAge),r=(new Date).getTime();if(r>=o)n(e);else{var i=setTimeout(function(){n(e)},parseInt(e.config.maxAge));e.config.timeoutId=i}}return e},v=function(e,n){var o=e.cacheObj[n];o.config.timeoutId&&clearTimeout(o.config.timeoutId);var r=function(e){var o=s(e.config);if(e=o.getItem(l(e.config.name))){var r=e.cacheObj[n];r&&(t.info("maxAge expired for key - "+n),r.config.timeoutId&&(clearTimeout(r.config.timeoutId),delete r.config.timeoutId),r.config.removeOnExpire&&delete e.cacheObj[n],o.setItem(l(e.config.name),e))}};if(o.config.maxAge){t.info("Timeout !! started for cache key");var i=new Date(o.createdDate).getTime()+parseInt(o.config.maxAge),a=(new Date).getTime();if(a>=i)r(e);else{var c=setTimeout(function(){r(e)},parseInt(o.config.maxAge));o.config.timeoutId=c}}return o},I=function(e,n){var o=u(e);if(!o)return null;n||(n={});var i=s(n);if(!i)return t.error("Invalid value provided to storageMode. only 'memory', 'localStorage' and 'sessionStorage' are allowed"),null;if(null!=i.getItem(l(e)))return t.error("This name already taken "+e),null;if(e in r)return t.error("This name already exist. please try with another"),null;var c={config:{name:e,isAngularHttpCache:n.isAngularHttpCache||!1,disableCache:n.disableCache||!1,maxAge:n.maxAge||null,removeOnExpire:null!=n.removeOnExpire?n.removeOnExpire:!0,deleteOnExpire:n.deleteOnExpire||!1,onExpireCallback:n.onExpireCallback||null,storageMode:n.storageMode||"memory",recycleFrequency:n.recycleFrequency||null},createdDate:new Date,cacheObj:{}};return d(c),i.setItem(l(e),c),a(e,c.config),t.info("Creating cache obj for "+e),h(c)},h=function(n){if(!n)return null;var o=s(n.config),r=n.config.name;return n.put=function(i,a,c){if(c||(c={}),n.config.disableCache||c.disableCache||e)return void t.info("Cache is disabled, can't create cache");if(u(i)){var f=o.getItem(l(r));if(!f)return void t.info("Your cache obj doesn't exist.");f.cacheObj[i]={config:{name:i,disableCache:c.disableCache,maxAge:c.maxAge||n.config.maxAge,removeOnExpire:null!=c.removeOnExpire?c.removeOnExpire:n.config.removeOnExpire,onExpireCallback:c.onExpireCallback||n.config.onExpireCallback,recycleFrequency:c.recycleFrequency||n.config.recycleFrequency},value:a,createdDate:new Date},v(f,i),o.setItem(l(r),f)}},n.get=function(e){var n=o.getItem(l(r));if(n)return e in n.cacheObj?(v(n,e),t.info("fetching data for - ",e),n.cacheObj[e].value):void t.info("No record found for name - ",e)},n.remove=function(e){var n=o.getItem(l(r));e in n.cacheObj?(delete n.cacheObj[e],o.setItem(l(r),n)):t.info("No record found for name - ",e)},n.removeAll=function(){var e=o.getItem(l(r));e.cacheObj={},o.setItem(l(r),e)},n},p=function(e,n){n||(n={}),n.isAngularHttpCache=!0;var o=I(e,n);return o?x(o):void t.error("not able to create http cache obj")},x=function(e){return function(t){return{put:function(n,o){e.put(n,o,t)},get:function(t){return e.get(t)},remove:function(t){e.remove(t)}}}},y=function(e){if(!e)return t.error("please provide key to get value"),null;var n=f(e);if(n){var o=s(n);e=l(e);var r=o.getItem(e);return r?(r=h(r),d(r),n.isAngularHttpCache?x(r):r):void t.info("No record found for name - ",e)}},O=function(e){if(!e)return t.error("please provide key to get info"),null;var n=f(e);if(n){var o=s(n);e=l(e);var r=o.getItem(e);return r?r.config:void t.info("No record found for name - ",e)}},b=function(e){if(!e)return t.error("please provide key to remove"),null;var n=f(e);if(n){var o=s(n);e=l(e),o.removeItem(e),c(e)}},S=function(){for(var e in r)b(e)};return{create:I,createHttpCache:p,get:y,info:O,remove:b,removeAll:S}}();