(function () {
    MocuGame.MocuBackground = function (spriteSize, actualSize, spriteloc) {
        MocuGame.MocuSprite.call(this, new MocuGame.Point(0, 0), actualSize, spriteloc);
        //this.actualSize = actualSize;
        this.spriteSize = spriteSize;
        this.scrollVelocity = new MocuGame.Point(0, 0);
        this.scrollPosition = new MocuGame.Point(0, 0);
        //this.offset = new MocuGame.Point(0, 0);
    }
    MocuGame.MocuBackground.prototype = new MocuGame.MocuSprite(new MocuGame.Point, MocuGame.Point);
    MocuGame.MocuBackground.constructor = MocuGame.MocuBackground;
    MocuGame.MocuBackground.prototype.update = function (deltaT) {
        MocuGame.MocuSprite.prototype.update.call(this, deltaT);
        this.scrollPosition.x += this.scrollVelocity.x * deltaT;
        this.scrollPosition.y += this.scrollVelocity.y * deltaT;
        while (this.scrollPosition.x > this.spriteSize.x)
            this.scrollPosition.x -= this.spriteSize.x;
        while (this.scrollPosition.y > this.spriteSize.y)
            this.scrollPosition.y -= this.spriteSize.y;
        while (this.scrollPosition.x < 0)
            this.scrollPosition.x += this.spriteSize.x;
        while (this.scrollPosition.y < 0)
            this.scrollPosition.y += this.spriteSize.y;
    }
    MocuGame.MocuBackground.prototype.draw = function (context, displacement) {
        context.translate((this.x + displacement.x) * MocuGame.uniscalex, (this.y + displacement.y) * MocuGame.uniscaley);
        context.globalAlpha = 1;
        primBlitSize = new MocuGame.Point(this.spriteSize.x - this.scrollPosition.x,
            this.spriteSize.y - this.scrollPosition.y);
        secondBlitSize = new MocuGame.Point(this.spriteSize.x - primBlitSize.x, this.spriteSize.y - primBlitSize.y);
        context.scale(this.flip.x*this.scale.x*MocuGame.uniscalex, this.flip.y*this.scale.y*MocuGame.uniscaley);
        context.rotate((this.angle * 3.14159265359) / 180);
        //console.log("Prim blit " + primBlitSize.x + " " + primBlitSize.y);
        //console.log("Second blit " + secondBlitSize.x + " " + secondBlitSize.y);

        //Apply Clipping
        context.save();
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.closePath();
        context.clip();
        for (var i = 0; i < this.width; i += this.spriteSize.x) {
            for (var j = 0; j < this.height; j += this.spriteSize.y) {
                //Quadrant II Blit   
                if (primBlitSize.x != 0 && primBlitSize.y != 0)
                context.drawImage(this.img, this.scrollPosition.x, this.scrollPosition.y, primBlitSize.x, primBlitSize.y, i, j, primBlitSize.x + 1, primBlitSize.y + 1);
                //Quadrant I Blit
                if(secondBlitSize.x != 0 && primBlitSize.y != 0)
                    context.drawImage(this.img, 0, this.scrollPosition.y, secondBlitSize.x, primBlitSize.y, i + primBlitSize.x, j, secondBlitSize.x + 1, primBlitSize.y+1);
                //Quadrant III Blit
                if (secondBlitSize.y != 0 && primBlitSize.x != 0)
                    context.drawImage(this.img, this.scrollPosition.x, 0, primBlitSize.x, secondBlitSize.y, i, j + primBlitSize.y, primBlitSize.x+1, secondBlitSize.y+1);
                //Quadrant IV Blit
                if(secondBlitSize.x != 0 && secondBlitSize.y != 0)
                    context.drawImage(this.img, 0, 0, secondBlitSize.x, secondBlitSize.y, i + primBlitSize.x, j + primBlitSize.y, secondBlitSize.x+1, secondBlitSize.y+1);
            }
        }
        //Restore previous settings
        context.restore();
        context.scale(this.flip.x / this.scale.x / MocuGame.uniscalex, this.flip.y / this.scale.y / MocuGame.uniscaley);
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.translate(-(this.x + displacement.x) * MocuGame.uniscalex, -(this.y + displacement.y) * MocuGame.uniscaley);
    }
})();