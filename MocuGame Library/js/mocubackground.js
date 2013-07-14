/*
    mocubackground.js

    Object inherited from MocuSprite that repeats an image over a specified area. Has support for
    vertical and horizontal scrolling.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuBackground constructor. Initializes the object with the dimensions of the sprite which
        will be drawn, the size of which the background will be rendered in the game, and the path
        to the sprites location on the server.

        Parameters:
        spriteSize (Point)
        - the dimensions of the sprite.
        actualSize (Point)
        - the dimensions of the background on screen.
        spritePath (String)
        - Location of the sprite image on the server.
    */

    MocuGame.MocuBackground = function (spriteSize, actualSize, spritePath) {
        MocuGame.MocuSprite.call(this, new MocuGame.Point(0, 0), actualSize, spritePath);
        this.spriteSize = spriteSize;
        this.scrollVelocity = new MocuGame.Point(0, 0);
        this.scrollPosition = new MocuGame.Point(0, 0);
    }
    MocuGame.MocuBackground.prototype = new MocuGame.MocuSprite(new MocuGame.Point, MocuGame.Point);
    MocuGame.MocuBackground.constructor = MocuGame.MocuBackground;

    /*
        update is a function inherited from MocuSprite which updates the scrollPosition of the
        background based off the scrollVelocity variable.

        Parameters:
        deltaT (Number)
        - The amount of time elapsed since the last update call.
    */

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

    /*
        draw is a function inherited from MocuSprite which draws the MocuBackground on to the game
        canvas, using a displacement based off its parent object.

        Parameters:
        context (Object)
        - The context through which the background will be drawn.
        displacement (Point)
        - The displacement the background will have from its own position.
    */

    MocuGame.MocuBackground.prototype.draw = function (context, displacement) {
        context.translate((this.x + displacement.x) * MocuGame.uniscale, (this.y + displacement.y) * MocuGame.uniscale);
        context.globalAlpha = 1;
        primBlitSize = new MocuGame.Point(this.spriteSize.x - this.scrollPosition.x,
            this.spriteSize.y - this.scrollPosition.y);
        secondBlitSize = new MocuGame.Point(this.spriteSize.x - primBlitSize.x, this.spriteSize.y - primBlitSize.y);
        context.scale(this.flip.x*this.scale.x*MocuGame.uniscale, this.flip.y*this.scale.y*MocuGame.uniscale);
        context.rotate((this.angle * 3.14159265359) / 180);

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
        context.scale(this.flip.x / this.scale.x / MocuGame.uniscale, this.flip.y / this.scale.y / MocuGame.uniscale);
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.translate(-(this.x + displacement.x) * MocuGame.uniscale, -(this.y + displacement.y) * MocuGame.uniscale);
    }
})();