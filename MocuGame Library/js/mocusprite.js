(function () {
    MocuGame.MocuSprite = function (point, size, spriteloc) {
        MocuGame.MocuObject.call(this, point, size);
        //console.log("exists is: " + this.active);
        if (typeof dontPreload == "undefined")
            dontPreload = false;
        this.animations = new Array();
        if (typeof spriteloc != "undefined") {
            this.img = MocuGame.preload.getResult(spriteloc);
            if (dontPreload || this.img == null) {
                this.img = new Image();
                this.img.src = spriteloc;
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
    MocuGame.MocuSprite.prototype.addAnimation = function (name, coords, speed, loop) {
        var newanim = new MocuGame.MocuAnimation(name, coords, speed, loop);
        this.animations.push(newanim);
    }
    MocuGame.MocuSprite.prototype.play = function (name) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name == name) {
                this.anim = this.animations[i];
                this.anim.frame = 0;
                break;
            }
        }
    }
    MocuGame.MocuSprite.prototype.animate = function (deltaT) {
        this.anim.update(deltaT);
        this.frame.x = this.anim.coordinates[this.anim.frame].x;
        this.frame.y = this.anim.coordinates[this.anim.frame].y;
    }
    
    MocuGame.MocuSprite.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        if (this.animates);
            this.animate(deltaT);
    }
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
                 (-(this.width / 2) * this.scale.x) * MocuGame.uniscalex,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscaley,
                ((this.width) * this.scale.x) * MocuGame.uniscalex,
                ((this.height) * this.scale.y) * MocuGame.uniscaley);
        blankContext.clearRect(0, 0, blankCanvas.width, blankCanvas.height);
        
    }
    MocuGame.MocuSprite.prototype.draw = function (context, displacement) {

        if (typeof displacement == null || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);
        if (this.x + displacement.x > MocuGame.gameWidth || this.y + displacement.y > MocuGame.gameHeight ||
            this.x + displacement.x + this.width < 0 || this.y + displacement.y + this.height < 0) //Object is off screen
            return;
        
        context.translate(((this.x + displacement.x) + (this.width / 2)) * MocuGame.uniscalex, ((this.y + this.height / 2) + displacement.y) * MocuGame.uniscaley);
        context.scale(this.flip.x, this.flip.y);
        context.rotate((this.angle * 3.14159265359) / 180);
        
        context.globalCompositeOperation = this.drawmode;
        context.globalAlpha = this.alpha;
        if (this.tint.a != 0 || this.fade.a != 0)
            this.colorEffect(context, displacement);
        else {
            context.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
                (-(this.width / 2) * this.scale.x) * MocuGame.uniscalex,
                (-(this.height / 2) * this.scale.y) * MocuGame.uniscaley,
                ((this.width) * this.scale.x) * MocuGame.uniscalex,
                ((this.height) * this.scale.y) * MocuGame.uniscaley);
        }
        context.rotate(-(this.angle * 3.14159265359) / 180);
        context.scale(this.flip.x, this.flip.y);
        //console.log(this.img.src + "/" + this.frame.x + "/" + this.frame.y);
        context.translate((-((this.x + this.width / 2) + displacement.x))*MocuGame.uniscalex, (-((this.y + this.height / 2) + displacement.y))*MocuGame.uniscaley);
        context.globalCompositeOperation = "source-over";
    }
})();