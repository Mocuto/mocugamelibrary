(function () {
    MocuGame.MocuCamera = function (position) {
        MocuGame.MocuObject.call(this, position, new MocuGame.Point(1, 1));
    }
    MocuGame.MocuCamera.prototype = new MocuGame.MocuObject(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuCamera.constructor = MocuGame.MocuCamera;
})();