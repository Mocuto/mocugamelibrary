﻿(function () {
    MocuGame.MocuMenuItem = function (pos, size, menu, leftItem, rightItem, topItem, bottomItem) {
        MocuGame.MocuGroup.call(this, pos, size);
        //this.leftItem = leftItem;
        //this.rightItem = rightItem;
        //this.topItem = topItem;
        //his.bottomItem = bottomItem;
        this.adjacentItems = { "left": leftItem, "right": rightItem, "top": topItem, "bottom": bottomItem };
        this.parentMenu = menu;
    }
    MocuGame.MocuMenuItem.prototype = new MocuGame.MocuGroup();
    MocuGame.MocuMenuItem.constructor = MocuGame.MocuMenuItem;
    
    MocuGame.MocuMenuItem.prototype.advance = function (direction) {
        /*switch (direction) {
            case "left":
                this.parentMenu.changeFocus(this.leftItem);
                break;
            case "right":
                this.parentMenu.changeFocus(this.rightItem);
                break;
            case "top":
                this.parentMenu.changeFocus(this.topItem);
                break;
            case "bottom":
                this.parentMenu.changeFocus(this.bottomItem);
                break;
            case "enter":
                this.parentMenu.select(this);
                break;
        }*/
        if (direction === "select") 
            this.parentMenu.select(this);
    
        else if (this.adjacentItems[direction] != undefined) {
            console.log("Enter pre");
            this.parentMenu.changeFocus(this.adjacentItems[direction]);
        }
    }
    MocuGame.MocuMenuItem.prototype.onSelected = function () {
        //Nothing for now
    }
    MocuGame.MocuMenuItem.prototype.onFocused = function () {
        //Nothing for now
    }

    MocuGame.MocuMenuItem.prototype.onUnselected = function () {
        //Nothing for now
    }
})();