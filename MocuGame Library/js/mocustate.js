(function () {
    MocuGame.MocuState = function (fps) {
        MocuGame.MocuGroup.call(this);
        this.intendedFps = fps;
        this.d = new Date();
        this.lastRun = this.d.getTime();
        this.initialized = false;
    }
    MocuGame.MocuState.prototype = new MocuGame.MocuGroup;
    MocuGame.MocuState.constructor = MocuGame.MocuState;

    MocuGame.MocuState.prototype.init = function () {
        //Can't remember what was here
        this.initialized = true;
    }
    MocuGame.MocuState.prototype.update = function () {
        if (!this.initialized)
            return;
        this.d = new Date();
        var currentRun = this.d.getTime();

        deltaT = (currentRun - this.lastRun);
       
        fixedDeltaT = deltaT / (1000 / this.intendedFps);
        this.lastDeltaT = fixedDeltaT;
        //console.log("Time diff is " + deltaT + " " + fixedDeltaT);
        this.lastRun = currentRun;
        if(fixedDeltaT < 20)
            MocuGame.MocuGroup.prototype.update.call(this, fixedDeltaT);
        this.fadeRect.update(fixedDeltaT);
    }
    MocuGame.MocuState.prototype.draw = function (context, point) {
        MocuGame.MocuGroup.prototype.draw.call(this, context, point);
        if (typeof this.fadeRect != "undefined")
            this.fadeRect.draw(context, point);
    }
    MocuGame.MocuState.prototype.refresh = function () {
        this.d = new Date();
        var currentRun = this.d.getTime();
        this.lastRun = currentRun;
    }
    MocuGame.MocuState.prototype.touch = function (pointer) {
        //Nothing for now
    }
    MocuGame.MocuState.prototype.endState = function () {
        this.objects.length = 0;
    }

})();