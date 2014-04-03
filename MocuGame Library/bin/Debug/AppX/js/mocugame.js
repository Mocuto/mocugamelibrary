/*
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
        context.imageSmoothingEnabled = false;
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
        MocuGame.uniscale = Math.ceil((MocuGame.resolution.x / MocuGame.targetResolutionWidth) * 10) / 10;

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

    MocuGame.prepareCanvasForWindows81 = function (canvasId, gameBounds, resolution) {

        var body = document.body;
        var canvas = document.getElementById(canvasId);
        var context = canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true, premultipliedAlpha: true});
        context.canvas.width = resolution.x + 1;
        context.canvas.height = resolution.y + 1;
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
        MocuGame.uniscale = Math.ceil((MocuGame.resolution.x / MocuGame.targetResolutionWidth) * 10) / 10;

        MocuGame.camera = new MocuGame.MocuCamera(new MocuGame.Point(0, 0));

        MocuGame.renderer = new MocuGame.MocuRenderer(context)

        MocuGame.touchenabled = false;
        MocuGame.isWindows8 = true;
        if (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1) {
            MocuGame.touchenabled = true;
            document.body.addEventListener("MSPointerDown", MocuGame.onPointerDown, false);
            document.body.addEventListener("MSPointerUp", MocuGame.onPointerUp, false);
            document.body.addEventListener("MSPointerMove", MocuGame.onPointerMove, false);
        }
        MocuGame.isWindows81 = true;



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

    MocuGame.init = function (state, imageManifest, musicManifest, soundManifest, shaderManifest) {

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

        if (typeof shaderManifest != "undefined") {
            MocuGame.preload.loadManifest(shaderManifest, false);
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

        if (callback != null) {
            var slot2 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time);
            slot2.addEvent(new MocuGame.Action(callback, caller));
            MocuGame.camera.fadeRect.timeline.addSlot(slot2);
        }

        var slot3 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "active", true, false, 1));

        MocuGame.camera.fadeRect.timeline.addSlot(slot);
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
        var slot = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime);
        slot.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect.fade, "a", rgba.a, 0, time));

        if (callback != null && typeof callback !=="undefined") {
            var slot2 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time);
            slot2.addEvent(new MocuGame.Action(callback, caller));
            MocuGame.camera.fadeRect.timeline.addSlot(slot2);
        }

        var slot3 = new MocuGame.TimeSlot(MocuGame.camera.fadeRect.timeline.currentTime + time + 1);
        slot3.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "active", true, false, 1));
        slot3.addEvent(new MocuGame.Event(MocuGame.camera.fadeRect, "visible", true, false, 1));

        MocuGame.camera.fadeRect.timeline.addSlot(slot);
        MocuGame.camera.fadeRect.timeline.addSlot(slot3);

        MocuGame.camera.fadeRect.fade.r = rgba.r;
        MocuGame.camera.fadeRect.fade.g = rgba.g;
        MocuGame.camera.fadeRect.fade.b = rgba.b;

        MocuGame.camera.fadeRect.width = MocuGame.gameWidth;
        MocuGame.camera.fadeRect.height = MocuGame.gameHeight;
        MocuGame.camera.fadeRect.visible = true;
        MocuGame.camera.fadeRect.active = true;
    };

    MocuGame.clearContext = function (context) {
        if(MocuGame.isWindows81 == true)
        {
            context.clearColor(0.0, 0.0, 0.0, 0.0);
            context.clear(context.COLOR_BUFFER_BIT);
        }
        else {
            context.clearRect(0, 0, MocuGame.canvas.width, MocuGame.canvas.height);
            MocuGame.blankContext.clearRect(0, 0, MocuGame.blankCanvas.width, MocuGame.blankCanvas.height);
        }
    }

    /*
        animate is a function which updates all objects and then draws them to the canvas. Then it
        requests another animation from (requestAnimFrame), doing it all over again.

        This function is the powerhouse of the game.
    */

    MocuGame.animate = function () {
        // clear
        var context = MocuGame.context;
        var blankContext = MocuGame.blankContext;
        MocuGame.clearContext(context);
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
        if (MocuGame.currentState == null) {
            return;
        }
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
        if (MocuGame.isWindows81)
        {
            switch(e.pointerType)
            {
                case "touch":
                    MocuGame.currentState.onTouch(pointer);
                    break;
                case "pen":
                    MocuGame.currentState.onPen(pointer);
                    break;
                case "mouse":
                    MocuGame.currentState.onMouse(pointer);
                    break;
            }
        }
        else {
            switch (e.pointerType) {
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

    MocuGame.loadServerFile = function (url, data, callback, errorCallback) {
        // Set up an asynchronous request
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
      
        // Hook the event that gets called as the request progresses
        request.onreadystatechange = function () {
            // If the request is "DONE" (completed or failed)
            if (request.readyState == 4) {
                // If we got HTTP status 200 (OK)
                if (request.status == 200) {
                    //callback(request.responseText, data)
                } else { // Failed
                    //errorCallback(url);
                }
            }
        };

        request.send()
        return request;
    }
}
)();


MocuGame.DEFAULT_VERTEX_SHADER = new MocuGame.MocuShader("js/mocugame-vertex.shader", MocuGame.SHADER_TYPE_VERTEX);
MocuGame.DEFAULT_FRAGMENT_SHADER = new MocuGame.MocuShader("js/mocugame-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT);
MocuGame.DEFAULT_SPRITE_VERTEX_SHADER = new MocuGame.MocuShader("js/mocugame-sprite-vertex.shader", MocuGame.SHADER_TYPE_VERTEX);
MocuGame.DEFAULT_SPRITE_FRAGMENT_SHADER = new MocuGame.MocuShader("js/mocugame-sprite-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT);
MocuGame.DEFAULT_BACKGROUND_FRAGMENT_SHADER = new MocuGame.MocuShader("js/mocugame-background-fragment.shader", MocuGame.SHADER_TYPE_FRAGMENT);