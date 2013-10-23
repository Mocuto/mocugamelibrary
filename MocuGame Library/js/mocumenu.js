/*
    mocumenu.js

    Object inherited from MocuGroup. Object allows for easy creation of in game menus.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Object constructor. Initializes the object with its parent state, position, and size.

        Parameters:
        state (MocuState)
        - The menu's parent state.
        pos (Point)
        - The menu's starting point.
        size (Point)
        - The menu's dimensions.
    */

    MocuGame.MocuMenu = function (pos, size, state) {
        MocuGame.MocuGroup.call(this, pos, size);
        this.selectedItem = null;
        this.locked = false;
        this.keyMap = {"left": Key.LEFT, "right": Key.RIGHT, "top": Key.UP, "bottom": Key.DOWN, "select": Key.ENTER };
        this.keysDown = true;
        this.isTouching = true;
        this.parentState = state;
    }
    MocuGame.MocuMenu.prototype = new MocuGame.MocuGroup;
    MocuGame.MocuMenu.constructor = MocuGame.MocuMenu;

    /*
        update is a function which is inherited from MocuGroup. Advances to the next MocuMenuItem based off of the current key state.

        Parameters:
        deltaT (Number).
        - Time elapsed since last update call.
    */
    
    MocuGame.MocuMenu.prototype.update = function (deltaT) {
        MocuGame.MocuGroup.prototype.update.call(this, deltaT);
        for (var key in this.keyMap) {
            if(Key.isDown(this.keyMap[key]))
            {
                if (!this.keysDown) {
                    this.selectedItem.advance(key);
                }
                this.keysDown = true;
                return;
            }
        }
        this.keysDown = false;
    }

    /*
        add is a function which is inherited from MocuGroup. Adds obj. If the obj is a MocuMenuItem and the MocuMenu has no selectedItem, it
        will select the obj.

        Parameters:
        obj (MocuObject)
        - The object to add and/or select.
    */

    MocuGame.MocuMenu.prototype.add = function (obj) {
        MocuGame.MocuGroup.prototype.add.call(this, obj);
        if (this.selectedItem == null && MocuGame.MocuMenuItem.prototype.isPrototypeOf(obj)) {
            this.changeFocus(obj);
        }
    }

    /*
        select is a function which selects the given obj.

        Parameters:
        obj (MocuMenuItem)
        - The MocuMenuItem to select.
    */

    MocuGame.MocuMenu.prototype.select = function (obj) {
        obj.onSelected();
    }

    /*
        changeFocus is a function which changes the focused MocuMenuItem to the given obj.

        Parameters:
        obj (MocuMenuItem)
        - the MocuMenuItem to focus on.
    */

    MocuGame.MocuMenu.prototype.changeFocus = function (obj) {
        if (this.selectedItem != null) {
            this.selectedItem.onUnfocused();
        }
        this.selectedItem = obj;
        this.selectedItem.onFocused();
        this.onFocusChanged(obj);
 
    }

    /*
        onFocusChange is callbck which is called when the focus of an object has been changed.

        Parameters:
        obj (MocuMenuItem)
        - The MocuMenuItem that is now in focus.
    */

    MocuGame.MocuMenu.prototype.onFocusChanged = function (obj) {
        //Nothing for now
    }

    /*

    */

    MocuGame.MocuMenu.prototype.onSelectionEntered = function (obj) {
        //Nothing for now
    }

    /*
        touch is a function which selects a menuitem if it is not the selectedItem, and advances a menu item if it is.

        Parameters:
        pointer (Pointer)
        - The pointer containing the touch event.
    */


    MocuGame.MocuMenu.prototype.touch = function (pointer) {
        if (!pointer.isDown || this.isTouching) {
            this.isTouching = pointer.isDown;
            return;
        }

        var point = new MocuGame.Point(pointer.position.x, pointer.position.y);
        for (var i = 0; i < this.objects.length; ++i) {
            var obj = this.objects[i];
            if (!MocuGame.MocuMenuItem.prototype.isPrototypeOf(obj)) {
                continue;
            }
            else if (obj.containsPoint(point)) {
                if (this.selectedItem == obj) {
                    this.selectedItem.advance("select");
                }
                else {
                    this.changeFocus(obj);
                }
                break;
            }
        }

    }
})()