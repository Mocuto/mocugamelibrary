(function () {
    MocuGame.MocuTile = function (position, size, spriteLocation, parentTilemap) {
        MocuGame.MocuSprite.call(this, position, size, spriteLocation);

        this.parentTilemap = parentTilemap;
        this.animates = false;
        this.active = false;
    }
    MocuGame.MocuTile.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTile.constructor = MocuGame.MocuTile;
})();