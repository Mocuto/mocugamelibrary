(function () {
    /*
        MocuZone constructor. Initializes the zone with its position and size.

        position (Point) - 
    */
    MocuGame.MocuZone = function (position, size) {
        MocuGame.MocuObject.call(this, position, size);
        this.objectsToCheckAgainst = new Array();
        this.objectsInZone = new Array();
    };
    MocuGame.MocuZone.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuZone.constructor = MocuGame.MocuZone;

    MocuGame.MocuZone.prototype.zoneObject = function (object) {
        this.objectsToCheckAgainst.push(object);
    };

    MocuGame.MocuZone.prototype.unZoneObject = function (object) {
        var index = this.objectsToCheckAgainst.indexOf(object);
        if (index != -1) {
            this.objectsToCheckAgainst.splice(index, 1);
        }
    };

    MocuGame.MocuZone.prototype.isObjectInZone = function (object) {
        return (this.objectsInZone.indexOf(object) != -1);
    }

    MocuGame.MocuZone.prototype.update = function (deltaT) {
        MocuGame.MocuObject.prototype.update.call(this, deltaT);
        for(var i = 0; i < this.objectsToCheckAgainst.length; i++)
        {
            var object = this.objectsToCheckAgainst[i];

            var index = this.objectsInZone.indexOf(object)
            if (index == -1) //If the zone doesn't think the object's in it
            {
                if (this.overlapsWith(object)) { //If the object is actually in it
                    this.objectsInZone.push(object);
                    this.onObjectEntered(object);
                }
            }
            else { //If the zone thinks the object's in it
                if (!this.overlapsWith(object)) {
                    this.objectsInZone.slice(index, 1);
                    var direction = null;
                    var objPos = object.getWorldPoint();
                    var pos = this.getWorldPoint();
                    if (objPos.y < pos.y) {
                        direction = "TOP";
                    }
                    else if (objPos.y > pos.y + this.height) {
                        direction = "BOTTOM";
                    }
                    else if (objPos.x < pos.x) {
                        direction = "LEFT";
                    }
                    else {
                        direction = "RIGHT";
                    }
                    this.onObjectExited(object, direction);
                }
            }
        }
    }

    MocuGame.MocuZone.prototype.onObjectEntered = function (object) {
        //Override this
    };

    MocuGame.MocuZone.prototype.onObjectExited = function (object, direction) {
        //Override this
    };

})();