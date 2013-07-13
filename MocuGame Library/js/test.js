
/*window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.rect(188, 50, 200, 100);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.stroke();
};*/
(function () {
    MocuGame.objects = new Array();
 /*   MocuGame.MocuMan = function (point, size) {
        MocuGame.MocuObject.call(this, point, size);
        console.log(point.x + " " + this.x);
        this.move_left = false;
        this.move_right = false;
        this.move_up = false;
        this.move_down = false;
    }
    MocuGame.MocuMan.prototype = new MocuGame.MocuObject(new MocuGame.Point(), new MocuGame.Point());
    MocuGame.MocuMan.constructor = MocuGame.MocuMan;
    MocuGame.MocuMan.prototype.keyHandle = function () {
        if (Key.isDown(Key.LEFT)) {
            this.move_left = true;
            this.move_right = false;
        }
        else if (Key.isDown(Key.RIGHT)) {
            this.move_right = true;
            this.move_left = false;
        }
        else {
            this.move_left = false;
            this.move_right = false;
        }
        if (Key.isDown(Key.UP)) {
            this.move_up = true;
            this.move_down = false;
        }
        else if (Key.isDown(Key.DOWN)) {
            this.move_down = true;
            this.move_up = false;
        }
        else {
            this.move_up = false;
            this.move_down = false;
        }
    }
    MocuGame.MocuMan.prototype.update = function () {
        this.keyHandle();
        MocuGame.MocuObject.prototype.update.call(this);
        //this.move_left = Key.isDown(Key.LEFT);
        //this.move_right = Key.isDown(Key.RIGHT);
        if (this.move_left == true) {
            this.velocity.x = -1;
        }
        else if (this.move_right == true) {
            this.velocity.x = 1;
        }
        else
            this.velocity.x = 0;
        if (this.move_up)
            this.velocity.y = -1;
        else if (this.move_down)
            this.velocity.y = 1;
        else
            this.velocity.y = 0;
    }
    MocuGame.Shrio = function (point) {
        MocuGame.MocuMan.call(this, point, new MocuGame.Point(276, 276));
        this.frame = new MocuGame.Point(0, 0);
        this.img = new Image();
        this.img.src = "/images/ShrioSheet.png";

    }
    MocuGame.Shrio.prototype = new MocuGame.MocuMan(new MocuGame.Point(), new MocuGame.Point());
    MocuGame.Shrio.constructor = MocuGame.Shrio;
    MocuGame.Shrio.prototype.draw = function (context) {

        console.log(this.img.src);
        context.drawImage(this.img, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }*/

    Point = new MocuGame.Point(110, 0);
    Herder = new MocuGame.Shrio(Point);
    Derpy = new MocuGame.MocuObject(new MocuGame.Point(75, 75), new MocuGame.Point(75, 75));
    

})();
