(function () {
    MocuGame.MocuAnimation = function(name, coords, speed, loop)
    {
        coords = (typeof coords == 'undefined' || typeof coords == null) ? "0,0" : coords;
        this.coordinates = new Array();
        this.speed = speed;
        this.max_frame_juice = 100;
        this.frame_juice = this.max_frame_juice;
        this.loop = loop;
        this.frame = 0;
        this.finished = false;
        this.name = name;
        //Now loop through the coords string and create some DGPairs
        var tmp_array = coords.split("|");
        this.length = tmp_array.length;
        for (var i = 0; i < tmp_array.length; i += 1) {
            var newloc = new MocuGame.Point(0, 0);
            var tmp_array2 = tmp_array[i].split(",");
            newloc.x = tmp_array2[0];
            newloc.y = tmp_array2[1];
            this.coordinates.push(newloc);
        }
    }
    MocuGame.MocuAnimation.prototype.update = function (deltaT) {
        this.frame_juice -= this.speed * deltaT;
        if (this.frame_juice <= 0) {
            this.frame += 1;
            if (this.frame >= this.length) {
                if (this.loop)
                    this.frame = 0;
                else {
                    this.finished = true;
                    this.frame -= 1;
                }
            }
            this.frame_juice = this.max_frame_juice;
        }
    }
})();