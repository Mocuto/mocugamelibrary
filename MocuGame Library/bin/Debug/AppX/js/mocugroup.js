/*
    mocugroup.js

    Object inherited from MocuObject. Stores MocuObjects.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {
    
    /*
        MocuGroup constructor. Initializes object at the given point and with the given size.

        Parameters:
        point (Point)
        - Coordinates to be created at.
        size (Point)
        - Dimensions of object.
    */
    MocuGame.MocuGroup = function (point, size) {
        MocuGame.MocuObject.call(this, point, size);
        this.objects = new Array();
        this.setParent = true;
    }
    MocuGame.MocuGroup.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuGroup.constructor = MocuGame.MocuGroup;

    /*
        update is a function inherited from MocuObject. Updates all active MocuObjects it contains.

        Parameters:
        deltaT (Number)
        - Time elapsed since last update call.
    */

    MocuGame.MocuGroup.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        for (var i = 0; i < this.objects.length; i += 1) {
            if (this.objects[i].exists && this.objects[i].active)
                this.objects[i].update(deltaT);
        }
    }

    /*
        draw is a function inherited from MocuObject. Draws all visible MocuObjects it contains.

        Parameters:
        context (Object)
        - The canvas context on which its children will be drawn.
        point (Point)
        - The displacement of the object, based off its parent's position.
    */

    MocuGame.MocuGroup.prototype.draw = function (context, point) {
        if (typeof point == null || typeof point == 'undefined')
            point = new MocuGame.Point(0, 0);
        for (var i = 0; i < this.objects.length; i += 1) {
            if (this.objects[i].visible && this.objects[i].exists)
                this.objects[i].draw(context, new MocuGame.Point(this.x + point.x, this.y + point.y));
        }
    }

    /*
        add is a function which adds MocuObject(s) to the MocuGroup object.

        Parameters:
        ... (MocuObjects)
        - Objects to be added.
    */
    MocuGame.MocuGroup.prototype.add = function () {
        var objs = Array.prototype.slice.call(arguments);
        for (var n = 0; n < objs.length; n += 1) {
            var object = objs[n];
            var foundone = false;
            for (var i = 0; i < this.objects.length; i++) {
                if (!this.objects[i].exists) {
                    this.objects[i] = object;
                    foundone = true;
                    break;
                }
            }
            if (!foundone)
                this.objects.push(object);
            if (this.setParent)
                object.parent = this;
        }
    }

    /*
        remove is a function which removes MocuObject(s) from the MocuGroup object.

        Parameters:
        ... (MocuObjects)
        - Objects to be removed from the object.
    */

    MocuGame.MocuGroup.prototype.remove = function () {
        var objs = Array.prototype.slice.call(arguments);
        for (var i = 0; i < objs.length; i++) {
            var index = this.objects.indexOf(objs[i]);
            if (index != -1) {
                this.objects.splice(index, 1);
            }
        }
    }

    /*
        removeAt is a function which removes the MocuObject at the given index.

        Parameters:
        index (Number)
        - The index at which the object to be removed is located.
    */

    MocuGame.MocuGroup.prototype.removeAt = function (index) {
        this.objects.splice(index, 1);
    }

    /*
        copyContentsTo is a function which adds all of a MocuGroup objects contents to another MocuGroup object.

        Parameters:
        group (MocuGroup)
        - The group to add its objects to.
    */

    MocuGame.MocuGroup.prototype.copyContentsTo = function (group) {
        group.add.apply(group, this.objects);

    }
})();