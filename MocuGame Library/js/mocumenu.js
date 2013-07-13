(function () {
    MocuGame.MocuMenu = function (state, pos, size) {
        MocuGame.MocuGroup.call(this, pos, size);
        this.selectedItem = null;
        this.locked = false;
        this.keyMap = {"left": Key.LEFT, "right": Key.RIGHT, "top": Key.UP, "bottom": Key.DOWN, "select": Key.ENTER };
        this.keysDown = true;
        this.touching = true;
        this.parentState = state;
    }
    MocuGame.MocuMenu.prototype = new MocuGame.MocuGroup;
    MocuGame.MocuMenu.constructor = MocuGame.MocuMenu;
    
    MocuGame.MocuMenu.prototype.update = function (deltaT) {
        MocuGame.MocuGroup.prototype.update.call(this, deltaT);
        for (var key in this.keyMap) {
            if(Key.isDown(this.keyMap[key]))
            {
                if(!this.keysDown)
                    this.selectedItem.advance(key);
                this.keysDown = true;
                return;
            }
        }
        this.keysDown = false;
    }

    MocuGame.MocuMenu.prototype.add = function (obj) {
        MocuGame.MocuGroup.prototype.add.call(this, obj);
        if (this.selectedItem == null && MocuGame.MocuMenuItem.prototype.isPrototypeOf(obj))
            this.changeSelection(obj);
    }
    MocuGame.MocuMenu.prototype.select = function (obj) {
        obj.onSelected();
    }
    MocuGame.MocuMenu.prototype.changeSelection = function (obj) {
        if (this.selectedItem != null)
           this.selectedItem.onUnfocused();
        this.selectedItem = obj;
        this.selectedItem.onFocused();
        this.onFocusChanged(obj);
 
    }
    MocuGame.MocuMenu.prototype.onFocusChanged = function (obj) {
        //Nothing for now
    }
    MocuGame.MocuMenu.prototype.onSelectionEntered = function (obj) {
        //Nothing for now
    }

    MocuGame.MocuMenu.prototype.touch = function (pointer) {
        if (!pointer.down || this.touching) {
            this.touching = pointer.down;
            return;
        }

        var point = new MocuGame.Point(pointer.pos.x, pointer.pos.y);
        for (var i = 0; i < this.objects.length; ++i) {
            var obj = this.objects[i];
            if (!MocuGame.MocuMenuItem.prototype.isPrototypeOf(obj))
                continue;
            if (obj.containsPoint(point)) {
                if (this.selectedItem == obj)
                    this.selectedItem.advance("select");
                else
                    this.changeSelection(obj);
                break;
            }
        }

    }
})()