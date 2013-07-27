/*
    action.js
    Component of the Timeline System. Calls a specific function when updated.

    TODO: Put license here

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
        this.lastval = null;
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
})();