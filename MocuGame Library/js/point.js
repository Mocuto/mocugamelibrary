/*
    point.js
    Object with an x and y component.
    
    Also contains helper functions.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        Point constructor. Initializes the object with its x and y coordinate.

        Parameters:
        a (Number)
        - The x coordinate.
        b (Number)
        - The y coordinate.
    */
    MocuGame.Point = function (a, b) {
        this.x = a;
        if (typeof b == 'undefined')
            b = a;
        this.y = b;
    }

    /*
        setPolar is a function which sets the x and y coordinates of the Point based off a given
        magnitude and direction.

        Parameters:
        mag (Number)
        - Magnitude of the vector.
        direction (Number)
        - Direction of the vector.
    */

    MocuGame.Point.prototype.setPolar = function (mag, dir) {
        this.x = Math.cos((dir*Math.PI)/180) * mag;
        this.y = Math.sin((dir*Math.PI)/180) * mag;
    }

    /*
        getPolar is a function which returns an array containing the magnitude and direction of
        the point if it were to be a vector.

        Returns:
        (Array) Index 0: Magnitude of vector; Index 1: Direction of vector.
    */

    MocuGame.Point.prototype.getPolar = function () {
        return new Array(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), (Math.atan(this.y / this.x) )*Math.PI/180);
    }
})();