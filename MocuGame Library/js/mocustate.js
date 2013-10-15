/*
    mocustate.js
    Object derived from MocuGroup. Controls the current state of the game.

    TODO: Put license here

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
        
        this.obj = new MocuGame.MocuObject(new MocuGame.Point(0, 0), new MocuGame.Point(32, 32));
        this.obj.visible = true;
        //this.obj.velocity.x = 1;
        //this.obj.cameraTraits.scrollRate.x = 0;
        //this.obj.cameraTraits.scrollRate.y = 0;
        //this.obj.acceleration.y = 1;
        //this.obj.restitution = 0.5;
        this.add(this.obj);
        MocuGame.camera.trackingObject = this.obj;
        
        this.obj2 = new MocuGame.MocuTilemap(new MocuGame.Point(0, 240), new MocuGame.Point(64, 64), new MocuGame.Point(32, 32),
    "_,_,(5 2 3 0 1),(5 3 0 1 2)", "images/sampletile.png", new MocuGame.Point(64, 64));
        this.obj2.collisionStartingIndex = 2;
        this.obj2.visible = true;
        this.add(this.obj2);
    };
    MocuGame.MocuState.prototype = new MocuGame.MocuGroup;
    MocuGame.MocuState.constructor = MocuGame.MocuState;

    /*
        init is a function which makes the state as initialized;
    */

    MocuGame.MocuState.prototype.init = function () {

        this.initialized = true;
    };

    /*
        update is a function inherited from MocuGroup which updates all of the objects contained
        within the state.

    */
    MocuGame.MocuState.prototype.update = function () {
    	//TODO: Experiment with semi-fixed timesteps here, which will be fun
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
			this.obj.collidesWithTilemap(this.obj2);
        }
       
        fixedDeltaT = deltaT / (1000 / this.intendedFps);
        this.lastDeltaT = fixedDeltaT;
        //console.log("Time diff is " + deltaT + " " + fixedDeltaT);
        this.lastRun = currentRun;
        //if(fixedDeltaT < 20)
            //MocuGame.MocuGroup.prototype.update.call(this, 1);
        //this.fadeRect.update(fixedDeltaT);
		

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

    MocuGame.MocuState.prototype.touch = function (pointer) {
        //Nothing for now
    };

    /*
        endState is a function which clears all objects from the MocuState.
    */

    MocuGame.MocuState.prototype.endState = function () {
        this.objects.splice(0, this.objects.length);
    };

})();