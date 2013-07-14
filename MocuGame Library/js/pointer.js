/*
    pointer.js
    Object which stores a pointer (Mouse, Pen, Touch) event and related information.

    TODO: Put license here

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
    }

    /*
        updatePosition is a function which updates the position of the Pointer.

        Parameters:
        e (Object)
        - The pointer's event.
        down (Boolean)
        - True if the pointer is down
    */

    MocuGame.Pointer.prototype.updatePosition = function (e, down) {
        this.lastPosition = new MocuGame.Point(this.pos.x, this.pos.y);
        this.position = new MocuGame.Point(e.clientX / MocuGame.uniscale, e.clientY / MocuGame.uniscale);
        this.isDown = down;
    }
})();