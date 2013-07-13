/// <reference path="shrio/enemy/Dudekplane.js" />
(function () {
    MocuGame.MocuGroup = function (point, size) {
        MocuGame.MocuObject.call(this, point, size);
        this.objects = new Array();
        this.setParent = true;
        this.addToQuad = true;
    }
    MocuGame.MocuGroup.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuGroup.constructor = MocuGame.MocuGroup;
    MocuGame.MocuGroup.prototype.cleanup = function () {
        for (var i = 0; i < this.objects.length; i += 1) {
            if (!this.objects[i].exists) {
                this.objects.splice(i, 1);
                i -= 1;
            }
        }
    }
    MocuGame.MocuGroup.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        for (var i = 0; i < this.objects.length; i += 1) {
            if (this.objects[i].exists && this.objects[i].active)
                this.objects[i].update(deltaT);
        }
        if (this.objects.length > 20)
            this.cleanup();
    }
    MocuGame.MocuGroup.prototype.draw = function (context, point) {
        if (typeof point == null || typeof point == 'undefined')
            point = new MocuGame.Point(0, 0);
        for (var i = 0; i < this.objects.length; i += 1) {
            if (this.objects[i].visible && this.objects[i].exists)
                this.objects[i].draw(context, new MocuGame.Point(this.x + point.x, this.y + point.y));
        }
    }
    MocuGame.MocuGroup.prototype.add = function (object) {
        var foundone = false;
        for (var i = 0; i < this.objects.length; i += 1)
            if (!this.objects[i].exists) { this.objects[i] = object; foundone = true; break; }
        if (!foundone)
            this.objects.push(object);
        if(this.setParent)
            object.parent = this;
        if(this.addToQuad && typeof MocuGame.MasterQuad != 'undefined')
            MocuGame.MasterQuad.add(object);
    }
    MocuGame.MocuGroup.prototype.remove = function (object) {
        for (var i = 0; i < this.objects.length; i += 1) {
            if (object === this.objects[i]) {
                this.objects.splice(i, 1);
                break;
            }
        }
    }
    MocuGame.MocuGroup.prototype.copyContentsTo = function (group) {
        for (var i = 0; i < this.objects.length; i++)
            group.add(this.objects[i]);

    }
})();