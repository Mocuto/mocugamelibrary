(function () {
    MocuGame.Pointer = function (e, down) {
        this.event = event;
        this.ID = e.pointerId;
        this.pos = new MocuGame.Point(e.clientX / MocuGame.uniscalex, e.clientY / MocuGame.uniscaley);
        this.button = e.button;
        this.lastpos = null;
        this.down = down;
    }
    MocuGame.Pointer.prototype.updatePos = function (e, down) {
        this.lastpos = new MocuGame.Point(this.pos.x, this.pos.y);
        this.pos = new MocuGame.Point(e.clientX / MocuGame.uniscalex, e.clientY / MocuGame.uniscaley);
        this.down = down;
    }
})();