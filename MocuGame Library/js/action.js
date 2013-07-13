(function () {
    MocuGame.Action = function (callback, obj) {
        this.callback = callback;
        this.obj = obj;
        this.elapsed = false;
        this.lastval = null;
        this.started = false;
        this.current_time = 0;
    }
    MocuGame.Action.prototype.start = function () {
        this.callback.call(this.obj);
        this.started = true;
    }
    MocuGame.Action.prototype.update = function (currentTime, deltaT) {
        if (!this.started)
            this.start();
    }
})();