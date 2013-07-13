
(function () {

    //MocuGame.gameWidth = 2732*1.5;
    //MocuGame.gameHeight = 1536*1.5;
    MocuGame.objects = new Array();
    MocuGame.fadeRect = new MocuGame.MocuObject(new MocuGame.Point(0, 0), new MocuGame.Point(1, 1));
    MocuGame.worldPoint = new MocuGame.Point(0, 0);
    MocuGame.fadeRect.usesFade = true;
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
    MocuGame.add = function (object) {
        MocuGame.objects.push(object)
        object.parent = this;
    }
    MocuGame.deg2rad = function (num) {
        return num * Math.PI / 180;
    }
    MocuGame.rad2deg = function (num) {
        return num * 180 / Math.PI;
    }
    MocuGame.angleTo = function (obj1, obj2) {
        return Math.atan2((obj2.y + obj2.height / 2) - (obj1.y + obj1.height/2), (obj2.x + obj2.width / 2) - (obj1.x + obj1.width / 2)); //in radians
    }
    MocuGame.distanceTo = function (obj1, obj2) {
        return Math.sqrt(Math.pow(((obj2.y + obj2.height/2) - (obj1.y + obj1.height/2)), 2) + Math.pow(((obj2.x + obj2.width/2) - (obj1.x + obj1.width/2)), 2));
    }
    MocuGame.cloneObj = function (object) {
        if (object == null || typeof object != 'object') {
            return object;
        }
        try {
        var temp = new object.constructor(); // give temp the original obj's constructor
        for (var key in object) {
           
                switch(key)
                {
                    //if (key != "img" && key != "events")
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
                        //temp.events = new Array();
                        break;
                    default:
                    {
                        temp[key] = MocuGame.cloneObj(object[key]);
                       
                    }
                    break;
                }
            }

            
            //temp["img"] = MocuGame.cloneObj(object["img"]);
        }
        catch (err) {
            console.log("Error caught: " + err.message);
            console.log("Key is: " + key);
        }
        return temp;
        
    }

    MocuGame.init = function () {

        MocuGame.MasterQuad = new MocuGame.MocuQuad(new MocuGame.Point(0, 0), new MocuGame.Point(MocuGame.gameWidth, MocuGame.gameHeight), 1, 0, null);
        MocuGame.pointers = new Array();
        MocuGame.preload.loadManifest(MocuGame.imageManifest, false);
        MocuGame.preload.loadManifest(MocuGame.musicManifest, false);
        MocuGame.preload.loadManifest(MocuGame.soundManifest, false);
        MocuGame.preload.addEventListener("complete", MocuGame.onLoaded);
        MocuGame.preload.addEventListener("progress", function (event) { MocuGame.preloadPercent = Math.floor(event.loaded*100); });
        MocuGame.preload.load();
    }
    MocuGame.switchState = function (state) {
        MocuGame.objects.length = 0;
        if (MocuGame.currentState != undefined) MocuGame.currentState.objects.length = 0;
        MocuGame.add(state);
        MocuGame.currentState = state;
        MocuGame.currentState.init();
        MocuGame.currentState.fadeRect = MocuGame.fadeRect;
    }
    MocuGame.fadeTo = function (rgba, time, callback, caller) {
        var slot = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + 1);
        slot.addEvent(new MocuGame.Event(MocuGame.fadeRect.fade, "a", 0, rgba.a, time));
        var slot2 = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + time);
        slot2.addEvent(new MocuGame.Action(callback, caller));
        var slot3 = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.fadeRect, "active", true, false, 1));
        MocuGame.fadeRect.timeline.addSlot(slot);
        MocuGame.fadeRect.timeline.addSlot(slot2);
        MocuGame.fadeRect.timeline.addSlot(slot3);
        MocuGame.fadeRect.fade.r = rgba.r;
        MocuGame.fadeRect.fade.g = rgba.g;
        MocuGame.fadeRect.fade.b = rgba.b;
        MocuGame.fadeRect.width = MocuGame.gameWidth;
        MocuGame.fadeRect.height = MocuGame.gameHeight;
        MocuGame.fadeRect.visible = true;
        MocuGame.fadeRect.active = true;
    }
    MocuGame.fadeFrom = function (rgba, time, callback, caller) {
        var slot = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + 1);
        slot.addEvent(new MocuGame.Event(MocuGame.fadeRect.fade, "a", rgba.a, 0, time));
        var slot3 = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.fadeRect, "active", true, false, 1));
        slot3.addEvent(new MocuGame.Event(MocuGame.fadeRect, "visible", true, false, 1));
        MocuGame.fadeRect.timeline.addSlot(slot);
        MocuGame.fadeRect.timeline.addSlot(slot3);
        MocuGame.fadeRect.fade.r = rgba.r;
        MocuGame.fadeRect.fade.g = rgba.g;
        MocuGame.fadeRect.fade.b = rgba.b;
        MocuGame.fadeRect.width = MocuGame.gameWidth;
        MocuGame.fadeRect.height = MocuGame.gameHeight;
        MocuGame.fadeRect.visible = true;
        MocuGame.fadeRect.active = true;
        callback.call(caller);
    }
    MocuGame.animate = function () {
        var canvas = document.getElementById('myCanvas');
        var blankCanvas = document.getElementById('blankCanvas');
        var context = canvas.getContext('2d');
        var blankContext = blankCanvas.getContext('2d');
        

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);
        blankContext.clearRect(0, 0, blankCanvas.width, blankCanvas.height);
        for (var i = 0; i < MocuGame.objects.length; i++) {
            if (MocuGame.objects[i].exists) {
                if (MocuGame.objects[i].active)
                    MocuGame.objects[i].update();
                if(MocuGame.objects[i].visible)
                    MocuGame.objects[i].draw(context, new MocuGame.Point(0, 0));
          
            }
        }

        if (MocuGame.currentMusic != null) MocuGame.currentMusic.checkLoop();

        // request new frame
        requestAnimFrame(function () {
            MocuGame.animate();
        });
    }
    MocuGame.updatePointers = function(e, down)
    {
        if (e.pointerType != e.MSPOINTER_TYPE_TOUCH)
            return;
        var found = 0;
        var pointer;
        for (var i = 0; i < MocuGame.pointers.length; i += 1) {
            if (MocuGame.pointers[i].ID == e.pointerId) {
                MocuGame.pointers[i].updatePos(e, down);
                found = 1;
                pointer = MocuGame.pointers[i];
            }
        }
        if (!found) {
            pointer = new MocuGame.Pointer(e, down);
            MocuGame.pointers.push(pointer);
        }
        MocuGame.currentState.touch(pointer);
    }
    MocuGame.onPointerDown = function (e) {
        MocuGame.updatePointers(e, true);
    }
    MocuGame.onPointerUp = function (e) {
        MocuGame.updatePointers(e, false);
    }
    MocuGame.onPointerMove = function (e) {
        MocuGame.updatePointers(e, true);
    }
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
    }
    MocuGame.loadLocalData = function (name, callback, caller, alwaysCallback) {
        if (MocuGame.isWindows8 == true) {
            var local = Windows.Storage.ApplicationData.current.localFolder;
            console.log("Got here?" + data);
            local.getFileAsync(name).then(function (file) {

                Windows.Storage.FileIO.readTextAsync(file).done(function (data) {
                    if (typeof callback != "undefined")
                        callback.call(caller, data);
                    return data;
                });
            }).done(function (file) {
            }, function (error) {
                console.log("Nothing to load");
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
    }

}
)();