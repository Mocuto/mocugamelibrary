(function () {
    MocuGame.Marquee = function (point, size, text, rate) {
        MocuGame.MocuText.call(this, point, size, text);
        this.rate = rate;
        this.scrollPos = 0;
        this.doesRestart = true;
 
        this.restartDelay = 1;
        this.renderWidth = 0;
        this.restarting = false;
        this.predraw();
        this.scrollWidth = this.renderWidth * 2;
        this.scrollStops = new Array(this.width, this.scrollWidth);
        this.autoResetStops = true;
        this.ended = false;
    }
    MocuGame.Marquee.prototype = new MocuGame.MocuText(new MocuGame.Point, new MocuGame.Point);
    MocuGame.Marquee.constructor = MocuGame.Marquee;


    MocuGame.Marquee.prototype.update = function (deltaT) {
        MocuGame.MocuText.prototype.update.call(this, deltaT);
        if(!this.restarting && !this.ended)
            this.scrollPos += this.rate * deltaT;
        var longside = (this.width > this.renderWidth) ? 0 : 1;
        if (this.scrollPos > this.scrollStops[longside] || this.scrollPos < -this.scrollStops[!longside * 1]) {
            if(!this.restarting && this.doesRestart)
                this.restart(this.scrollPos - this.renderWidth);
            else if(!this.doesRestart)
                this.onEnd();
        }
    }
    MocuGame.Marquee.prototype.onEnd = function () {
        this.ended = true;
    }

    MocuGame.Marquee.prototype.restart = function (num) {
        var slot = new MocuGame.TimeSlot(this.timeline.currenttime + this.restartDelay);
        slot.addEvent(new MocuGame.Event(this, "restarting", false, false, 1));
        if (num > 0) {
            slot.addEvent(new MocuGame.Event(this, "scrollPos", 1, -2*this.renderWidth + 1, 1));
            this.scrollPos = - (this.renderWidth * 2) + 1;
        }
        else {
            slot.addEvent(new MocuGame.Event(this, "scrollPos", 1, this.width - 2, 1));
            this.scrollPos = this.width - 1;
        }
        this.timeline.addSlot(slot);
        this.restarting = true;
    }
    MocuGame.Marquee.prototype.predraw = function () {
        var blankCanvas = document.getElementById('blankCanvas');
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
    MocuGame.Marquee.prototype.draw = function (context, displacement) {
        //MocuGame.MocuObject.prototype.draw.call(this, context, displacement);
        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);


        context.translate(((this.x + displacement.x)) * MocuGame.uniscalex, ((this.y) + displacement.y) * MocuGame.uniscaley);
        if (this.align == "center" || this.align == "start")
            context.translate((this.width / 2) * MocuGame.uniscalex, 0);

        context.scale(this.flip.x * this.scale.x * (MocuGame.uniscalex * 2), this.flip.y * this.scale.y * (MocuGame.uniscaley * 2));
        context.rotate((this.angle * 3.14159265359) / 180);

        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;

        var blankCanvas = this.predraw();

        var firstWidth = ((this.scrollPos * MocuGame.uniscalex) + (this.scrollWidth * MocuGame.uniscalex) < this.width * MocuGame.uniscalex) ? (this.scrollWidth * MocuGame.uniscalex) : (this.width * MocuGame.uniscalex) - (this.scrollPos * MocuGame.uniscalex);
        var secondWidth = ((this.scrollPos * MocuGame.uniscalex) + (this.scrollWidth * MocuGame.uniscalex) > this.width * MocuGame.uniscalex) ? (this.scrollPos * MocuGame.uniscalex) + (this.scrollWidth * MocuGame.uniscalex) - (this.width * MocuGame.uniscalex) : 0;
        if (this.scrollPos < 0) {
            firstWidth = (this.scrollWidth * MocuGame.uniscalex) + (this.scrollPos * MocuGame.uniscalex);
            secondWidth = (this.scrollPos * MocuGame.uniscalex);
        }
        context.save();
        context.rect(0, -this.height * MocuGame.uniscaley, this.width * MocuGame.uniscalex, this.height * 2 * MocuGame.uniscaley);
        context.clip();

        context.drawImage(blankCanvas, (this.scrollPos > 0) ? 0 : -this.scrollPos * MocuGame.uniscalex, 0, firstWidth, this.height,
            (this.scrollPos > 0) ? (this.scrollPos * MocuGame.uniscalex) : 0, -this.height * MocuGame.uniscaley,
            firstWidth, this.height * MocuGame.uniscaley * 2);
        /*if (this.wrapAround && secondWidth != 0) {
            context.drawImage(blankCanvas, (this.scrollPos > 0) ? ((this.width * MocuGame.uniscalex) - (this.scrollPos * MocuGame.uniscalex)) : 0, 0, firstWidth, this.height,
                (this.scrollPos > 0) ? (this.scrollPos * MocuGame.uniscalex) : 0, -this.height * MocuGame.uniscaley,
                firstWidth, this.height * MocuGame.uniscaley * 2);
        }*/

        context.restore();

        blankCanvas.getContext('2d').clearRect(0, 0, blankCanvas.width, blankCanvas.height);

        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x / this.scale.x / (MocuGame.uniscalex * 2), this.flip.y / this.scale.y / (MocuGame.uniscaley * 2));
        context.translate((-((this.x) + displacement.x)) * MocuGame.uniscalex, (-((this.y) + displacement.y)) * MocuGame.uniscaley);
        if (this.align == "center" || this.align == "start")
            context.translate(-(this.width / 2) * MocuGame.uniscalex, 0);
        context.globalCompositeOperation = "source-over";
    }
})();