/*
    mocumenuitem.js

    Object inherited from MocuGroup. A menu item within a MocuMenu Item.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        MocuMenuItem constructor. Initializes the menuitem with its position, size, parentMenu,
        and adjacent menuitems

        Parameters:
        pos (Point)
        - The object's starting position.
        size (Point)
        - The object's dimensions.
        menu (MocuMenu)
        - The object's parent menu.
        leftItem (MocuMenuItem) (optional)
        - The menu item to the left of the object in the menu.
        rightItem (MocuMenuItem) (optional)
        - The menu item to the right of the object in the menu.
        topItem (MocuMenuItem) (optional)
        - The menu item to the top of the object in the menu.
        bottomItem (MocuMenuItem) (optional)
        - The menu item to the bottom of the object in the menu.
    */

    MocuGame.MocuMenuItem = function (pos, size, menu, leftItem, rightItem, topItem, bottomItem) {
        MocuGame.MocuGroup.call(this, pos, size);
        this.adjacentItems = { "left": leftItem, "right": rightItem, "top": topItem, "bottom": bottomItem };
        this.parentMenu = menu;
    }
    MocuGame.MocuMenuItem.prototype = new MocuGame.MocuGroup();
    MocuGame.MocuMenuItem.constructor = MocuGame.MocuMenuItem;
    

    /*
        advance is a function which advances in the menu item's parent. If the direction is "select",
        it selects itself, otherwise it moves in the direction entered.

        Parameters
        direction (String)
        - the String representation of the button pressed, declared in parentMenu's keyMap.
    */

    MocuGame.MocuMenuItem.prototype.advance = function (direction) {
        if (direction === "select") 
            this.parentMenu.select(this);
    
        else if (this.adjacentItems[direction] != undefined) {
            this.parentMenu.changeFocus(this.adjacentItems[direction]);
        }
    }

    /*
        onSelected is a callback which is called when the menu item is selected.
    */

    MocuGame.MocuMenuItem.prototype.onSelected = function () {

    }

    /*
        onFocused is a callback which is called when the menu item is focused.
    */

    MocuGame.MocuMenuItem.prototype.onFocused = function () {

    }

    /*
        onUnFocused is a callback which is called when the menu item is unfocused.
    */

    MocuGame.MocuMenuItem.prototype.onUnFocused = function () {

    }
})();