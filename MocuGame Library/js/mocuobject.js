(function () {
    MocuGame.MocuObject = function (point, size) {
        point = (typeof point == 'undefined' || typeof point == null) ? new MocuGame.Point(0, 0) : point;
        size = (typeof size == 'undefined' || typeof size == null) ? new MocuGame.Point(0, 0) : size;
        this.name = "";

        this.x = point.x;
        this.y = point.y;
        this.width = size.x;
        this.height = size.y;
        this.worldPoint = new MocuGame.Point(0, 0);
        this.velocity = new MocuGame.Point(0, 0);
        this.angularVelocity = 0;
        this.acceleration = new MocuGame.Point(0, 0);
        this.exists = true;
        this.active = true;
        if (typeof this.visible == 'undefined' || typeof this.visible == 'null')
            this.visible = false;
        else
            this.visible = true;
        this.density = true;
        this.parent = null;
        this.timeline = new MocuGame.TimeLine();
        this.scale = new MocuGame.Point(1, 1);
        this.dying = false;
        this.life = 0;
        this.fillStyle = 'blue';
        this.alpha = 1;
        this.usesFade = false;
        this.fade = new MocuGame.RGBA(1, 0, 0, 0);
        
    }
    MocuGame.MocuObject.prototype.update = function (deltaT) {
        this.quad = MocuGame.MasterQuad;
        if (typeof deltaT == 'undefined')
            deltaT = 0;
        this.x += this.velocity.x * deltaT;
        this.y += this.velocity.y * deltaT;
        this.velocity.x += this.acceleration.x * deltaT;
        this.velocity.y += this.acceleration.y * deltaT;
        this.angle += this.angularVelocity * deltaT;
        if (this.parent != null) {
            this.worldPoint.x = this.parent.worldPoint.x + this.x;
            this.worldPoint.y = this.parent.worldPoint.y + this.y;
        }
        else {
            this.worldPoint.x = this.x;
            this.worldPoint.y = this.y;
        }
        this.timeline.update(deltaT);
        if (this.life > 0) {
            this.life -= 1;
            if (this.life == 0)
                this.exists = false;
        }
        //console.log("Older update");
    }
    MocuGame.MocuObject.prototype.draw = function (context, displacement) {
        context.globalAlpha = this.alpha;
        if (typeof displacement  == 'null' || typeof displacement == 'undefined')
            displacement = new MocuGame.Point(0, 0);
        context.beginPath();
        context.rect((this.x + displacement.x) * MocuGame.uniscale, (this.y + displacement.y) * MocuGame.uniscale, this.width * MocuGame.uniscale, this.height * MocuGame.uniscale);
        if (this.usesFade) {
            context.fillStyle = "rgb( " + Math.ceil(this.fade.r * 255) + ", " + Math.ceil(this.fade.g * 255) + ", " + Math.ceil(this.fade.b * 255) + ")";
            context.globalAlpha = this.fade.a;
        }
        else
            context.fillStyle = this.fillStyle;
        context.fill();
        context.lineWidth = 4;
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
        context.globalCompositeOperation = "source-over";

    }
    MocuGame.MocuObject.prototype.getWorldPoint = function () {
        /*var wx = 0;
        var wy = 0;
        
        if (MocuGame.MocuObject.prototype.isPrototypeOf(this.parent)) {
            //console.log("PARENT WORLD POINT");
            w = this.parent.getWorldPoint();
            wx = w.x;
            wy = w.y;
        }
        wx += this.x;
        wy += this.y;
        return new MocuGame.Point(wx, wy);*/
        return this.worldPoint;
    }
    MocuGame.MocuObject.prototype.overlaps = function (MObj) {
        var returnGroup = new MocuGame.MocuGroup();
        returnGroup.setParent = false;
        if (!MObj.exists)
            return returnGroup;
        //console.log(" X is " + MocuGame.MocuGroup.prototype.isPrototypeOf(MObj));
        if (MocuGame.MocuGroup.prototype.isPrototypeOf(MObj)) {
            for (var i = 0; i < MObj.objects.length; ++i) {
                var obj = MObj.objects[i];
                if (obj.exists) {
                    //obj.x += MObj.x;
                    //obj.y += MObj.y;
                    if (MocuGame.MocuGroup.prototype.isPrototypeOf(obj)) { //If object is a group of objects
                        var subreturnGroup = this.overlaps(obj); //Check to see if any objects in the group collide with source
                        //console.log("SUBRETURNGROUP LENGTH IS: " + subreturnGroup.objects.length);
                        if (subreturnGroup.objects.length > 0) //If at least one object collides, add the whole group to the returnGroup
                            returnGroup.add(obj);
                    }
                    else if (this.isColliding(obj)) //If it is a single object
                        returnGroup.add(obj);
                }
            }
        }
        return returnGroup;
    }
    MocuGame.MocuObject.prototype.isColliding = function (MObj) {
        var pos1 = this.getWorldPoint();
        var pos2 = MObj.getWorldPoint();
        //console.log("My position is " + pos1.x + ", " + pos1.y );
        //console.log("Their position is " + pos2.x + ", " + pos2.y);
        if ((pos2.x > pos1.x + this.width - 1) ||  // is b1 on the right side of b2?
                           (pos2.y > pos1.y + this.height - 1) ||  // is b1 under b2?
                           (pos1.x > pos2.x + MObj.width - 1) ||  // is b2 on the right side of b1?
                           (pos1.y > pos2.y + MObj.height - 1))         // is b2 under b1?
        {
            // no collision
            return false;
        }
        // collision
        //console.log("Collision maybe?");
       if(MObj.exists)
            return (MObj.exists * MObj.density);
    }

    MocuGame.MocuObject.prototype.containsPoint = function (point) {
        var pos = this.getWorldPoint();
        if (point.x < pos.x + this.width && point.x > pos.x
            && point.y < pos.y + this.height && point.y > pos.y)
            return true;
        return false;
    }

    MocuGame.MocuObject.prototype.kill = function () {
        this.exists = false;
        
    }
})();