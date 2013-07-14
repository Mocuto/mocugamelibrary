/*
    mocugame.js
    Object is the core of the MocuGame library. Is the main MocuGroup as well as containing references
    to the canvas object, context object, and blank canvas object.
    
    Also contains many helper functions.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    MocuGame.objects = new Array();
    MocuGame.currentState = null;
    MocuGame.fadeRect = new MocuGame.MocuObject(new MocuGame.Point(0, 0), new MocuGame.Point(1, 1));
    MocuGame.worldPoint = new MocuGame.Point(0, 0);
    MocuGame.fadeRect.usesFade = true;
    MocuGame.targetResolutionWidth = 1920;
    MocuGame.Key = Key;

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
    }

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
    }

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
    }

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
    }

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
    }

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
    }
    MocuGame.prepareCanvasForWindows8 = function (canvasId, gameBounds, resolution) {
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

        MocuGame.resolution = resolution;
        MocuGame.gameBounds = gameBounds;
        MocuGame.uniscale = Math.ceil(MocuGame.targetResolutionWidth / MocuGame.resolution.x);

        MocuGame.touchenabled = false;
        MocuGame.isWindows8 = true;
        if (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1) {
            MocuGame.touchenabled = true;
            body.addEventListener("MSPointerDown", MocuGame.onPointerDown, false);
            body.addEventListener("MSPointerUp", MocuGame.onPointerUp, false);
            body.addEventListener("MSPointerMove", MocuGame.onPointerMove, false);
        }
    }

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

    }

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

    MocuGame.loadManifests(manifest, progressCallback, completeCallback)
    {
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
    }

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
    }

    /*
        switchState is a function which clears
        all objects from the currentState, then switches the current MocuState to the one specified.

        Parameters:
        state (MocuState)
        - The MocuState to switch to.
    */

    MocuGame.switchState = function (state) {
        MocuGame.objects.length = 0;

        if (MocuGame.currentState != null) {
            MocuGame.currentState.objects.length = 0;
        }
        MocuGame.add(state);
        MocuGame.currentState = state;
        MocuGame.currentState.fadeRect = MocuGame.fadeRect;
    }

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

        MocuGame.fadeRect.width = MocuGame.gameBounds.x;
        MocuGame.fadeRect.height = MocuGame.gameBounds.y;
        MocuGame.fadeRect.visible = true;
        MocuGame.fadeRect.active = true;
    }

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
        var slot = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + 1);
        slot.addEvent(new MocuGame.Event(MocuGame.fadeRect.fade, "a", rgba.a, 0, time));

        var slot2 = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + time);
        slot2.addEvent(new MocuGame.Action(callback, caller));

        var slot3 = new MocuGame.TimeSlot(MocuGame.fadeRect.timeline.currenttime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.fadeRect, "active", true, false, 1));
        slot3.addEvent(new MocuGame.Event(MocuGame.fadeRect, "visible", true, false, 1));

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

    /*
        animate is a function which updates all objects and then draws them to the canvas. Then it
        requests another animation from (requestAnimFrame), doing it all over again.

        This function is the powerhouse of the game.
    */

    MocuGame.animate = function () {
        // clear
        context.clearRect(0, 0, MocuGame.canvas.width, MocuGame.canvas.height);
        blankContext.clearRect(0, 0, MocuGame.blankCanvas.width, MocuGame.blankCanvas.height);
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
                MocuGame.pointers[i].updatePos(e, down);
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
        switch(pointer.pointerType)
        {
            case MSPOINTER_TYPE_TOUCH:
                MocuGame.currentState.onTouch(pointer);
                break;
            case MSPOINTER_TYPE_PEN:
                MocuGame.currentState.onPen(pointer);
                break;
            case MSPOINTERTYPE_MOUSE:
                MocuGame.currentState.onMouse(pointer);
                break;
        }
    }

    /*
        onPointerDown is a callback which is called when a PointerDown event is called.
        Calls updatePointers.

        Parameters:
        e (Object)
        - The event in which the pointer is stored
    */

    MocuGame.onPointerDown = function (e) {
        MocuGame.updatePointers(e, true);
    }

    /*
        onPointerUp is a callback which is called when a PointerUp event is called.
        Calls updatePointers

        Parameters:
        e (Object)
        - The event in which the pointer is stored
    */

    MocuGame.onPointerUp = function (e) {
        MocuGame.updatePointers(e, false);
    }

    /*
        onPointerMove is a callback which is called when a PointerMove event is called.
        Calls updatePointers.

        Parameters:
        e (Object)
        - The event in which the pointer is stored
    */

    MocuGame.onPointerMove = function (e) {
        MocuGame.updatePointers(e, true);
    }

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
    }

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
    }
 

}
)();