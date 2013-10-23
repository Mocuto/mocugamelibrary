AudioFX = function () {

    //---------------------------------------------------------------------------

    var VERSION = '0.4.0';

    //---------------------------------------------------------------------------

    var hasAudio = false, audio = document.createElement('audio'), audioSupported = function (type) { var s = audio.canPlayType(type); return (s === 'probably') || (s === 'maybe'); };
    if (audio && audio.canPlayType) {
        hasAudio = {
            ogg: audioSupported('audio/ogg; codecs="vorbis"'),
            mp3: audioSupported('audio/mpeg;'),
            m4a: audioSupported('audio/x-m4a;') || audioSupported('audio/aac;'),
            wav: audioSupported('audio/wav; codecs="1"'),
            loop: (typeof audio.loop === 'boolean') // some browsers (FF) dont support loop yet
        }
    }

    //---------------------------------------------------------------------------

    var create = function (src, options, onload) {

        var audio = document.createElement('audio');

        if (onload) {
            var ready = function () {
                audio.removeEventListener('canplay', ready, false);
                onload();
            }
            audio.addEventListener('canplay', ready, false);
        }

        if (options.loop && !hasAudio.loop)
            audio.addEventListener('ended', function () { audio.currentTime = 0; audio.play(); }, false);

        audio.msAudioCategory = "BackgroundCapableMedia";
        audio.volume = options.volume || 0.1;
        audio.autoplay = options.autoplay;
        audio.loop = options.loop;
        audio.src = src;

        return audio;
    }

    //---------------------------------------------------------------------------

    var choose = function (formats) {
        for (var n = 0 ; n < formats.length ; n++)
            if (hasAudio && hasAudio[formats[n]])
                return formats[n];
    };

    //---------------------------------------------------------------------------

    var find = function (audios) {
        var n, audio;
        for (n = 0 ; n < audios.length ; n++) {
            audio = audios[n];
            if (audio.paused || audio.ended)
                return audio;
        }
    };

    //---------------------------------------------------------------------------

    var afx = function (src, options, onload) {

        options = options || {};

        var formats = options.formats || [],
            format = choose(formats),
            pool = [];

        src = src + (format ? '.' + format : '');

        if (hasAudio) {
            for (var n = 0 ; n < (options.pool || 1) ; n++)
                pool.push(create(src, options, n == 0 ? onload : null));
        }
        else {
            onload();
        }

        return {

            audio: (pool.length == 1 ? pool[0] : pool),

            play: function () {
                var audio = find(pool);
                if (audio) {
                    //audio.currentTime = 0;
                    audio.play();
                }
            },

            stop: function () {
                var n, audio;
                for (n = 0 ; n < pool.length ; n++) {
                    audio = pool[n];
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        };

    };

    //---------------------------------------------------------------------------

    afx.version = VERSION;
    afx.supported = hasAudio;

    return afx;

    //---------------------------------------------------------------------------

}();﻿//KeyLib v1

var Key = {
    _keys: [], LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, BACKSPACE: 8, CAPSLOCK: 20, CONTROL: 17, DELETEKEY: 46,
    END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, TAB: 9, PGDN: 34, PGUP: 33, SPACE: 32, SHIFT: 16
};

Key.onKeyDown = function () { };
Key.onKeyUp = function () { };

Key.isDown = function (key) {
    return this._keys[key];
};

Key.addListener = function (o) {
    if (typeof o.onKeyDown == "function") document.addEventListener("keydown", o.onKeyDown, false);
    if (typeof o.onKeyUp == "function") document.addEventListener("keyup", o.onKeyUp, false);
};

Key.removeListener = function (o) {
    if (typeof o.onKeyDown == "function") document.removeEventListener("keydown", o.onKeyDown, false);
    if (typeof o.onKeyUp == "function") document.removeEventListener("keyup", o.onKeyUp, false);
};

Key.init = function () {
    if (!document.addEventListener && document.attachEvent) {
        document.addEventListener = function (t, f) {
            document.attachEvent("on" + t, f);
        };
        document.removeEventListener = function (t, f) {
            document.detachEvent("on" + t, f);
        };
    }
    document.onkeydown = function (e) {
        e = e ? e : event;
        Key._keys[e.keyCode] = true;
        Key.onKeyDown(e);
    };
    document.onkeyup = function (e) {
        e = e ? e : event;
        Key._keys[e.keyCode] = false;
        Key.onKeyUp(e);
    };
    for (var num = 0; num < 256; num++) {
        this._keys[num] = false;
    }
};

Key.init();﻿/**
* PreloadJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
**/(function(){var c=this.createjs=this.createjs||{},c=c.PreloadJS=c.PreloadJS||{};c.version="0.3.0";c.buildDate="Tue, 12 Feb 2013 21:12:02 GMT"})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},a=c.prototype;c.initialize=function(d){d.addEventListener=a.addEventListener;d.removeEventListener=a.removeEventListener;d.removeAllEventListeners=a.removeAllEventListeners;d.hasEventListener=a.hasEventListener;d.dispatchEvent=a.dispatchEvent};a._listeners=null;a.initialize=function(){};a.addEventListener=function(a,b){var g=this._listeners;g?this.removeEventListener(a,b):g=this._listeners={};var f=g[a];f||(f=g[a]=[]);f.push(b);return b};a.removeEventListener=
function(a,b){var g=this._listeners;if(g){var f=g[a];if(f)for(var e=0,c=f.length;e<c;e++)if(f[e]==b){c==1?delete g[a]:f.splice(e,1);break}}};a.removeAllEventListeners=function(a){a?this._listeners&&delete this._listeners[a]:this._listeners=null};a.dispatchEvent=function(a,b){var g=false,f=this._listeners;if(a&&f){typeof a=="string"&&(a={type:a});a.target=b||this;f=f[a.type];if(!f)return g;for(var f=f.slice(),e=0,c=f.length;e<c;e++){var h=f[e];h instanceof Function?g=g||h.apply(null,[a]):h.handleEvent&&
(g=g||h.handleEvent(a))}}return!!g};a.hasEventListener=function(a){var b=this._listeners;return!(!b||!b[a])};a.toString=function(){return"[EventDispatcher]"};createjs.EventDispatcher=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.init()};c.prototype={};var a=c.prototype;c.FILE_PATTERN=/(\w+:\/{2})?((?:\w+\.){2}\w+)?(\/?[\S]+\/|\/)?([\w\-%\.]+)(?:\.)(\w+)?(\?\S+)?/i;a.loaded=false;a.canceled=false;a.progress=0;a._item=null;a.onProgress=null;a.onLoadStart=null;a.onComplete=null;a.onError=null;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a.getItem=function(){return this._item};
a.init=function(){};a.load=function(){};a.close=function(){};a._sendLoadStart=function(){this._isCanceled()||(this.onLoadStart&&this.onLoadStart({target:this}),this.dispatchEvent("loadStart"))};a._sendProgress=function(a){if(!this._isCanceled()){var b=null;if(typeof a=="number")this.progress=a,b={loaded:this.progress,total:1};else if(b=a,this.progress=a.loaded/a.total,isNaN(this.progress)||this.progress==Infinity)this.progress=0;b.target=this;b.type="progress";this.onProgress&&this.onProgress(b);
this.dispatchEvent(b)}};a._sendComplete=function(){this._isCanceled()||(this.onComplete&&this.onComplete({target:this}),this.dispatchEvent("complete"))};a._sendError=function(a){if(!this._isCanceled())a==null&&(a={}),a.target=this,a.type="error",this.onError&&this.onError(a),this.dispatchEvent(a)};a._isCanceled=function(){return window.createjs==null||this.canceled?true:false};a._parseURI=function(a){return!a?null:a.match(c.FILE_PATTERN)};a.toString=function(){return"[PreloadJS AbstractLoader]"};
createjs.AbstractLoader=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.init(b)},a=c.prototype=new createjs.AbstractLoader;c.LOAD_TIMEOUT=8E3;c.BINARY="binary";c.CSS="css";c.IMAGE="image";c.JAVASCRIPT="javascript";c.JSON="json";c.SOUND="sound";c.SVG="svg";c.TEXT="text";c.XML="xml";a.useXHR=true;a.stopOnError=false;a.maintainScriptOrder=true;a.next=null;a.onFileLoad=null;a.onFileProgress=null;a._typeCallbacks=null;a._extensionCallbacks=null;a._loadStartWasDispatched=false;a._maxConnections=1;a._currentlyLoadingScript=null;a._currentLoads=
null;a._loadQueue=null;a._loadQueueBackup=null;a._loadItemsById=null;a._loadItemsBySrc=null;a._loadedResults=null;a._loadedRawResults=null;a._numItems=0;a._numItemsLoaded=0;a._scriptOrder=null;a._loadedScripts=null;a.init=function(b){this._numItems=this._numItemsLoaded=0;this._loadStartWasDispatched=this._paused=false;this._currentLoads=[];this._loadQueue=[];this._loadQueueBackup=[];this._scriptOrder=[];this._loadedScripts=[];this._loadItemsById={};this._loadItemsBySrc={};this._loadedResults={};this._loadedRawResults=
{};this._typeCallbacks={};this._extensionCallbacks={};this.setUseXHR(b)};a.setUseXHR=function(b){return this.useXHR=b!=false&&window.XMLHttpRequest!=null};a.removeAll=function(){this.remove()};a.remove=function(b){var a=null;b&&!(b instanceof Array)?a=[b]:b&&(a=b);b=false;if(a){for(;a.length;){for(var d=a.pop(),e=this.getResult(d),c=this._loadQueue.length-1;c>=0;c--)if(h=this._loadQueue[c].getItem(),h.id==d||h.src==d){this._loadQueue.splice(c,1)[0].cancel();break}for(c=this._loadQueueBackup.length-
1;c>=0;c--)if(h=this._loadQueueBackup[c].getItem(),h.id==d||h.src==d){this._loadQueueBackup.splice(c,1)[0].cancel();break}if(e)delete this._loadItemsById[e.id],delete this._loadItemsBySrc[e.src],this._disposeItem(e);else for(var c=this._currentLoads.length-1;c>=0;c--){var h=this._currentLoads[c].getItem();if(h.id==d||h.src==d){this._currentLoads.splice(c,1)[0].cancel();b=true;break}}}b&&this._loadNext()}else{this.close();for(d in this._loadItemsById)this._disposeItem(this._loadItemsById[d]);this.initialize(this.useXHR)}};
a.reset=function(){this.close();for(var b in this._loadItemsById)this._disposeItem(this._loadItemsById[b]);b=[];for(i=0,l=this._loadQueueBackup.length;i<l;i++)b.push(this._loadQueueBackup[i].getItem());this.loadManifest(b,false)};c.isBinary=function(b){switch(b){case createjs.LoadQueue.IMAGE:case createjs.LoadQueue.BINARY:return true;default:return false}};a.installPlugin=function(b){if(!(b==null||b.getPreloadHandlers==null)){b=b.getPreloadHandlers();if(b.types!=null)for(var a=0,d=b.types.length;a<
d;a++)this._typeCallbacks[b.types[a]]=b.callback;if(b.extensions!=null)for(a=0,d=b.extensions.length;a<d;a++)this._extensionCallbacks[b.extensions[a]]=b.callback}};a.setMaxConnections=function(b){this._maxConnections=b;this._paused||this._loadNext()};a.loadFile=function(b,a){b==null?this._sendError({text:"PRELOAD_NO_FILE"}):(this._addItem(b),a!==false&&this.setPaused(false))};a.loadManifest=function(b,a){var d=null;if(b instanceof Array){if(b.length==0){this._sendError({text:"PRELOAD_MANIFEST_EMPTY"});
return}d=b}else{if(b==null){this._sendError({text:"PRELOAD_MANIFEST_NULL"});return}d=[b]}for(var c=0,o=d.length;c<o;c++)this._addItem(d[c]);a!==false&&this.setPaused(false)};a.load=function(){this.setPaused(false)};a.getItem=function(b){return this._loadItemsById[b]||this._loadItemsBySrc[b]};a.getResult=function(b,a){var d=this._loadItemsById[b]||this._loadItemsBySrc[b];if(d==null)return null;d=d.id;return a&&this._loadedRawResults[d]?this._loadedRawResults[d]:this._loadedResults[d]};a.setPaused=
function(b){(this._paused=b)||this._loadNext()};a.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0;this._loadedScripts.length=0;this.loadStartWasDispatched=false};a._addItem=function(b){b=this._createLoadItem(b);if(b!=null){var a=this._createLoader(b);a!=null&&(this._loadQueue.push(a),this._loadQueueBackup.push(a),this._numItems++,this._updateProgress(),this.maintainScriptOrder&&b.type==createjs.LoadQueue.JAVASCRIPT&&a instanceof createjs.XHRLoader&&
(this._scriptOrder.push(b),this._loadedScripts.push(null)))}};a._createLoadItem=function(b){var a=null;switch(typeof b){case "string":a={src:b};break;case "object":a=window.HTMLAudioElement&&b instanceof HTMLAudioElement?{tag:b,src:a.tag.src,type:createjs.LoadQueue.SOUND}:b}b=this._parseURI(a.src);if(b!=null)a.ext=b[5];if(a.type==null)a.type=this._getTypeByExtension(a.ext);if(a.tag==null)a.tag=this._createTag(a.type);if(a.id==null||a.id=="")a.id=a.src;if(b=this._typeCallbacks[a.type]||this._extensionCallbacks[a.ext]){b=
b(a.src,a.type,a.id,a.data);if(b===false)return null;else if(b!==true){if(b.src!=null)a.src=b.src;if(b.id!=null)a.id=b.id;if(b.tag!=null&&b.tag.load instanceof Function)a.tag=b.tag;if(b.completeHandler!=null)a.completeHandler=b.completeHandler}if(b.type)a.type=b.type;b=this._parseURI(a.src);if(b!=null)a.ext=b[5]}this._loadItemsById[a.id]=a;return this._loadItemsBySrc[a.src]=a};a._createLoader=function(a){var d=this.useXHR;switch(a.type){case createjs.LoadQueue.JSON:case createjs.LoadQueue.XML:case createjs.LoadQueue.TEXT:d=
true;break;case createjs.LoadQueue.SOUND:d=false}return d?new createjs.XHRLoader(a):new createjs.TagLoader(a)};a._loadNext=function(){if(!this._paused){if(!this._loadStartWasDispatched)this._sendLoadStart(),this._loadStartWasDispatched=true;if(this._numItems==this._numItemsLoaded)this.loaded=true,this._sendComplete(),this.next&&this.next.load&&this.next.load();for(var a=0,d=this._loadQueue.length;a<d;a++){if(this._currentLoads.length>=this._maxConnections)break;var c=this._loadQueue[a];if(this.maintainScriptOrder&&
c instanceof createjs.TagLoader&&c.getItem().type==createjs.LoadQueue.JAVASCRIPT){if(this._currentlyLoadingScript)continue;this._currentlyLoadingScript=true}this._loadQueue.splice(a,1);this._loadItem(c);a--;d--}}};a._loadItem=function(a){a.addEventListener("progress",createjs.proxy(this._handleProgress,this));a.addEventListener("complete",createjs.proxy(this._handleFileComplete,this));a.addEventListener("error",createjs.proxy(this._handleFileError,this));this._currentLoads.push(a);a.load()};a._handleFileError=
function(a){var d=a.target;this._numItemsLoaded++;this._updateProgress();a={item:d.getItem()};this._sendError(a);this.stopOnError||(this._removeLoadItem(d),this._loadNext())};a._handleFileComplete=function(a){var a=a.target,d=a.getItem();this._loadedResults[d.id]=a.getResult();a instanceof createjs.XHRLoader&&(this._loadedRawResults[d.id]=a.getResult(true));this._removeLoadItem(a);if(this.maintainScriptOrder&&d.type==createjs.LoadQueue.JAVASCRIPT)if(a instanceof createjs.TagLoader)this._currentlyLoadingScript=
false;else{this._loadedScripts[this._scriptOrder.indexOf(d)]=d;this._checkScriptLoadOrder(a);return}this._processFinishedLoad(d)};a._processFinishedLoad=function(a){this._numItemsLoaded++;this._updateProgress();this._sendFileComplete(a);this._loadNext()};a._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,d=0;d<a;d++){var c=this._loadedScripts[d];if(c===null)break;c!==true&&(this._processFinishedLoad(c),this._loadedScripts[d]=true,d--,a--)}};a._removeLoadItem=function(a){for(var d=
this._currentLoads.length,c=0;c<d;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}};a._handleProgress=function(a){a=a.target;this._sendFileProgress(a.getItem(),a.progress);this._updateProgress()};a._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,d=this._numItems-this._numItemsLoaded;if(d>0){for(var c=0,e=0,o=this._currentLoads.length;e<o;e++)c+=this._currentLoads[e].progress;a+=c/d*(d/this._numItems)}this._sendProgress(a)};a._disposeItem=function(a){delete this._loadedResults[a.id];
delete this._loadedRawResults[a.id];delete this._loadItemsById[a.id];delete this._loadItemsBySrc[a.src]};a._createTag=function(a){var d=null;switch(a){case createjs.LoadQueue.IMAGE:return document.createElement("img");case createjs.LoadQueue.SOUND:return d=document.createElement("audio"),d.autoplay=false,d;case createjs.LoadQueue.JAVASCRIPT:return d=document.createElement("script"),d.type="text/javascript",d;case createjs.LoadQueue.CSS:return d=this.useXHR?document.createElement("style"):document.createElement("link"),
d.rel="stylesheet",d.type="text/css",d;case createjs.LoadQueue.SVG:return this.useXHR?d=document.createElement("svg"):(d=document.createElement("object"),d.type="image/svg+xml"),d}return null};a._getTypeByExtension=function(a){switch(a){case "jpeg":case "jpg":case "gif":case "png":case "webp":case "bmp":return createjs.LoadQueue.IMAGE;case "ogg":case "mp3":case "wav":return createjs.LoadQueue.SOUND;case "json":return createjs.LoadQueue.JSON;case "xml":return createjs.LoadQueue.XML;case "css":return createjs.LoadQueue.CSS;
case "js":return createjs.LoadQueue.JAVASCRIPT;case "svg":return createjs.LoadQueue.SVG;default:return createjs.LoadQueue.TEXT}};a._sendFileProgress=function(a,d){if(this._isCanceled())this._cleanUp();else{var c={target:this,type:"fileprogress",progress:d,loaded:d,total:1,item:a};this.onFileProgress&&this.onFileProgress(c);this.dispatchEvent(c)}};a._sendFileComplete=function(a){if(!this._isCanceled()){var d={target:this,type:"fileload",item:a,result:this._loadedResults[a.id],rawResult:this._loadedRawResults[a.id]};
a.completeHandler&&a.completeHandler(d);this.onFileLoad&&this.onFileLoad(d);this.dispatchEvent(d)}};a.toString=function(){return"[PreloadJS LoadQueue]"};createjs.proxy=function(a,d){return function(){return a.apply(d,arguments)}};createjs.LoadQueue=c;if(!createjs.proxy)createjs.proxy=function(a,d){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(d,Array.prototype.slice.call(arguments,0).concat(c))}};var d=function(){};d.init=function(){var a=navigator.userAgent;d.isFirefox=
a.indexOf("Firefox")>-1;d.isOpera=window.opera!=null;d.isChrome=a.indexOf("Chrome")>-1;d.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1};d.init();createjs.LoadQueue.BrowserDetect=d;if(!Array.prototype.indexOf)Array.prototype.indexOf=function(a){if(this==null)throw new TypeError;var d=Object(this),c=d.length>>>0;if(c===0)return-1;var e=0;arguments.length>1&&(e=Number(arguments[1]),e!=e?e=0:e!=0&&e!=Infinity&&e!=-Infinity&&(e=(e>0||-1)*Math.floor(Math.abs(e))));if(e>=c)return-1;
for(e=e>=0?e:Math.max(c-Math.abs(e),0);e<c;e++)if(e in d&&d[e]===a)return e;return-1}})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;a._loadTimeout=null;a._tagCompleteProxy=null;a._isAudio=false;a._tag=null;a.init=function(a){this._item=a;this._tag=a.tag;this._isAudio=window.HTMLAudioElement&&a.tag instanceof HTMLAudioElement;this._tagCompleteProxy=createjs.proxy(this._handleLoad,this)};a.getResult=function(){return this._tag};a.cancel=function(){this.canceled=true;this._clean();this.getItem()};a.load=function(){var a=this._item,b=this._tag;clearTimeout(this._loadTimeout);
this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT);if(this._isAudio)b.src=null,b.preload="auto";b.onerror=createjs.proxy(this._handleError,this);this._isAudio?(b.onstalled=createjs.proxy(this._handleStalled,this),b.addEventListener("canplaythrough",this._tagCompleteProxy,false)):(b.onload=createjs.proxy(this._handleLoad,this),b.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this));switch(a.type){case createjs.LoadQueue.CSS:b.href=
a.src;break;case createjs.LoadQueue.SVG:b.data=a.src;break;default:b.src=a.src}if(a.type==createjs.LoadQueue.SVG||a.type==createjs.LoadQueue.JAVASCRIPT||a.type==createjs.LoadQueue.CSS)(document.body||document.getElementsByTagName("body")[0]).appendChild(b);b.load!=null&&b.load()};a._handleTimeout=function(){this._clean();this._sendError({reason:"PRELOAD_TIMEOUT"})};a._handleStalled=function(){};a._handleError=function(){this._clean();this._sendError()};a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);
this.getItem().tag.readyState=="loaded"&&this._handleLoad()};a._handleLoad=function(){if(!this._isCanceled()){var a=this.getItem(),b=a.tag;if(!(this.loaded||this.isAudio&&b.readyState!==4))this.loaded=true,a.type==createjs.LoadQueue.SVG&&(document.body||document.getElementsByTagName("body")[0]).removeChild(b),this._clean(),this._sendComplete()}};a._clean=function(){clearTimeout(this._loadTimeout);var a=this.getItem().tag;a.onload=null;a.removeEventListener&&a.removeEventListener("canplaythrough",
this._tagCompleteProxy,false);a.onstalled=null;a.onprogress=null;a.onerror=null;a.parentNode&&a.parentNode.removeChild(a)};a.toString=function(){return"[PreloadJS TagLoader]"};createjs.TagLoader=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;a._request=null;a._loadTimeout=null;a._xhrLevel=1;a._response=null;a._rawResponse=null;a.init=function(a){this._item=a;this._createXHR(a)};a.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response};a.cancel=function(){this.canceled=true;this._clean();this._request.abort()};a.load=function(){if(this._request==null)this._handleError();else{this._request.onloadstart=createjs.proxy(this._handleLoadStart,
this);this._request.onprogress=createjs.proxy(this._handleProgress,this);this._request.onabort=createjs.proxy(this._handleAbort,this);this._request.onerror=createjs.proxy(this._handleError,this);this._request.ontimeout=createjs.proxy(this._handleTimeout,this);if(this._xhrLevel==1)this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT);this._request.onload=createjs.proxy(this._handleLoad,this);if(this._request.onreadystatechange)this._request.onreadystatechange=
this._handleReadyStateChange(this);try{this._request.send()}catch(a){this._sendError({source:a})}}};a._handleProgress=function(a){a.loaded>0&&a.total==0||this._sendProgress({loaded:a.loaded,total:a.total})};a._handleLoadStart=function(){clearTimeout(this._loadTimeout);this._sendLoadStart()};a._handleAbort=function(){this._clean();this._sendError()};a._handleError=function(){this._clean();this._sendError()};a._handleReadyStateChange=function(){this._request.readyState==4&&this._handleLoad()};a._handleLoad=
function(){if(!this.loaded)this.loaded=true,this._checkError()?(this._response=this._getResponse(),this._clean(),this._generateTag()&&this._sendComplete()):this._handleError()};a._handleTimeout=function(){this._clean();this._sendError({reason:"PRELOAD_TIMEOUT"})};a._checkError=function(){switch(parseInt(this._request.status)){case 404:case 0:return false}return true};a._getResponse=function(){if(this._response!=null)return this._response;if(this._request.response!=null)return this._request.response;
try{if(this._request.responseText!=null)return this._request.responseText}catch(a){}try{if(this._request.responseXML!=null)return this._request.responseXML}catch(b){}return null};a._createXHR=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;b=b.hostname!=""&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);c=null;if(b&&window.XDomainRequest)c=new XDomainRequest;else if(window.XMLHttpRequest)c=new XMLHttpRequest;else try{c=
new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(f){try{c=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){try{c=new ActiveXObject("Msxml2.XMLHTTP")}catch(o){return false}}}a.type==createjs.LoadQueue.TEXT&&c.overrideMimeType&&c.overrideMimeType("text/plain; charset=x-user-defined");this._xhrLevel=typeof c.responseType==="string"?2:1;c.open("GET",a.src,true);b&&c instanceof XMLHttpRequest&&this._xhrLevel==1&&c.setRequestHeader("Origin",location.origin);if(createjs.LoadQueue.isBinary(a.type))c.responseType=
"arraybuffer";this._request=c;return true};a._clean=function(){clearTimeout(this._loadTimeout);var a=this._request;a.onloadstart=null;a.onprogress=null;a.onabort=null;a.onerror=null;a.onload=null;a.ontimeout=null;a.onloadend=null;a.onreadystatechange=null};a._generateTag=function(){var a=this._item.tag;switch(this._item.type){case createjs.LoadQueue.IMAGE:return a.onload=createjs.proxy(this._handleTagReady,this),a.src=this._item.src,this._rawResponse=this._response,this._response=a,false;case createjs.LoadQueue.JAVASCRIPT:a=
document.createElement("script");this._rawResponse=a.text=this._response;this._response=a;break;case createjs.LoadQueue.CSS:document.getElementsByTagName("head")[0].appendChild(a);if(a.styleSheet)a.styleSheet.cssText=this._response;else{var b=document.createTextNode(this._response);a.appendChild(b)}this._rawResponse=this._response;this._response=a;break;case createjs.LoadQueue.XML:this._response=b=this._parseXML(this._response,"text/xml");break;case createjs.LoadQueue.SVG:b=this._parseXML(this._response,
"image/svg+xml");this._rawResponse=this._response;a.appendChild(b.documentElement);this._response=a;break;case createjs.LoadQueue.JSON:a={};try{a=JSON.parse(this._response)}catch(c){a=null}this._rawResponse=this._response;this._response=a}return true};a._parseXML=function(a,b){var c=null;window.DOMParser?c=(new DOMParser).parseFromString(a,b):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async=false,c.loadXML(a));return c};a._handleTagReady=function(){this._sendComplete()};a.toString=function(){return"[PreloadJS XHRLoader]"};
createjs.XHRLoader=c})();typeof JSON!=="object"&&(JSON={});
(function(){function c(a){return a<10?"0"+a:a}function a(a){g.lastIndex=0;return g.test(a)?'"'+a.replace(g,function(a){var b=o[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function d(b,c){var g,n,m,p,q=f,k,j=c[b];j&&typeof j==="object"&&typeof j.toJSON==="function"&&(j=j.toJSON(b));typeof h==="function"&&(j=h.call(c,b,j));switch(typeof j){case "string":return a(j);case "number":return isFinite(j)?String(j):"null";case "boolean":case "null":return String(j);
case "object":if(!j)return"null";f+=e;k=[];if(Object.prototype.toString.apply(j)==="[object Array]"){p=j.length;for(g=0;g<p;g+=1)k[g]=d(g,j)||"null";m=k.length===0?"[]":f?"[\n"+f+k.join(",\n"+f)+"\n"+q+"]":"["+k.join(",")+"]";f=q;return m}if(h&&typeof h==="object"){p=h.length;for(g=0;g<p;g+=1)typeof h[g]==="string"&&(n=h[g],(m=d(n,j))&&k.push(a(n)+(f?": ":":")+m))}else for(n in j)Object.prototype.hasOwnProperty.call(j,n)&&(m=d(n,j))&&k.push(a(n)+(f?": ":":")+m);m=k.length===0?"{}":f?"{\n"+f+k.join(",\n"+
f)+"\n"+q+"}":"{"+k.join(",")+"}";f=q;return m}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+c(this.getUTCMonth()+1)+"-"+c(this.getUTCDate())+"T"+c(this.getUTCHours())+":"+c(this.getUTCMinutes())+":"+c(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var b=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,f,e,o={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},h;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,b,c){var g;e=f="";if(typeof c==="number")for(g=0;g<c;g+=1)e+=" ";else typeof c==="string"&&(e=c);if((h=b)&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number"))throw Error("JSON.stringify");return d("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,c){function d(a,b){var e,g,f=a[b];if(f&&typeof f==="object")for(e in f)Object.prototype.hasOwnProperty.call(f,e)&&(g=d(f,e),g!==void 0?f[e]=g:delete f[e]);return c.call(a,b,f)}var e,a=String(a);b.lastIndex=0;b.test(a)&&(a=a.replace(b,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),typeof c==="function"?d({"":e},""):e;throw new SyntaxError("JSON.parse");}})();
﻿/*
    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
*/

MocuGame = {};
MocuGame.preload = new createjs.LoadQueue();
MocuGame.LEFT = "LEFT";
MocuGame.RIGHT = "RIGHT";
MocuGame.TOP = "TOP";
MocuGame.BOTTOM = "BOTTOM";﻿/*
    point.js

    Object with an x and y component. Also contains helper functions.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
 
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Point constructor. Initializes the object with its x and y coordinate.

        Parameters:
        a (Number)
        - The x coordinate.
        b (Number)
        - The y coordinate.
    */
    MocuGame.Point = function (a, b) {
        this.x = a;
        if (typeof b === 'undefined')
            b = a;
        this.y = b;
    };

    /*
        setPolar is a function which sets the x and y coordinates of the Point based off a given
        magnitude and direction.

        Parameters:
        mag (Number)
        - Magnitude of the vector.
        direction (Number)
        - Direction of the vector in degrees.
    */

    MocuGame.Point.prototype.setPolar = function (mag, dir) {
        this.x = Math.cos((dir*Math.PI)/180) * mag;
        this.y = Math.sin((dir*Math.PI)/180) * mag;
    };

    /*
        getPolar is a function which returns an array containing the magnitude and direction of
        the point if it were to be a vector.

        Returns:
        (Array) Index 0: Magnitude of vector; Index 1: Direction of vector.
    */

    MocuGame.Point.prototype.getPolar = function () {
        return new Array(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), (Math.atan(this.y / this.x) )*Math.PI/180);
    };
})();﻿/*
    pointer.js

    Object which stores a pointer (Mouse, Pen, Touch) event and related information.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
 
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Pointer constructor. Initializes the Pointer with its event and its down state.

        Parameters:
        e (Object)
        - The pointer's event.
        down (Boolean)
        - True if the pointer is down.
    */

    MocuGame.Pointer = function (e, down) {
        this.event = event;
        this.ID = e.pointerId;
        this.position = new MocuGame.Point(e.clientX / MocuGame.uniscale, e.clientY / MocuGame.uniscale);
        this.button = e.button;
        this.lastpos = null;
        this.isDown = down;
    };

    /*
        updatePosition is a function which updates the position of the Pointer.

        Parameters:
        e (Object)
        - The pointer's event.
        down (Boolean)
        - True if the pointer is down
    */

    MocuGame.Pointer.prototype.updatePosition = function (e, down) {
        this.lastPosition = new MocuGame.Point(this.position.x, this.position.y);
        this.position = new MocuGame.Point(e.clientX / MocuGame.uniscale, e.clientY / MocuGame.uniscale);
        this.isDown = down;
    };
})();﻿/*
    event.js
    Component of the Timeline System. Transitions a set variable from a start value to an end value
    over a given duration.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
    
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        Event constructor. Initializes the Event object with its reference object, the variable name,
        starting value, ending value, duration, and interpolation method.

        Paramaters:
        object (MocuObject)
        - Object containing the variable that is transitioned.
        variableName (String)
        - Name of the variable that is to be transitioned.
        startValue 
        - The value that the variable will start at.
        endValue
        - The value that the variable will end at.
        time (Number)
        - The duration in frames the transition will take.
        interp (String)
        - The method used to interpolate between values.
    */

    MocuGame.Event = function (object, variableName, startValue, endValue, time, interp) {
        variableName = (typeof variableName == 'undefined' || typeof variableName == null) ? "empty" : variableName;
        startValue = (typeof startValue == 'undefined' || typeof startValue == null) ? 1 : startValue;
        endValue = (typeof endValue == 'undefined' || typeof endValue == null) ? 1 : endValue;
        time = (typeof time == 'undefined' || typeof time == null) ? 1 : time;
        interp = (typeof interp == 'undefined' || typeof interp == null) ? "linear" : interp;

        this.object = object;

        this.originalVariableName = variableName;
        var splitarray = variableName.split(".");
        if (splitarray.length > 1) {
            var index = 0;
            do {
                this.object = this.object[splitarray[index]];
                this.variableName = splitarray[index + 1];
                index++;
            } while (index < splitarray.length - 1);
        }
        else {
            this.variableName = variableName;
        }

        this.actualStartValue = startValue;
        this.startValue = (startValue == "current") ? this.object[this.variableName] : startValue;
        this.endValue = endValue;

        if (typeof this.endValue != "number") {
            this.type = "nonnumerical";
        }
        else
            this.type = "numerical";

        this.elapsed = false;

        this.operationTime = time;

        this.interp = interp;

        this.currentTime = 0;
        this.startTime = 0;

        this.rate = (this.endValue - this.startValue) / time;

        this.lastValue = null;
        this.isStarted = false;
    };
    /*
        start is a function with assignsthe startValue based off of whether actualStartValue is equal to
        "current" or a variable.
    */
    MocuGame.Event.prototype.start = function () {
        this.startValue = (this.actualStartValue == "current") ? this.object[this.variableName] : this.actualStartValue;
    };

    /*
        update is a function which updates the variable's value based on the currentTime. If the
        currentTime surpasses the operationTime, the variable's value is automatically set to the
        specified endValue and the event is considered complete.

        Parameters:
        currentTime (Number)
        - The current time of operation in reference to the start value.
        deltaT (Number)
        - The amount of time in frames since the last update call.
    */

    MocuGame.Event.prototype.update = function (currentTime, deltaT) {
        if (!this.elapsed) {
            switch (this.interp) {
                case "linear":
                    this.rate = (this.endValue - this.startValue) / this.operationTime;
                    break;
                case "cubic":
                    this.rate = 3 * Math.pow(this.currentTime, 2) * ((this.endValue - this.startValue) / Math.pow(this.operationTime, 3));
                    break;
                case "log":
                    this.rate = 3 * Math.pow(this.operationTime - this.currentTime, 2) * ((this.endValue - this.startValue) / Math.pow(this.operationTime, 3));
                    break;
            }
            if (!this.isStarted) {
                this.start();
                this.object[this.variableName] = this.startValue;
                this.isStarted = true;
            }
            if (this.type == "numerical") {
                if (this.lastValue != null)
                    this.object[this.variableName] = this.lastValue;
                this.object[this.variableName] += this.rate * deltaT;
                this.lastValue = this.object[this.variableName];
                
            }
            this.currentTime += 1 * deltaT;
            if (this.currentTime >= this.operationTime) {
                if (!this.elapsed) {
                    this.object[this.variableName] = this.endValue;
                }
                this.elapsed = true;
            }
        }
        else {
            
        }
    };
})();﻿/*
    action.js
    Component of the Timeline System. Calls a specific function when updated.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
    
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Action constructor. Sets the Action object's callback and "this" argument of the object.

        Parameters:
        callback (Function)
        - The function to be called.
        obj (Object)
        - The "this" argument to be used with the "callback" function.
    */
    MocuGame.Action = function (callback, obj) {
        this.callback = callback;
        this.obj = obj;
        this.elapsed = false;
        this.lastValue = null;
        this.started = false;
        this.current_time = 0;
    }

    /*
        start is a function which calls the Action's callback, with "obj" as the "this" argument.
    */

    MocuGame.Action.prototype.start = function () {
        this.callback.call(this.obj);
        this.started = true;
    }

    /*
        update is a function which calls the start function if it has not been already.

        Parameters:
        currentTime (Number)
        - Unused (currently).
        deltaT (Number)
        - Unused (currently).
    */

    MocuGame.Action.prototype.update = function (currentTime, deltaT) {
        if (!this.started)
            this.start();
    }
})();﻿/*
    timeslot.js

    Object that store Events. Handles the animation of values.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
 
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        TimeSlot constructor. Initializes the slot with the time it should begin updating its Events.

        Parameters:
        time (Number)
        - The time it should begin updating its events.
    */

    MocuGame.TimeSlot = function (time) {
        this.events = new Array();
        this.time = time;
        this.nextTimeSlot = null;
        this.finished = false;
    }

    /*
        isFinished is a function which returns whether all of the events within the slot have reached their endValue.

        Returns
        Boolean - Whether all events within the slot have reached their endValue.
    */

    MocuGame.TimeSlot.prototype.isFinished = function () {
        var finished = true;
        for (var i = 0; i < this.events.length; i++) {
            if (!this.events[i].elapsed) {
                finished = false;
                break;
            }
        }
        return finished;
    };

    /*
        update is a function which updates all of the events in the slot.

        Parameters:
        currentTime (Number)
        - The current time that the parent timeline is at.
        deltaT (Number)
        - The time elapsed since the last update call.
    */

    MocuGame.TimeSlot.prototype.update = function (currentTime, deltaT) {
         for (var i = 0; i < this.events.length; i += 1) {
            if (currentTime >= this.time) {
            
                this.events[i].update(currentTime, deltaT);
            }
            else  {
                this.events[i].elapsed = false;
                this.events[i].lastValue = null;
                this.events[i].started = false;
                this.events[i].currentTime = 0;
            }
        }
    };

    /*
        restart is a function which restarts all of the events in the slot.
    */

    MocuGame.TimeSlot.prototype.restart = function () {
        for (var i = 0; i < this.events.length; i += 1) {
            this.events[i].elapsed = false;
            this.events[i].lastValue = null;
            this.events[i].started = false;
            this.events[i].currentTime = 0;
        }
    };

    /*
        addEvent is a function which adds an event object to the slot.

        Parameters:
        event (Event)
        - The event to be added.
    */

    MocuGame.TimeSlot.prototype.addEvent = function (event) {
        this.events.push(event);
    };

    /*
        getEvent is a function which gets an event with the given variableName and object.

        Parameters:
        object (Object)
        - The object the event should correspond to.
        varname (String)
        - The variable name that the event should correspond to.
    */

    MocuGame.TimeSlot.prototype.getEvent = function (object, varname) {
        for (var i = 0; i < this.events.length; i += 1) {
            if (this.events[i].object == object && this.events[i].variableName == varname)
                return this.events[i];
        }
        return null;
    };
})();﻿/*
    timeline.js

    Object that store TimeSlots. Handles the animation of values.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
 
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        TimeLine constructor. 
    */

    MocuGame.Timeline = function () {
        this.slots = new Array();
        this.currentTime = 0;
    };

    /*
        update is a function which updates the Timeline's slots.

        Parameters:
        deltaT (Number)
        - The time elapsed since the last update call.
    */

    MocuGame.Timeline.prototype.update = function (deltaT) {
        this.currentTime += 1 * deltaT;
        for(var i = 0; i < this.slots.length; i += 1)
        {
            this.slots[i].update(this.currentTime, deltaT);
        }
    };

    /*
        addSlot is a function which adds a TimeSlot to the Timeline.

        Parameters:
        slot (TimeSlot)
        - The slot to be added to the timeline.
        repeat (Number)
        - The amount of times this slot will be repeated.
        repeatInterval (Number)
        - The time interval between each repeat of the slot.
    */

    MocuGame.Timeline.prototype.addSlot = function (slot, repeat, repeatInterval) {
        this.slots.push(slot);
        repeat = (typeof repeat == 'undefined') ? 0 : repeat;
        repeatInterval = (typeof repeatInterval == 'undefined') ? 0 : repeatInterval;
        for (var i = 0; i < repeat; i += 1) {
            var newslot = new MocuGame.TimeSlot(slot.time + repeatInterval * (i + 1));

            for (var n = 0; n < slot.events.length; n += 1) {
                var event = slot.events[n];
                if (MocuGame.Action.prototype.isPrototypeOf(event))
                    newslot.addEvent(new MocuGame.Action(event.callback, event.obj));
                else
                    newslot.addEvent(new MocuGame.Event(event.object, event.original_varname, event.startval, event.endval, event.operation_time));
            }
            this.slots.push(newslot);
        }
    };

    /*
        restart is a function which restarts the Timeline and its respective slots.
    */

    MocuGame.Timeline.prototype.restart = function () {
        for (var i = 0; i < this.slots.length; i += 1) {
            this.slots[i].restart();
        }
        this.currentTime = 0;
    };
})();﻿/*
    rgba.js

    An object which stores RGBA values. Is used with various drawing operations.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
 
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        RGBA constructor. Initializes the object with its color values.

        Parameters:
        r (Number)
        - Number between 0 and 1 representing the R channel.
        g (Number)
        - Number between 0 and 1 representing the G channel.
        b (Number)
        - Number between 0 and 1 representing the B channel.
        a (Number)
        - Number between 0 and 1 representing the alpha channel.
    */

    MocuGame.RGBA = function (r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };

    /*
        getBrightness is a function which gets the brightness of the RGBA object.

        Returns:
        Number - brightness of the RGBA object.
    */

    MocuGame.RGBA.prototype.getBrightness = function()
    {
        return (0.2126 * this.r) + (0.7152 * this.g) + (0.0722 * this.b);
    };
})();﻿/*
    mocucameratraits.js

    Struct that stores common traits to be enacted on the MocuCamera singleton.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuCameraTraits constructor. Initializes the instance with its scroll rate, whether it zooms, and whether it rotates.

        Paramaters:
        scrollRate (Point) - The rate at which the camera should translate based off its position.
        doesZoom (Boolean) - Whether the camera should apply scaling based off its zoom.
        doesRotate (Boolean) - Whether the camera should apply rotation based off its angle.
    */

    MocuGame.MocuCameraTraits = function (scrollRate, doesZoom, doesRotate) {
        this.scrollRate = scrollRate;
        this.doesZoom = doesZoom;
        this.doesRotate = doesRotate;
    };
})();﻿/*
    mocuobject.js

    The base object of which all others are derived.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuObject constructor. Initializes the object with its position, size, and other properties.

        Parameters:
        point (Point)
        - Position to create the object at.
        size (Point)
        - The dimensions of the object.
    */
    MocuGame.MocuObject = function (point, size) {
        point = (typeof point == 'undefined' || typeof point == null) ? new MocuGame.Point(0, 0) : point;
        size = (typeof size == 'undefined' || typeof size == null) ? new MocuGame.Point(0, 0) : size;
        this.name = "";

        this.x = point.x;
        this.y = point.y;

        this.velocity = new MocuGame.Point(0, 0);
        this.acceleration = new MocuGame.Point(0, 0);
        this.angularvelocity = 0;

        this.isMovementPolar = false;

        this.width = size.x;
        this.height = size.y;

        this.worldPoint = new MocuGame.Point(0, 0);

        this.exists = true;
        this.active = true;
        if (typeof this.visible == 'undefined' || typeof this.visible == 'null')
            this.visible = false;
        else
            this.visible = true;
        this.density = true;
        this.parent = null;
        this.timeline = new MocuGame.Timeline();
        this.scale = new MocuGame.Point(1, 1);
        this.dying = false;
        this.life = 0;
        this.fillStyle = 'blue';
        this.strokeStyle = 'black';
        this.lineWidth = 4;
        this.alpha = 1;
        this.usesFade = false;
        this.fade = new MocuGame.RGBA(1, 0, 0, 0);
        
        this.restitution = 0.0;
        
        this.cameraTraits = new MocuGame.MocuCameraTraits(new MocuGame.Point(1, 1), true, true);
    };

    /*
        update is a function which changes the MocuObject's properties based off its current state.

        Parameters:
        deltaT (Number)
        - Elapsed time since last update call.
    */

    MocuGame.MocuObject.prototype.update = function (deltaT) {
        if (typeof deltaT == 'undefined')
            deltaT = 0;
        if (this.isMovementPolar == true) {
            this.velocity.x += this.acceleration.x * Math.cos(MocuGame.deg2rad(this.acceleration.y)) * deltaT;
            this.velocity.y += this.acceleration.x * Math.sin(MocuGame.deg2rad(this.acceleration.y)) * deltaT;
            
            this.x += this.velocity.x * Math.cos(MocuGame.deg2rad(this.velocity.y)) * deltaT;
            this.y += this.velocity.x * Math.sin(MocuGame.deg2rad(this.velocity.y)) * deltaT;
        }
        else {
            this.velocity.x += this.acceleration.x * deltaT;
            this.velocity.y += this.acceleration.y * deltaT;
        	
            this.x += this.velocity.x * deltaT;
            this.y += this.velocity.y * deltaT;
        }

        this.angle += this.angularvelocity * deltaT;

        if (this.parent != null) {
            this.worldPoint.x = this.parent.worldPoint.x + this.x;
            this.worldPoint.y = this.parent.worldPoint.y + this.y;
        }
        else {
            this.worldPoint.x = this.x;
            this.worldPoint.y = this.y;
        }
        this.timeline.update(deltaT);
        if (this.life > 0) {
            this.life -= deltaT;
            if (this.life == 0) {
                this.killAndRemove();
            }
        }
    };

    /*
        draw is a function which renders the bonding box of the MocuObject onto the canvas.
        Note: MocuObjects are invisible by defalt

        Parameters:
        Context (Object)
        - The canvas context on which the object will be drawn.
        Displacement (Point)
        - The offset of the object's rendering based off its parent.
    */

    MocuGame.MocuObject.prototype.draw = function (context, displacement) {
        context.globalAlpha = this.alpha;
        if (typeof displacement  == 'null' || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);
        context.beginPath();
        context.rect((this.x + displacement.x) * MocuGame.uniscale, (this.y + displacement.y) * MocuGame.uniscale, this.width * MocuGame.uniscale, this.height * MocuGame.uniscale);
        if (this.usesFade) {
            context.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
            context.globalAlpha = this.fade.a;
        }
        else
            context.fillStyle = this.fillStyle;
        context.fill();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.stroke();
        context.closePath();
        context.globalCompositeOperation = "source-over";

    };

    /*
        getWorldPoint is a function which returns the objects position on the canvas.

        Returns:
        Point
        - The object's position on the canvas.
    */

    MocuGame.MocuObject.prototype.getWorldPoint = function () {
        return this.worldPoint;
    };

    /*
        getOverlapsInGroup is a function which returns all objects in a given MocuGroup that overlap 
        with the caller.

        Parameters:
        group (MocuGroup)
        - The group to check collisions against.

        Returns:
        Array
        - List of all objects in group which collide with the caller.
    */

    MocuGame.MocuObject.prototype.getOverlapsInGroup = function (group) {
        var returnGroup = new Array();
        returnGroup.setParent = false;
        if (!MObj.exists) {
            return returnGroup;
        }
        //console.log(" X is " + MocuGame.MocuGroup.prototype.isPrototypeOf(MObj));
        if (MocuGame.MocuGroup.prototype.isPrototypeOf(MObj)) {
            for (var i = 0; i < group.objects.length; ++i) {
                var obj = group.objects[i];
                if (obj.exists) {
                    if (this.isColliding(obj)) //If it is a single object
                        returnGroup.push(obj);
                }
            }
        }
        return returnGroup;
    };

    /*
        overlapsWith is a function which tests whether a given object overlaps with the caller.
        Only returns true if the object overlaps with the caller, the object exists, and the object
        is dense.

        Parameters:
        object (MocuObject)
        -The object to test against the caller.

        Returns:
        Boolean - True if the object overlaps with the caller, false otherwise.

    */

    MocuGame.MocuObject.prototype.overlapsWith = function (object) {
        var pos1 = this.getWorldPoint();
        var pos2 = object.getWorldPoint();
        if (object.exists == false) {
            return false;
        }
        if ((pos2.x > pos1.x + this.width - 1) ||  
                           (pos2.y > pos1.y + this.height - 1) ||
                           (pos1.x > pos2.x + object.width - 1) ||
                           (pos1.y > pos2.y + object.height - 1))
        {
            // no collision
            return false;
        }

        return true;
        
    };

    /*
        collidesWith is a function which applies position readjusting to the caller if it overlaps
        with a given object.

        Parameter:
        object (MocuObject)
        - The object to collide against.

        Returns:
        Array - List of the collision types that occured with the given object and the caller.
    */

    MocuGame.MocuObject.prototype.collidesWith = function (object) {
        if (this.overlapsWith(object) == true && object.density && this.density) {
            var collisionTypes = this.getCollionTypes(object);
            if (collisionTypes.indexOf(MocuGame.RIGHT) != -1) {
                this.x = object.x - this.width;
                if (this.isMovementPolar) {
                }
                else {
                    this.velocity.x = Math.abs(this.velocity.x) * -this.restitution;
                }
            }
            if (collisionTypes.indexOf(MocuGame.LEFT) != -1) {
                this.x = object.getWorldPoint().x + object.width;
                if (this.isMovementPolar) {
                }
                else {
                    this.velocity.x = Math.abs(this.velocity.x) * this.restitution;
                }
            }
            if (collisionTypes.indexOf(MocuGame.TOP) != -1) {
                this.y = object.getWorldPoint().y + object.height;
                if (this.isMovementPolar) {
                }
                else {
                    this.velocity.y = Math.abs(this.velocity.y) * this.restitution;
                }
            }
            if (collisionTypes.indexOf(MocuGame.BOTTOM) != -1) {
                this.y = object.getWorldPoint().y - this.height;
                if (this.isMovementPolar) {
                }
                else {
                    this.velocity.y = Math.abs(this.velocity.y) * -this.restitution;
                }
            }
            return collisionTypes;
        }
        return new Array();
    };

    MocuGame.MocuObject.prototype.collidesWithTilemap = function (tilemap) {
        if (this.overlapsWith(tilemap)) {
            var tiles = tilemap.getDenseTilesInRange(this.getWorldPoint(), new MocuGame.Point(this.width + 1, this.height + 1));
            for (var i = 0; i < tiles.length; i++) {
                this.collidesWith(tiles[i]);
            }

        }
    };

    MocuGame.MocuObject.prototype.getCollionTypes = function (object) {
        //Check for right side, relative to caller

        var pos = this.getWorldPoint();
        var collisionTypes = new Array();
        
        var topRight = new MocuGame.Point((pos.x + this.width), pos.y);
        var bottomRight = new MocuGame.Point((pos.x + this.width), (pos.y + this.height));
        var topLeft = new MocuGame.Point(pos.x , pos.y);
        var bottomLeft = new MocuGame.Point(pos.x, (pos.y + this.height));
        
        if (object.containsLine(topRight, bottomRight)) {
            //If there is a rightward collision, see if there would be a collision if it had not been for the velocity
            //If so, then the collision is not caused by horizontal movement
            
            //This logic is applied in all following collision checks
            var newStartPoint = null;
            var newEndPoint = null;
            if (this.isMovementPolar) {
            }
            else {
                newStartPoint = new MocuGame.Point(topRight.x - this.velocity.x - 1, topRight.y);
                newEndPoint = new MocuGame.Point(bottomRight.x - this.velocity.x - 1, bottomRight.y);
            }
            
            if(!object.containsLine(newStartPoint, newEndPoint))
            {
	            collisionTypes.push(MocuGame.RIGHT);
            }
        }
        //Chceck for left side
        if (object.containsLine(topLeft, bottomLeft)) {
            var newStartPoint = null;
            var newEndPoint = null;
            if (this.isMovementPolar) {
            }
            else {
                newStartPoint = new MocuGame.Point(topLeft.x - this.velocity.x + 1, topLeft.y);
                newEndPoint = new MocuGame.Point(bottomLeft.x - this.velocity.x + 1, bottomLeft.y);
            }
        	
        	if(!object.containsLine(newStartPoint, newEndPoint))
            {
            	collisionTypes.push(MocuGame.LEFT);
            }
        }
        //Chceck for ceiling side
        if (object.containsLine(topLeft, topRight)) {
            var newStartPoint = null;
            var newEndPoint = null;
            if (this.isMovementPolar) {
            }
            else {
                newStartPoint = new MocuGame.Point(topLeft.x, topLeft.y - this.velocity.y + 1);
                newEndPoint = new MocuGame.Point(topRight.x, topRight.y - this.velocity.y + 1);
            }
            
        	if(!object.containsLine(newStartPoint, newEndPoint))
            {
            	collisionTypes.push(MocuGame.TOP);
            }
        }
        //Chceck for floor side
        if (object.containsLine(bottomLeft, bottomRight)) {
            var newStartPoint = null;
            var newEndPoint = null;
            if (this.isMovementPolar) {
            }
            else {
                newStartPoint = new MocuGame.Point(bottomLeft.x, bottomLeft.y - this.velocity.y - 1);
                newEndPoint = new MocuGame.Point(bottomRight.x, bottomRight.y - this.velocity.y - 1);
            }
            
        	if(!object.containsLine(newStartPoint, newEndPoint))
            {
            	collisionTypes.push(MocuGame.BOTTOM);
            }
        }
        return collisionTypes;
    };

    /*
        containsPoint is a funtion which returns true if the given point is within the bounds of
        the MocuObject

        Parameters:
        point (Point)
        - The point to be tested.

        Returns:
        Boolean - Whether the point is within the bounds of the object.
    */

    MocuGame.MocuObject.prototype.containsPoint = function (point) {
        var pos = this.getWorldPoint();
        if (point.x < pos.x + this.width && point.x > pos.x
            && point.y < pos.y + this.height && point.y > pos.y)
            return true;
        return false;
    };

    /*
        containsLine is a function which checks whether a line segment formed by two points intersects a
        MocuObject

        Parameters:
        startPoint (Point)
        - The starting point of the line segment.
        endPoint (Point)
        - The ending point of the line segment.

        Returns:
        Boolean - Whether the line segment intersects the object.
    */

    MocuGame.MocuObject.prototype.containsLine = function (startPoint, endPoint) {
        //Check to see if there is horizontal overlap
        var pos = this.getWorldPoint();
        if((startPoint.x > (pos.x + this.width)) && (endPoint.x > (pos.x + this.width)) ||
            ((startPoint.x < pos.x) && (endPoint.x < pos.x)))
        {
            return false;
        }
        //Check to see if there is vertical overlap
        else if ((startPoint.y > (pos.y + this.height)) && (endPoint.y > (pos.y + this.height)) ||
            ((startPoint.y < pos.y) && (endPoint.y < pos.y))) {
            return false;
        }
        else {
            return true;
        }
    };

    /*
        kill is a function which sets the MocuObject to no longer exist
    */
    MocuGame.MocuObject.prototype.kill = function () {
        this.exists = false;
    };

    /*
        killAndRemove is a function which sets the MocuObject to no longer exist, then removes it from its parent.
    */

    MocuGame.MocuObject.prototype.killAndRemove = function () {
        this.kill();
        this.exists = false;
        if (this.parent != null) {
            this.parent.remove(this);
        }
    };
})();﻿/*
    mocuanimation.js

    Object that handles animating through a series of coordinate frames, used in conjunction with
    the MocuSprite class.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
    
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuAnimation constructor. Initializes the animation with its name, coordinates, animation
        speed, and whether it doesLoops or not.

        For a speed of 100, the animation frame will change every game frame.
        For a speed of 50, the animation frame will change every other game frame.

        Parameters:
        name (String)
        - The name of the animation.
        coords (String)
        - The animation in the following string representation format:
        - "x1,y1 x2,y2 x3,y4"
        - Each token seperated by spaces is a point.
        - Subtoken[0] is the x location of the frame on the sprite sheet.
        - Subtoken[1] is the y location of the frame on the sprite sheet.
    */

    MocuGame.MocuAnimation = function(name, coords, speed, doesLoop, doesReverseWhenFinished)
    {
        this.name = name;
        coords = (typeof coords == 'undefined' || typeof coords == null) ? "0,0" : coords;
        this.speed = Math.round(Math.min(speed, 100));
        this.doesLoop = doesLoop;

        this.coordinates = new Array();
        this.maxFrameJuice = 100;
        this.frameJuice = this.maxFrameJuice;
        this.frame = 0;
        this.isFinished = false;

        if (coords.length == 0) {
            return;
        }
        var tokens = coords.split(" ");
        this.length = tokens.length;
        for (var i = 0; i < tokens.length; i += 1) {
            if (tokens[i].length == 0) {
                this.length--;
                continue;
            }
            var newloc = new MocuGame.Point(0, 0);
            var subtokens = tokens[i].split(",");
            newloc.x = subtokens[0];
            newloc.y = subtokens[1];
            this.coordinates.push(newloc);
        }
        if (doesReverseWhenFinished == true) {
            var reversed = new Array();
            reversed.push.apply(reversed, this.coordinates);
            reversed.reverse();
            this.coordinates.push.apply(this.coordinates, reversed);
        }

        this.timer = null;
        this.isPlaying = false;
    };

    /*
        update is a function which updates the animations frame based off of the elapsed time.

        Parameters:
        deltaT (Number)
        - the duration of time in frames since the last update call.
    */

    MocuGame.MocuAnimation.prototype.update = function (deltaT) {
        this.frameJuice -= this.speed * deltaT;
        if (this.frameJuice <= 0) {
            this.frame += 1;
            if (this.frame >= this.length) {
                if (this.doesLoop)
                    this.frame = 0;
                else {
                    this.isFinished = true;
                    this.frame -= 1;
                }
            }
            this.frameJuice = this.maxFrameJuice;
        }
    };
    
    /*
        start is a function which starts the animation update timer.
    */
    MocuGame.MocuAnimation.prototype.start = function () {
        this.timer = window.setTimeout( MocuGame.MocuAnimation.prototype.update.bind(this)
        , 1000 / this.speed, this);
    };

    /*
        stop is a function which ends the animation update timer.
    */

    MocuGame.MocuAnimation.prototype.stop = function () {
        window.clearTimeout(this.timer);
    };

    MocuGame.MocuAnimation.prototype.update = function () {
        this.frame += 1;
        if (this.frame >= this.length) {
            if (this.doesLoop) {
                this.frame = 0;
                this.timer = window.setTimeout(MocuGame.MocuAnimation.prototype.update.bind(this), 1000 / this.speed, this);
            }
            else {
                this.isFinished = true;
                this.frame -= 1;
            }
        }
        else {
            this.timer = window.setTimeout(MocuGame.MocuAnimation.prototype.update.bind(this), 1000 / this.speed, this);
        }
    };
})();﻿/*
    mocuobject.js

    Object derived from MocuObject, contains an image to be drawn

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuSprite constructor. Initializes the object with its location, size, and sprite image

        Parameters:
        point (Point) 
        - Location for the object to be initialized at.
        size (Point)
        - Dimensions of the object.
        spriteLocation (String)
        - The path to the sprite file.
    */

    MocuGame.MocuSprite = function (point, size, spriteLocation) {
        MocuGame.MocuObject.call(this, point, size);
        if (typeof dontPreload == "undefined")
            dontPreload = false;

        this.animations = new Array();

        if (typeof spriteLocation != "undefined") {
            this.img = MocuGame.preload.getResult(spriteLocation);
            if (dontPreload || this.img == null) {
                this.img = new Image();
                this.img.src = spriteLocation;
            }
        }

        this.frame = new MocuGame.Point(0, 0);

        this.anim = new MocuGame.MocuAnimation("Default", "0,0", 20, true);
        this.animations.push(this.anim);

        this.angle = 0.0;

        this.flip = new MocuGame.Point(1, 1);

        this.drawmode = "source-over";
        
        this.tint = new MocuGame.RGBA(0, 0, 0, 0);

        //this.fade.a = 1;
        this.visible = true;

        this.scale.x = 1;
        this.scale.y = 1;

        this.animates = true;
    }
    MocuGame.MocuSprite.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuSprite.constructor = MocuGame.MocuSprite;
    MocuGame.MocuSprite.prototype.constructor = MocuGame.MocuSprite.constructor;

    /*
        addAnimation is a function which adds a new animation to the MocuSprite's set of animations

        Parameters:
        name (String)
        - The name the animation will be identified.
        coords (String)
        - The coordinates of each frame in the animations, in MocuGame Animation Notation
        speed (Number)
        - The speed of the animation
        loop (Boolean)
        - Whether the animation loops.
    */

    MocuGame.MocuSprite.prototype.addAnimation = function (name, coords, speed, loop, reverse) {
        var newanim = new MocuGame.MocuAnimation(name, coords, speed, loop, reverse);
        this.animations.push(newanim);
    }

    /*
        play is a function which plays the animation with the given name.

        Parameters:
        name (String)
        - The name of the animation to be played.

    */

    MocuGame.MocuSprite.prototype.play = function (name) {
        if (typeof this.anim != "undefined") {
            this.anim.stop();
        }
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name == name) {
                this.anim = this.animations[i];
                this.anim.frame = 0;
                this.anim.start();
                break;
            }
        }
    }

    /*
        animate is a function which updates the MocuSprite's displayed frame based on its current
        animation

        Parameters:
        deltaT (Number)
        - Time elapsed since the last update call.
    */

    MocuGame.MocuSprite.prototype.animate = function (deltaT) {
        this.frame.x = this.anim.coordinates[this.anim.frame].x;
        this.frame.y = this.anim.coordinates[this.anim.frame].y;
    }
    
    /*
        update is a function derived from MocuObject which updates the properties of the caller
        based on its current state.

        Paramaters:
        deltaT (Number)
        - Time elapsed since the last update call.
    */

    MocuGame.MocuSprite.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
    }

    /*
        colorEffect is an internal function used to colorize the sprite data with its given fade,
        prerendering.

        Parameters:
        context (Object)
        - The canvas context on which the object will be drawn
        displacement (Point)
        - The offset given the the object's drawing.
    */

    MocuGame.MocuSprite.prototype.colorEffect = function (context, displacement) {
        var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        blankContext.globalCompositeOperation = "source-over";
        blankContext.globalAlpha = 1;
        blankContext.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
           0,
            0,
            this.width,
            this.height);
        //Do the fade code
        if (this.fade.a != 0 ) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            //console.log("FS is: " + "rgb( " + (this.fade.r * 255) + ", " + (this.fade.g * 255) + ", " + (this.fade.b * 255) + ")");
            blankContext.fill();
        }
        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.drawmode;
        context.drawImage(blankCanvas, 0, 0, (this.width > blankCanvas.width) ? blankCanvas.width : this.width, (this.height > blankCanvas.height) ? blankCanvas.height : this.height,
                 (-(this.width / 2) * this.scale.x) * MocuGame.uniscale,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscale,
                ((this.width) * this.scale.x) * MocuGame.uniscale,
                ((this.height) * this.scale.y) * MocuGame.uniscale);
        blankContext.clearRect(0, 0, blankCanvas.width, blankCanvas.height);
        
    }

    /*
        draw is a function derived from MocuObject which renders the object on to the given canvas.

        Parameters:
        context (Object)
        - The canvas context on which the object will be drawn
        displacement (Point)
        - The offset given the the object's drawing.
    */

    MocuGame.MocuSprite.prototype.draw = function (context, displacement) {

        if (this.animates) {
            this.animate(deltaT);
        }

        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);
        if (this.x + displacement.x > MocuGame.gameWidth || this.y + displacement.y > MocuGame.gameHeight ||
            this.x + displacement.x + this.width < 0 || this.y + displacement.y + this.height < 0) //Object is off screen
            return;
        
        context.translate(((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscale, ((this.y + this.height / 2) + displacement.y) * MocuGame.uniscale);
        context.scale(this.flip.x, this.flip.y);
        context.rotate((this.angle * 3.14159265359) / 180);
        
        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;
        if (this.tint.a != 0 || this.fade.a != 0)
            this.colorEffect(context, displacement);
        else {
            context.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
                (-(this.width / 2) * this.scale.x) * MocuGame.uniscale,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscale,
                ((this.width) * this.scale.x) * MocuGame.uniscale,
                ((this.height) * this.scale.y) * MocuGame.uniscale);
        }
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x, this.flip.y);

        context.translate((-((this.x + this.width / 2) + displacement.x))*MocuGame.uniscale, (-((this.y + this.height / 2) + displacement.y))*MocuGame.uniscale);
        context.globalCompositeOperation = "source-over";
    }
})();﻿/*
    mocubackground.js

    Object inherited from MocuSprite that repeats an image over a specified area. Has support for
    vertical and horizontal scrolling.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuBackground constructor. Initializes the object with the dimensions of the sprite which
        will be drawn, the size of which the background will be rendered in the game, and the path
        to the sprites location on the server.

        Parameters:
        spriteSize (Point)
        - the dimensions of the sprite.
        actualSize (Point)
        - the dimensions of the background on screen.
        spritePath (String)
        - Location of the sprite image on the server.
    */

    MocuGame.MocuBackground = function (spriteSize, actualSize, spritePath) {
        MocuGame.MocuSprite.call(this, new MocuGame.Point(0, 0), actualSize, spritePath);
        this.spriteSize = spriteSize;
        this.scrollVelocity = new MocuGame.Point(0, 0);
        this.scrollPosition = new MocuGame.Point(0, 0);
    }
    MocuGame.MocuBackground.prototype = new MocuGame.MocuSprite(new MocuGame.Point, MocuGame.Point);
    MocuGame.MocuBackground.constructor = MocuGame.MocuBackground;

    /*
        update is a function inherited from MocuSprite which updates the scrollPosition of the
        background based off the scrollVelocity variable.

        Parameters:
        deltaT (Number)
        - The amount of time elapsed since the last update call.
    */

    MocuGame.MocuBackground.prototype.update = function (deltaT) {
        MocuGame.MocuSprite.prototype.update.call(this, deltaT);
        this.scrollPosition.x += this.scrollVelocity.x * deltaT;
        this.scrollPosition.y += this.scrollVelocity.y * deltaT;
        while (this.scrollPosition.x > this.spriteSize.x)
            this.scrollPosition.x -= this.spriteSize.x;
        while (this.scrollPosition.y > this.spriteSize.y)
            this.scrollPosition.y -= this.spriteSize.y;
        while (this.scrollPosition.x < 0)
            this.scrollPosition.x += this.spriteSize.x;
        while (this.scrollPosition.y < 0)
            this.scrollPosition.y += this.spriteSize.y;
    }

    /*
        draw is a function inherited from MocuSprite which draws the MocuBackground on to the game
        canvas, using a displacement based off its parent object.

        Parameters:
        context (Object)
        - The context through which the background will be drawn.
        displacement (Point)
        - The displacement the background will have from its own position.
    */

    MocuGame.MocuBackground.prototype.draw = function (context, displacement) {
        context.translate((this.x + displacement.x) * MocuGame.uniscale, (this.y + displacement.y) * MocuGame.uniscale);
        context.globalAlpha = 1;
        primBlitSize = new MocuGame.Point(this.spriteSize.x - this.scrollPosition.x,
            this.spriteSize.y - this.scrollPosition.y);
        secondBlitSize = new MocuGame.Point(this.spriteSize.x - primBlitSize.x, this.spriteSize.y - primBlitSize.y);
        context.scale(this.flip.x*this.scale.x*MocuGame.uniscale, this.flip.y*this.scale.y*MocuGame.uniscale);
        context.rotate((this.angle * 3.14159265359) / 180);

        //Apply Clipping
        context.save();
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.closePath();
        context.clip();
        for (var i = 0; i < this.width; i += this.spriteSize.x) {
            for (var j = 0; j < this.height; j += this.spriteSize.y) {
                //Quadrant II Blit   
                if (primBlitSize.x != 0 && primBlitSize.y != 0)
                context.drawImage(this.img, this.scrollPosition.x, this.scrollPosition.y, primBlitSize.x, primBlitSize.y, i, j, primBlitSize.x + 1, primBlitSize.y + 1);
                //Quadrant I Blit
                if(secondBlitSize.x != 0 && primBlitSize.y != 0)
                    context.drawImage(this.img, 0, this.scrollPosition.y, secondBlitSize.x, primBlitSize.y, i + primBlitSize.x, j, secondBlitSize.x + 1, primBlitSize.y+1);
                //Quadrant III Blit
                if (secondBlitSize.y != 0 && primBlitSize.x != 0)
                    context.drawImage(this.img, this.scrollPosition.x, 0, primBlitSize.x, secondBlitSize.y, i, j + primBlitSize.y, primBlitSize.x+1, secondBlitSize.y+1);
                //Quadrant IV Blit
                if(secondBlitSize.x != 0 && secondBlitSize.y != 0)
                    context.drawImage(this.img, 0, 0, secondBlitSize.x, secondBlitSize.y, i + primBlitSize.x, j + primBlitSize.y, secondBlitSize.x+1, secondBlitSize.y+1);
            }
        }
        //Restore previous settings
        context.restore();
        context.scale(this.flip.x / this.scale.x / MocuGame.uniscale, this.flip.y / this.scale.y / MocuGame.uniscale);
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.translate(-(this.x + displacement.x) * MocuGame.uniscale, -(this.y + displacement.y) * MocuGame.uniscale);
    }
})();﻿/*
    mocutext.js

    Object derived from MocuSprite. Renders text onto the screen. Has support for different fonts and colors.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuText constructor. Initializes the object withs its position, size, text, and default propeties.

        Paramaters:
        point (Point)
        - The location the text is created at.
        size (Point)
        - The dimensions of the text.
        text (String)
        - The text of the MocuText.
    */

    MocuGame.MocuText = function (point, size, text) {
        MocuGame.MocuSprite.call(this, point, size);
        this.text = text;
        this.font = "14px Helvetica";
        this.fade.r = 0;
        this.fade.g = 0;
        this.fade.b = 0;
        this.align = "left";
        this.doesStroke = false;
        this.strokeColor = new MocuGame.RGBA(0, 0, 0, 0);
        this.strokeWidth = 1;
    };
    MocuGame.MocuText.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuText.constructor = MocuGame.MocuText;

    /*
        draw is a function which renders the MocuText onto the canvas.

        Paramaters:
        context (Object)
        - The canvas context on which the text is drawn.
        displacement (Point)
        - The offset of which the text is drawn.
    */

    MocuGame.MocuText.prototype.draw = function (context, displacement) {
        if (typeof this.text == "undefined") {
            return;
        }
        if (typeof displacement == null || typeof displacement == 'undefined') {
            displacement = new MocuGame.Point(0, 0);
        }


        context.translate(((this.x + displacement.x)) * MocuGame.uniscale, ((this.y + this.height / 2) + displacement.y) * MocuGame.uniscale);
        if (this.align == "center" || this.align == "start")
            context.translate((this.width / 2) * MocuGame.uniscale, 0);

        context.scale(this.flip.x * this.scale.x * (MocuGame.uniscale * 2), this.flip.y * this.scale.y * (MocuGame.uniscale * 2));
        context.rotate((this.angle * 3.14159265359) / 180);

        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;

        //Set the font and color and alignment
        context.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
        context.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
        context.lineWidth = this.strokeWidth;
        context.font = this.font;
        context.textAlign = this.align;

        //Draw that text
        var currentLine = '';
        var words = this.text.split(' ');
        var testLine = '';
        var height = 0;
        for (var i = 0; i < words.length; i += 1) {
            testLine = currentLine + ' ' + words[i] + ' ';
            if (context.measureText(testLine).width > this.width) {
                context.fillText(currentLine, 0, height);
                if (this.doesStroke && this.strokeColor != null) {
                    context.strokeText(currentLine, 0, height);
                }
                currentLine = words[i] + ' ';
                height += this.height;
            }
            else {
                currentLine = testLine;
            }
        }
        context.fillText(currentLine, 0, height);
        if (this.doesStroke && this.strokeColor != null) {
            context.strokeText(currentLine, 0, height);
        }


        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x / this.scale.x / (MocuGame.uniscale * 2), this.flip.y / this.scale.y / (MocuGame.uniscale * 2));
        //console.log(this.img.src + "/" + this.frame.x + "/" + this.frame.y);
        context.translate((-((this.x) + displacement.x)) * MocuGame.uniscale, (-((this.y + this.height / 2) + displacement.y)) * MocuGame.uniscale);
        if (this.align == "center" || this.align == "start")
            context.translate(-(this.width / 2) * MocuGame.uniscale, 0);
        context.globalCompositeOperation = "source-over";
    };

    /*
        animate is a function inherited from MocuSprite, overriden to do nothing.
    */
    MocuGame.MocuText.prototype.animate = function () {
        //Do nothing
    };
})();﻿/*
    notification.js

    Object derived from MocuText. Renders scrolling text onto the screen.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
 
    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Notification constructor. Initializes the object with its location, size, text, and delay.

        Paramaters:
        point (Point)
        - Location the Notification is created at
        size (Point)
        - Dimensions of the notification.
        text (String)
        - Textual context of the notification.
        delay (Number)
        - Delay before adding next character to scrolling text.
    */

    MocuGame.Notification = function (point, size, text, delay) {
        MocuGame.MocuText.call(this, point, size, "");
        this.max_delay = delay;
        this.fulltext = text;
        this.showtext = "";
        this.delay = this.max_delay;
        this.charloc = 0;
    };
    MocuGame.Notification.prototype = new MocuGame.MocuText(new MocuGame.Point, new MocuGame.Point);
    MocuGame.Notification.constructor = MocuGame.Notification;

    /*
        update is a function inherited from MocuText, which updates the scrolling text and adds characters.

        Parameters:
        deltaT (Number)
        - Time elapsed since last update call.
    */

    MocuGame.Notification.prototype.update = function (deltaT) {
        MocuGame.MocuText.prototype.update.call(this, deltaT);
        if (this.charloc <= this.fulltext.length) {
            this.delay -= 1*deltaT;
            if (this.delay <= 0) {
                this.delay = this.max_delay;
                this.showtext = this.fulltext.substring(0, this.charloc);
                this.charloc += 1;
            }
        }
        this.text = this.showtext;
    };

    /*
        restart is a function which restarts the notification with the given text.

        Parameters:
        text (String)
        - The text the notification will scroll to
    */

    MocuGame.Notification.prototype.restart = function (text) {
        this.charloc = 0;
        this.fulltext = text;
        this.showtext = "";
        this.text = "";
    };
})();﻿/*
    mocugroup.js

    Object inherited from MocuObject. Stores MocuObjects.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    
    /*
        MocuGroup constructor. Initializes object at the given point and with the given size.

        Parameters:
        point (Point)
        - Coordinates to be created at.
        size (Point)
        - Dimensions of object.
    */
    MocuGame.MocuGroup = function (point, size) {
        MocuGame.MocuObject.call(this, point, size);
        this.objects = new Array();
        this.setParent = true;
        this.cameraTraits = null;
    };
    MocuGame.MocuGroup.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuGroup.constructor = MocuGame.MocuGroup;

    /*
        update is a function inherited from MocuObject. Updates all active MocuObjects it contains.

        Parameters:
        deltaT (Number)
        - Time elapsed since last update call.
    */

    MocuGame.MocuGroup.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        for (var i = 0; i < this.objects.length; i += 1) {
            if (this.objects[i].exists && this.objects[i].active)
                this.objects[i].update(deltaT);
        }
    };

    /*
        draw is a function inherited from MocuObject. Draws all visible MocuObjects it contains.

        Parameters:
        context (Object)
        - The canvas context on which its children will be drawn.
        point (Point)
        - The displacement of the object, based off its parent's position.
    */

    MocuGame.MocuGroup.prototype.draw = function (context, point) {
        if (typeof point == null || typeof point == 'undefined')
            point = new MocuGame.Point(0, 0);
        for (var i = 0; i < this.objects.length; i += 1) {

            if (this.objects[i].visible && this.objects[i].exists) {
                //Pre drawing operations
                if (this.objects[i].cameraTraits != null) {
                    MocuGame.camera.preDraw(context, new MocuGame.Point(0, 0), this.objects[i].cameraTraits);
                }
                else if (this.cameraTraits != null) {
                    MocuGame.camera.preDraw(context, new MocuGame.Point(0, 0), this.cameraTraits);
                }

                //Draw the object
                this.objects[i].draw(context, new MocuGame.Point(this.x + point.x, this.y + point.y));

                //Post Drawing operations
                if (this.objects[i].cameraTraits != null) {
                    MocuGame.camera.postDraw(context, new MocuGame.Point(0, 0), this.objects[i].cameraTraits);
                }
                else if (this.cameraTraits != null) {
                    MocuGame.camera.postDraw(context, new MocuGame.Point(0, 0), this.cameraTraits);
                }
            }
            if (this.cameraTraits != null) {
                MocuGame.camera.postDraw(context, new MocuGame.Point(0, 0), this.cameraTraits);
            }
        }
    };

    /*
        add is a function which adds MocuObject(s) to the MocuGroup object.

        Parameters:
        ... (MocuObjects)
        - Objects to be added.
    */
    MocuGame.MocuGroup.prototype.add = function () {
        var objs = Array.prototype.slice.call(arguments);
        for (var n = 0; n < objs.length; n += 1) {
            var object = objs[n];
            var foundone = false;
            for (var i = 0; i < this.objects.length; i++) {
                if (!this.objects[i].exists) {
                    this.objects[i] = object;
                    foundone = true;
                    break;
                }
            }
            if (!foundone)
                this.objects.push(object);
            if (this.setParent)
                object.parent = this;
        }
    };

    /*
        remove is a function which removes MocuObject(s) from the MocuGroup object.

        Parameters:
        ... (MocuObjects)
        - Objects to be removed from the object.
    */

    MocuGame.MocuGroup.prototype.remove = function () {
        var objs = Array.prototype.slice.call(arguments);
        for (var i = 0; i < objs.length; i++) {
            var index = this.objects.indexOf(objs[i]);
            if (index != -1) {
                this.objects.splice(index, 1);
            }
        }
    };

    /*
        removeAt is a function which removes the MocuObject at the given index.

        Parameters:
        index (Number)
        - The index at which the object to be removed is located.
    */

    MocuGame.MocuGroup.prototype.removeAt = function (index) {
        this.objects.splice(index, 1);
    };

    /*
        copyContentsTo is a function which adds all of a MocuGroup objects contents to another MocuGroup object.

        Parameters:
        group (MocuGroup)
        - The group to add its objects to.
    */

    MocuGame.MocuGroup.prototype.copyContentsTo = function (group) {
        group.add.apply(group, this.objects);
    };
})();﻿/*
    mocutile.js

    Derived from the MocuSprite object, this object is used by the MocuTilemap to render its underlying tiles and allow support for dynamic,
    and animated tiles.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi
*/

(function () {

    /*
        MocuTile constructor. Initializes the object with its position, size, spriteLocation, and a reference to its parent tilemap.

        Parameters:
        position (Point) - the tile's position.
        size (Point) - The tile's dimensions.
        spriteLocation (String) - The path of the image used for the tile.
        parentTilemap (MocuTilemap) - The tilemap in which this tile will reside;
    */
    MocuGame.MocuTile = function (position, size, spriteLocation, parentTilemap) {
        MocuGame.MocuSprite.call(this, position, size, spriteLocation);

        this.parentTilemap = parentTilemap;
        this.animates = false;
        this.active = false;

        if (this.parentTilemap != null) {
            this.worldPoint.x = this.parentTilemap.x + this.x;
            this.worldPoint.y = this.parentTilemap.y + this.y;
        }

        this.tileID = -1;
    };
    MocuGame.MocuTile.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTile.constructor = MocuGame.MocuTile;
})();﻿/*
    mocutilemap.js

    MocuTilemap, a class derived from MocuGroup, is an object which allows for the easy construction of 2D tilemaps, with configurable sizes,
    and collision properties.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi

*/

(function ()
{
    /*
        MocuTilemap constructor. Initializes the MocuTilemap with its position, size, tile dimensions, and tiles based off the
        comma separated value (CSV) tilemap string, tilesheet, and the tilesheet dimensions.

        Parameters:
        position (Point) - The position of the tilemap relative to its parent, if any.
        size (Point) - The dimensions of the tilemap.
        tileSize (Point) -The dimensions of the tiles within the tilemap
        tilemapString (String) - A CSV string describing the tilemap
        tileSheetLocation (String) - Path to the tile sheet used for the tilemap's tiles.
        tileSheetSize (String) - The dimensions of the tile sheet used for the tiles.
    */
    MocuGame.MocuTilemap = function (position, size, tileSize, tilemapString, tileSheetLocation, tileSheetSize) {
        MocuGame.MocuGroup.call(this, position, size);
        this.tileSize = tileSize;
        this.tileSheetLocation = tileSheetLocation;
        this.widthInTiles = Math.floor(this.width / this.tileSize.x);
        this.heightInTiles = Math.floor(this.height / this.tileSize.y);
        this.tileArray = MocuGame.createArray(this.widthInTiles, this.heightInTiles);
        this.tileSheetSize = tileSheetSize;
        this.collisionStartingIndex = 0;

        //Fill tileArray based off of tilemapString
        var tokens = tilemapString.split(",");
        for (var i = 0; i < tokens.length; i++) {
            if (tokens == "_") {
                continue;
            }
            else if (tokens[i][0] == "(") {
                var subtokens = tokens[i].substring(1, tokens[i].length - 1).split(" ");
                //Create animated tile
                var tile = new MocuGame.MocuTile(new MocuGame.Point((i % this.widthInTiles) * tileSize.x,
                    Math.floor(i / this.widthInTiles) * tileSize.y),
                    tileSize, this.tileSheetLocation, this);
                var pointString = "";
                var animationSpeed = new Number(subtokens[0]);

                tile.density = (new Number(subtokens[1]) >= this.collisionStartingIndex);
                tile.tileID = new Number(subtokens[1]);

                for (var j = 1; j < subtokens.length; j++) {
                    var tileNum = new Number(subtokens[j]);
                    pointString += new String(tileNum % (this.tileSheetSize.x / this.tileSize.x)) + "," +
                        new String(Math.floor(tileNum / (this.tileSheetSize.x / this.tileSize.x))) + " ";
                }

                tile.addAnimation("Tile", pointString, animationSpeed, true, false);
                tile.play("Tile");
                tile.animates = true;


                this.tileArray[(i % this.widthInTiles)][Math.floor(i / this.widthInTiles)] = tile;
                this.add(tile);
            }
            else { //Create normal tile
                var tileNum = new Number(tokens[i]);
                var tile = new MocuGame.MocuTile(new MocuGame.Point((i % this.widthInTiles) * tileSize.x,
                    Math.floor(i / this.widthInTiles) * tileSize.y),
                    tileSize, this.tileSheetLocation, this);

                tile.frame.x = tileNum % (this.tileSheetSize.x / this.tileSize.x);
                tile.frame.y = Math.floor(tileNum / (this.tileSheetSize.x / this.tileSize.x));

                this.tileArray[(i % this.widthInTiles)][Math.floor(i / this.widthInTiles)] = tile;

                tile.density = (tileNum >= this.collisionStartingIndex);
                tile.tileID = tileNum;

                this.add(tile);
            }
        }
    };
    MocuGame.MocuTilemap.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTilemap.constructor = MocuGame.MocuTilemap;


    /*
        getTileAtPoint is a function that returns the tile at the given world point, or null if no such tile exists

        Returns:
        (MocuTile) The tile at that 
    */

    MocuGame.MocuTilemap.prototype.getTileAtPoint = function (point) {
        if (!this.containsPoint(point)) {
            return;
        }
        var pos = this.getWorldPoint();
        var positionInTilemap = new MocuGame.Point(point.x - pos.x, point.y - pos.y);
        var tilemapPoint = new MocuGame.Point(Math.floor(positionInTilemap.x / this.tileSize.x),
            Math.floor(positionInTilemap.y / this.tileSize.y));

        return this.tileArray[tilemapPoint.x][tilemapPoint.y];
    };

    /*
        getTilesInRange is a function that returns the tiles in a given range (world point orientation)

        Parameters:
        position - A Point object denoting the top left position of the range
        size - A Point desribing the dimensions of the range

        Returns:
        (Array) an array of the tiles that exist in the range.
    */

    MocuGame.MocuTilemap.prototype.getTilesInRange = function (position, size) {
        var pos = this.getWorldPoint();
        var positionInTilemap = new MocuGame.Point(point.x - pos.x, point.y - pos.y);
        var tilemapPoint = new MocuGame.Point(Math.floor(positionInTilemap.x / this.tileSize.x),
            Math.floor(positionInTilemap.y / this.tileSize.y));

        var tilemapSize = new MocuGame.Point(Math.ceil(size.x / this.tileSize.x),
            Math.ceil(positionInTilemap.y / this.size.y));

        var returnTiles = new Array();

        for (var x = 0; x < tilemapSize.x; x++) {
            for (var y = 0; y < tilemapSize.y; y++) {
                if (typeof this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y] !== "undefined") {
                    returnTiles.push(this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y]);
                }
            }
        }
        return returnTiles;
    };

    /*
        getTilesInRange is a function that returns the tiles in a given range (world point orientation)

        Parameters:
        position - A Point object denoting the top left position of the range
        size - A Point desribing the dimensions of the range

        Returns:
        (Array) an array of the tiles that exist in the range.
    */

    MocuGame.MocuTilemap.prototype.getDenseTilesInRange = function (position, size) {
        var pos = this.getWorldPoint();
        var positionInTilemap = new MocuGame.Point(position.x - pos.x, position.y - pos.y);
        var tilemapPoint = new MocuGame.Point(Math.floor(positionInTilemap.x / this.tileSize.x),
            Math.floor(positionInTilemap.y / this.tileSize.y));

        var tilemapSize = new MocuGame.Point(Math.ceil(size.x / this.tileSize.x),
            Math.ceil(size.y / this.tileSize.y));

        var returnTiles = new Array();

        for (var x = 0; x < tilemapSize.x; x++) {
            for (var y = 0; y < tilemapSize.y; y++) {
                if (typeof this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y] !== "undefined") {
                    if (this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y].tileID >= this.collisionStartingIndex) {
                        returnTiles.push(this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y]);
                    }
                }
            }
        }
        return returnTiles;
    };
})();﻿/*
    mocustate.js

    Object derived from MocuGroup. Controls the current state of the game.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuState constructor. Initializes the state with its target frames per second rate.

        Parameters:
        fps (Number)
        - The target fps rate.
    */
    MocuGame.MocuState = function (fps) {
        MocuGame.MocuGroup.call(this);
        this.intendedFps = fps;
        this.d = new Date();
        this.lastRun = this.d.getTime();
        this.initialized = false;

        this.fadeRect = null;
        this.currentMusic = null;
        
        this.timeAccumulator = 0;        
    };
    MocuGame.MocuState.prototype = new MocuGame.MocuGroup;
    MocuGame.MocuState.constructor = MocuGame.MocuState;

    /*
        init is a function which marks the state as initialized;
    */

    MocuGame.MocuState.prototype.init = function () {
        
        this.initialized = true;
    };

    /*
        update is a function inherited from MocuGroup which updates all of the objects contained
        within the state.

    */
    MocuGame.MocuState.prototype.update = function () {
        if (!this.initialized)
            return;
        this.d = new Date();
        var currentRun = this.d.getTime();

        deltaT = (currentRun - this.lastRun);
        this.timeAccumulator += deltaT;
        while(this.timeAccumulator > (1000 / this.intendedFps))
        {
        	MocuGame.MocuGroup.prototype.update.call(this, 1);
	        this.fadeRect.update(1);
        	this.timeAccumulator -= (1000 / this.intendedFps);
        }
       
        fixedDeltaT = deltaT / (1000 / this.intendedFps);
        this.lastDeltaT = fixedDeltaT;
        this.lastRun = currentRun;
    };

    /*
        draw is a function inherited from MocuGroup which renders all of its contained objects
        onto the canvas.

        Parameters:
        context (Object)
        - The canvas context on which the objects will be rendered.
        point (Point)
        - The displacement given to the objects it renders
    */

    MocuGame.MocuState.prototype.draw = function (context, point) {
        MocuGame.MocuGroup.prototype.draw.call(this, context, point);
        if (typeof this.fadeRect != "undefined")
            this.fadeRect.draw(context, point);
    };

    /*
        touch is a function which is called by MocuGame when the screen receives a touch event.

        Paramaters:
        pointer (Pointer)
        - The pointer corresponding to the touch event.
    */

    MocuGame.MocuState.prototype.onTouch = function (pointer) {
        //Nothing for now
    };

    /*
        endState is a function which clears all objects from the MocuState.
    */

    MocuGame.MocuState.prototype.endState = function () {
        this.objects.splice(0, this.objects.length);
    };

})();﻿/*
    mocuzone.js

    MocuZone, derived from MocuObject, zones against an object, and allows for the execution of functions when an object leaves the bounds,
    declared by a MocuZone. Useful for special event zones and such.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.
    
    Written by Olutobi Akomolede AKA Mocuto Oshi
*/

(function () {
    /*
        MocuZone constructor. Initializes the zone with its position and size.

        position (Point) - 
    */
    MocuGame.MocuZone = function (position, size) {
        MocuGame.MocuObject.call(this, position, size);
        this.objectsToCheckAgainst = new Array();
        this.objectsInZone = new Array();
    };
    MocuGame.MocuZone.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuZone.constructor = MocuGame.MocuZone;

    /*
        zoneObject is a function which adds an object to the list of objects it checks its bounds against.

        Parameters:
        object (MocuObject) - The object to add to the list of objects it checks its bounds against.
    */

    MocuGame.MocuZone.prototype.zoneObject = function (object) {
        if (this.objectsToCheckAgainst.indexOf(object) == -1) {
            this.objectsToCheckAgainst.push(object);
        }
    };

    /*
        unZoneObject is a function which removes an object from the list of objects it checks its bounds against.

        Parameters:
        object (MocuObject) - The object to remove from the list of objects it checks its bounds against.
    */

    MocuGame.MocuZone.prototype.unZoneObject = function (object) {
        var index = this.objectsToCheckAgainst.indexOf(object);
        if (index != -1) {
            this.objectsToCheckAgainst.splice(index, 1);
        }
    };

    /*
        isObjectInZone is a function which returns true if an object is currently within the bounds of the MocuZone

        Parameters:
        object (MocuObject) - The object to check.
    */

    MocuGame.MocuZone.prototype.isObjectInZone = function (object) {
        return (this.objectsInZone.indexOf(object) != -1);
    };

    /*
        update is a function inherited from MocuObject which updates the state of the MocuZone and checks the objects it is zoning against.
        It handles the calls to onObjectEntered and onObjectExited upon those events occuring.

        Parameters:
        deltaT (Number) - Amount of time since last update call
    */

    MocuGame.MocuZone.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        for (var i = 0; i < this.objectsToCheckAgainst.length; i++) {
            var object = this.objectsToCheckAgainst[i];

            var index = this.objectsInZone.indexOf(object)
            if (index == -1) //If the zone doesn't think the object's in it
            {
                if (this.overlapsWith(object)) { //If the object is actually in it
                    this.objectsInZone.push(object);
                    this.onObjectEntered(object);
                }
            }
            else { //If the zone thinks the object's in it
                if (!this.overlapsWith(object)) {
                    this.objectsInZone.slice(index, 1);
                    var direction = null;
                    var objPos = object.getWorldPoint();
                    var pos = this.getWorldPoint();
                    if (objPos.y < pos.y) {
                        direction = MocuGame.TOP;
                    }
                    else if (objPos.y > pos.y + this.height) {
                        direction = MocuGame.BOTTOM;
                    }
                    else if (objPos.x < pos.x) {
                        direction = MocuGame.LEFT;
                    }
                    else {
                        direction = MocuGame.RIGHT;
                    }
                    this.onObjectExited(object, direction);
                }
            }
        }
    };

    /*
        onObjectEntered is a callback executed when an object enters the zone that was not in it before. Its intended use is to be overridden.

        Parameters:
        object (MocuObject) - The object that entered the zone
    */

    MocuGame.MocuZone.prototype.onObjectEntered = function (object) {
        //Override this
    };

    /*
        onObjectExited is a callback executed when an object exits the zone that was previously within its bounds. Its inteded use is to be
        overriden.

        Parameters:
        object (MocuObject) - The object that exited the zone.
        direction (String) - The direction the object exited the zone from.
    */

    MocuGame.MocuZone.prototype.onObjectExited = function (object, direction) {
        //Override this
    };

})();﻿/*
    mocucamera.js
    Camera object. Acts as a singleton to control the viewpoint of the game.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuCamera constructor. Initializes the object with its position.

        Parameters:
        position (Point) - The position the camera starts at.
    */
    MocuGame.MocuCamera = function (position) {
        MocuGame.MocuGroup.call(this, position, new MocuGame.Point(1, 1));
        this.centerMarker = new MocuGame.MocuObject(new MocuGame.Point(MocuGame.resolution.x / 2, MocuGame.resolution.y / 2),
            new MocuGame.Point(1, 1));

        this.add(this.centerMarker);
        this.zoom = 1.0;

        this.angle = 0;

        this.flip = new MocuGame.Point(1, 1);

        this.fadeRect = new MocuGame.MocuObject(new MocuGame.Point(0, 0), new MocuGame.Point(1, 1));
        this.fadeRect.usesFade = true;

        this.trackingObject = null;
        this.trackingMargins = 0.1;
        this.trackingOffset = new MocuGame.Point(0, 0);
        this.tracksVertical = true;
        this.tracksHorizontal = true;

        this.lastDistance = 0;
    };
    MocuGame.MocuCamera.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuCamera.constructor = MocuGame.MocuCamera;

    /*
        preDraw is a function which does the predrawing translation for each object based off its cameraTraits

        Parameters:
        context (Context) - The context that the objects will be drawn on
        displacement (Point) - The displacement that the camera is drawn off
        cameraTraits (MocuCameraTrait) - The traits that should be applied to the camera's transformations
    */
    MocuGame.MocuCamera.prototype.preDraw = function (context, displacement, cameraTraits) {
        context.translate(((-(this.x * cameraTraits.scrollRate.x) + displacement.x)),
            ((-(this.y * cameraTraits.scrollRate.y) + displacement.y)));
        if (cameraTraits.doesZoom) {
            context.scale(this.flip.x * this.zoom, this.flip.y * this.zoom);
        }
        if (cameraTraits.doesRotate) {
            context.rotate((this.angle * 3.14159265359) / 180);
        }
    };

    /*
        postDraw is a function which resets the transformation of the context back to it's original state, based off the cameraTraits of
        the object

        Parameters:
        context (Context) - The context that the object has been drawn on
        displacement (Point) - the displacement that teh camera is drawn off
        cameraTraits (MocuCameraTrait) - The trait that has been applied to the camera's transformations
    */
    MocuGame.MocuCamera.prototype.postDraw = function (context, displacement, cameraTraits) {
        if (cameraTraits.doesRotate) {
            context.rotate(-((this.angle * 3.14159265359) / 180));
        }
        if (cameraTraits.doesZoom) {
            context.scale(this.flip.x / this.zoom, this.flip.y / this.zoom);
        }
        context.translate(-((-(this.x * cameraTraits.scrollRate.x) + displacement.x)),
    -((-(this.y * cameraTraits.scrollRate.y) + displacement.y)));

    };

    /*
        chaseTacker is a function which sets the camera to view the object it's tracking, based on which directions in scrolls in.

        deltaT (Number) - The amount of time since the last run
    */
    MocuGame.MocuCamera.prototype.chaseTracker = function (deltaT) {
        if (this.tracksHorizontal) {
            this.x = (this.trackingObject.getWorldPoint().x + (this.trackingObject.width / 2) + this.trackingOffset.x) - this.centerMarker.x;
        }
        if (this.tracksVertical) {
            this.y = (this.trackingObject.getWorldPoint().y + (this.trackingObject.height/2) + this.trackingOffset.y) - this.centerMarker.y;
        }
    };

    /*
        update is a function which updates the MocuCamera's properties based off its current state.

        Parameters:
        deltaT (Number) - The amount of time since the last update call.
    */
    MocuGame.MocuCamera.prototype.update = function (deltaT) {
        MocuGame.MocuGroup.prototype.update.call(this, deltaT);
        if (this.trackingObject != null) {
            this.chaseTracker(deltaT);
        }
        
    };

    /*
        viewPoint is a function which sets the MocuCamera object to position itself such that the center of the viewpoint is on the point
        specified

        Parameters:
        point (Point) - the point specified
    */
    MocuGame.MocuCamera.prototype.viewPoint = function (point) {
        this.x = point.x - this.centerMarker.x;
        this.y = point.y - this.centerMarker.y;
    };

})();﻿/*
    mocucamerazone.js

    Derived from MocuZone, this class is used to zone specifically against the MocuCamera singleton.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.


    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    MocuGame.MocuCameraZone = function (position, size, tracksHorizontal, tracksVertical, snapPoint) {
        MocuGame.MocuZone.call(this, position, size);
        this.tracksHorizontal = tracksHorizontal;
        this.tracksVertical = tracksVertical;

        this.lastCamera = null;

        this.lastCameraTracksHorizontal = true;
        this.lastCameraTracksVertical = true;
        this.isZoningCamera = false;

        this.snapPoint = snapPoint;
    }
    MocuGame.MocuCameraZone.prototype = new MocuGame.MocuZone(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuCameraZone.constructor = MocuGame.MocuCameraZone;

    MocuGame.MocuCameraZone.prototype.onObjectEntered = function (object) {
        this.lastCameraTracksHorizontal = MocuGame.camera.tracksHorizontal;
        this.lastCameraTracksVertical = MocuGame.camera.tracksVertical;

        MocuGame.camera.tracksHorizontal = this.tracksHorizontal;
        MocuGame.camera.tracksVertical = this.tracksVertical;

        this.lastCamera = MocuGame.camera;;

        if (this.snapPoint != null) {
            this.lastCamera.viewPoint(this.snapPoint);
        }
    };

    MocuGame.MocuCameraZone.prototype.onObjectExited = function (object, direction) {
        MocuGame.camera.tracksHorizontal = this.lastCameraTracksHorizontal;
        MocuGame.camera.tracksVertical = this.lastCameraTracksVertical;
    };

    MocuGame.MocuCameraZone.prototype.kill = function () {
        if (this.lastCamera != null) {
            this.onObjectExited(this.lastCamera);
        }
        MocuGame.MocuObject.prototype.kill.call(this);
    };

    MocuGame.MocuCameraZone.prototype.update = function (deltaT) {
        if (!this.isZoningCamera && MocuGame.camera.trackingObject != null) {
            this.isZoningCamera = true;
            this.zoneObject(MocuGame.camera.trackingObject);
        }
        MocuGame.MocuZone.prototype.update.call(this, deltaT);
    };
})();﻿/*
    mocuemitter.js

    Object inherited from MocuGroup that emmits a given particle using a set of properties and a timeline. Ideally used for particle effects.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuEmitter constructor. Initializes the object with it's spawn point, the particle it emits, the properties applied to the particle,
        a of randomized properties, and the timeline to be applied to the object.

        Parameters:
        point (Point)
        - The object's coordinates
        particle (MocuSprite)
        - The particle to be cloned.
        particleProperties (Array) (optional)
        - An array of properties to be copied from the particle to each clone.
        randomizedProperties (Dictionary) (optional)
        - A dictionary indexed by strings with a value of a two dimensional array.
        - Each key is a field of the clone to be randomized.
        - index 0 of the array is the lowest value in the randomized range.
        - index 1 of the array is the highest value in the randomized range.
        particleTimeline (Timeline)
        - The timeline to be applied to each clone.
    */

    MocuGame.MocuEmitter = function (point, particle, speed, particleProperties, randomizedProperties, particleTimeline) {
        MocuGame.MocuGroup.call(this, point, new MocuGame.Point(500, 500));
        this.particle = particle;
        this.speed = speed;
        this.particleProperties = particleProperties;
        this.randomizedProperties = randomizedProperties;
        this.particleTimeline = particleTimeline;

        this.subEmitters = new MocuGame.MocuGroup();
        this.add(this.subEmitters);

        this.maxSpawn = 10;
        this.currentSpawn = this.maxSpawn;

        this.addGroup = MocuGame.currentState;

        this.particleLife = 0;
        this.amountToAdd = 10;
        this.dispAdd = true;

        this.particleProperties.push.apply(this.particleProperties, MocuGame.MocuEmitter.defaultProperties);

        this.timer = null;

        this.start();
    }
    MocuGame.MocuEmitter.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuEmitter.constructor = MocuGame.MocuEmitter;
    MocuGame.MocuEmitter.defaultProperties = ["x", "y", "width", "height", "velocity.x", "velocity.y", "acceleration.x", "acceleration.y", "img"];


    /*
        generateClone is a function which creates a clone object, based of the particleProperties, particleTimeline, and randomizedProperties

        Returns:
        (MocuSprite) generated Clone;
    */

    MocuGame.MocuEmitter.prototype.generateClone = function () {
        var clone = new this.particle.constructor();
        clone.visible = true;
        if (typeof this.particleProperties != "undefined") {

            for (var i = 0; i < this.particleProperties.length; i++) {


                var splitarray = this.particleProperties[i].split(".");

                if (splitarray.length > 1) {
                    var object = this.particle;
                    var variableName = splitarray[0];
                    if (typeof object[variableName] == "object") {
                        if (typeof clone[variableName] == "undefined") {
                            clone[variableName] = new object[variableName].constructor();
                        }
                    }
                    else {
                        clone[variableName] = object[variableName];
                    }
                    var cloneobj = clone[variableName];
                    var index = 0;
                    do {
                        object = object[splitarray[index]];
                        cloneobj = clone[splitarray[index]];

                        variableName = splitarray[index + 1];
                        

                        if (typeof object[variableName] == "object") {
                            cloneobj[variableName] = new object[variableName].constructor();
                        }
                        else {
                            cloneobj[variableName] = object[variableName];
                        }

                        index++;
                    } while (index < splitarray.length - 1);

                }
                else {
                    if ((this.particle[this.particleProperties[i]] != null) &&
                        (typeof this.particle[this.particleProperties[i]] != "undefined")) {
                        clone[this.particleProperties[i]] = this.particle[this.particleProperties[i]];
                    }
                }
            }
        }
        if (typeof this.particleTimeline != "undefined") {
            for (var i = 0; i < this.particleTimeline.slots.length; i++) {
                var oSlot = this.particleTimeline.slots[i];
                var slot = new MocuGame.TimeSlot(oSlot.time);
                for (var n = 0; n < this.particleTimeline.slots[i].events.length; n++) {
                    slot.addEvent(new MocuGame.Event(clone, oSlot.events[n].originalVariableName,
                        oSlot.events[n].startValue, oSlot.events[n].endValue, oSlot.events[n].operationTime, oSlot.events[n].interp));
                }
                clone.timeline.addSlot(slot);
            }
        }
        if (typeof this.randomizedProperties != "undefined") {
            for (var key in this.randomizedProperties) {
                var splitarray = key.split(".");
                if (splitarray.length > 1) {
                    var object = clone;
                    var variableName = splitarray[0];
                    var index = 0;
                    do {
                        object = object[splitarray[index]];
                        variableName = splitarray[index + 1];
                        index++;
                    } while (index < splitarray.length - 1);
                    object[variableName] = this.randomizedProperties[key][0] + (Math.random() * this.randomizedProperties[key][1]);

                }
                else {
                    clone[key] = this.randomizedProperties[key][0] + (Math.random() * this.randomizedProperties[key][1]);
                }
            }
        }
        return clone;
    }

    /*
        onParticleAdded is a callback called when a particle is added to the addGroup. Should be overriden.

        Parameters:
        clone (MocuObject)
        - The clone that was added to the addGroup.
    */

    MocuGame.MocuEmitter.prototype.onParticleAdded = function (clone) {
    }

    /*
        start is a function which triggers the emitter to start emitting particles.
    */

    MocuGame.MocuEmitter.prototype.start = function () {
        this.timer = window.setInterval((function () {
            for (var i = 0; i < Math.ceil(this.speed / 60) ; i++) {
                this.addParticle();
            }
        }).bind(this), 1000 / this.speed);
    }

    /*
        stop is a function which ends the emission of particles.
    */

    MocuGame.MocuEmitter.prototype.stop = function () {
        window.clearInterval(this.timer);
    }

    /*
        addParticle is a function which adds a particle to the addGroup.
    */
    
    MocuGame.MocuEmitter.prototype.addParticle = function () {

        this.addGroup = MocuGame.currentState;

        this.currentSpawn = this.maxSpawn;
        var clone = this.generateClone();
        this.addGroup.add(clone);

        if (this.dispAdd) {
            clone.x += this.getWorldPoint().x;
            clone.y += this.getWorldPoint().y;
        }
        clone.life = this.particleLife;

        this.onParticleAdded(clone);
    }

    /*
        kill is a function overriden from MocuObject which stops the timer when called, then does its inherited behavior.
    */

    MocuGame.MocuEmitter.prototype.kill = function () {
        this.stop();
        MocuGame.MocuObject.prototype.kill.call(this);
    }
})();﻿/*
    mocusound.js

    Sound effect object.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuSound constructor. Initializes the object with its audio data and volume.

        Parameters:
        location (String)
        - Path to the audio file
        volume (Number)
    */
    MocuGame.MocuSound = function (location, volume) {
        volume = (typeof volume == 'undefined' || typeof volume == null) ? 1 : volume;
        this.src = location;
        this.volume = volume;
        this.audio = AudioFX(location, { formats: ['mp3'], pool: 1, volumeume: volume});
    };
    /*
        play is a function which plays the MocuSound's audio data
    */
    MocuGame.MocuSound.prototype.play = function () {
        this.audio.play();
        if (this.audio.audio.currentTime > 0) {
            this.audio.audio.pause();
            this.audio.audio.currentTime = 0;
            this.audio.audio.play();
        }
    };
})();﻿/*
    mocumusic.js

    An object that allows for easily playing background music.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuMusic constructor. Initializes the object with the path to the audio file,
        and other fields.

        Parameters
        location (String)
        - The path of the audio which will be played.
        loop (Boolean) (optional)
        - Whether the music loops. Default is true.
        autoplay (Boolean) (optional)
        - Whether the music plays automatically. Default is true.
        loopStart (Number) (optional)
        - Where music should loop back to, in seconds, default is the beginning of the audio file.
        loopEnd (Number) (optional)
        - Where the musical loop ends, in seconds.
        - Default is the end of the audio file.
    */

    MocuGame.MocuMusic = function (loc, loop, autoplay, loopStart, loopEnd) {
        this.audio = MocuGame.preload.getResult(loc);

        if (this.audio == null) {
            this.audio = new Audio(loc);
        }

        this.audio.volume = 0.8;

        this.audio.loop = (typeof loop == "undefined") ? true : loop;

        this.loopStart = (typeof loopStart == "undefined") ? 0 : loopStart;
        this.loopEnd = (typeof loopEnd == "undefined") ? this.audio.duration : loopEnd;

        this.audio.autoplay = (typeof autoplayer == "undefined") ? true :  autoplay;
        this.loop = loop;

        this.isPlaying = false;
        this.canFade = false;
    };
    MocuGame.MocuMusic.DEFAULT_VOLUME = 0.8;

    /*
        play is a function which plays the MocuMusic object.

        Parameters:
        overlap (Boolean) (optional)
        - Whether the MocuMusic object should overlap with the currently playing music or cut it off.
        - Default true.
    */
    MocuGame.MocuMusic.prototype.play = function (overlap) {
        if (typeof overlap == "undefined")
            overlap = false;
        if (MocuGame.currentMusic != null && !overlap) MocuGame.currentMusic.stop();
        this.audio.play();
        MocuGame.currentMusic = this;
        if (MocuGame.currentState != null) {
            MocuGame.currentState.currentMusic = this;
            this.canFade = true;
        }
        this.isPlaying = true;
    };

    /*
        stop is a function which stops the MocuMusic object's audio.
    */

    MocuGame.MocuMusic.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
    };

    /*
        pause is a function which pauses the MocuMusic object's audio.
    */

    MocuGame.MocuMusic.prototype.pause = function () {
        this.audio.pause();
    };

    /*
        checkLoop is a function called by MocuGame which enforces the object's loop, based off
        its loopEnd and loopStart values.
    */

    MocuGame.MocuMusic.prototype.checkLoop = function () {
        if (!this.loop) {
        	return;
    	}
        if (this.audio.currentTime >= this.loopEnd) {
            this.audio.currentTime = this.loopStart;
       }
    };

    /*
        fadeOut is a function which fades out the MocuMusic object

        Parameters:
        duration (Number)
        - The amount of time in seconds the fade will take.
        callback (Function) (optional)
        - The function to call when the fade operation is complete.
        caller (Object) (optional)
        - The "this" object of the callback function.
    */

    MocuGame.MocuMusic.prototype.fadeOut = function (duration, callback, caller) {
        if ((this.isPlaying == false) || (this.canFade == false)) {
            return;
        }
        var slot = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + 1);
        slot.addEvent(new MocuGame.Event(this, "audio.volume", "current", 0.005, duration));


        var slot2 = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + duration + 1);
        slot2.addEvent(new MocuGame.Action(MocuGame.MocuMusic.prototype.stop, this));

        if (callback != null) {
            slot.addEvent(new MocuGame.Action(callback, caller));
        }
        

        MocuGame.currentState.timeline.addSlot(slot);
        MocuGame.currentState.timeline.addSlot(slot2);
    };

    /*
        fadeIn is a function which fades in the MocuMusic object

        Parameters:
        duration (Number)
        - The amount of time in seconds the fade will take.
        callback (Function) (optional)
        - The function to call when the fade operation is complete.
        caller (Object) (optional)
        - The "this" object of the callback function.
    */

    MocuGame.MocuMusic.prototype.fadeIn = function (duration, callback, caller) {
        if (this.isPlaying == false) {
            this.play(true);
        }

        if (this.canFade == false) {
            return;
        }

        var slot = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + 1);
        slot.addEvent(new MocuGame.Event(this, "audio.volume", 0, MocuGame.MocuMusic.DEFAULT_VOLUME, duration));

        var slot2 = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + duration + 1);
        if (callback != null) {
            slot.addEvent(new MocuGame.Action(callback, caller));
        }

        MocuGame.currentState.timeline.addSlot(slot);
        MocuGame.currentState.timeline.addSlot(slot2);
    };
})();﻿/*
    mocugame.js

    MocuGame is the core of the MocuGame library. Is the main MocuGroup as well as containing references
    to the canvas object, context object, and blank canvas object.
    
    Also contains many helper functions.

    The MocuGame Library is © 2012-2013 Olutobi Akomolede and is made available under the Eclipse Public License

    Eclipse Public License, Version 1.0 (EPL-1.0) (plain text) THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT'S ACCEPTANCE OF THIS AGREEMENT.
	1. DEFINITIONS
	"Contribution" means:
	a) in the case of the initial Contributor, the initial code and documentation distributed under this Agreement, and b) in the case of each subsequent Contributor: i) changes to the Program, and ii) additions to the Program; where such changes and/or additions to the Program originate from and are distributed by that particular Contributor. A Contribution 'originates' from a Contributor if it was added to the Program by such Contributor itself or anyone acting on such Contributor's behalf. Contributions do not include additions to the Program which: (i) are separate modules of software distributed in conjunction with the Program under their own license agreement, and (ii) are not derivative works of the Program. "Contributor" means any person or entity that distributes the Program.
	"Licensed Patents " mean patent claims licensable by a Contributor which are necessarily infringed by the use or sale of its Contribution alone or when combined with the Program.
	"Program" means the Contributions distributed in accordance with this Agreement.
	"Recipient" means anyone who receives the Program under this Agreement, including all Contributors.
	2. GRANT OF RIGHTS
	a) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, distribute and sublicense the Contribution of such Contributor, if any, and such derivative works, in source code and object code form. b) Subject to the terms of this Agreement, each Contributor hereby grants Recipient a non-exclusive, worldwide, royalty-free patent license under Licensed Patents to make, use, sell, offer to sell, import and otherwise transfer the Contribution of such Contributor, if any, in source code and object code form. This patent license shall apply to the combination of the Contribution and the Program if, at the time the Contribution is added by the Contributor, such addition of the Contribution causes such combination to be covered by the Licensed Patents. The patent license shall not apply to any other combinations which include the Contribution. No hardware per se is licensed hereunder. c) Recipient understands that although each Contributor grants the licenses to its Contributions set forth herein, no assurances are provided by any Contributor that the Program does not infringe the patent or other intellectual property rights of any other entity. Each Contributor disclaims any liability to Recipient for claims brought by any other entity based on infringement of intellectual property rights or otherwise. As a condition to exercising the rights and licenses granted hereunder, each Recipient hereby assumes sole responsibility to secure any other intellectual property rights needed, if any. For example, if a third party patent license is required to allow Recipient to distribute the Program, it is Recipient's responsibility to acquire that license before distributing the Program. d) Each Contributor represents that to its knowledge it has sufficient copyright rights in its Contribution, if any, to grant the copyright license set forth in this Agreement. 3. REQUIREMENTS
	A Contributor may choose to distribute the Program in object code form under its own license agreement, provided that:
	a) it complies with the terms and conditions of this Agreement; and b) its license agreement: i) effectively disclaims on behalf of all Contributors all warranties and conditions, express and implied, including warranties or conditions of title and non-infringement, and implied warranties or conditions of merchantability and fitness for a particular purpose; ii) effectively excludes on behalf of all Contributors all liability for damages, including direct, indirect, special, incidental and consequential damages, such as lost profits; iii) states that any provisions which differ from this Agreement are offered by that Contributor alone and not by any other party; and iv) states that source code for the Program is available from such Contributor, and informs licensees how to obtain it in a reasonable manner on or through a medium customarily used for software exchange. When the Program is made available in source code form:
	a) it must be made available under this Agreement; and b) a copy of this Agreement must be included with each copy of the Program. Contributors may not remove or alter any copyright notices contained within the Program. Each Contributor must identify itself as the originator of its Contribution, if any, in a manner that reasonably allows subsequent Recipients to identify the originator of the Contribution.
	4. COMMERCIAL DISTRIBUTION
	Commercial distributors of software may accept certain responsibilities with respect to end users, business partners and the like. While this license is intended to facilitate the commercial use of the Program, the Contributor who includes the Program in a commercial product offering should do so in a manner which does not create potential liability for other Contributors. Therefore, if a Contributor includes the Program in a commercial product offering, such Contributor ("Commercial Contributor") hereby agrees to defend and indemnify every other Contributor ("Indemnified Contributor") against any losses, damages and costs (collectively "Losses") arising from claims, lawsuits and other legal actions brought by a third party against the Indemnified Contributor to the extent caused by the acts or omissions of such Commercial Contributor in connection with its distribution of the Program in a commercial product offering. The obligations in this section do not apply to any claims or Losses relating to any actual or alleged intellectual property infringement. In order to qualify, an Indemnified Contributor must: a) promptly notify the Commercial Contributor in writing of such claim, and b) allow the Commercial Contributor to control, and cooperate with the Commercial Contributor in, the defense and any related settlement negotiations. The Indemnified Contributor may participate in any such claim at its own expense.
	For example, a Contributor might include the Program in a commercial product offering, Product X. That Contributor is then a Commercial Contributor. If that Commercial Contributor then makes performance claims, or offers warranties related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor would have to defend claims against the other Contributors related to those performance claims and warranties, and if a court requires any other Contributor to pay any damages as a result, the Commercial Contributor must pay those damages.
	5. NO WARRANTY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE PROGRAM IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Each Recipient is solely responsible for determining the appropriateness of using and distributing the Program and assumes all risks associated with its exercise of rights under this Agreement , including but not limited to the risks and costs of program errors, compliance with applicable laws, damage to or loss of data, programs or equipment, and unavailability or interruption of operations.
	6. DISCLAIMER OF LIABILITY
	EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OR DISTRIBUTION OF THE PROGRAM OR THE EXERCISE OF ANY RIGHTS GRANTED HEREUNDER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	7. GENERAL
	If any provision of this Agreement is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this Agreement, and without further action by the parties hereto, such provision shall be reformed to the minimum extent necessary to make such provision valid and enforceable.
	If Recipient institutes patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Program itself (excluding combinations of the Program with other software or hardware) infringes such Recipient's patent(s), then such Recipient's rights granted under Section 2(b) shall terminate as of the date such litigation is filed.
	All Recipient's rights under this Agreement shall terminate if it fails to comply with any of the material terms or conditions of this Agreement and does not cure such failure in a reasonable period of time after becoming aware of such noncompliance. If all Recipient's rights under this Agreement terminate, Recipient agrees to cease use and distribution of the Program as soon as reasonably practicable. However, Recipient's obligations under this Agreement and any licenses granted by Recipient relating to the Program shall continue and survive.
	Everyone is permitted to copy and distribute copies of this Agreement, but in order to avoid inconsistency the Agreement is copyrighted and may only be modified in the following manner. The Agreement Steward reserves the right to publish new versions (including revisions) of this Agreement from time to time. No one other than the Agreement Steward has the right to modify this Agreement. The Eclipse Foundation is the initial Agreement Steward. The Eclipse Foundation may assign the responsibility to serve as the Agreement Steward to a suitable separate entity. Each new version of the Agreement will be given a distinguishing version number. The Program (including Contributions) may always be distributed subject to the version of the Agreement under which it was received. In addition, after a new version of the Agreement is published, Contributor may elect to distribute the Program (including its Contributions) under the new version. Except as expressly stated in Sections 2(a) and 2(b) above, Recipient receives no rights or licenses to the intellectual property of any Contributor under this Agreement, whether expressly, by implication, estoppel or otherwise. All rights in the Program not expressly granted under this Agreement are reserved.
	This Agreement is governed by the laws of the State of New York and the intellectual property laws of the United States of America. No party to this Agreement will bring a legal action under this Agreement more than one year after the cause of action arose. Each party waives its rights to a jury trial in any resulting litigation.

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    MocuGame.objects = new Array();

    MocuGame.worldPoint = new MocuGame.Point(0, 0);

    MocuGame.currentState = null;
    MocuGame.currentMusic = null;

    MocuGame.Key = Key;

    MocuGame.camera = null;

    MocuGame.MainTimeline = new MocuGame.Timeline();

    MocuGame.targetResolutionWidth = 1920;



    /*
        requests a frame from the window. Please kindly ignore this.
    */
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    /*
        add is a function which adds a MocuObject to the objects array.

        Parameters:
        object (MocuObject)
        - The MocuObject to add
    */

    MocuGame.add = function (object) {
        MocuGame.objects.push(object)
        object.parent = this;
    };

    /*
        deg2rad is a function which converts an angle from degrees to radians.

        Parameters:
        num (Number)
        - The angle to be converted.

        Returns:
        (Number) the angle in degrees.
    */

    MocuGame.deg2rad = function (num) {
        return num * Math.PI / 180;
    };

    /*
        rad2deg is a function which converts an angle from radians to degrees.

        Parameters:
        num (Number)
        - The angle to be converted.

        Returns:
        (Number) the angle in radians.
    */

    MocuGame.rad2deg = function (num) {
        return num * 180 / Math.PI;
    };

    /*
        angleTo is a function which returns the angle from obj1 to obj2 in degrees.

        Parameters:
        obj1 (MocuObject)
        - The object from which the angle starts.
        obj2 (MocuObject)
        - The object the angle is towards.

        Returns:
        (Number) The angle between "obj1" and "obj2" in degrees.
    */

    MocuGame.angleTo = function (obj1, obj2) {
        return MocuGame.rad2deg(Math.atan2((obj2.y + obj2.height / 2) - (obj1.y + obj1.height/2), (obj2.x + obj2.width / 2) - (obj1.x + obj1.width / 2))); //in radians
    };

    /*
        distanceTo is a function which returns the distance between two MocuObjects.

        Parameters:
        obj1 (MocuObject)
        - First MocuObject.
        obj2 (MocuObject)
        - Second MocuObject.

        Returns:
        (Number) The distance between the two objects.
    */

    MocuGame.distanceTo = function (obj1, obj2) {
        return Math.sqrt(Math.pow(((obj2.y + obj2.height/2) - (obj1.y + obj1.height/2)), 2) + Math.pow(((obj2.x + obj2.width/2) - (obj1.x + obj1.width/2)), 2));
    };

    /*
        cloneObject is a function which returns a clone of the given object.

        Parameters:
        object (Object):
        - Object to be cloned.

        Returns:
        (Object) Newly created clone.

    */
    MocuGame.cloneObject = function (object) {
        if (object == null || typeof object != 'object') {
            return object;
        }
        try {
        var temp = new object.constructor(); // give temp the original obj's constructor
        for (var key in object) {
           
                switch(key)
                {
                    case "parent":
                        {
                            temp.parent = object.parent;
                        }
                        break;
                    case "img":
                    {
                        temp.img = object.img;
                    }
                    break;
                    case "events":
                        break;
                    default:
                    {
                        temp[key] = MocuGame.cloneObj(object[key]);
                       
                    }
                    break;
                }
            }
        }
        catch (err) {
            console.log("Error caught: " + err.message);
            console.log("Key is: " + key);
        }
        return temp;
    };

    /*
        createArray is a function that creates an array of any dimensions.

        Paramaters:
        length... (Integers)
        - The length of the array. Multiple lengths can be specified for multidimensional arrays.

        Returns:
        (Array) new array.
    */

    MocuGame.createArray = function (length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while (i--) arr[length - 1 - i] = MocuGame.createArray.apply(this, args);
        }

        return arr;
    };

    MocuGame.prepareCanvasForWindows8 = function (canvasId, gameBounds, resolution) {
        var body = document.body;
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        context.canvas.width = resolution.x;
        context.canvas.height = resolution.y;
        MocuGame.canvas = canvas;
        MocuGame.context = context;

        var blankCanvas = document.createElement("canvas");
        blankCanvas.id = "blankCanvas";
        blankCanvas.width = context.canvas.width;
        blankCanvas.height = context.canvas.height;
        MocuGame.blankCanvas = blankCanvas;
        MocuGame.blankContext = blankCanvas.getContext('2d');

        MocuGame.resolution = resolution;
        MocuGame.gameBounds = gameBounds;
        MocuGame.gameWidth = gameBounds.x;
        MocuGame.gameHeight = gameBounds.y;
        MocuGame.uniscale = MocuGame.resolution.x / MocuGame.targetResolutionWidth;

        MocuGame.camera = new MocuGame.MocuCamera(new MocuGame.Point(0, 0));

        MocuGame.touchenabled = false;
        MocuGame.isWindows8 = true;
        if (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1) {
            MocuGame.touchenabled = true;
            body.addEventListener("MSPointerDown", MocuGame.onPointerDown, false);
            body.addEventListener("MSPointerUp", MocuGame.onPointerUp, false);
            body.addEventListener("MSPointerMove", MocuGame.onPointerMove, false);
        }
    };

    /*
        prepareCanvas is a function which applies settings to the game canvas pre-initialization.
        Generates the blankCanvas to be used for color blending operations

        Parameters:
        canvasId (String)
        - The ID Attribute of the canvas that is to be used.
        gameBounds (Point)
        - The dimensions of the game bounds, x = width, y = height.
        resolution (Point)
        - The dimensions of the canvas, x = width, y = height.
    */

    MocuGame.prepareCanvas = function (canvasId, gameBounds, resolution) {
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('2d');
        context.canvas.width = resolution.x;
        context.canvas.height = resolution.y;
        MocuGame.canvas = canvas;
        MocuGame.context = context;

        var blankCanvas = document.createElement("canvas");
        blankCanvas.id = "blankCanvas";
        blankCanvas.width = context.canvas.width;
        blankCanvas.height = context.canvas.height;
        MocuGame.blankCanvas = blankCanvas;
        MocuGame.blankContext = blankCanvas.getContext('2d');

        MocuGame.resolution = resolution;
        MocuGame.gameBounds = gameBounds;
        MocuGame.gameWidth = gameBounds.x;
        MocuGame.gameHeight = gameBounds.y;
        MocuGame.uniscale = (MocuGame.resolution.x / MocuGame.targetResolutionWidth);

        MocuGame.camera = new MocuGame.MocuCamera(new MocuGame.Point(0, 0));
    };

    /*
        onLoaded is a callback which is called when the manifests loaded in init
        are completely loaded. Preferabbly is overriden.
    */

    MocuGame.onLoaded = function () {
        console.log("Resources loaded");
    };

    /*
        onProgress is a callback which is called when the manifests load in init
        have made progress. Preferabby is overriden.
    */

    MocuGame.onProgress = function () {

    };

    /*
        loadManifests is a function which loads a list of files.

        Parameters:
        manifest (Array)
        - the list of files to be loaded.
        progressCallback (Function)
        - The function to be called when loading progresses.
        completeCallback (Function)
        - The function to be called when loading is completed.
    */

    MocuGame.loadManifests = function(manifest, progressCallback, completeCallback)
    {
        if (typeof manifest == "undefined") {
            return;
        }
        MocuGame.preload.removeAllEventListeners();

        MocuGame.preload.loadManifest(manifest);

        if (typeof completeCallback != "undefined") {
            MocuGame.preload.addEventListener("complete", completeCallback);
        }
        if (typeof progresCallback != "undefined")
        {
            MocuGame.preload.addEventListener("progress", progresCallback);
        }

        MocuGame.preload.load();
    };

    /*
        init is a function which loads the art assets, then starts the game processing.
        When progress has changed, the preloadPercent is updated, and onLoadProgress is called
        When the loading is complete, onLoaded is called

        Parameters:
        state.
        - The state for the game to initialize with
        [imageManifest] (Array) (optional)
        - The list of image files to load.
        [musicManifest] (Array) (optional)
        - The list of music files to load.
        [soundManifest] (Array) (optional)
        - The list of sound files to load.
    */

    MocuGame.init = function (state, imageManifest, musicManifest, soundManifest) {
        MocuGame.switchState(state);
        MocuGame.pointers = new Array();
        if (typeof imageManifest != "undefined") {
            MocuGame.preload.loadManifest(imageManifest, false);
        }
        if (typeof musicManifest != "undefined") {
            MocuGame.preload.loadManifest(musicManifest, false);
        }
        if (typeof soundManifest != "undefined") {
            MocuGame.preload.loadManifest(soundManifest, false);
        }
        MocuGame.preload.addEventListener("complete", MocuGame.onLoaded);
        MocuGame.preload.addEventListener("progress", function (event) { MocuGame.preloadPercent = Math.floor(event.loaded*100); });
        MocuGame.preload.load();
        MocuGame.animate();
    };

    /*
        switchState is a function which clears
        all objects from the currentState, then switches the current MocuState to the one specified.

        Parameters:
        state (MocuState)
        - The MocuState to switch to.
    */

    MocuGame.switchState = function (state, autoInit) {
        MocuGame.objects.length = 0;

        if (MocuGame.currentState != null) {
            MocuGame.currentState.objects.length = 0;
        }
        MocuGame.add(state);
        MocuGame.currentState = state;
        MocuGame.currentState.fadeRect = MocuGame.camera.fadeRect;

        if ((autoInit == true) || (typeof autoInit === "undefined")) {
            MocuGame.currentState.init();
        }
    };

    /*
        fadeTo is a function which fades the screen to the desired color.
        Can be used for screen transitions and other things.

        Paramaters:
        rgba (RGBA)
        - An RGBA object. Stores the RGB values of the color the screen will fade to.
        time (Number)
        - The duration of time in frames that the fade will take
        callback (Function)
        - The function to call once the fading is complete.
        caller (Object)
        - The "this" argument given to the "callback" function.
    */

    MocuGame.fadeTo = function (rgba, time, callback, caller) {
        var slot = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + 1);
        slot.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect.fade, "a", 0, rgba.a, time));

        var slot2 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time);
        slot2.addEvent(new MocuGame.Action(callback, caller));

        var slot3 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "active", true, false, 1));

        MocuGame.camera.fadeRect.timeline.addSlot(slot);
        MocuGame.camera.fadeRect.timeline.addSlot(slot2);
        MocuGame.camera.fadeRect.timeline.addSlot(slot3);

        MocuGame.camera.fadeRect.fade.r = rgba.r;
        MocuGame.camera.fadeRect.fade.g = rgba.g;
        MocuGame.camera.fadeRect.fade.b = rgba.b;

        MocuGame.camera.fadeRect.width = MocuGame.gameBounds.x;
        MocuGame.camera.fadeRect.height = MocuGame.gameBounds.y;
        MocuGame.camera.fadeRect.visible = true;
        MocuGame.camera.fadeRect.active = true;
    };

    /*
        fadeFrom is a function which fades the screen from the desired color to its current contents.
        Can be used for screen transitions and other things.

        Parameters:
        rgba (RGBA)
        - An RGBA object. Stores the RGB values of the color the screen will fade from.
        time (Number)
        - The duration of time in frames that the fade will take
        callback (Function)
        - The function to call once the fading is complete.
        caller (Object)
        - The "this" argument given to the "callback" function.
    */

    MocuGame.fadeFrom = function (rgba, time, callback, caller) {
        var slot = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + 1);
        slot.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect.fade, "a", rgba.a, 0, time));

        var slot2 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time);
        slot2.addEvent(new MocuGame.Action(callback, caller));

        var slot3 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "active", true, false, 1));
        slot3.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "visible", true, false, 1));

        MocuGame.camera.fadeRect.timeline.addSlot(slot);
        MocuGame.camera.fadeRect.timeline.addSlot(slot2);
        MocuGame.camera.fadeRect.timeline.addSlot(slot3);

        MocuGame.camera.fadeRect.fade.r = rgba.r;
        MocuGame.camera.fadeRect.fade.g = rgba.g;
        MocuGame.camera.fadeRect.fade.b = rgba.b;

        MocuGame.camera.fadeRect.width = MocuGame.gameWidth;
        MocuGame.camera.fadeRect.height = MocuGame.gameHeight;
        MocuGame.camera.fadeRect.visible = true;
        MocuGame.camera.fadeRect.active = true;
    };

    /*
        animate is a function which updates all objects and then draws them to the canvas. Then it
        requests another animation from (requestAnimFrame), doing it all over again.

        This function is the powerhouse of the game.
    */

    MocuGame.animate = function () {
        // clear
        var context = MocuGame.context;
        var blankContext = MocuGame.blankContext;
        context.clearRect(0, 0, MocuGame.canvas.width, MocuGame.canvas.height);
        blankContext.clearRect(0, 0, MocuGame.blankCanvas.width, MocuGame.blankCanvas.height);
        for (var i = 0; i < MocuGame.objects.length; i++) {
            if (MocuGame.objects[i].exists) {
                if (MocuGame.objects[i].active) {
                    MocuGame.objects[i].update();
                }
            }
        }
        MocuGame.camera.update(MocuGame.currentState.lastDeltaT);


        for (var i = 0; i < MocuGame.objects.length; i++) {
            if (MocuGame.objects[i].exists) {
                if (MocuGame.objects[i].visible) {
                    //MocuGame.camera.preDraw(context, new MocuGame.Point(0, 0), MocuGame.objects[i].cameraTraits);
                    MocuGame.objects[i].draw(context, new MocuGame.Point(0, 0));
                    //MocuGame.camera.postDraw(context, new MocuGame.Point(0, 0), MocuGame.objects[i].cameraTraits);
                }
            }
        }

        if (MocuGame.currentMusic != null) {
            MocuGame.currentMusic.checkLoop();
        }

        // request new frame
        requestAnimFrame(function () {
            MocuGame.animate();
        });
    };
    
    /*
        updatePointers is a function that updates the current state of each pointer in the 
        pointers array, adds new pointers to the pointers array, and calls the currentState's
        callback function based on the type of the pointer.

        Supported pointer types are
        MSPOINTER_TYPE_TOUCH
        MSPOINTER_TYPE_PEN
        MSPOINTER_TYPE_MOUSE

        Parameters:
        e (Object)
        - The event from which the pointer is based.
        down (Boolean)
        - True if the pointer is down.
    */

    MocuGame.updatePointers = function(e, down)
    {
        var found = 0;
        for (var i = 0; i < MocuGame.pointers.length; i += 1) {
            if (MocuGame.pointers[i].ID == e.pointerId) {
                MocuGame.pointers[i].updatePosition(e, down);
                found = i;
            }
        }

        var pointer;
        if (!found) {
            pointer = new MocuGame.Pointer(e, down);
            MocuGame.pointers.push(pointer);
        }
        else {
            pointer = MocuGame.pointers[found];
        }
        switch(e.pointerType)
        {
            case e.MSPOINTER_TYPE_TOUCH:
                MocuGame.currentState.onTouch(pointer);
                break;
            case e.MSPOINTER_TYPE_PEN:
                MocuGame.currentState.onPen(pointer);
                break;
            case e.MSPOINTERTYPE_MOUSE:
                MocuGame.currentState.onMouse(pointer);
                break;
        }
    };

    /*
        onPointerDown is a callback which is called when a PointerDown event is called.
        Calls updatePointers.

        Parameters:
        e (Object)
        - The event in which the pointer is stored
    */

    MocuGame.onPointerDown = function (e) {
        MocuGame.updatePointers(e, true);
    };

    /*
        onPointerUp is a callback which is called when a PointerUp event is called.
        Calls updatePointers

        Parameters:
        e (Object)
        - The event in which the pointer is stored
    */

    MocuGame.onPointerUp = function (e) {
        MocuGame.updatePointers(e, false);
    };

    /*
        onPointerMove is a callback which is called when a PointerMove event is called.
        Calls updatePointers.

        Parameters:
        e (Object)
        - The event in which the pointer is stored
    */

    MocuGame.onPointerMove = function (e) {
        MocuGame.updatePointers(e, true);
    };

    /*
        saveLocalData is a function which loads the local data. If the game is a Windows Store App, it will save it
        to a file asynchronously

        Otherwise, it saves the data to a cookie. Data is stored as a string, and therefore can
        be converted to any format

        Parameters:
        name (String)
        - The name of the cookie or file
        data (String)
        - String representation of the data that is to be saved
        callback (Function)
        - the function to call once the saving is complete
        caller (Object)
        - the "this" argument given to the "callback" function
    */

    MocuGame.saveLocalData = function (name, data, callback, caller) {
        if (MocuGame.isWindows8 == true) {
            var local = Windows.Storage.ApplicationData.current.localFolder;
            local.createFileAsync(name, Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
                Windows.Storage.FileIO.writeTextAsync(file, data);

            }).done(function () {
                if (typeof callback != "undefined")
                    callback.call(caller);
            });
        }
        else {
            document.cookie = " " + name + "=" + escape(data) + ";";
        }
    };

    /*
        loadLocalData is a function which loads the local data. If the game is a Windows Store App, it will load it from
        a file asynchronously

        Otherwise, it loads the data from a cookie. Data is stored as a string, and therefore can
        be converted to any format

        Parameters:
        name (String)
        - the name of the cookie or file to be loaded
        callback (Function)
        - the function to be called once the loading is complete
        caller (Object)
        - the "this" argument to be given to the "callback" function
        alwaysCallback (Boolean)
        - True if the "callback" function should always be called.

        Returns:
        (String) Textual contents of the file.

    */

    MocuGame.loadLocalData = function (name, callback, caller, alwaysCallback) {
        if (MocuGame.isWindows8 == true) {
            var local = Windows.Storage.ApplicationData.current.localFolder;
            local.getFileAsync(name).then(function (file) {

                Windows.Storage.FileIO.readTextAsync(file).done(function (data) {
                    if (typeof callback != "undefined")
                        callback.call(caller, data);
                    return data;
                });
            }).done(function (file) {

            }, function (error) {
                //If there is an error, return null
                console.log(error);
                if (alwaysCallback == true || typeof alwaysCallback == "undefined") {
                    if (typeof callback != "undefined")
                        callback.call(caller, null);
                }
                return null;
            });
            return null;
        }
        else {
            var data = document.cookie;
            var start = data.indexOf(" " + data + "=");

            if (start == -1)
                return null;

            var end = data.indexOf(";", start);
            if (end == -1)
                return null;

            var val = data.substring(start, end);
            if(typeof callback != "undefined") callback.call(caller, val);
            return unescape(val);
        }
    };
}
)();