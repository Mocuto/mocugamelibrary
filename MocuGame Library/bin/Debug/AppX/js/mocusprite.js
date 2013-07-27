/*
    mocuobject.js
    Object derived from MocuObject, contains an image to be drawn

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    /*
        MocuSprite constructor. Initializes the object with its location, size, and sprite image

        Parameters:
        point (Point) 
        - Location for the object to be initialized at.
        size (Point)
        - Dimensions of the object.
        spriteLocation (String)
        - The path to the sprite file.
    */

    MocuGame.MocuSprite = function (point, size, spriteLocation) {
        MocuGame.MocuObject.call(this, point, size);
        if (typeof dontPreload == "undefined")
            dontPreload = false;

        this.animations = new Array();

        if (typeof spriteLocation != "undefined") {
            this.img = MocuGame.preload.getResult(spriteLocation);
            if (dontPreload || this.img == null) {
                this.img = new Image();
                this.img.src = spriteLocation;
            }
        }

        this.frame = new MocuGame.Point(0, 0);

        this.anim = new MocuGame.MocuAnimation("Default", "0,0", 20, true);
        this.animations.push(this.anim);

        this.angle = 0.0;

        this.flip = new MocuGame.Point(1, 1);

        this.drawmode = "source-over";
        
        this.tint = new MocuGame.RGBA(0, 0, 0, 0);

        //this.fade.a = 1;
        this.visible = true;

        this.scale.x = 1;
        this.scale.y = 1;

        this.animates = true;
    }
    MocuGame.MocuSprite.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuSprite.constructor = MocuGame.MocuSprite;

    /*
        addAnimation is a function which adds a new animation to the MocuSprite's set of animations

        Parameters:
        name (String)
        - The name the animation will be identified.
        coords (String)
        - The coordinates of each frame in the animations, in MocuGame Animation Notation
        speed (Number)
        - The speed of the animation
        loop (Boolean)
        - Whether the animation loops.
    */

    MocuGame.MocuSprite.prototype.addAnimation = function (name, coords, speed, loop) {
        var newanim = new MocuGame.MocuAnimation(name, coords, speed, loop);
        this.animations.push(newanim);
    }

    /*
        play is a function which plays the animation with the given name.

        Parameters:
        name (String)
        - The name of the animation to be played.

    */

    MocuGame.MocuSprite.prototype.play = function (name) {
        if (typeof this.anim != "undefined") {
            this.anim.stop();
        }
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name == name) {
                this.anim = this.animations[i];
                this.anim.frame = 0;
                this.anim.start();
                break;
            }
        }
    }

    /*
        animate is a function which updates the MocuSprite's displayed frame based on its current
        animation

        Parameters:
        deltaT (Number)
        - Time elapsed since the last update call.
    */

    MocuGame.MocuSprite.prototype.animate = function (deltaT) {
        this.frame.x = this.anim.coordinates[this.anim.frame].x;
        this.frame.y = this.anim.coordinates[this.anim.frame].y;
    }
    
    /*
        update is a function derived from MocuObject which updates the properties of the caller
        based on its current state.

        Paramaters:
        deltaT (Number)
        - Time elapsed since the last update call.
    */

    MocuGame.MocuSprite.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        if (this.animates);
            this.animate(deltaT);
    }

    /*
        colorEffect is an internal function used to colorize the sprite data with its given fade,
        prerendering.

        Parameters:
        context (Object)
        - The canvas context on which the object will be drawn
        displacement (Point)
        - The offset given the the object's drawing.
    */

    MocuGame.MocuSprite.prototype.colorEffect = function (context, displacement) {
        var blankCanvas = document.getElementById('blankCanvas');
        var blankContext = blankCanvas.getContext('2d');
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        blankContext.globalCompositeOperation = "source-over";
        blankContext.globalAlpha = 1;
        blankContext.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
           0,
            0,
            this.width,
            this.height);
        //Do the fade code
        if (this.fade.a != 0 ) {
            blankContext.globalCompositeOperation = "source-atop";
            blankContext.globalAlpha = this.fade.a;
            blankContext.beginPath();
            blankContext.rect(0, 0, this.width, this.height);
            blankContext.closePath();
            blankContext.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")"
            //console.log("FS is: " + "rgb( " + (this.fade.r * 255) + ", " + (this.fade.g * 255) + ", " + (this.fade.b * 255) + ")");
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

    /*
        draw is a function derived from MocuObject which renders the object on to the given canvas.

        Parameters:
        context (Object)
        - The canvas context on which the object will be drawn
        displacement (Point)
        - The offset given the the object's drawing.
    */

    MocuGame.MocuSprite.prototype.draw = function (context, displacement) {

        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);
        if (this.x + displacement.x > MocuGame.gameWidth || this.y + displacement.y > MocuGame.gameHeight ||
            this.x + displacement.x + this.width < 0 || this.y + displacement.y + this.height < 0) //Object is off screen
            return;
        
        context.translate(((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscale, ((this.y + this.height / 2) + displacement.y) * MocuGame.uniscale);
        context.scale(this.flip.x, this.flip.y);
        context.rotate((this.angle * 3.14159265359) / 180);
        
        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;
        if (this.tint.a != 0 || this.fade.a != 0)
            this.colorEffect(context, displacement);
        else {
            context.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
                (-(this.width / 2) * this.scale.x) * MocuGame.uniscale,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscale,
                ((this.width) * this.scale.x) * MocuGame.uniscale,
                ((this.height) * this.scale.y) * MocuGame.uniscale);
        }
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x, this.flip.y);

        context.translate((-((this.x + this.width / 2) + displacement.x))*MocuGame.uniscale, (-((this.y + this.height / 2) + displacement.y))*MocuGame.uniscale);
        context.globalCompositeOperation = "source-over";
    }
})();