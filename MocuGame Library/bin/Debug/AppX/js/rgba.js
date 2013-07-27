/*
    rgba.js

    An object which stores RGBA values. Is used with various drawing operations.

    TODO: Put license here

    Written by Olutobi Akomolede AKA Mocuto Oshi.
*/

(function () {

    /*
        RGBA constructor. Initializes the object with its color values.

        Parameters:
        r (Number)
        - Number between 0 and 1 representing the R channel.
        g (Number)
        - Number between 0 and 1 representing the G channel.
        b (Number)
        - Number between 0 and 1 representing the B channel.
        a (Number)
        - Number between 0 and 1 representing the alpha channel.
    */

    MocuGame.RGBA = function (r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /*
        getBrightness is a function which gets the brightness of the RGBA object.

        Returns:
        Number - brightness of the RGBA object.
    */

    MocuGame.RGBA.prototype.getBrightness = function()
    {
        return (0.2126 * this.r) + (0.7152 * this.g) + (0.0722 * this.b);
    }
})()