(function () {
    MocuGame.MocuTile = function (position, size, spriteLocation) {
        MocuGame.MocuSprite.call(this, position, size, spriteLocation);
    }
    MocuGame.MocuTile.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTile.constructor = MocuGame.MocuTile;
})();