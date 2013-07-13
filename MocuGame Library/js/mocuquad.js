(function () {
    MocuGame.MocuQuad = function (position, size, depth, max_depth, parent) {
        MocuGame.MocuGroup.call(this, position, size);
        this.depth = depth;
        this.max_depth = max_depth;
        this.max_objects_before_split = 5;
        this.splitted = false;
        this.children = null;
        this.parent = parent;
        this.setParent = false;
        this.addToQuad = false;;
    }
    MocuGame.MocuQuad.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuQuad.constructor = MocuGame.MocuQuad;
    MocuGame.MocuQuad.prototype.split = function () {
        this.children = new Array();
        this.children[0] = new MocuGame.MocuQuad(new MocuGame.Point(this.x, this.y), new MocuGame.Point(this.width / 2, this.height / 2), this.depth + 1, this.max_depth - 1, this);
        this.children[1] = new MocuGame.MocuQuad(new MocuGame.Point(this.x + (this.width / 2), this.y), new MocuGame.Point(this.width / 2, this.height / 2), this.depth + 1, this.max_depth - 1, this);
        this.children[2] = new MocuGame.MocuQuad(new MocuGame.Point(this.x, this.y + (this.height / 2)), new MocuGame.Point(this.width / 2, this.height / 2), this.depth + 1, this.max_depth - 1, this);
        this.children[3] = new MocuGame.MocuQuad(new MocuGame.Point(this.x + (this.width / 2), this.y + (this.height / 2)), new MocuGame.Point(this.width / 2, this.height / 2), this.depth + 1, this.max_depth - 1, this);
        var temp_objs = this.objects;
        this.objects.length = 0;
        this.splitted = true;
        for(var i = 0; i < temp_objs.length; i++)
        {
            this.add(temp_objs[i]);
        }
    }
    MocuGame.MocuQuad.prototype.checkFit = function (Obj) {
        WorldPoint = Obj.getWorldPoint();
        if (WorldPoint.x > this.x && (WorldPoint.x + Obj.width) < (this.x + this.width) &&
            WorldPoint.y > this.y && (WorldPoint.y + Obj.height) < (this.y + this.height))
            return true;
        else
            return false;
    }
    MocuGame.MocuQuad.prototype.reassign = function (Obj) {
        if (!this.checkFit(Obj)) {
            this.objects.splice(this.objects.indexOf(Obj), 1);
            if (this.parent == null)
                Obj.quad = null;
            else
                this.parent.add(Obj);
        }
    }
    MocuGame.MocuQuad.prototype.add = function (Obj) {
        if (this.objects.length == this.max_objects_before_split && this.max_depth != 0 && !this.splitted) {
            this.split();
            this.add(Obj);
        }
        else {
            if (!this.splitted) {
                //Check if fits
                if(Obj.x > this.x && (Obj.x + Obj.width) < (this.x + this.width) &&
                    Obj.y > this.y && (Obj.y + Obj.height) < (this.y + this.height))
                {
                    MocuGame.MocuGroup.prototype.add.call(this, Obj);
                    Obj.quad = this;
                    return true;
                }
                else return false;
            }
            else {
                var childrenfound = false;
                for (var i = 0; i < 4; i++) {
                    //console.log("Quad child length " + this.children.length + " " + i);
                    if (this.children[i].add(Obj)) {
                        childrenfound = true;
                        break;
                    }
                }
                if (!childrenfound) {
                    if (this.checkFit(Obj)) {
                        MocuGame.MocuGroup.prototype.add.call(this, Obj);
                        Obj.quad = this;
                    }
                }
            }
        }
    }
})();