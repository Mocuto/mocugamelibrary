(function () {
    MocuGame.RGBA = function (r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    MocuGame.RGBA.prototype.getBrightness = function()
    {
        return (0.2126 * this.r) + (0.7152 * this.g) + (0.0722 * this.b);
    }
})()