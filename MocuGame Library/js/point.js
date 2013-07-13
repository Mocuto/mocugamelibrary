
(function () {

    MocuGame.Point = function (a, b) {
        this.x = a;
        if (typeof b == 'undefined')
            b = a;
        this.y = b;
    }
    MocuGame.Point.prototype.setPolar = function (mag, dir) {
        this.x = Math.cos((dir*Math.PI)/180) * mag;
        this.y = Math.sin((dir*Math.PI)/180) * mag;
    }
    MocuGame.Point.prototype.getPolar = function () {
        return new Array(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), (Math.atan(this.y / this.x) )*Math.PI/180);
    }
})();