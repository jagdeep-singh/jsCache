var jsCache=function(){function e(){for(var e in a)switch(a[e].storageMode){case"memory":delete a[e];break;case"sessionStorage":sessionStorage.getItem(a[e].name)||delete a[e];break;case"localStorage":localStorage.getItem(a[e].name)||delete a[e]}localStorage.setItem(o,JSON.stringify(a))}var t=this.disableCaching;t||(t=!1);var n=console,o="myCacheFactory",r={},a={};a=JSON.parse(localStorage.getItem(o))||{},a&&e();var i=function(e,t){return e in a?void n.info("Provided name to create cache obj is already exist. please try another one"):(a[e]=t,void localStorage.setItem(o,JSON.stringify(a)))},c=function(e){e in a?(delete a[e],localStorage.setItem(o,JSON.stringify(a))):n.info("Provided cache name does not exist in myCacheFactory collection.")},f=function(e){return a=JSON.parse(localStorage.getItem(o))||{},console.log(a),e in a?a[e]:void n.info("Provided cache name does not exist in myCacheFactory collection.")},l=function(e){var t=!0;return e||(n.info("Please provide cache name"),t=!1),t},m=function(e){return e},u={setItem:function(e,t){t&&localStorage.setItem(e,JSON.stringify(t))},getItem:function(e){return JSON.parse(localStorage.getItem(e))},removeItem:function(e){localStorage.removeItem(e)}},g={setItem:function(e,t){t&&sessionStorage.setItem(e,JSON.stringify(t))},getItem:function(e){return JSON.parse(sessionStorage.getItem(e))},removeItem:function(e){sessionStorage.removeItem(e)}},s=function(e){var t;return"localStorage"==e.storageMode?t=u:"sessionStorage"==e.storageMode?t=g:"memory"!=e.storageMode&&null!=e.storageMode||(t={setItem:function(e,t){r[e]=t},getItem:function(e){return e in r?r[e]:null},removeItem:function(e){e in r&&delete r[e]}}),t},d=function(e){e.config.timeoutId&&clearTimeout(e.config.timeoutId);var t=function(e){var t=s(e.config);e=t.getItem(m(e.config.name)),e&&(n.info("maxAge expired"),e.config.timeoutId&&(clearTimeout(e.config.timeoutId),delete e.config.timeoutId),e.config.deleteOnExpire&&O(e.config.name),e.config.removeOnExpire&&(e.cacheObj={}),t.setItem(m(e.config.name),e))};if(e.config.maxAge){n.info("Timeout !! started for cache obj");var o=new Date(e.createdDate).getTime()+parseInt(e.config.maxAge),r=(new Date).getTime();if(r>=o)t(e);else{var a=setTimeout(function(){t(e)},parseInt(e.config.maxAge));e.config.timeoutId=a}}return e},v=function(e,t){var o=e.cacheObj[t];o.config.timeoutId&&clearTimeout(o.config.timeoutId);var r=function(e){var o=s(e.config);if(e=o.getItem(m(e.config.name))){var r=e.cacheObj[t];r&&(n.info("maxAge expired for key - "+t),r.config.timeoutId&&(clearTimeout(r.config.timeoutId),delete r.config.timeoutId),r.config.removeOnExpire&&delete e.cacheObj[t],o.setItem(m(e.config.name),e))}};if(o.config.maxAge){n.info("Timeout !! started for cache key");var a=new Date(o.createdDate).getTime()+parseInt(o.config.maxAge),i=(new Date).getTime();if(i>=a)r(e);else{var c=setTimeout(function(){r(e)},parseInt(o.config.maxAge));o.config.timeoutId=c}}return o},I=function(e,t){var o=l(e);if(!o)return null;t||(t={});var r=s(t);if(!r)return n.error("Invalid value provided to storageMode. only 'memory', 'localStorage' and 'sessionStorage' are allowed"),null;if(null!=r.getItem(m(e)))return n.error("This name already taken "+e),null;if(e in a)return n.error("This name already exist. please try with another"),null;var c={config:{name:e,isAngularHttpCache:t.isAngularHttpCache||!1,disableCache:t.disableCache||!1,maxAge:t.maxAge||null,removeOnExpire:null!=t.removeOnExpire?t.removeOnExpire:!0,deleteOnExpire:t.deleteOnExpire||!1,onExpireCallback:t.onExpireCallback||null,storageMode:t.storageMode||"memory",recycleFrequency:t.recycleFrequency||null},createdDate:new Date,cacheObj:{}};return d(c),r.setItem(m(e),c),i(e,c.config),n.info("Creating cache obj for "+e),h(c)},h=function(e){if(!e)return null;var o=s(e.config),r=e.config.name;return e.put=function(a,i,c){if(c||(c={}),e.config.disableCache||c.disableCache||t)return void n.info("Cache is disabled, can't create cache");if(l(a)){var f=o.getItem(m(r));if(!f)return void n.info("Your cache obj doesn't exist.");f.cacheObj[a]={config:{name:a,disableCache:c.disableCache,maxAge:c.maxAge||e.config.maxAge,removeOnExpire:null!=c.removeOnExpire?c.removeOnExpire:e.config.removeOnExpire,onExpireCallback:c.onExpireCallback||e.config.onExpireCallback,recycleFrequency:c.recycleFrequency||e.config.recycleFrequency},value:i,createdDate:new Date},v(f,a),o.setItem(m(r),f)}},e.get=function(e){var t=o.getItem(m(r));if(t)return e in t.cacheObj?(v(t,e),n.info("fetching data for - ",e),t.cacheObj[e].value):void n.info("No record found for name - ",e)},e.remove=function(e){var t=o.getItem(m(r));e in t.cacheObj?(delete t.cacheObj[e],o.setItem(m(r),t)):n.info("No record found for name - ",e)},e.removeAll=function(){var e=o.getItem(m(r));e.cacheObj={},o.setItem(m(r),e)},e},p=function(e,t){t||(t={}),t.isAngularHttpCache=!0;var o=I(e,t);return o?x(o):void n.error("not able to create http cache obj")},x=function(e){return function(t){return{put:function(n,o){e.put(n,o,t)},get:function(t){return e.get(t)},remove:function(t){e.remove(t)}}}},y=function(e){if(!e)return n.error("please provide key to get value"),null;var t=f(e);if(t){var o=s(t);e=m(e);var r=o.getItem(e);return r?(r=h(r),d(r),t.isAngularHttpCache?x(r):r):void n.info("No record found for name - ",e)}},b=function(e){if(!e)return n.error("please provide key to get info"),null;var t=f(e);if(t){var o=s(t);e=m(e);var r=o.getItem(e);return r?r.config:void n.info("No record found for name - ",e)}},O=function(e){if(!e)return n.error("please provide key to remove"),null;var t=f(e);if(t){var o=s(t);e=m(e),o.removeItem(e),c(e)}},S=function(){for(var e in a)O(e)};return{create:I,createHttpCache:p,get:y,info:b,remove:O,removeAll:S}}();