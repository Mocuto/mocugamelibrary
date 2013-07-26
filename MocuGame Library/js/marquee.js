/*
    marquee.js
    Child of the MocuText Object. Text that supports a horizontal scrolling marquee effect.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    
    /*
        Marquee constructor. Initializes the marquee with its text, size, and rate of scrolling.
    */

    MocuGame.Marquee = function (point, size, text, rate) {
        MocuGame.MocuText.call(this, point, size, text);
        this.rate = rate;
        this.scrollPosition = 0;
        this.doesRestart = true;
        this.restartDelay = 1;
        this.renderWidth = 0;
        this.restarting = false;
        this.preDraw();
        this.scrollWidth = this.renderWidth * 2;
        this.scrollStops = new Array(this.width, this.scrollWidth);
        this.autoResetStops = true;
        this.ended = false;
    }
    MocuGame.Marquee.prototype = new MocuGame.MocuText(new MocuGame.Point, new MocuGame.Point);
    MocuGame.Marquee.constructor = MocuGame.Marquee;

    /*
        update is a function which is inherited from MocuText. Updates the Marquees position.

        Parameters:
        deltaT (Number)
        - Time elapsed since the last update call, in frames.
    */

    MocuGame.Marquee.prototype.update = function (deltaT) {
        MocuGame.MocuText.prototype.update.call(this, deltaT);
        if(!this.restarting && !this.ended)
            this.scrollPosition += this.rate * deltaT;
        var longside = (this.width > this.renderWidth) ? 0 : 1;
        if (this.scrollPosition > this.scrollStops[longside] || this.scrollPosition < -this.scrollStops[!longside * 1]) {
            if(!this.restarting && this.doesRestart)
                this.restart(this.scrollPosition - this.renderWidth);
            else if(!this.doesRestart)
                this.onEnd();
        }
    }

    /*
        onEnd is a callback which is called when the marquee has reached an endPoint, but only if
        doesRestart is set to false
    */

    MocuGame.Marquee.prototype.onEnd = function () {
        this.ended = true;
    }

    /*
        restart is a function which resets the scrollPosition to either the very left or very right.

        Parameters:
        num (Number)
        - if the number is > 0, the scrollPosition is set to the very left, else it is set to the very
        - right
    */

    MocuGame.Marquee.prototype.restart = function (num) {
        var slot = new MocuGame.TimeSlot(this.timeline.currentTime + this.restartDelay);
        slot.addEvent(new MocuGame.Event(this, "restarting", false, false, 1));
        if (num > 0) {
            slot.addEvent(new MocuGame.Event(this, "scrollPosition", 1, -2*this.renderWidth + 1, 1));
            this.scrollPosition = - (this.renderWidth * 2) + 1;
        }
        else {
            slot.addEvent(new MocuGame.Event(this, "scrollPosition", 1, this.width - 2, 1));
            this.scrollPosition = this.width - 1;
        }
        this.timeline.addSlot(slot);
        this.restarting = true;
    }
    /*
        preDraw is a function that prerenders the text onto the blankCanvas.
    */
    MocuGame.Marquee.prototype.preDraw = function () {
        var blankCanvas = MocuGame.blankCanvas;
        var blankContext = blankCanvas.getContext('2d');
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        //Set the font and color and alignment
        blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
        blankContext.strokeStyle = "rgb( " + Math.ceil(this.strokeColor.r * 255) + ", " + Math.ceil(this.strokeColor.g * 255) + ", " + Math.ceil(this.strokeColor.b * 255) + ")";
        blankContext.strokeWidth = this.strokeWidth;
        blankContext.textAlign = this.align;
        blankContext.font = this.font;
        blankContext.globalAlpha = 1;
        blankContext.fillText(this.text, 0, this.height);
        if (this.doesStroke && this.strokeColor != null)
            blankContext.strokeText(this.text, 0, this.height);
        this.renderWidth = blankContext.measureText(this.text).width;
        this.scrollWidth = this.renderWidth * 2;
        if (this.autoResetStops)
            this.scrollStops = [this.width, this.scrollWidth];
        return blankCanvas;
    }
    /*
        draw is a function which is inherited from MocuText. Draws the Marquee onto the canvas.

        Parameters:
        context (Object)
        - The game canvas' context.
        displacement (MocuPoint)
        - The displacement of the object, based off its parent's position.
    */
    MocuGame.Marquee.prototype.draw = function (context, displacement) {
        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);


        context.translate(((this.x + displacement.x)) * MocuGame.uniscale, ((this.y) + displacement.y) * MocuGame.uniscale);
        if (this.align == "center" || this.align == "start")
            context.translate((this.width / 2) * MocuGame.uniscale, 0);

        context.scale(this.flip.x * this.scale.x * (MocuGame.uniscale * 2), this.flip.y * this.scale.y * (MocuGame.uniscale * 2));
        context.rotate((this.angle * 3.14159265359) / 180);

        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;

        var blankCanvas = this.predraw();

        var firstWidth = ((this.scrollPosition * MocuGame.uniscale) + (this.scrollWidth * MocuGame.uniscale) < this.width * MocuGame.uniscale) ? (this.scrollWidth * MocuGame.uniscale) : (this.width * MocuGame.uniscale) - (this.scrollPosition * MocuGame.uniscale);
        var secondWidth = ((this.scrollPosition * MocuGame.uniscale) + (this.scrollWidth * MocuGame.uniscale) > this.width * MocuGame.uniscale) ? (this.scrollPosition * MocuGame.uniscale) + (this.scrollWidth * MocuGame.uniscale) - (this.width * MocuGame.uniscale) : 0;
        if (this.scrollPosition < 0) {
            firstWidth = (this.scrollWidth * MocuGame.uniscale) + (this.scrollPosition * MocuGame.uniscale);
            secondWidth = (this.scrollPosition * MocuGame.uniscale);
        }
        context.save();
        context.rect(0, -this.height * MocuGame.uniscale, this.width * MocuGame.uniscale, this.height * 2 * MocuGame.uniscale);
        context.clip();

        context.drawImage(blankCanvas, (this.scrollPosition > 0) ? 0 : -this.scrollPosition * MocuGame.uniscale, 0, firstWidth, this.height,
            (this.scrollPosition > 0) ? (this.scrollPosition * MocuGame.uniscale) : 0, -this.height * MocuGame.uniscale,
            firstWidth, this.height * MocuGame.uniscale * 2);

        context.restore();

        blankCanvas.getContext('2d').clearRect(0, 0, blankCanvas.width, blankCanvas.height);

        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x / this.scale.x / (MocuGame.uniscale * 2), this.flip.y / this.scale.y / (MocuGame.uniscale * 2));
        context.translate((-((this.x) + displacement.x)) * MocuGame.uniscale, (-((this.y) + displacement.y)) * MocuGame.uniscale);
        if (this.align == "center" || this.align == "start")
            context.translate(-(this.width / 2) * MocuGame.uniscale, 0);
        context.globalCompositeOperation = "source-over";
    }
})();