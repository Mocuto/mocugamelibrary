(function () {
    MocuGame.MocuPatch = function (pos, size, spritePath,  spriteSize, centerPatchPosition, centerPatchSize) {
        MocuGame.MocuSprite.call(this, pos, size, spritePath);
        this.centerPatchPosition = centerPatchPosition;
        this.centerPatchSize = centerPatchSize;
        this.spritePath = spritePath;
        this.spriteSize = spriteSize;
        
    };
    MocuGame.MocuPatch.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuPatch.constructor = MocuGame.MocuPatch;

    MocuGame.MocuPatch.prototype.colorEffect = function (context, displacement) {
        var blankCanvas = MocuGame.blankCanvas;
        var blankContext = MocuGame.blankContext;
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        blankContext.globalCompositeOperation = "source-over";
        blankContext.globalAlpha = 1;

        blankContext.save();
        blankContext.beginPath();
        blankContext.rect(0, 0, this.width, this.height);
        blankContext.closePath();
        blankContext.clip();

        var tempval = (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))


        //Draw center
        var endCentX = this.width - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x));
        var endCentY = this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y));

        for (var x = this.centerPatchPosition.x; x < endCentX; x += this.centerPatchSize.x)
        {
            for (var y = this.centerPatchPosition.y; y < endCentY; y += this.centerPatchSize.y)
            {
                blankContext.drawImage(this.img,
                    this.centerPatchPosition.x, this.centerPatchPosition.y,
                    this.centerPatchSize.x, this.centerPatchSize.y,
                    x, y,
                    Math.min(endCentX - x, this.centerPatchSize.x), Math.min(endCentY - y, this.centerPatchSize.y));
            }
        }

        //Draw top and bottom sides
        for (var i = 0; i < this.width; i += this.centerPatchSize.x) {
            blankContext.drawImage(this.img,
                this.centerPatchPosition.x, 0,
                this.centerPatchSize.x, this.centerPatchPosition.y,
                i + this.centerPatchPosition.x, 0,
                this.centerPatchSize.x, this.centerPatchPosition.y); //Top

            blankContext.drawImage(this.img,
                this.centerPatchPosition.x, (this.centerPatchPosition.y + this.centerPatchSize.y),
                this.centerPatchSize.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y)),
                i + this.centerPatchPosition.x, (this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))),
                this.centerPatchSize.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))); //Bottom
        }

        //Draw left and right sides
        for (var i = 0; i < this.height; i += this.centerPatchSize.y) {
            blankContext.drawImage(this.img,
                0, this.centerPatchPosition.y,
                this.centerPatchPosition.x, this.centerPatchSize.y,
                0, i + this.centerPatchPosition.y,
                this.centerPatchPosition.x, this.centerPatchSize.y); //Left

            blankContext.drawImage(this.img,
                (this.centerPatchPosition.x + this.centerPatchSize.x), this.centerPatchPosition.y,
                (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchSize.y,
                (this.width - (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x))), i + this.centerPatchPosition.y,
                (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchSize.y); //Right
        }

        blankContext.drawImage(this.img, 0, 0, this.centerPatchPosition.x, this.centerPatchPosition.y,
            0,
            0,
            this.centerPatchPosition.x,
            this.centerPatchPosition.y); //Top Left

        blankContext.drawImage(this.img,
            this.centerPatchPosition.x + this.centerPatchSize.x, 0,
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchPosition.y,
            endCentX, 0,
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchPosition.y); //Top Right

        //Draw Bottom corners
        blankContext.drawImage(this.img, 0, (this.centerPatchPosition.y + this.centerPatchSize.y),
            this.centerPatchPosition.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y)),
            0, (this.height - (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))),
            this.centerPatchPosition.x, (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))); //Bottom Left

        blankContext.drawImage(this.img,
            this.centerPatchPosition.x + this.centerPatchSize.x, (this.centerPatchPosition.y + this.centerPatchSize.y),
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), this.centerPatchPosition.y,
            endCentX, endCentY,
            (this.spriteSize.x - (this.centerPatchPosition.x + this.centerPatchSize.x)), (this.spriteSize.y - (this.centerPatchPosition.y + this.centerPatchSize.y))); //Bottom Right

        blankContext.restore();

        //Do the fade code
        if (this.fade.a != 0) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            blankContext.fill();
        }
        context.globalAlpha = this.alpha;
        context.globalCompositeOperation = this.drawmode;
        context.drawImage(blankCanvas, 0, 0, (this.width > blankCanvas.width) ? blankCanvas.width : this.width, (this.height > blankCanvas.height) ? blankCanvas.height : this.height,
                 (-(this.width / 2) * this.scale.x) * MocuGame.uniscale,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscale,
                ((this.width) * this.scale.x) * MocuGame.uniscale,
                ((this.height) * this.scale.y) * MocuGame.uniscale);
        blankContext.clearRect(0, 0, blankCanvas.width, blankCanvas.height);
    }

    MocuGame.MocuPatch.prototype.draw = function (context, displacement) {
        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);

        if (this.isOnScreen() == false) {
            return;
        }

        context.translate(((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscale, ((this.y + this.height / 2) + displacement.y) * MocuGame.uniscale);
        context.scale(this.flip.x, this.flip.y);
        context.rotate((this.angle * 3.14159265359) / 180);

        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;

        this.colorEffect(context, displacement);

        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x, this.flip.y);

        context.translate((-((this.x + this.width / 2) + displacement.x)) * MocuGame.uniscale, (-((this.y + this.height / 2) + displacement.y)) * MocuGame.uniscale);
        context.globalCompositeOperation = "source-over";
        //Draw top edge

        //Draw sides
        //Draw bottom edge
    };
})();