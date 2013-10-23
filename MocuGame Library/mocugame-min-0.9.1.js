AudioFX = function() {
  var a = !1, b = document.createElement("audio"), c = function(a) {
    a = b.canPlayType(a);
    return "probably" === a || "maybe" === a;
  };
  b && b.canPlayType && (a = {ogg:c('audio/ogg; codecs="vorbis"'), mp3:c("audio/mpeg;"), m4a:c("audio/x-m4a;") || c("audio/aac;"), wav:c('audio/wav; codecs="1"'), loop:"boolean" === typeof b.loop});
  var d = function(b, c, d) {
    var e = document.createElement("audio");
    if (d) {
      var n = function() {
        e.removeEventListener("canplay", n, !1);
        d();
      };
      e.addEventListener("canplay", n, !1);
    }
    c.loop && !a.loop && e.addEventListener("ended", function() {
      e.currentTime = 0;
      e.play();
    }, !1);
    e.msAudioCategory = "BackgroundCapableMedia";
    e.volume = c.volume || 0.1;
    e.autoplay = c.autoplay;
    e.loop = c.loop;
    e.src = b;
    return e;
  }, e = function(b) {
    for (var c = 0;c < b.length;c++) {
      if (a && a[b[c]]) {
        return b[c];
      }
    }
  }, c = function(b, c, h) {
    c = c || {};
    var k = e(c.formats || []), n = [];
    b += k ? "." + k : "";
    if (a) {
      for (k = 0;k < (c.pool || 1);k++) {
        n.push(d(b, c, 0 == k ? h : null));
      }
    } else {
      h();
    }
    return{audio:1 == n.length ? n[0] : n, play:function() {
      var a;
      a: {
        var b;
        for (a = 0;a < n.length;a++) {
          if (b = n[a], b.paused || b.ended) {
            a = b;
            break a;
          }
        }
        a = void 0;
      }
      a && a.play();
    }, stop:function() {
      var a, b;
      for (a = 0;a < n.length;a++) {
        b = n[a], b.pause(), b.currentTime = 0;
      }
    }};
  };
  c.version = "0.4.0";
  c.supported = a;
  return c;
}();
var Key = {_keys:[], LEFT:37, RIGHT:39, UP:38, DOWN:40, BACKSPACE:8, CAPSLOCK:20, CONTROL:17, DELETEKEY:46, END:35, ENTER:13, ESCAPE:27, HOME:36, INSERT:45, TAB:9, PGDN:34, PGUP:33, SPACE:32, SHIFT:16, onKeyDown:function() {
}, onKeyUp:function() {
}, isDown:function(a) {
  return this._keys[a];
}, addListener:function(a) {
  "function" == typeof a.onKeyDown && document.addEventListener("keydown", a.onKeyDown, !1);
  "function" == typeof a.onKeyUp && document.addEventListener("keyup", a.onKeyUp, !1);
}, removeListener:function(a) {
  "function" == typeof a.onKeyDown && document.removeEventListener("keydown", a.onKeyDown, !1);
  "function" == typeof a.onKeyUp && document.removeEventListener("keyup", a.onKeyUp, !1);
}, init:function() {
  !document.addEventListener && document.attachEvent && (document.addEventListener = function(a, c) {
    document.attachEvent("on" + a, c);
  }, document.removeEventListener = function(a, c) {
    document.detachEvent("on" + a, c);
  });
  document.onkeydown = function(a) {
    a = a ? a : event;
    Key._keys[a.keyCode] = !0;
    Key.onKeyDown(a);
  };
  document.onkeyup = function(a) {
    a = a ? a : event;
    Key._keys[a.keyCode] = !1;
    Key.onKeyUp(a);
  };
  for (var a = 0;256 > a;a++) {
    this._keys[a] = !1;
  }
}};
Key.init();
(function() {
  var a = this.createjs = this.createjs || {}, a = a.PreloadJS = a.PreloadJS || {};
  a.version = "0.3.0";
  a.buildDate = "Tue, 12 Feb 2013 21:12:02 GMT";
})();
this.createjs = this.createjs || {};
(function() {
  var a = function() {
    this.initialize();
  }, b = a.prototype;
  a.initialize = function(a) {
    a.addEventListener = b.addEventListener;
    a.removeEventListener = b.removeEventListener;
    a.removeAllEventListeners = b.removeAllEventListeners;
    a.hasEventListener = b.hasEventListener;
    a.dispatchEvent = b.dispatchEvent;
  };
  b._listeners = null;
  b.initialize = function() {
  };
  b.addEventListener = function(a, b) {
    var e = this._listeners;
    e ? this.removeEventListener(a, b) : e = this._listeners = {};
    var g = e[a];
    g || (g = e[a] = []);
    g.push(b);
    return b;
  };
  b.removeEventListener = function(a, b) {
    var e = this._listeners;
    if (e) {
      var g = e[a];
      if (g) {
        for (var f = 0, h = g.length;f < h;f++) {
          if (g[f] == b) {
            1 == h ? delete e[a] : g.splice(f, 1);
            break;
          }
        }
      }
    }
  };
  b.removeAllEventListeners = function(a) {
    a ? this._listeners && delete this._listeners[a] : this._listeners = null;
  };
  b.dispatchEvent = function(a, b) {
    var e = !1, g = this._listeners;
    if (a && g) {
      "string" == typeof a && (a = {type:a});
      a.target = b || this;
      g = g[a.type];
      if (!g) {
        return e;
      }
      for (var g = g.slice(), f = 0, h = g.length;f < h;f++) {
        var k = g[f];
        k instanceof Function ? e = e || k.apply(null, [a]) : k.handleEvent && (e = e || k.handleEvent(a));
      }
    }
    return!!e;
  };
  b.hasEventListener = function(a) {
    var b = this._listeners;
    return!(!b || !b[a]);
  };
  b.toString = function() {
    return "[EventDispatcher]";
  };
  createjs.EventDispatcher = a;
})();
this.createjs = this.createjs || {};
(function() {
  var a = function() {
    this.init();
  };
  a.prototype = {};
  var b = a.prototype;
  a.FILE_PATTERN = /(\w+:\/{2})?((?:\w+\.){2}\w+)?(\/?[\S]+\/|\/)?([\w\-%\.]+)(?:\.)(\w+)?(\?\S+)?/i;
  b.loaded = !1;
  b.canceled = !1;
  b.progress = 0;
  b._item = null;
  b.onProgress = null;
  b.onLoadStart = null;
  b.onComplete = null;
  b.onError = null;
  b.addEventListener = null;
  b.removeEventListener = null;
  b.removeAllEventListeners = null;
  b.dispatchEvent = null;
  b.hasEventListener = null;
  b._listeners = null;
  createjs.EventDispatcher.initialize(b);
  b.getItem = function() {
    return this._item;
  };
  b.init = function() {
  };
  b.load = function() {
  };
  b.close = function() {
  };
  b._sendLoadStart = function() {
    this._isCanceled() || (this.onLoadStart && this.onLoadStart({target:this}), this.dispatchEvent("loadStart"));
  };
  b._sendProgress = function(a) {
    if (!this._isCanceled()) {
      var b = null;
      if ("number" == typeof a) {
        this.progress = a, b = {loaded:this.progress, total:1};
      } else {
        if (b = a, this.progress = a.loaded / a.total, isNaN(this.progress) || Infinity == this.progress) {
          this.progress = 0;
        }
      }
      b.target = this;
      b.type = "progress";
      this.onProgress && this.onProgress(b);
      this.dispatchEvent(b);
    }
  };
  b._sendComplete = function() {
    this._isCanceled() || (this.onComplete && this.onComplete({target:this}), this.dispatchEvent("complete"));
  };
  b._sendError = function(a) {
    this._isCanceled() || (null == a && (a = {}), a.target = this, a.type = "error", this.onError && this.onError(a), this.dispatchEvent(a));
  };
  b._isCanceled = function() {
    return null == window.createjs || this.canceled ? !0 : !1;
  };
  b._parseURI = function(b) {
    return b ? b.match(a.FILE_PATTERN) : null;
  };
  b.toString = function() {
    return "[PreloadJS AbstractLoader]";
  };
  createjs.AbstractLoader = a;
})();
this.createjs = this.createjs || {};
(function() {
  var a = function(a) {
    this.init(a);
  }, b = a.prototype = new createjs.AbstractLoader;
  a.LOAD_TIMEOUT = 8E3;
  a.BINARY = "binary";
  a.CSS = "css";
  a.IMAGE = "image";
  a.JAVASCRIPT = "javascript";
  a.JSON = "json";
  a.SOUND = "sound";
  a.SVG = "svg";
  a.TEXT = "text";
  a.XML = "xml";
  b.useXHR = !0;
  b.stopOnError = !1;
  b.maintainScriptOrder = !0;
  b.next = null;
  b.onFileLoad = null;
  b.onFileProgress = null;
  b._typeCallbacks = null;
  b._extensionCallbacks = null;
  b._loadStartWasDispatched = !1;
  b._maxConnections = 1;
  b._currentlyLoadingScript = null;
  b._currentLoads = null;
  b._loadQueue = null;
  b._loadQueueBackup = null;
  b._loadItemsById = null;
  b._loadItemsBySrc = null;
  b._loadedResults = null;
  b._loadedRawResults = null;
  b._numItems = 0;
  b._numItemsLoaded = 0;
  b._scriptOrder = null;
  b._loadedScripts = null;
  b.init = function(a) {
    this._numItems = this._numItemsLoaded = 0;
    this._loadStartWasDispatched = this._paused = !1;
    this._currentLoads = [];
    this._loadQueue = [];
    this._loadQueueBackup = [];
    this._scriptOrder = [];
    this._loadedScripts = [];
    this._loadItemsById = {};
    this._loadItemsBySrc = {};
    this._loadedResults = {};
    this._loadedRawResults = {};
    this._typeCallbacks = {};
    this._extensionCallbacks = {};
    this.setUseXHR(a);
  };
  b.setUseXHR = function(a) {
    return this.useXHR = !1 != a && null != window.XMLHttpRequest;
  };
  b.removeAll = function() {
    this.remove();
  };
  b.remove = function(a) {
    var b = null;
    !a || a instanceof Array ? a && (b = a) : b = [a];
    a = !1;
    if (b) {
      for (;b.length;) {
        for (var c = b.pop(), f = this.getResult(c), h = this._loadQueue.length - 1;0 <= h;h--) {
          if (k = this._loadQueue[h].getItem(), k.id == c || k.src == c) {
            this._loadQueue.splice(h, 1)[0].cancel();
            break;
          }
        }
        for (h = this._loadQueueBackup.length - 1;0 <= h;h--) {
          if (k = this._loadQueueBackup[h].getItem(), k.id == c || k.src == c) {
            this._loadQueueBackup.splice(h, 1)[0].cancel();
            break;
          }
        }
        if (f) {
          delete this._loadItemsById[f.id], delete this._loadItemsBySrc[f.src], this._disposeItem(f);
        } else {
          for (h = this._currentLoads.length - 1;0 <= h;h--) {
            var k = this._currentLoads[h].getItem();
            if (k.id == c || k.src == c) {
              this._currentLoads.splice(h, 1)[0].cancel();
              a = !0;
              break;
            }
          }
        }
      }
      a && this._loadNext();
    } else {
      this.close();
      for (c in this._loadItemsById) {
        this._disposeItem(this._loadItemsById[c]);
      }
      this.initialize(this.useXHR);
    }
  };
  b.reset = function() {
    this.close();
    for (var a in this._loadItemsById) {
      this._disposeItem(this._loadItemsById[a]);
    }
    a = [];
    i = 0;
    for (l = this._loadQueueBackup.length;i < l;i++) {
      a.push(this._loadQueueBackup[i].getItem());
    }
    this.loadManifest(a, !1);
  };
  a.isBinary = function(a) {
    switch(a) {
      case createjs.LoadQueue.IMAGE:
      ;
      case createjs.LoadQueue.BINARY:
        return!0;
      default:
        return!1;
    }
  };
  b.installPlugin = function(a) {
    if (null != a && null != a.getPreloadHandlers) {
      a = a.getPreloadHandlers();
      if (null != a.types) {
        for (var b = 0, c = a.types.length;b < c;b++) {
          this._typeCallbacks[a.types[b]] = a.callback;
        }
      }
      if (null != a.extensions) {
        for (b = 0, c = a.extensions.length;b < c;b++) {
          this._extensionCallbacks[a.extensions[b]] = a.callback;
        }
      }
    }
  };
  b.setMaxConnections = function(a) {
    this._maxConnections = a;
    this._paused || this._loadNext();
  };
  b.loadFile = function(a, b) {
    null == a ? this._sendError({text:"PRELOAD_NO_FILE"}) : (this._addItem(a), !1 !== b && this.setPaused(!1));
  };
  b.loadManifest = function(a, b) {
    var c = null;
    if (a instanceof Array) {
      if (0 == a.length) {
        this._sendError({text:"PRELOAD_MANIFEST_EMPTY"});
        return;
      }
      c = a;
    } else {
      if (null == a) {
        this._sendError({text:"PRELOAD_MANIFEST_NULL"});
        return;
      }
      c = [a];
    }
    for (var f = 0, h = c.length;f < h;f++) {
      this._addItem(c[f]);
    }
    !1 !== b && this.setPaused(!1);
  };
  b.load = function() {
    this.setPaused(!1);
  };
  b.getItem = function(a) {
    return this._loadItemsById[a] || this._loadItemsBySrc[a];
  };
  b.getResult = function(a, b) {
    var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
    if (null == c) {
      return null;
    }
    c = c.id;
    return b && this._loadedRawResults[c] ? this._loadedRawResults[c] : this._loadedResults[c];
  };
  b.setPaused = function(a) {
    (this._paused = a) || this._loadNext();
  };
  b.close = function() {
    for (;this._currentLoads.length;) {
      this._currentLoads.pop().cancel();
    }
    this._scriptOrder.length = 0;
    this._loadedScripts.length = 0;
    this.loadStartWasDispatched = !1;
  };
  b._addItem = function(a) {
    a = this._createLoadItem(a);
    if (null != a) {
      var b = this._createLoader(a);
      null != b && (this._loadQueue.push(b), this._loadQueueBackup.push(b), this._numItems++, this._updateProgress(), this.maintainScriptOrder && a.type == createjs.LoadQueue.JAVASCRIPT && b instanceof createjs.XHRLoader && (this._scriptOrder.push(a), this._loadedScripts.push(null)));
    }
  };
  b._createLoadItem = function(a) {
    var b = null;
    switch(typeof a) {
      case "string":
        b = {src:a};
        break;
      case "object":
        b = window.HTMLAudioElement && a instanceof HTMLAudioElement ? {tag:a, src:b.tag.src, type:createjs.LoadQueue.SOUND} : a;
    }
    a = this._parseURI(b.src);
    null != a && (b.ext = a[5]);
    null == b.type && (b.type = this._getTypeByExtension(b.ext));
    null == b.tag && (b.tag = this._createTag(b.type));
    if (null == b.id || "" == b.id) {
      b.id = b.src;
    }
    if (a = this._typeCallbacks[b.type] || this._extensionCallbacks[b.ext]) {
      a = a(b.src, b.type, b.id, b.data);
      if (!1 === a) {
        return null;
      }
      !0 !== a && (null != a.src && (b.src = a.src), null != a.id && (b.id = a.id), null != a.tag && a.tag.load instanceof Function && (b.tag = a.tag), null != a.completeHandler && (b.completeHandler = a.completeHandler));
      a.type && (b.type = a.type);
      a = this._parseURI(b.src);
      null != a && (b.ext = a[5]);
    }
    this._loadItemsById[b.id] = b;
    return this._loadItemsBySrc[b.src] = b;
  };
  b._createLoader = function(a) {
    var b = this.useXHR;
    switch(a.type) {
      case createjs.LoadQueue.JSON:
      ;
      case createjs.LoadQueue.XML:
      ;
      case createjs.LoadQueue.TEXT:
        b = !0;
        break;
      case createjs.LoadQueue.SOUND:
        b = !1;
    }
    return b ? new createjs.XHRLoader(a) : new createjs.TagLoader(a);
  };
  b._loadNext = function() {
    if (!this._paused) {
      this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0);
      this._numItems == this._numItemsLoaded && (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load());
      for (var a = 0, b = this._loadQueue.length;a < b && !(this._currentLoads.length >= this._maxConnections);a++) {
        var c = this._loadQueue[a];
        if (this.maintainScriptOrder && c instanceof createjs.TagLoader && c.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
          if (this._currentlyLoadingScript) {
            continue;
          }
          this._currentlyLoadingScript = !0;
        }
        this._loadQueue.splice(a, 1);
        this._loadItem(c);
        a--;
        b--;
      }
    }
  };
  b._loadItem = function(a) {
    a.addEventListener("progress", createjs.proxy(this._handleProgress, this));
    a.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
    a.addEventListener("error", createjs.proxy(this._handleFileError, this));
    this._currentLoads.push(a);
    a.load();
  };
  b._handleFileError = function(a) {
    var b = a.target;
    this._numItemsLoaded++;
    this._updateProgress();
    a = {item:b.getItem()};
    this._sendError(a);
    this.stopOnError || (this._removeLoadItem(b), this._loadNext());
  };
  b._handleFileComplete = function(a) {
    a = a.target;
    var b = a.getItem();
    this._loadedResults[b.id] = a.getResult();
    a instanceof createjs.XHRLoader && (this._loadedRawResults[b.id] = a.getResult(!0));
    this._removeLoadItem(a);
    if (this.maintainScriptOrder && b.type == createjs.LoadQueue.JAVASCRIPT) {
      if (a instanceof createjs.TagLoader) {
        this._currentlyLoadingScript = !1;
      } else {
        this._loadedScripts[this._scriptOrder.indexOf(b)] = b;
        this._checkScriptLoadOrder(a);
        return;
      }
    }
    this._processFinishedLoad(b);
  };
  b._processFinishedLoad = function(a) {
    this._numItemsLoaded++;
    this._updateProgress();
    this._sendFileComplete(a);
    this._loadNext();
  };
  b._checkScriptLoadOrder = function() {
    for (var a = this._loadedScripts.length, b = 0;b < a;b++) {
      var c = this._loadedScripts[b];
      if (null === c) {
        break;
      }
      !0 !== c && (this._processFinishedLoad(c), this._loadedScripts[b] = !0, b--, a--);
    }
  };
  b._removeLoadItem = function(a) {
    for (var b = this._currentLoads.length, c = 0;c < b;c++) {
      if (this._currentLoads[c] == a) {
        this._currentLoads.splice(c, 1);
        break;
      }
    }
  };
  b._handleProgress = function(a) {
    a = a.target;
    this._sendFileProgress(a.getItem(), a.progress);
    this._updateProgress();
  };
  b._updateProgress = function() {
    var a = this._numItemsLoaded / this._numItems, b = this._numItems - this._numItemsLoaded;
    if (0 < b) {
      for (var c = 0, f = 0, h = this._currentLoads.length;f < h;f++) {
        c += this._currentLoads[f].progress;
      }
      a += c / b * (b / this._numItems);
    }
    this._sendProgress(a);
  };
  b._disposeItem = function(a) {
    delete this._loadedResults[a.id];
    delete this._loadedRawResults[a.id];
    delete this._loadItemsById[a.id];
    delete this._loadItemsBySrc[a.src];
  };
  b._createTag = function(a) {
    var b = null;
    switch(a) {
      case createjs.LoadQueue.IMAGE:
        return document.createElement("img");
      case createjs.LoadQueue.SOUND:
        return b = document.createElement("audio"), b.autoplay = !1, b;
      case createjs.LoadQueue.JAVASCRIPT:
        return b = document.createElement("script"), b.type = "text/javascript", b;
      case createjs.LoadQueue.CSS:
        return b = this.useXHR ? document.createElement("style") : document.createElement("link"), b.rel = "stylesheet", b.type = "text/css", b;
      case createjs.LoadQueue.SVG:
        return this.useXHR ? b = document.createElement("svg") : (b = document.createElement("object"), b.type = "image/svg+xml"), b;
    }
    return null;
  };
  b._getTypeByExtension = function(a) {
    switch(a) {
      case "jpeg":
      ;
      case "jpg":
      ;
      case "gif":
      ;
      case "png":
      ;
      case "webp":
      ;
      case "bmp":
        return createjs.LoadQueue.IMAGE;
      case "ogg":
      ;
      case "mp3":
      ;
      case "wav":
        return createjs.LoadQueue.SOUND;
      case "json":
        return createjs.LoadQueue.JSON;
      case "xml":
        return createjs.LoadQueue.XML;
      case "css":
        return createjs.LoadQueue.CSS;
      case "js":
        return createjs.LoadQueue.JAVASCRIPT;
      case "svg":
        return createjs.LoadQueue.SVG;
      default:
        return createjs.LoadQueue.TEXT;
    }
  };
  b._sendFileProgress = function(a, b) {
    if (this._isCanceled()) {
      this._cleanUp();
    } else {
      var c = {target:this, type:"fileprogress", progress:b, loaded:b, total:1, item:a};
      this.onFileProgress && this.onFileProgress(c);
      this.dispatchEvent(c);
    }
  };
  b._sendFileComplete = function(a) {
    if (!this._isCanceled()) {
      var b = {target:this, type:"fileload", item:a, result:this._loadedResults[a.id], rawResult:this._loadedRawResults[a.id]};
      a.completeHandler && a.completeHandler(b);
      this.onFileLoad && this.onFileLoad(b);
      this.dispatchEvent(b);
    }
  };
  b.toString = function() {
    return "[PreloadJS LoadQueue]";
  };
  createjs.proxy = function(a, b) {
    return function() {
      return a.apply(b, arguments);
    };
  };
  createjs.LoadQueue = a;
  createjs.proxy || (createjs.proxy = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 2);
    return function() {
      return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c));
    };
  });
  var c = function() {
  };
  c.init = function() {
    var a = navigator.userAgent;
    c.isFirefox = -1 < a.indexOf("Firefox");
    c.isOpera = null != window.opera;
    c.isChrome = -1 < a.indexOf("Chrome");
    c.isIOS = -1 < a.indexOf("iPod") || -1 < a.indexOf("iPhone") || -1 < a.indexOf("iPad");
  };
  c.init();
  createjs.LoadQueue.BrowserDetect = c;
  Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
    if (null == this) {
      throw new TypeError;
    }
    var b = Object(this), c = b.length >>> 0;
    if (0 === c) {
      return-1;
    }
    var f = 0;
    1 < arguments.length && (f = Number(arguments[1]), f != f ? f = 0 : 0 != f && Infinity != f && -Infinity != f && (f = (0 < f || -1) * Math.floor(Math.abs(f))));
    if (f >= c) {
      return-1;
    }
    for (f = 0 <= f ? f : Math.max(c - Math.abs(f), 0);f < c;f++) {
      if (f in b && b[f] === a) {
        return f;
      }
    }
    return-1;
  });
})();
this.createjs = this.createjs || {};
(function() {
  var a = function(a) {
    this.init(a);
  }, b = a.prototype = new createjs.AbstractLoader;
  b._loadTimeout = null;
  b._tagCompleteProxy = null;
  b._isAudio = !1;
  b._tag = null;
  b.init = function(a) {
    this._item = a;
    this._tag = a.tag;
    this._isAudio = window.HTMLAudioElement && a.tag instanceof HTMLAudioElement;
    this._tagCompleteProxy = createjs.proxy(this._handleLoad, this);
  };
  b.getResult = function() {
    return this._tag;
  };
  b.cancel = function() {
    this.canceled = !0;
    this._clean();
    this.getItem();
  };
  b.load = function() {
    var a = this._item, b = this._tag;
    clearTimeout(this._loadTimeout);
    this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
    this._isAudio && (b.src = null, b.preload = "auto");
    b.onerror = createjs.proxy(this._handleError, this);
    this._isAudio ? (b.onstalled = createjs.proxy(this._handleStalled, this), b.addEventListener("canplaythrough", this._tagCompleteProxy, !1)) : (b.onload = createjs.proxy(this._handleLoad, this), b.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this));
    switch(a.type) {
      case createjs.LoadQueue.CSS:
        b.href = a.src;
        break;
      case createjs.LoadQueue.SVG:
        b.data = a.src;
        break;
      default:
        b.src = a.src;
    }
    a.type != createjs.LoadQueue.SVG && a.type != createjs.LoadQueue.JAVASCRIPT && a.type != createjs.LoadQueue.CSS || (document.body || document.getElementsByTagName("body")[0]).appendChild(b);
    null != b.load && b.load();
  };
  b._handleTimeout = function() {
    this._clean();
    this._sendError({reason:"PRELOAD_TIMEOUT"});
  };
  b._handleStalled = function() {
  };
  b._handleError = function() {
    this._clean();
    this._sendError();
  };
  b._handleReadyStateChange = function() {
    clearTimeout(this._loadTimeout);
    "loaded" == this.getItem().tag.readyState && this._handleLoad();
  };
  b._handleLoad = function() {
    if (!this._isCanceled()) {
      var a = this.getItem(), b = a.tag;
      this.loaded || this.isAudio && 4 !== b.readyState || (this.loaded = !0, a.type == createjs.LoadQueue.SVG && (document.body || document.getElementsByTagName("body")[0]).removeChild(b), this._clean(), this._sendComplete());
    }
  };
  b._clean = function() {
    clearTimeout(this._loadTimeout);
    var a = this.getItem().tag;
    a.onload = null;
    a.removeEventListener && a.removeEventListener("canplaythrough", this._tagCompleteProxy, !1);
    a.onstalled = null;
    a.onprogress = null;
    a.onerror = null;
    a.parentNode && a.parentNode.removeChild(a);
  };
  b.toString = function() {
    return "[PreloadJS TagLoader]";
  };
  createjs.TagLoader = a;
})();
this.createjs = this.createjs || {};
(function() {
  var a = function(a) {
    this.init(a);
  }, b = a.prototype = new createjs.AbstractLoader;
  b._request = null;
  b._loadTimeout = null;
  b._xhrLevel = 1;
  b._response = null;
  b._rawResponse = null;
  b.init = function(a) {
    this._item = a;
    this._createXHR(a);
  };
  b.getResult = function(a) {
    return a && this._rawResponse ? this._rawResponse : this._response;
  };
  b.cancel = function() {
    this.canceled = !0;
    this._clean();
    this._request.abort();
  };
  b.load = function() {
    if (null == this._request) {
      this._handleError();
    } else {
      this._request.onloadstart = createjs.proxy(this._handleLoadStart, this);
      this._request.onprogress = createjs.proxy(this._handleProgress, this);
      this._request.onabort = createjs.proxy(this._handleAbort, this);
      this._request.onerror = createjs.proxy(this._handleError, this);
      this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
      1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT));
      this._request.onload = createjs.proxy(this._handleLoad, this);
      this._request.onreadystatechange && (this._request.onreadystatechange = this._handleReadyStateChange(this));
      try {
        this._request.send();
      } catch (a) {
        this._sendError({source:a});
      }
    }
  };
  b._handleProgress = function(a) {
    0 < a.loaded && 0 == a.total || this._sendProgress({loaded:a.loaded, total:a.total});
  };
  b._handleLoadStart = function() {
    clearTimeout(this._loadTimeout);
    this._sendLoadStart();
  };
  b._handleAbort = function() {
    this._clean();
    this._sendError();
  };
  b._handleError = function() {
    this._clean();
    this._sendError();
  };
  b._handleReadyStateChange = function() {
    4 == this._request.readyState && this._handleLoad();
  };
  b._handleLoad = function() {
    this.loaded || (this.loaded = !0, this._checkError() ? (this._response = this._getResponse(), this._clean(), this._generateTag() && this._sendComplete()) : this._handleError());
  };
  b._handleTimeout = function() {
    this._clean();
    this._sendError({reason:"PRELOAD_TIMEOUT"});
  };
  b._checkError = function() {
    switch(parseInt(this._request.status)) {
      case 404:
      ;
      case 0:
        return!1;
    }
    return!0;
  };
  b._getResponse = function() {
    if (null != this._response) {
      return this._response;
    }
    if (null != this._request.response) {
      return this._request.response;
    }
    try {
      if (null != this._request.responseText) {
        return this._request.responseText;
      }
    } catch (a) {
    }
    try {
      if (null != this._request.responseXML) {
        return this._request.responseXML;
      }
    } catch (b) {
    }
    return null;
  };
  b._createXHR = function(a) {
    var b = document.createElement("a");
    b.href = a.src;
    var e = document.createElement("a");
    e.href = location.href;
    b = "" != b.hostname && (b.port != e.port || b.protocol != e.protocol || b.hostname != e.hostname);
    e = null;
    if (b && window.XDomainRequest) {
      e = new XDomainRequest;
    } else {
      if (window.XMLHttpRequest) {
        e = new XMLHttpRequest;
      } else {
        try {
          e = new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (g) {
          try {
            e = new ActiveXObject("Msxml2.XMLHTTP.3.0");
          } catch (f) {
            try {
              e = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (h) {
              return!1;
            }
          }
        }
      }
    }
    a.type == createjs.LoadQueue.TEXT && e.overrideMimeType && e.overrideMimeType("text/plain; charset=x-user-defined");
    this._xhrLevel = "string" === typeof e.responseType ? 2 : 1;
    e.open("GET", a.src, !0);
    b && e instanceof XMLHttpRequest && 1 == this._xhrLevel && e.setRequestHeader("Origin", location.origin);
    createjs.LoadQueue.isBinary(a.type) && (e.responseType = "arraybuffer");
    this._request = e;
    return!0;
  };
  b._clean = function() {
    clearTimeout(this._loadTimeout);
    var a = this._request;
    a.onloadstart = null;
    a.onprogress = null;
    a.onabort = null;
    a.onerror = null;
    a.onload = null;
    a.ontimeout = null;
    a.onloadend = null;
    a.onreadystatechange = null;
  };
  b._generateTag = function() {
    var a = this._item.tag;
    switch(this._item.type) {
      case createjs.LoadQueue.IMAGE:
        return a.onload = createjs.proxy(this._handleTagReady, this), a.src = this._item.src, this._rawResponse = this._response, this._response = a, !1;
      case createjs.LoadQueue.JAVASCRIPT:
        a = document.createElement("script");
        this._rawResponse = a.text = this._response;
        this._response = a;
        break;
      case createjs.LoadQueue.CSS:
        document.getElementsByTagName("head")[0].appendChild(a);
        if (a.styleSheet) {
          a.styleSheet.cssText = this._response;
        } else {
          var b = document.createTextNode(this._response);
          a.appendChild(b);
        }
        this._rawResponse = this._response;
        this._response = a;
        break;
      case createjs.LoadQueue.XML:
        this._response = this._parseXML(this._response, "text/xml");
        break;
      case createjs.LoadQueue.SVG:
        b = this._parseXML(this._response, "image/svg+xml");
        this._rawResponse = this._response;
        a.appendChild(b.documentElement);
        this._response = a;
        break;
      case createjs.LoadQueue.JSON:
        a = {};
        try {
          a = JSON.parse(this._response);
        } catch (e) {
          a = null;
        }
        this._rawResponse = this._response;
        this._response = a;
    }
    return!0;
  };
  b._parseXML = function(a, b) {
    var e = null;
    window.DOMParser ? e = (new DOMParser).parseFromString(a, b) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = !1, e.loadXML(a));
    return e;
  };
  b._handleTagReady = function() {
    this._sendComplete();
  };
  b.toString = function() {
    return "[PreloadJS XHRLoader]";
  };
  createjs.XHRLoader = a;
})();
"object" !== typeof JSON && (JSON = {});
(function() {
  function a(a) {
    return 10 > a ? "0" + a : a;
  }
  function b(a) {
    e.lastIndex = 0;
    return e.test(a) ? '"' + a.replace(e, function(a) {
      var b = h[a];
      return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + a + '"';
  }
  function c(a, e) {
    var d, h, q, r, s = g, p, m = e[a];
    m && "object" === typeof m && "function" === typeof m.toJSON && (m = m.toJSON(a));
    "function" === typeof k && (m = k.call(e, a, m));
    switch(typeof m) {
      case "string":
        return b(m);
      case "number":
        return isFinite(m) ? String(m) : "null";
      case "boolean":
      ;
      case "null":
        return String(m);
      case "object":
        if (!m) {
          return "null";
        }
        g += f;
        p = [];
        if ("[object Array]" === Object.prototype.toString.apply(m)) {
          r = m.length;
          for (d = 0;d < r;d += 1) {
            p[d] = c(d, m) || "null";
          }
          q = 0 === p.length ? "[]" : g ? "[\n" + g + p.join(",\n" + g) + "\n" + s + "]" : "[" + p.join(",") + "]";
          g = s;
          return q;
        }
        if (k && "object" === typeof k) {
          for (r = k.length, d = 0;d < r;d += 1) {
            "string" === typeof k[d] && (h = k[d], (q = c(h, m)) && p.push(b(h) + (g ? ": " : ":") + q));
          }
        } else {
          for (h in m) {
            Object.prototype.hasOwnProperty.call(m, h) && (q = c(h, m)) && p.push(b(h) + (g ? ": " : ":") + q);
          }
        }
        q = 0 === p.length ? "{}" : g ? "{\n" + g + p.join(",\n" + g) + "\n" + s + "}" : "{" + p.join(",") + "}";
        g = s;
        return q;
    }
  }
  "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null;
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
    return this.valueOf();
  });
  var d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g, f, h = {"\b":"\\b", "\t":"\\t", "\n":"\\n", "\f":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, k;
  "function" !== typeof JSON.stringify && (JSON.stringify = function(a, b, e) {
    var d;
    f = g = "";
    if ("number" === typeof e) {
      for (d = 0;d < e;d += 1) {
        f += " ";
      }
    } else {
      "string" === typeof e && (f = e);
    }
    if ((k = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) {
      throw Error("JSON.stringify");
    }
    return c("", {"":a});
  });
  "function" !== typeof JSON.parse && (JSON.parse = function(a, b) {
    function c(a, e) {
      var d, f, g = a[e];
      if (g && "object" === typeof g) {
        for (d in g) {
          Object.prototype.hasOwnProperty.call(g, d) && (f = c(g, d), void 0 !== f ? g[d] = f : delete g[d]);
        }
      }
      return b.call(a, e, g);
    }
    var e;
    a = String(a);
    d.lastIndex = 0;
    d.test(a) && (a = a.replace(d, function(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }));
    if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
      return e = eval("(" + a + ")"), "function" === typeof b ? c({"":e}, "") : e;
    }
    throw new SyntaxError("JSON.parse");
  });
})();
MocuGame = {};
MocuGame.preload = new createjs.LoadQueue;
MocuGame.LEFT = "LEFT";
MocuGame.RIGHT = "RIGHT";
MocuGame.TOP = "TOP";
MocuGame.BOTTOM = "BOTTOM";
(function() {
  MocuGame.Point = function(a, b) {
    this.x = a;
    "undefined" === typeof b && (b = a);
    this.y = b;
  };
  MocuGame.Point.prototype.setPolar = function(a, b) {
    this.x = Math.cos(b * Math.PI / 180) * a;
    this.y = Math.sin(b * Math.PI / 180) * a;
  };
  MocuGame.Point.prototype.getPolar = function() {
    return[Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), Math.atan(this.y / this.x) * Math.PI / 180];
  };
})();
(function() {
  MocuGame.Pointer = function(a, b) {
    this.event = event;
    this.ID = a.pointerId;
    this.position = new MocuGame.Point(a.clientX / MocuGame.uniscale, a.clientY / MocuGame.uniscale);
    this.button = a.button;
    this.lastpos = null;
    this.isDown = b;
  };
  MocuGame.Pointer.prototype.updatePosition = function(a, b) {
    this.lastPosition = new MocuGame.Point(this.position.x, this.position.y);
    this.position = new MocuGame.Point(a.clientX / MocuGame.uniscale, a.clientY / MocuGame.uniscale);
    this.isDown = b;
  };
})();
(function() {
  MocuGame.Event = function(a, b, c, d, e, g) {
    b = "undefined" == typeof b || null == typeof b ? "empty" : b;
    c = "undefined" == typeof c || null == typeof c ? 1 : c;
    d = "undefined" == typeof d || null == typeof d ? 1 : d;
    e = "undefined" == typeof e || null == typeof e ? 1 : e;
    g = "undefined" == typeof g || null == typeof g ? "linear" : g;
    this.object = a;
    this.originalVariableName = b;
    a = b.split(".");
    if (1 < a.length) {
      b = 0;
      do {
        this.object = this.object[a[b]], this.variableName = a[b + 1], b++;
      } while (b < a.length - 1);
    } else {
      this.variableName = b;
    }
    this.actualStartValue = c;
    this.startValue = "current" == c ? this.object[this.variableName] : c;
    this.endValue = d;
    this.type = "number" != typeof this.endValue ? "nonnumerical" : "numerical";
    this.elapsed = !1;
    this.operationTime = e;
    this.interp = g;
    this.startTime = this.currentTime = 0;
    this.rate = (this.endValue - this.startValue) / e;
    this.lastValue = null;
    this.isStarted = !1;
  };
  MocuGame.Event.prototype.start = function() {
    this.startValue = "current" == this.actualStartValue ? this.object[this.variableName] : this.actualStartValue;
  };
  MocuGame.Event.prototype.update = function(a, b) {
    if (!this.elapsed) {
      switch(this.interp) {
        case "linear":
          this.rate = (this.endValue - this.startValue) / this.operationTime;
          break;
        case "cubic":
          this.rate = 3 * Math.pow(this.currentTime, 2) * ((this.endValue - this.startValue) / Math.pow(this.operationTime, 3));
          break;
        case "log":
          this.rate = 3 * Math.pow(this.operationTime - this.currentTime, 2) * ((this.endValue - this.startValue) / Math.pow(this.operationTime, 3));
      }
      this.isStarted || (this.start(), this.object[this.variableName] = this.startValue, this.isStarted = !0);
      "numerical" == this.type && (null != this.lastValue && (this.object[this.variableName] = this.lastValue), this.object[this.variableName] += this.rate * b, this.lastValue = this.object[this.variableName]);
      this.currentTime += 1 * b;
      this.currentTime >= this.operationTime && (this.elapsed || (this.object[this.variableName] = this.endValue), this.elapsed = !0);
    }
  };
})();
(function() {
  MocuGame.Action = function(a, b) {
    this.callback = a;
    this.obj = b;
    this.elapsed = !1;
    this.lastValue = null;
    this.started = !1;
    this.current_time = 0;
  };
  MocuGame.Action.prototype.start = function() {
    this.callback.call(this.obj);
    this.started = !0;
  };
  MocuGame.Action.prototype.update = function(a, b) {
    this.started || this.start();
  };
})();
(function() {
  MocuGame.TimeSlot = function(a) {
    this.events = [];
    this.time = a;
    this.nextTimeSlot = null;
    this.finished = !1;
  };
  MocuGame.TimeSlot.prototype.isFinished = function() {
    for (var a = !0, b = 0;b < this.events.length;b++) {
      if (!this.events[b].elapsed) {
        a = !1;
        break;
      }
    }
    return a;
  };
  MocuGame.TimeSlot.prototype.update = function(a, b) {
    for (var c = 0;c < this.events.length;c += 1) {
      a >= this.time ? this.events[c].update(a, b) : (this.events[c].elapsed = !1, this.events[c].lastValue = null, this.events[c].started = !1, this.events[c].currentTime = 0);
    }
  };
  MocuGame.TimeSlot.prototype.restart = function() {
    for (var a = 0;a < this.events.length;a += 1) {
      this.events[a].elapsed = !1, this.events[a].lastValue = null, this.events[a].started = !1, this.events[a].currentTime = 0;
    }
  };
  MocuGame.TimeSlot.prototype.addEvent = function(a) {
    this.events.push(a);
  };
  MocuGame.TimeSlot.prototype.getEvent = function(a, b) {
    for (var c = 0;c < this.events.length;c += 1) {
      if (this.events[c].object == a && this.events[c].variableName == b) {
        return this.events[c];
      }
    }
    return null;
  };
})();
(function() {
  MocuGame.Timeline = function() {
    this.slots = [];
    this.currentTime = 0;
  };
  MocuGame.Timeline.prototype.update = function(a) {
    this.currentTime += 1 * a;
    for (var b = 0;b < this.slots.length;b += 1) {
      this.slots[b].update(this.currentTime, a);
    }
  };
  MocuGame.Timeline.prototype.addSlot = function(a, b, c) {
    this.slots.push(a);
    b = "undefined" == typeof b ? 0 : b;
    c = "undefined" == typeof c ? 0 : c;
    for (var d = 0;d < b;d += 1) {
      for (var e = new MocuGame.TimeSlot(a.time + c * (d + 1)), g = 0;g < a.events.length;g += 1) {
        var f = a.events[g];
        MocuGame.Action.prototype.isPrototypeOf(f) ? e.addEvent(new MocuGame.Action(f.callback, f.obj)) : e.addEvent(new MocuGame.Event(f.object, f.original_varname, f.startval, f.endval, f.operation_time));
      }
      this.slots.push(e);
    }
  };
  MocuGame.Timeline.prototype.restart = function() {
    for (var a = 0;a < this.slots.length;a += 1) {
      this.slots[a].restart();
    }
    this.currentTime = 0;
  };
})();
(function() {
  MocuGame.RGBA = function(a, b, c, d) {
    this.r = a;
    this.g = b;
    this.b = c;
    this.a = d;
  };
  MocuGame.RGBA.prototype.getBrightness = function() {
    return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
  };
})();
(function() {
  MocuGame.MocuCameraTraits = function(a, b, c) {
    this.scrollRate = a;
    this.doesZoom = b;
    this.doesRotate = c;
  };
})();
(function() {
  MocuGame.MocuObject = function(a, b) {
    a = "undefined" == typeof a || null == typeof a ? new MocuGame.Point(0, 0) : a;
    b = "undefined" == typeof b || null == typeof b ? new MocuGame.Point(0, 0) : b;
    this.name = "";
    this.x = a.x;
    this.y = a.y;
    this.velocity = new MocuGame.Point(0, 0);
    this.acceleration = new MocuGame.Point(0, 0);
    this.angularvelocity = 0;
    this.isMovementPolar = !1;
    this.width = b.x;
    this.height = b.y;
    this.worldPoint = new MocuGame.Point(0, 0);
    this.active = this.exists = !0;
    this.visible = "undefined" == typeof this.visible || "null" == typeof this.visible ? !1 : !0;
    this.density = !0;
    this.parent = null;
    this.timeline = new MocuGame.Timeline;
    this.scale = new MocuGame.Point(1, 1);
    this.dying = !1;
    this.life = 0;
    this.fillStyle = "blue";
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.alpha = 1;
    this.usesFade = !1;
    this.fade = new MocuGame.RGBA(1, 0, 0, 0);
    this.restitution = 0;
    this.cameraTraits = new MocuGame.MocuCameraTraits(new MocuGame.Point(1, 1), !0, !0);
  };
  MocuGame.MocuObject.prototype.update = function(a) {
    "undefined" == typeof a && (a = 0);
    !0 == this.isMovementPolar ? (this.velocity.x += this.acceleration.x * Math.cos(MocuGame.deg2rad(this.acceleration.y)) * a, this.velocity.y += this.acceleration.x * Math.sin(MocuGame.deg2rad(this.acceleration.y)) * a, this.x += this.velocity.x * Math.cos(MocuGame.deg2rad(this.velocity.y)) * a, this.y += this.velocity.x * Math.sin(MocuGame.deg2rad(this.velocity.y)) * a) : (this.velocity.x += this.acceleration.x * a, this.velocity.y += this.acceleration.y * a, this.x += this.velocity.x * a, this.y += 
    this.velocity.y * a);
    this.angle += this.angularvelocity * a;
    null != this.parent ? (this.worldPoint.x = this.parent.worldPoint.x + this.x, this.worldPoint.y = this.parent.worldPoint.y + this.y) : (this.worldPoint.x = this.x, this.worldPoint.y = this.y);
    this.timeline.update(a);
    0 < this.life && (this.life -= a, 0 == this.life && this.killAndRemove());
  };
  MocuGame.MocuObject.prototype.draw = function(a, b) {
    a.globalAlpha = this.alpha;
    if ("null" == typeof b || "undefined" == typeof b) {
      b = new MocuGame.Point(0, 0);
    }
    a.beginPath();
    a.rect((this.x + b.x) * MocuGame.uniscale, (this.y + b.y) * MocuGame.uniscale, this.width * MocuGame.uniscale, this.height * MocuGame.uniscale);
    this.usesFade ? (a.fillStyle = "rgb( " + Math.ceil(255 * this.fade.r) + ", " + Math.ceil(255 * this.fade.g) + ", " + Math.ceil(255 * this.fade.b) + ")", a.globalAlpha = this.fade.a) : a.fillStyle = this.fillStyle;
    a.fill();
    a.lineWidth = this.lineWidth;
    a.strokeStyle = this.strokeStyle;
    a.stroke();
    a.closePath();
    a.globalCompositeOperation = "source-over";
  };
  MocuGame.MocuObject.prototype.getWorldPoint = function() {
    return this.worldPoint;
  };
  MocuGame.MocuObject.prototype.getOverlapsInGroup = function(a) {
    var b = [];
    b.setParent = !1;
    if (!MObj.exists) {
      return b;
    }
    if (MocuGame.MocuGroup.prototype.isPrototypeOf(MObj)) {
      for (var c = 0;c < a.objects.length;++c) {
        var d = a.objects[c];
        d.exists && this.isColliding(d) && b.push(d);
      }
    }
    return b;
  };
  MocuGame.MocuObject.prototype.overlapsWith = function(a) {
    var b = this.getWorldPoint(), c = a.getWorldPoint();
    return!1 == a.exists || c.x > b.x + this.width - 1 || c.y > b.y + this.height - 1 || b.x > c.x + a.width - 1 || b.y > c.y + a.height - 1 ? !1 : !0;
  };
  MocuGame.MocuObject.prototype.collidesWith = function(a) {
    if (!0 == this.overlapsWith(a) && a.density && this.density) {
      var b = this.getCollionTypes(a);
      -1 != b.indexOf(MocuGame.RIGHT) && (this.x = a.x - this.width, this.isMovementPolar || (this.velocity.x = Math.abs(this.velocity.x) * -this.restitution));
      -1 != b.indexOf(MocuGame.LEFT) && (this.x = a.getWorldPoint().x + a.width, this.isMovementPolar || (this.velocity.x = Math.abs(this.velocity.x) * this.restitution));
      -1 != b.indexOf(MocuGame.TOP) && (this.y = a.getWorldPoint().y + a.height, this.isMovementPolar || (this.velocity.y = Math.abs(this.velocity.y) * this.restitution));
      -1 != b.indexOf(MocuGame.BOTTOM) && (this.y = a.getWorldPoint().y - this.height, this.isMovementPolar || (this.velocity.y = Math.abs(this.velocity.y) * -this.restitution));
      return b;
    }
    return[];
  };
  MocuGame.MocuObject.prototype.collidesWithTilemap = function(a) {
    if (this.overlapsWith(a)) {
      a = a.getDenseTilesInRange(this.getWorldPoint(), new MocuGame.Point(this.width + 1, this.height + 1));
      for (var b = 0;b < a.length;b++) {
        this.collidesWith(a[b]);
      }
    }
  };
  MocuGame.MocuObject.prototype.getCollionTypes = function(a) {
    var b = this.getWorldPoint(), c = [], d = new MocuGame.Point(b.x + this.width, b.y), e = new MocuGame.Point(b.x + this.width, b.y + this.height), g = new MocuGame.Point(b.x, b.y), b = new MocuGame.Point(b.x, b.y + this.height);
    if (a.containsLine(d, e)) {
      var f = null, h = null;
      this.isMovementPolar || (f = new MocuGame.Point(d.x - this.velocity.x - 1, d.y), h = new MocuGame.Point(e.x - this.velocity.x - 1, e.y));
      a.containsLine(f, h) || c.push(MocuGame.RIGHT);
    }
    a.containsLine(g, b) && (h = f = null, this.isMovementPolar || (f = new MocuGame.Point(g.x - this.velocity.x + 1, g.y), h = new MocuGame.Point(b.x - this.velocity.x + 1, b.y)), a.containsLine(f, h) || c.push(MocuGame.LEFT));
    a.containsLine(g, d) && (h = f = null, this.isMovementPolar || (f = new MocuGame.Point(g.x, g.y - this.velocity.y + 1), h = new MocuGame.Point(d.x, d.y - this.velocity.y + 1)), a.containsLine(f, h) || c.push(MocuGame.TOP));
    a.containsLine(b, e) && (h = f = null, this.isMovementPolar || (f = new MocuGame.Point(b.x, b.y - this.velocity.y - 1), h = new MocuGame.Point(e.x, e.y - this.velocity.y - 1)), a.containsLine(f, h) || c.push(MocuGame.BOTTOM));
    return c;
  };
  MocuGame.MocuObject.prototype.containsPoint = function(a) {
    var b = this.getWorldPoint();
    return a.x < b.x + this.width && a.x > b.x && a.y < b.y + this.height && a.y > b.y ? !0 : !1;
  };
  MocuGame.MocuObject.prototype.containsLine = function(a, b) {
    var c = this.getWorldPoint();
    return a.x > c.x + this.width && b.x > c.x + this.width || a.x < c.x && b.x < c.x ? !1 : a.y > c.y + this.height && b.y > c.y + this.height || a.y < c.y && b.y < c.y ? !1 : !0;
  };
  MocuGame.MocuObject.prototype.kill = function() {
    this.exists = !1;
  };
  MocuGame.MocuObject.prototype.killAndRemove = function() {
    this.kill();
    this.exists = !1;
    null != this.parent && this.parent.remove(this);
  };
})();
(function() {
  MocuGame.MocuAnimation = function(a, b, c, d, e) {
    this.name = a;
    b = "undefined" == typeof b || null == typeof b ? "0,0" : b;
    this.speed = Math.round(Math.min(c, 100));
    this.doesLoop = d;
    this.coordinates = [];
    this.frameJuice = this.maxFrameJuice = 100;
    this.frame = 0;
    this.isFinished = !1;
    if (0 != b.length) {
      a = b.split(" ");
      this.length = a.length;
      for (b = 0;b < a.length;b += 1) {
        0 == a[b].length ? this.length-- : (c = new MocuGame.Point(0, 0), d = a[b].split(","), c.x = d[0], c.y = d[1], this.coordinates.push(c));
      }
      !0 == e && (e = [], e.push.apply(e, this.coordinates), e.reverse(), this.coordinates.push.apply(this.coordinates, e));
      this.timer = null;
      this.isPlaying = !1;
    }
  };
  MocuGame.MocuAnimation.prototype.update = function(a) {
    this.frameJuice -= this.speed * a;
    0 >= this.frameJuice && (this.frame += 1, this.frame >= this.length && (this.doesLoop ? this.frame = 0 : (this.isFinished = !0, this.frame -= 1)), this.frameJuice = this.maxFrameJuice);
  };
  MocuGame.MocuAnimation.prototype.start = function() {
    this.timer = window.setTimeout(MocuGame.MocuAnimation.prototype.update.bind(this), 1E3 / this.speed, this);
  };
  MocuGame.MocuAnimation.prototype.stop = function() {
    window.clearTimeout(this.timer);
  };
  MocuGame.MocuAnimation.prototype.update = function() {
    this.frame += 1;
    this.frame >= this.length ? this.doesLoop ? (this.frame = 0, this.timer = window.setTimeout(MocuGame.MocuAnimation.prototype.update.bind(this), 1E3 / this.speed, this)) : (this.isFinished = !0, this.frame -= 1) : this.timer = window.setTimeout(MocuGame.MocuAnimation.prototype.update.bind(this), 1E3 / this.speed, this);
  };
})();
(function() {
  MocuGame.MocuSprite = function(a, b, c) {
    MocuGame.MocuObject.call(this, a, b);
    "undefined" == typeof dontPreload && (dontPreload = !1);
    this.animations = [];
    "undefined" != typeof c && (this.img = MocuGame.preload.getResult(c), dontPreload || null == this.img) && (this.img = new Image, this.img.src = c);
    this.frame = new MocuGame.Point(0, 0);
    this.anim = new MocuGame.MocuAnimation("Default", "0,0", 20, !0);
    this.animations.push(this.anim);
    this.angle = 0;
    this.flip = new MocuGame.Point(1, 1);
    this.drawmode = "source-over";
    this.tint = new MocuGame.RGBA(0, 0, 0, 0);
    this.visible = !0;
    this.scale.x = 1;
    this.scale.y = 1;
    this.animates = !0;
  };
  MocuGame.MocuSprite.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuSprite.constructor = MocuGame.MocuSprite;
  MocuGame.MocuSprite.prototype.constructor = MocuGame.MocuSprite.constructor;
  MocuGame.MocuSprite.prototype.addAnimation = function(a, b, c, d, e) {
    a = new MocuGame.MocuAnimation(a, b, c, d, e);
    this.animations.push(a);
  };
  MocuGame.MocuSprite.prototype.play = function(a) {
    "undefined" != typeof this.anim && this.anim.stop();
    for (var b = 0;b < this.animations.length;b++) {
      if (this.animations[b].name == a) {
        this.anim = this.animations[b];
        this.anim.frame = 0;
        this.anim.start();
        break;
      }
    }
  };
  MocuGame.MocuSprite.prototype.animate = function(a) {
    this.frame.x = this.anim.coordinates[this.anim.frame].x;
    this.frame.y = this.anim.coordinates[this.anim.frame].y;
  };
  MocuGame.MocuSprite.prototype.update = function(a) {
    MocuGame.MocuObject.prototype.update.call(this, a);
  };
  MocuGame.MocuSprite.prototype.colorEffect = function(a, b) {
    var c = MocuGame.blankCanvas, d = MocuGame.blankContext;
    c.width = this.width;
    c.height = this.height;
    d.globalCompositeOperation = "source-over";
    d.globalAlpha = 1;
    d.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height, 0, 0, this.width, this.height);
    0 != this.fade.a && (d.globalCompositeOperation = "source-atop", d.globalAlpha = this.fade.a, d.beginPath(), d.rect(0, 0, this.width, this.height), d.closePath(), d.fillStyle = "rgb( " + Math.ceil(255 * this.fade.r) + ", " + Math.ceil(255 * this.fade.g) + ", " + Math.ceil(255 * this.fade.b) + ")", d.fill());
    a.globalAlpha = this.alpha;
    a.globalCompositeOperation = this.drawmode;
    a.drawImage(c, 0, 0, this.width > c.width ? c.width : this.width, this.height > c.height ? c.height : this.height, -(this.width / 2) * this.scale.x * MocuGame.uniscale, -(this.height / 2) * this.scale.y * MocuGame.uniscale, this.width * this.scale.x * MocuGame.uniscale, this.height * this.scale.y * MocuGame.uniscale);
    d.clearRect(0, 0, c.width, c.height);
  };
  MocuGame.MocuSprite.prototype.draw = function(a, b) {
    this.animates && this.animate(deltaT);
    if (null == typeof b || "undefined" == typeof b) {
      b = new MocuGame.Point(0, 0);
    }
    this.x + b.x > MocuGame.gameWidth || this.y + b.y > MocuGame.gameHeight || 0 > this.x + b.x + this.width || 0 > this.y + b.y + this.height || (a.translate((this.x + b.x + this.width / 2) * MocuGame.uniscale, (this.y + this.height / 2 + b.y) * MocuGame.uniscale), a.scale(this.flip.x, this.flip.y), a.rotate(3.14159265359 * this.angle / 180), a.globalCompositeOperation = this.drawmode, a.globalAlpha = this.alpha, 0 != this.tint.a || 0 != this.fade.a ? this.colorEffect(a, b) : a.drawImage(this.img, 
    this.frame.x * this.width, this.frame.y * this.height, this.width, this.height, -(this.width / 2) * this.scale.x * MocuGame.uniscale, -(this.height / 2) * this.scale.y * MocuGame.uniscale, this.width * this.scale.x * MocuGame.uniscale, this.height * this.scale.y * MocuGame.uniscale), a.rotate(-(3.14159265359 * this.angle) / 180), a.scale(this.flip.x, this.flip.y), a.translate(-(this.x + this.width / 2 + b.x) * MocuGame.uniscale, -(this.y + this.height / 2 + b.y) * MocuGame.uniscale), a.globalCompositeOperation = 
    "source-over");
  };
})();
(function() {
  MocuGame.MocuBackground = function(a, b, c) {
    MocuGame.MocuSprite.call(this, new MocuGame.Point(0, 0), b, c);
    this.spriteSize = a;
    this.scrollVelocity = new MocuGame.Point(0, 0);
    this.scrollPosition = new MocuGame.Point(0, 0);
  };
  MocuGame.MocuBackground.prototype = new MocuGame.MocuSprite(new MocuGame.Point, MocuGame.Point);
  MocuGame.MocuBackground.constructor = MocuGame.MocuBackground;
  MocuGame.MocuBackground.prototype.update = function(a) {
    MocuGame.MocuSprite.prototype.update.call(this, a);
    this.scrollPosition.x += this.scrollVelocity.x * a;
    for (this.scrollPosition.y += this.scrollVelocity.y * a;this.scrollPosition.x > this.spriteSize.x;) {
      this.scrollPosition.x -= this.spriteSize.x;
    }
    for (;this.scrollPosition.y > this.spriteSize.y;) {
      this.scrollPosition.y -= this.spriteSize.y;
    }
    for (;0 > this.scrollPosition.x;) {
      this.scrollPosition.x += this.spriteSize.x;
    }
    for (;0 > this.scrollPosition.y;) {
      this.scrollPosition.y += this.spriteSize.y;
    }
  };
  MocuGame.MocuBackground.prototype.draw = function(a, b) {
    a.translate((this.x + b.x) * MocuGame.uniscale, (this.y + b.y) * MocuGame.uniscale);
    a.globalAlpha = 1;
    primBlitSize = new MocuGame.Point(this.spriteSize.x - this.scrollPosition.x, this.spriteSize.y - this.scrollPosition.y);
    secondBlitSize = new MocuGame.Point(this.spriteSize.x - primBlitSize.x, this.spriteSize.y - primBlitSize.y);
    a.scale(this.flip.x * this.scale.x * MocuGame.uniscale, this.flip.y * this.scale.y * MocuGame.uniscale);
    a.rotate(3.14159265359 * this.angle / 180);
    a.save();
    a.beginPath();
    a.rect(0, 0, this.width, this.height);
    a.closePath();
    a.clip();
    for (var c = 0;c < this.width;c += this.spriteSize.x) {
      for (var d = 0;d < this.height;d += this.spriteSize.y) {
        0 != primBlitSize.x && 0 != primBlitSize.y && a.drawImage(this.img, this.scrollPosition.x, this.scrollPosition.y, primBlitSize.x, primBlitSize.y, c, d, primBlitSize.x + 1, primBlitSize.y + 1), 0 != secondBlitSize.x && 0 != primBlitSize.y && a.drawImage(this.img, 0, this.scrollPosition.y, secondBlitSize.x, primBlitSize.y, c + primBlitSize.x, d, secondBlitSize.x + 1, primBlitSize.y + 1), 0 != secondBlitSize.y && 0 != primBlitSize.x && a.drawImage(this.img, this.scrollPosition.x, 0, primBlitSize.x, 
        secondBlitSize.y, c, d + primBlitSize.y, primBlitSize.x + 1, secondBlitSize.y + 1), 0 != secondBlitSize.x && 0 != secondBlitSize.y && a.drawImage(this.img, 0, 0, secondBlitSize.x, secondBlitSize.y, c + primBlitSize.x, d + primBlitSize.y, secondBlitSize.x + 1, secondBlitSize.y + 1);
      }
    }
    a.restore();
    a.scale(this.flip.x / this.scale.x / MocuGame.uniscale, this.flip.y / this.scale.y / MocuGame.uniscale);
    a.rotate(-(3.14159265359 * this.angle) / 180);
    a.translate(-(this.x + b.x) * MocuGame.uniscale, -(this.y + b.y) * MocuGame.uniscale);
  };
})();
(function() {
  MocuGame.MocuText = function(a, b, c) {
    MocuGame.MocuSprite.call(this, a, b);
    this.text = c;
    this.font = "14px Helvetica";
    this.fade.r = 0;
    this.fade.g = 0;
    this.fade.b = 0;
    this.align = "left";
    this.doesStroke = !1;
    this.strokeColor = new MocuGame.RGBA(0, 0, 0, 0);
    this.strokeWidth = 1;
  };
  MocuGame.MocuText.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuText.constructor = MocuGame.MocuText;
  MocuGame.MocuText.prototype.draw = function(a, b) {
    if ("undefined" != typeof this.text) {
      if (null == typeof b || "undefined" == typeof b) {
        b = new MocuGame.Point(0, 0);
      }
      a.translate((this.x + b.x) * MocuGame.uniscale, (this.y + this.height / 2 + b.y) * MocuGame.uniscale);
      "center" != this.align && "start" != this.align || a.translate(this.width / 2 * MocuGame.uniscale, 0);
      a.scale(this.flip.x * this.scale.x * 2 * MocuGame.uniscale, this.flip.y * this.scale.y * 2 * MocuGame.uniscale);
      a.rotate(3.14159265359 * this.angle / 180);
      a.globalCompositeOperation = this.drawmode;
      a.globalAlpha = this.alpha;
      a.fillStyle = "rgb( " + Math.ceil(255 * this.fade.r) + ", " + Math.ceil(255 * this.fade.g) + ", " + Math.ceil(255 * this.fade.b) + ")";
      a.strokeStyle = "rgb( " + Math.ceil(255 * this.strokeColor.r) + ", " + Math.ceil(255 * this.strokeColor.g) + ", " + Math.ceil(255 * this.strokeColor.b) + ")";
      a.lineWidth = this.strokeWidth;
      a.font = this.font;
      a.textAlign = this.align;
      for (var c = "", d = this.text.split(" "), e = "", g = 0, f = 0;f < d.length;f += 1) {
        e = c + " " + d[f] + " ", a.measureText(e).width > this.width ? (a.fillText(c, 0, g), this.doesStroke && null != this.strokeColor && a.strokeText(c, 0, g), c = d[f] + " ", g += this.height) : c = e;
      }
      a.fillText(c, 0, g);
      this.doesStroke && null != this.strokeColor && a.strokeText(c, 0, g);
      a.rotate(-(3.14159265359 * this.angle) / 180);
      a.scale(this.flip.x / this.scale.x / (2 * MocuGame.uniscale), this.flip.y / this.scale.y / (2 * MocuGame.uniscale));
      a.translate(-(this.x + b.x) * MocuGame.uniscale, -(this.y + this.height / 2 + b.y) * MocuGame.uniscale);
      "center" != this.align && "start" != this.align || a.translate(-(this.width / 2) * MocuGame.uniscale, 0);
      a.globalCompositeOperation = "source-over";
    }
  };
  MocuGame.MocuText.prototype.animate = function() {
  };
})();
(function() {
  MocuGame.Notification = function(a, b, c, d) {
    MocuGame.MocuText.call(this, a, b, "");
    this.max_delay = d;
    this.fulltext = c;
    this.showtext = "";
    this.delay = this.max_delay;
    this.charloc = 0;
  };
  MocuGame.Notification.prototype = new MocuGame.MocuText(new MocuGame.Point, new MocuGame.Point);
  MocuGame.Notification.constructor = MocuGame.Notification;
  MocuGame.Notification.prototype.update = function(a) {
    MocuGame.MocuText.prototype.update.call(this, a);
    this.charloc <= this.fulltext.length && (this.delay -= 1 * a, 0 >= this.delay && (this.delay = this.max_delay, this.showtext = this.fulltext.substring(0, this.charloc), this.charloc += 1));
    this.text = this.showtext;
  };
  MocuGame.Notification.prototype.restart = function(a) {
    this.charloc = 0;
    this.fulltext = a;
    this.text = this.showtext = "";
  };
})();
(function() {
  MocuGame.MocuGroup = function(a, b) {
    MocuGame.MocuObject.call(this, a, b);
    this.objects = [];
    this.setParent = !0;
    this.cameraTraits = null;
  };
  MocuGame.MocuGroup.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuGroup.constructor = MocuGame.MocuGroup;
  MocuGame.MocuGroup.prototype.update = function(a) {
    MocuGame.MocuObject.prototype.update.call(this, a);
    for (var b = 0;b < this.objects.length;b += 1) {
      this.objects[b].exists && this.objects[b].active && this.objects[b].update(a);
    }
  };
  MocuGame.MocuGroup.prototype.draw = function(a, b) {
    if (null == typeof b || "undefined" == typeof b) {
      b = new MocuGame.Point(0, 0);
    }
    for (var c = 0;c < this.objects.length;c += 1) {
      this.objects[c].visible && this.objects[c].exists && (null != this.objects[c].cameraTraits ? MocuGame.camera.preDraw(a, new MocuGame.Point(0, 0), this.objects[c].cameraTraits) : null != this.cameraTraits && MocuGame.camera.preDraw(a, new MocuGame.Point(0, 0), this.cameraTraits), this.objects[c].draw(a, new MocuGame.Point(this.x + b.x, this.y + b.y)), null != this.objects[c].cameraTraits ? MocuGame.camera.postDraw(a, new MocuGame.Point(0, 0), this.objects[c].cameraTraits) : null != this.cameraTraits && 
      MocuGame.camera.postDraw(a, new MocuGame.Point(0, 0), this.cameraTraits)), null != this.cameraTraits && MocuGame.camera.postDraw(a, new MocuGame.Point(0, 0), this.cameraTraits);
    }
  };
  MocuGame.MocuGroup.prototype.add = function() {
    for (var a = Array.prototype.slice.call(arguments), b = 0;b < a.length;b += 1) {
      for (var c = a[b], d = !1, e = 0;e < this.objects.length;e++) {
        if (!this.objects[e].exists) {
          this.objects[e] = c;
          d = !0;
          break;
        }
      }
      d || this.objects.push(c);
      this.setParent && (c.parent = this);
    }
  };
  MocuGame.MocuGroup.prototype.remove = function() {
    for (var a = Array.prototype.slice.call(arguments), b = 0;b < a.length;b++) {
      var c = this.objects.indexOf(a[b]);
      -1 != c && this.objects.splice(c, 1);
    }
  };
  MocuGame.MocuGroup.prototype.removeAt = function(a) {
    this.objects.splice(a, 1);
  };
  MocuGame.MocuGroup.prototype.copyContentsTo = function(a) {
    a.add.apply(a, this.objects);
  };
})();
(function() {
  MocuGame.MocuTile = function(a, b, c, d) {
    MocuGame.MocuSprite.call(this, a, b, c);
    this.parentTilemap = d;
    this.active = this.animates = !1;
    null != this.parentTilemap && (this.worldPoint.x = this.parentTilemap.x + this.x, this.worldPoint.y = this.parentTilemap.y + this.y);
    this.tileID = -1;
  };
  MocuGame.MocuTile.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuTile.constructor = MocuGame.MocuTile;
})();
(function() {
  MocuGame.MocuTilemap = function(a, b, c, d, e, g) {
    MocuGame.MocuGroup.call(this, a, b);
    this.tileSize = c;
    this.tileSheetLocation = e;
    this.widthInTiles = Math.floor(this.width / this.tileSize.x);
    this.heightInTiles = Math.floor(this.height / this.tileSize.y);
    this.tileArray = MocuGame.createArray(this.widthInTiles, this.heightInTiles);
    this.tileSheetSize = g;
    this.collisionStartingIndex = 0;
    a = d.split(",");
    for (b = 0;b < a.length;b++) {
      if ("_" != a) {
        if ("(" == a[b][0]) {
          d = a[b].substring(1, a[b].length - 1).split(" ");
          e = new MocuGame.MocuTile(new MocuGame.Point(b % this.widthInTiles * c.x, Math.floor(b / this.widthInTiles) * c.y), c, this.tileSheetLocation, this);
          g = "";
          var f = new Number(d[0]);
          e.density = new Number(d[1]) >= this.collisionStartingIndex;
          e.tileID = new Number(d[1]);
          for (var h = 1;h < d.length;h++) {
            var k = new Number(d[h]);
            g += new String(k % (this.tileSheetSize.x / this.tileSize.x)) + "," + new String(Math.floor(k / (this.tileSheetSize.x / this.tileSize.x))) + " ";
          }
          e.addAnimation("Tile", g, f, !0, !1);
          e.play("Tile");
          e.animates = !0;
          this.tileArray[b % this.widthInTiles][Math.floor(b / this.widthInTiles)] = e;
        } else {
          k = new Number(a[b]), e = new MocuGame.MocuTile(new MocuGame.Point(b % this.widthInTiles * c.x, Math.floor(b / this.widthInTiles) * c.y), c, this.tileSheetLocation, this), e.frame.x = k % (this.tileSheetSize.x / this.tileSize.x), e.frame.y = Math.floor(k / (this.tileSheetSize.x / this.tileSize.x)), this.tileArray[b % this.widthInTiles][Math.floor(b / this.widthInTiles)] = e, e.density = k >= this.collisionStartingIndex, e.tileID = k;
        }
        this.add(e);
      }
    }
  };
  MocuGame.MocuTilemap.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuTilemap.constructor = MocuGame.MocuTilemap;
  MocuGame.MocuTilemap.prototype.getTileAtPoint = function(a) {
    if (this.containsPoint(a)) {
      var b = this.getWorldPoint();
      a = new MocuGame.Point(a.x - b.x, a.y - b.y);
      a = new MocuGame.Point(Math.floor(a.x / this.tileSize.x), Math.floor(a.y / this.tileSize.y));
      return this.tileArray[a.x][a.y];
    }
  };
  MocuGame.MocuTilemap.prototype.getTilesInRange = function(a, b) {
    for (var c = this.getWorldPoint(), d = new MocuGame.Point(point.x - c.x, point.y - c.y), c = new MocuGame.Point(Math.floor(d.x / this.tileSize.x), Math.floor(d.y / this.tileSize.y)), d = new MocuGame.Point(Math.ceil(b.x / this.tileSize.x), Math.ceil(d.y / this.size.y)), e = [], g = 0;g < d.x;g++) {
      for (var f = 0;f < d.y;f++) {
        "undefined" !== typeof this.tileArray[c.x + g][c.y + f] && e.push(this.tileArray[c.x + g][c.y + f]);
      }
    }
    return e;
  };
  MocuGame.MocuTilemap.prototype.getDenseTilesInRange = function(a, b) {
    for (var c = this.getWorldPoint(), c = new MocuGame.Point(a.x - c.x, a.y - c.y), c = new MocuGame.Point(Math.floor(c.x / this.tileSize.x), Math.floor(c.y / this.tileSize.y)), d = new MocuGame.Point(Math.ceil(b.x / this.tileSize.x), Math.ceil(b.y / this.tileSize.y)), e = [], g = 0;g < d.x;g++) {
      for (var f = 0;f < d.y;f++) {
        "undefined" !== typeof this.tileArray[c.x + g][c.y + f] && this.tileArray[c.x + g][c.y + f].tileID >= this.collisionStartingIndex && e.push(this.tileArray[c.x + g][c.y + f]);
      }
    }
    return e;
  };
})();
(function() {
  MocuGame.MocuState = function(a) {
    MocuGame.MocuGroup.call(this);
    this.intendedFps = a;
    this.d = new Date;
    this.lastRun = this.d.getTime();
    this.initialized = !1;
    this.currentMusic = this.fadeRect = null;
    this.timeAccumulator = 0;
  };
  MocuGame.MocuState.prototype = new MocuGame.MocuGroup;
  MocuGame.MocuState.constructor = MocuGame.MocuState;
  MocuGame.MocuState.prototype.init = function() {
    this.initialized = !0;
  };
  MocuGame.MocuState.prototype.update = function() {
    if (this.initialized) {
      this.d = new Date;
      var a = this.d.getTime();
      deltaT = a - this.lastRun;
      for (this.timeAccumulator += deltaT;this.timeAccumulator > 1E3 / this.intendedFps;) {
        MocuGame.MocuGroup.prototype.update.call(this, 1), this.fadeRect.update(1), this.timeAccumulator -= 1E3 / this.intendedFps;
      }
      this.lastDeltaT = fixedDeltaT = deltaT / (1E3 / this.intendedFps);
      this.lastRun = a;
    }
  };
  MocuGame.MocuState.prototype.draw = function(a, b) {
    MocuGame.MocuGroup.prototype.draw.call(this, a, b);
    "undefined" != typeof this.fadeRect && this.fadeRect.draw(a, b);
  };
  MocuGame.MocuState.prototype.onTouch = function(a) {
  };
  MocuGame.MocuState.prototype.endState = function() {
    this.objects.splice(0, this.objects.length);
  };
})();
(function() {
  MocuGame.MocuZone = function(a, b) {
    MocuGame.MocuObject.call(this, a, b);
    this.objectsToCheckAgainst = [];
    this.objectsInZone = [];
  };
  MocuGame.MocuZone.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuZone.constructor = MocuGame.MocuZone;
  MocuGame.MocuZone.prototype.zoneObject = function(a) {
    -1 == this.objectsToCheckAgainst.indexOf(a) && this.objectsToCheckAgainst.push(a);
  };
  MocuGame.MocuZone.prototype.unZoneObject = function(a) {
    a = this.objectsToCheckAgainst.indexOf(a);
    -1 != a && this.objectsToCheckAgainst.splice(a, 1);
  };
  MocuGame.MocuZone.prototype.isObjectInZone = function(a) {
    return-1 != this.objectsInZone.indexOf(a);
  };
  MocuGame.MocuZone.prototype.update = function(a) {
    MocuGame.MocuObject.prototype.update.call(this, a);
    for (a = 0;a < this.objectsToCheckAgainst.length;a++) {
      var b = this.objectsToCheckAgainst[a], c = this.objectsInZone.indexOf(b);
      if (-1 == c) {
        this.overlapsWith(b) && (this.objectsInZone.push(b), this.onObjectEntered(b));
      } else {
        if (!this.overlapsWith(b)) {
          this.objectsInZone.slice(c, 1);
          var c = null, c = b.getWorldPoint(), d = this.getWorldPoint(), c = c.y < d.y ? MocuGame.TOP : c.y > d.y + this.height ? MocuGame.BOTTOM : c.x < d.x ? MocuGame.LEFT : MocuGame.RIGHT;
          this.onObjectExited(b, c);
        }
      }
    }
  };
  MocuGame.MocuZone.prototype.onObjectEntered = function(a) {
  };
  MocuGame.MocuZone.prototype.onObjectExited = function(a, b) {
  };
})();
(function() {
  MocuGame.MocuCamera = function(a) {
    MocuGame.MocuGroup.call(this, a, new MocuGame.Point(1, 1));
    this.centerMarker = new MocuGame.MocuObject(new MocuGame.Point(MocuGame.resolution.x / 2, MocuGame.resolution.y / 2), new MocuGame.Point(1, 1));
    this.add(this.centerMarker);
    this.zoom = 1;
    this.angle = 0;
    this.flip = new MocuGame.Point(1, 1);
    this.fadeRect = new MocuGame.MocuObject(new MocuGame.Point(0, 0), new MocuGame.Point(1, 1));
    this.fadeRect.usesFade = !0;
    this.trackingObject = null;
    this.trackingMargins = 0.1;
    this.trackingOffset = new MocuGame.Point(0, 0);
    this.tracksHorizontal = this.tracksVertical = !0;
    this.lastDistance = 0;
  };
  MocuGame.MocuCamera.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuCamera.constructor = MocuGame.MocuCamera;
  MocuGame.MocuCamera.prototype.preDraw = function(a, b, c) {
    a.translate(-(this.x * c.scrollRate.x) + b.x, -(this.y * c.scrollRate.y) + b.y);
    c.doesZoom && a.scale(this.flip.x * this.zoom, this.flip.y * this.zoom);
    c.doesRotate && a.rotate(3.14159265359 * this.angle / 180);
  };
  MocuGame.MocuCamera.prototype.postDraw = function(a, b, c) {
    c.doesRotate && a.rotate(-(3.14159265359 * this.angle / 180));
    c.doesZoom && a.scale(this.flip.x / this.zoom, this.flip.y / this.zoom);
    a.translate(-(-(this.x * c.scrollRate.x) + b.x), -(-(this.y * c.scrollRate.y) + b.y));
  };
  MocuGame.MocuCamera.prototype.chaseTracker = function(a) {
    this.tracksHorizontal && (this.x = this.trackingObject.getWorldPoint().x + this.trackingObject.width / 2 + this.trackingOffset.x - this.centerMarker.x);
    this.tracksVertical && (this.y = this.trackingObject.getWorldPoint().y + this.trackingObject.height / 2 + this.trackingOffset.y - this.centerMarker.y);
  };
  MocuGame.MocuCamera.prototype.update = function(a) {
    MocuGame.MocuGroup.prototype.update.call(this, a);
    null != this.trackingObject && this.chaseTracker(a);
  };
  MocuGame.MocuCamera.prototype.viewPoint = function(a) {
    this.x = a.x - this.centerMarker.x;
    this.y = a.y - this.centerMarker.y;
  };
})();
(function() {
  MocuGame.MocuCameraZone = function(a, b, c, d, e) {
    MocuGame.MocuZone.call(this, a, b);
    this.tracksHorizontal = c;
    this.tracksVertical = d;
    this.lastCamera = null;
    this.lastCameraTracksVertical = this.lastCameraTracksHorizontal = !0;
    this.isZoningCamera = !1;
    this.snapPoint = e;
  };
  MocuGame.MocuCameraZone.prototype = new MocuGame.MocuZone(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuCameraZone.constructor = MocuGame.MocuCameraZone;
  MocuGame.MocuCameraZone.prototype.onObjectEntered = function(a) {
    this.lastCameraTracksHorizontal = MocuGame.camera.tracksHorizontal;
    this.lastCameraTracksVertical = MocuGame.camera.tracksVertical;
    MocuGame.camera.tracksHorizontal = this.tracksHorizontal;
    MocuGame.camera.tracksVertical = this.tracksVertical;
    this.lastCamera = MocuGame.camera;
    null != this.snapPoint && this.lastCamera.viewPoint(this.snapPoint);
  };
  MocuGame.MocuCameraZone.prototype.onObjectExited = function(a, b) {
    MocuGame.camera.tracksHorizontal = this.lastCameraTracksHorizontal;
    MocuGame.camera.tracksVertical = this.lastCameraTracksVertical;
  };
  MocuGame.MocuCameraZone.prototype.kill = function() {
    if (null != this.lastCamera) {
      this.onObjectExited(this.lastCamera);
    }
    MocuGame.MocuObject.prototype.kill.call(this);
  };
  MocuGame.MocuCameraZone.prototype.update = function(a) {
    this.isZoningCamera || null == MocuGame.camera.trackingObject || (this.isZoningCamera = !0, this.zoneObject(MocuGame.camera.trackingObject));
    MocuGame.MocuZone.prototype.update.call(this, a);
  };
})();
(function() {
  MocuGame.MocuEmitter = function(a, b, c, d, e, g) {
    MocuGame.MocuGroup.call(this, a, new MocuGame.Point(500, 500));
    this.particle = b;
    this.speed = c;
    this.particleProperties = d;
    this.randomizedProperties = e;
    this.particleTimeline = g;
    this.subEmitters = new MocuGame.MocuGroup;
    this.add(this.subEmitters);
    this.currentSpawn = this.maxSpawn = 10;
    this.addGroup = MocuGame.currentState;
    this.particleLife = 0;
    this.amountToAdd = 10;
    this.dispAdd = !0;
    this.particleProperties.push.apply(this.particleProperties, MocuGame.MocuEmitter.defaultProperties);
    this.timer = null;
    this.start();
  };
  MocuGame.MocuEmitter.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
  MocuGame.MocuEmitter.constructor = MocuGame.MocuEmitter;
  MocuGame.MocuEmitter.defaultProperties = "x y width height velocity.x velocity.y acceleration.x acceleration.y img".split(" ");
  MocuGame.MocuEmitter.prototype.generateClone = function() {
    var a = new this.particle.constructor;
    a.visible = !0;
    if ("undefined" != typeof this.particleProperties) {
      for (var b = 0;b < this.particleProperties.length;b++) {
        var c = this.particleProperties[b].split(".");
        if (1 < c.length) {
          var d = this.particle, e = c[0];
          "object" == typeof d[e] ? "undefined" == typeof a[e] && (a[e] = new d[e].constructor) : a[e] = d[e];
          var g = a[e], f = 0;
          do {
            d = d[c[f]], g = a[c[f]], e = c[f + 1], g[e] = "object" == typeof d[e] ? new d[e].constructor : d[e], f++;
          } while (f < c.length - 1);
        } else {
          null != this.particle[this.particleProperties[b]] && "undefined" != typeof this.particle[this.particleProperties[b]] && (a[this.particleProperties[b]] = this.particle[this.particleProperties[b]]);
        }
      }
    }
    if ("undefined" != typeof this.particleTimeline) {
      for (b = 0;b < this.particleTimeline.slots.length;b++) {
        c = this.particleTimeline.slots[b];
        d = new MocuGame.TimeSlot(c.time);
        for (e = 0;e < this.particleTimeline.slots[b].events.length;e++) {
          d.addEvent(new MocuGame.Event(a, c.events[e].originalVariableName, c.events[e].startValue, c.events[e].endValue, c.events[e].operationTime, c.events[e].interp));
        }
        a.timeline.addSlot(d);
      }
    }
    if ("undefined" != typeof this.randomizedProperties) {
      for (var h in this.randomizedProperties) {
        if (c = h.split("."), 1 < c.length) {
          d = a;
          f = 0;
          do {
            d = d[c[f]], e = c[f + 1], f++;
          } while (f < c.length - 1);
          d[e] = this.randomizedProperties[h][0] + Math.random() * this.randomizedProperties[h][1];
        } else {
          a[h] = this.randomizedProperties[h][0] + Math.random() * this.randomizedProperties[h][1];
        }
      }
    }
    return a;
  };
  MocuGame.MocuEmitter.prototype.onParticleAdded = function(a) {
  };
  MocuGame.MocuEmitter.prototype.start = function() {
    this.timer = window.setInterval(function() {
      for (var a = 0;a < Math.ceil(this.speed / 60);a++) {
        this.addParticle();
      }
    }.bind(this), 1E3 / this.speed);
  };
  MocuGame.MocuEmitter.prototype.stop = function() {
    window.clearInterval(this.timer);
  };
  MocuGame.MocuEmitter.prototype.addParticle = function() {
    this.addGroup = MocuGame.currentState;
    this.currentSpawn = this.maxSpawn;
    var a = this.generateClone();
    this.addGroup.add(a);
    this.dispAdd && (a.x += this.getWorldPoint().x, a.y += this.getWorldPoint().y);
    a.life = this.particleLife;
    this.onParticleAdded(a);
  };
  MocuGame.MocuEmitter.prototype.kill = function() {
    this.stop();
    MocuGame.MocuObject.prototype.kill.call(this);
  };
})();
(function() {
  MocuGame.MocuSound = function(a, b) {
    b = "undefined" == typeof b || null == typeof b ? 1 : b;
    this.src = a;
    this.volume = b;
    this.audio = AudioFX(a, {formats:["mp3"], pool:1, volumeume:b});
  };
  MocuGame.MocuSound.prototype.play = function() {
    this.audio.play();
    0 < this.audio.audio.currentTime && (this.audio.audio.pause(), this.audio.audio.currentTime = 0, this.audio.audio.play());
  };
})();
(function() {
  MocuGame.MocuMusic = function(a, b, c, d, e) {
    this.audio = MocuGame.preload.getResult(a);
    null == this.audio && (this.audio = new Audio(a));
    this.audio.volume = 0.8;
    this.audio.loop = "undefined" == typeof b ? !0 : b;
    this.loopStart = "undefined" == typeof d ? 0 : d;
    this.loopEnd = "undefined" == typeof e ? this.audio.duration : e;
    this.audio.autoplay = "undefined" == typeof autoplayer ? !0 : c;
    this.loop = b;
    this.canFade = this.isPlaying = !1;
  };
  MocuGame.MocuMusic.DEFAULT_VOLUME = 0.8;
  MocuGame.MocuMusic.prototype.play = function(a) {
    "undefined" == typeof a && (a = !1);
    null == MocuGame.currentMusic || a || MocuGame.currentMusic.stop();
    this.audio.play();
    MocuGame.currentMusic = this;
    null != MocuGame.currentState && (MocuGame.currentState.currentMusic = this, this.canFade = !0);
    this.isPlaying = !0;
  };
  MocuGame.MocuMusic.prototype.stop = function() {
    this.audio.pause();
    this.audio.currentTime = 0;
  };
  MocuGame.MocuMusic.prototype.pause = function() {
    this.audio.pause();
  };
  MocuGame.MocuMusic.prototype.checkLoop = function() {
    this.loop && this.audio.currentTime >= this.loopEnd && (this.audio.currentTime = this.loopStart);
  };
  MocuGame.MocuMusic.prototype.fadeOut = function(a, b, c) {
    if (!1 != this.isPlaying && !1 != this.canFade) {
      var d = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + 1);
      d.addEvent(new MocuGame.Event(this, "audio.volume", "current", 0.005, a));
      a = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + a + 1);
      a.addEvent(new MocuGame.Action(MocuGame.MocuMusic.prototype.stop, this));
      null != b && d.addEvent(new MocuGame.Action(b, c));
      MocuGame.currentState.timeline.addSlot(d);
      MocuGame.currentState.timeline.addSlot(a);
    }
  };
  MocuGame.MocuMusic.prototype.fadeIn = function(a, b, c) {
    !1 == this.isPlaying && this.play(!0);
    if (!1 != this.canFade) {
      var d = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + 1);
      d.addEvent(new MocuGame.Event(this, "audio.volume", 0, MocuGame.MocuMusic.DEFAULT_VOLUME, a));
      a = new MocuGame.TimeSlot(MocuGame.currentState.timeline.currentTime + a + 1);
      null != b && d.addEvent(new MocuGame.Action(b, c));
      MocuGame.currentState.timeline.addSlot(d);
      MocuGame.currentState.timeline.addSlot(a);
    }
  };
})();
(function() {
  MocuGame.objects = [];
  MocuGame.worldPoint = new MocuGame.Point(0, 0);
  MocuGame.currentState = null;
  MocuGame.currentMusic = null;
  MocuGame.Key = Key;
  MocuGame.camera = null;
  MocuGame.MainTimeline = new MocuGame.Timeline;
  MocuGame.targetResolutionWidth = 1920;
  window.requestAnimFrame = function(a) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
      window.setTimeout(a, 1E3 / 60);
    };
  }();
  MocuGame.add = function(a) {
    MocuGame.objects.push(a);
    a.parent = this;
  };
  MocuGame.deg2rad = function(a) {
    return a * Math.PI / 180;
  };
  MocuGame.rad2deg = function(a) {
    return 180 * a / Math.PI;
  };
  MocuGame.angleTo = function(a, b) {
    return MocuGame.rad2deg(Math.atan2(b.y + b.height / 2 - (a.y + a.height / 2), b.x + b.width / 2 - (a.x + a.width / 2)));
  };
  MocuGame.distanceTo = function(a, b) {
    return Math.sqrt(Math.pow(b.y + b.height / 2 - (a.y + a.height / 2), 2) + Math.pow(b.x + b.width / 2 - (a.x + a.width / 2), 2));
  };
  MocuGame.cloneObject = function(a) {
    if (null == a || "object" != typeof a) {
      return a;
    }
    try {
      var b = new a.constructor, c;
      for (c in a) {
        switch(c) {
          case "parent":
            b.parent = a.parent;
            break;
          case "img":
            b.img = a.img;
            break;
          case "events":
            break;
          default:
            b[c] = MocuGame.cloneObj(a[c]);
        }
      }
    } catch (d) {
      console.log("Error caught: " + d.message), console.log("Key is: " + c);
    }
    return b;
  };
  MocuGame.createArray = function(a) {
    var b = Array(a || 0), c = a;
    if (1 < arguments.length) {
      for (var d = Array.prototype.slice.call(arguments, 1);c--;) {
        b[a - 1 - c] = MocuGame.createArray.apply(this, d);
      }
    }
    return b;
  };
  MocuGame.prepareCanvasForWindows8 = function(a, b, c) {
    var d = document.body, e = document.getElementById(a);
    a = e.getContext("2d");
    a.canvas.width = c.x;
    a.canvas.height = c.y;
    MocuGame.canvas = e;
    MocuGame.context = a;
    e = document.createElement("canvas");
    e.id = "blankCanvas";
    e.width = a.canvas.width;
    e.height = a.canvas.height;
    MocuGame.blankCanvas = e;
    MocuGame.blankContext = e.getContext("2d");
    MocuGame.resolution = c;
    MocuGame.gameBounds = b;
    MocuGame.gameWidth = b.x;
    MocuGame.gameHeight = b.y;
    MocuGame.uniscale = MocuGame.resolution.x / MocuGame.targetResolutionWidth;
    MocuGame.camera = new MocuGame.MocuCamera(new MocuGame.Point(0, 0));
    MocuGame.touchenabled = !1;
    MocuGame.isWindows8 = !0;
    navigator.msMaxTouchPoints && 1 < navigator.msMaxTouchPoints && (MocuGame.touchenabled = !0, d.addEventListener("MSPointerDown", MocuGame.onPointerDown, !1), d.addEventListener("MSPointerUp", MocuGame.onPointerUp, !1), d.addEventListener("MSPointerMove", MocuGame.onPointerMove, !1));
  };
  MocuGame.prepareCanvas = function(a, b, c) {
    var d = document.getElementById(a);
    a = d.getContext("2d");
    a.canvas.width = c.x;
    a.canvas.height = c.y;
    MocuGame.canvas = d;
    MocuGame.context = a;
    d = document.createElement("canvas");
    d.id = "blankCanvas";
    d.width = a.canvas.width;
    d.height = a.canvas.height;
    MocuGame.blankCanvas = d;
    MocuGame.blankContext = d.getContext("2d");
    MocuGame.resolution = c;
    MocuGame.gameBounds = b;
    MocuGame.gameWidth = b.x;
    MocuGame.gameHeight = b.y;
    MocuGame.uniscale = MocuGame.resolution.x / MocuGame.targetResolutionWidth;
    MocuGame.camera = new MocuGame.MocuCamera(new MocuGame.Point(0, 0));
  };
  MocuGame.onLoaded = function() {
    console.log("Resources loaded");
  };
  MocuGame.onProgress = function() {
  };
  MocuGame.loadManifests = function(a, b, c) {
    "undefined" != typeof a && (MocuGame.preload.removeAllEventListeners(), MocuGame.preload.loadManifest(a), "undefined" != typeof c && MocuGame.preload.addEventListener("complete", c), "undefined" != typeof progresCallback && MocuGame.preload.addEventListener("progress", progresCallback), MocuGame.preload.load());
  };
  MocuGame.init = function(a, b, c, d) {
    MocuGame.switchState(a);
    MocuGame.pointers = [];
    "undefined" != typeof b && MocuGame.preload.loadManifest(b, !1);
    "undefined" != typeof c && MocuGame.preload.loadManifest(c, !1);
    "undefined" != typeof d && MocuGame.preload.loadManifest(d, !1);
    MocuGame.preload.addEventListener("complete", MocuGame.onLoaded);
    MocuGame.preload.addEventListener("progress", function(a) {
      MocuGame.preloadPercent = Math.floor(100 * a.loaded);
    });
    MocuGame.preload.load();
    MocuGame.animate();
  };
  MocuGame.switchState = function(a, b) {
    MocuGame.objects.length = 0;
    null != MocuGame.currentState && (MocuGame.currentState.objects.length = 0);
    MocuGame.add(a);
    MocuGame.currentState = a;
    MocuGame.currentState.fadeRect = MocuGame.camera.fadeRect;
    !0 != b && "undefined" !== typeof b || MocuGame.currentState.init();
  };
  MocuGame.fadeTo = function(a, b, c, d) {
    var e = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + 1);
    e.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect.fade, "a", 0, a.a, b));
    var g = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + b);
    g.addEvent(new MocuGame.Action(c, d));
    b = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + b + 1);
    b.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "active", !0, !1, 1));
    MocuGame.camera.fadeRect.timeline.addSlot(e);
    MocuGame.camera.fadeRect.timeline.addSlot(g);
    MocuGame.camera.fadeRect.timeline.addSlot(b);
    MocuGame.camera.fadeRect.fade.r = a.r;
    MocuGame.camera.fadeRect.fade.g = a.g;
    MocuGame.camera.fadeRect.fade.b = a.b;
    MocuGame.camera.fadeRect.width = MocuGame.gameBounds.x;
    MocuGame.camera.fadeRect.height = MocuGame.gameBounds.y;
    MocuGame.camera.fadeRect.visible = !0;
    MocuGame.camera.fadeRect.active = !0;
  };
  MocuGame.fadeFrom = function(a, b, c, d) {
    var e = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + 1);
    e.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect.fade, "a", a.a, 0, b));
    var g = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + b);
    g.addEvent(new MocuGame.Action(c, d));
    b = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + b + 1);
    b.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "active", !0, !1, 1));
    b.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "visible", !0, !1, 1));
    MocuGame.camera.fadeRect.timeline.addSlot(e);
    MocuGame.camera.fadeRect.timeline.addSlot(g);
    MocuGame.camera.fadeRect.timeline.addSlot(b);
    MocuGame.camera.fadeRect.fade.r = a.r;
    MocuGame.camera.fadeRect.fade.g = a.g;
    MocuGame.camera.fadeRect.fade.b = a.b;
    MocuGame.camera.fadeRect.width = MocuGame.gameWidth;
    MocuGame.camera.fadeRect.height = MocuGame.gameHeight;
    MocuGame.camera.fadeRect.visible = !0;
    MocuGame.camera.fadeRect.active = !0;
  };
  MocuGame.animate = function() {
    var a = MocuGame.context, b = MocuGame.blankContext;
    a.clearRect(0, 0, MocuGame.canvas.width, MocuGame.canvas.height);
    b.clearRect(0, 0, MocuGame.blankCanvas.width, MocuGame.blankCanvas.height);
    for (b = 0;b < MocuGame.objects.length;b++) {
      MocuGame.objects[b].exists && MocuGame.objects[b].active && MocuGame.objects[b].update();
    }
    MocuGame.camera.update(MocuGame.currentState.lastDeltaT);
    for (b = 0;b < MocuGame.objects.length;b++) {
      MocuGame.objects[b].exists && MocuGame.objects[b].visible && MocuGame.objects[b].draw(a, new MocuGame.Point(0, 0));
    }
    null != MocuGame.currentMusic && MocuGame.currentMusic.checkLoop();
    requestAnimFrame(function() {
      MocuGame.animate();
    });
  };
  MocuGame.updatePointers = function(a, b) {
    for (var c = 0, d = 0;d < MocuGame.pointers.length;d += 1) {
      MocuGame.pointers[d].ID == a.pointerId && (MocuGame.pointers[d].updatePosition(a, b), c = d);
    }
    c ? c = MocuGame.pointers[c] : (c = new MocuGame.Pointer(a, b), MocuGame.pointers.push(c));
    switch(a.pointerType) {
      case a.MSPOINTER_TYPE_TOUCH:
        MocuGame.currentState.onTouch(c);
        break;
      case a.MSPOINTER_TYPE_PEN:
        MocuGame.currentState.onPen(c);
        break;
      case a.MSPOINTERTYPE_MOUSE:
        MocuGame.currentState.onMouse(c);
    }
  };
  MocuGame.onPointerDown = function(a) {
    MocuGame.updatePointers(a, !0);
  };
  MocuGame.onPointerUp = function(a) {
    MocuGame.updatePointers(a, !1);
  };
  MocuGame.onPointerMove = function(a) {
    MocuGame.updatePointers(a, !0);
  };
  MocuGame.saveLocalData = function(a, b, c, d) {
    !0 == MocuGame.isWindows8 ? Windows.Storage.ApplicationData.current.localFolder.createFileAsync(a, Windows.Storage.CreationCollisionOption.replaceExisting).then(function(a) {
      Windows.Storage.FileIO.writeTextAsync(a, b);
    }).done(function() {
      "undefined" != typeof c && c.call(d);
    }) : document.cookie = " " + a + "=" + escape(b) + ";";
  };
  MocuGame.loadLocalData = function(a, b, c, d) {
    if (!0 == MocuGame.isWindows8) {
      return Windows.Storage.ApplicationData.current.localFolder.getFileAsync(a).then(function(a) {
        Windows.Storage.FileIO.readTextAsync(a).done(function(a) {
          "undefined" != typeof b && b.call(c, a);
          return a;
        });
      }).done(function(a) {
      }, function(a) {
        console.log(a);
        !0 != d && "undefined" != typeof d || "undefined" == typeof b || b.call(c, null);
        return null;
      }), null;
    }
    a = document.cookie;
    var e = a.indexOf(" " + a + "=");
    if (-1 == e) {
      return null;
    }
    var g = a.indexOf(";", e);
    if (-1 == g) {
      return null;
    }
    a = a.substring(e, g);
    "undefined" != typeof b && b.call(c, a);
    return unescape(a);
  };
})();
