/*
    mocuanimation.js

    Object that handles animating through a series of coordinate frames, used in conjunction with
    the MocuSprite class.

    TODO: Put license here

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

    MocuGame.MocuAnimation = function(name, coords, speed, doesLoop)
    {
        this.name = name;
        coords = (typeof coords == 'undefined' || typeof coords == null) ? "0,0" : coords;
        this.speed = Math.round(Math.max(speed, 100));
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
            var newloc = new MocuGame.Point(0, 0);
            var subtokens = tokens[i].split(",");
            newloc.x = subtokens[0];
            newloc.y = subtokens[1];
            this.coordinates.push(newloc);
        }

        this.timer = null;
        this.isPlaying = false;
    }

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
    }
    
    /*
        start is a function which starts the animation update timer.
    */
    MocuGame.MocuAnimation.prototype.start = function () {
        this.timer = window.setTimeout( MocuGame.MocuAnimation.prototype.update.bind(this)
        , 1000 / this.speed, this);
    }

    /*
        stop is a function which ends the animation update timer.
    */

    MocuGame.MocuAnimation.prototype.stop = function () {
        window.clearTimeout(this.timer);
    }

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
    }
})();