/*
    mocuobject.js
    The base object of which all others are derived.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuObject constructor. Initializes the object with its position, size, and other properties.

        Parameters:
        point (Point)
        - Position to create the object at.
        size (Point)
        - The dimensions of the object.
    */
    MocuGame.MocuObject = function (point, size) {
        point = (typeof point == 'undefined' || typeof point == null) ? new MocuGame.Point(0, 0) : point;
        size = (typeof size == 'undefined' || typeof size == null) ? new MocuGame.Point(0, 0) : size;
        this.name = "";

        this.x = point.x;
        this.y = point.y;

        this.velocationity = new MocuGame.Point(0, 0);
        this.angularVelocationity = 0;

        this.width = size.x;
        this.height = size.y;

        this.worldPoint = new MocuGame.Point(0, 0);

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

    /*
        update is a function which changes the MocuObject's properties based off its current state.

        Parameters:
        deltaT (Number)
        - Elapsed time since last update call.
    */

    MocuGame.MocuObject.prototype.update = function (deltaT) {
        if (typeof deltaT == 'undefined')
            deltaT = 0;
        this.x += this.velocationity.x * deltaT;
        this.y += this.velocationity.y * deltaT;

        this.velocationity.x += this.acceleration.x * deltaT;
        this.velocationity.y += this.acceleration.y * deltaT;

        this.angle += this.angularVelocationity * deltaT;

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
    }

    /*
        draw is a function which renders the bonding box of the MocuObject onto the canvas.
        Note: MocuObjects are invisible by defalt

        Parameters:
        Context (Object)
        - The canvas context on which the object will be drawn.
        Displacement (Point)
        - The offset of the object's rendering based off its parent.
    */

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

    /*
        getWorldPoint is a function which returns the objects position on the canvas.

        Returns:
        Point
        - The object's position on the canvas.
    */

    MocuGame.MocuObject.prototype.getWorldPoint = function () {
        return this.worldPoint;
    }

    /*
        getOverlapsInGroup is a function which returns all objects in a given MocuGroup that overlap 
        with the caller.

        Parameters:
        group (MocuGroup)
        - The group to check collisions against.

        Returns:
        Array
        - List of all objects in group which collide with the caller.
    */

    MocuGame.MocuObject.prototype.getOverlapsInGroup = function (group) {
        var returnGroup = new Array();
        returnGroup.setParent = false;
        if (!MObj.exists)
            return returnGroup;
        //console.log(" X is " + MocuGame.MocuGroup.prototype.isPrototypeOf(MObj));
        if (MocuGame.MocuGroup.prototype.isPrototypeOf(MObj)) {
            for (var i = 0; i < group.objects.length; ++i) {
                var obj = group.objects[i];
                if (obj.exists) {
                    if (this.isColliding(obj)) //If it is a single object
                        returnGroup.push(obj);
                }
            }
        }
        return returnGroup;
    }

    /*
        overlapsWith is a function which tests whether a given object overlaps with the caller.
        Only returns true if the object overlaps with the caller, the object exists, and the object
        is dense.

        Parameters:
        object (MocuObject)
        -The object to test against the caller.

        Returns:
        Boolean - True if the object overlaps with the caller, false otherwise.

    */

    MocuGame.MocuObject.prototype.overlapsWith = function (object) {
        var pos1 = this.getWorldPoint();
        var pos2 = object.getWorldPoint();
        if ((object.exists == false) || (object.density == false)) {
            return false;
        }
        if ((pos2.x > pos1.x + this.width - 1) ||  
                           (pos2.y > pos1.y + this.height - 1) ||
                           (pos1.x > pos2.x + object.width - 1) ||
                           (pos1.y > pos2.y + object.height - 1))
        {
            // no collision
            return false;
        }
        if (object.exists) {
            return true;
        }
    }

    /*
        collidesWith is a function which applies position readjusting to the caller if it overlaps
        with a given object.

        Parameter:
        object (MocuObject)
        - The object to collide against.

        Returns:
        Array - List of the collision types that occured with the given object and the caller.
    */

    MocuGame.MocuGroup.prototype.collidesWith = function (object) {
        if (this.overlapsWith(object) == true) {
            var collisionTypes = this.getCollionTypes(object);
            if (collisionTypes.indexOf("RIGHT") != -1) {
                this.x = object.x - this.width - 1;
            }
            if (collisionTypes.indexOf("LEFT") != -1) {
                this.x = object.x + object.width + 1;
            }
            if (collisionTypes.indexOf("TOP") != -1) {
                this.y = object.y + object.height + 1;
            }
            if (collisionTypes.indexOf("BOTTOM") != -1) {
                this.y = object.y - this.height - 1;
            }
            return collisionTypes;
        }
        return false;
    }

    MocuGame.MocuObject.prototype.getCollionTypes = function (object) {
        //Check for right side, relative to caller

        var pos = this.getWorldPoint();
        var collisionTypes = new Array();
        if (object.containsLine(new MocuGame.Point((pos.x + this.width), pos.y),
            new MocuGame.Point((pos.x + this.width), (pos.y + this.height)))) {
            collisionTypes.push("RIGHT");
        }
        //Chceck for left side
        else if (object.containsLine(new MocuGame.Point(pos.x , pos.y),
            new MocuGame.Point(pos.x, (pos.y + this.height)))) {
            collisionTypes.push("LEFT");
        }
        //Chceck for ceiling side
        else if (object.containsLine(new MocuGame.Point(pos.x, pos.y),
            new MocuGame.Point((pos.x + this.width), pos.y))) {
            collisionTypes.push("TOP");
        }
        //Chceck for floor side
        else if (object.containsLine(new MocuGame.Point(pos.x, (pos.y + this.height)),
            new MocuGame.Point((pos.x + this.width), (pos.y + this.height)))) {
            collisionTypes.push("BOTTOM");
        }
        return collisionTypes;
    }

    /*
        containsPoint is a funtion which returns true if the given point is within the bounds of
        the MocuObject

        Parameters:
        point (Point)
        - The point to be tested.

        Returns:
        Boolean - Whether the point is within the bounds of the object.
    */

    MocuGame.MocuObject.prototype.containsPoint = function (point) {
        var pos = this.getWorldPoint();
        if (point.x < pos.x + this.width && point.x > pos.x
            && point.y < pos.y + this.height && point.y > pos.y)
            return true;
        return false;
    }

    /*
        containsLine is a function which checks whether a line segment formed by two points intersects a
        MocuObject

        Parameters:
        startPoint (Point)
        - The starting point of the line segment.
        endPoint (Point)
        - The ending point of the line segment.

        Returns:
        Boolean - Whether the line segment intersects the object.
    */

    MocuGame.MocuObject.prototype.containsLine = function (startPoint, endPoint) {
        //Check to see if there is horizontal overlap
        var pos = this.getWorldPoint();
        if((startPoint.x > (pos.x + this.width)) && (endPoint.x > (pos.x + this.width)) ||
            ((startPoint.x < pos.x) && (endPoint.x < pos.x)))
        {
            return false;
        }
        //Check to see if there is vertical overlap
        else if ((startPoint.y > (pos.y + this.height)) && (endPoint.y > (pos.y + this.height)) ||
            ((startPoint.y < pos.y) && (endPoint.y < pos.y))) {
            return false;
        }
        else {
            return true;
        }
    }

    /*
        kill is a function which sets the MocuObject to no longer exist
    */
    MocuGame.MocuObject.prototype.kill = function () {
        this.exists = false;
        
    }
})();