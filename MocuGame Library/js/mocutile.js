(function () {
    MocuGame.MocuTile = function (position, size, spriteLocation, parentTilemap) {
        MocuGame.MocuSprite.call(this, position, size, spriteLocation);

        this.parentTilemap = parentTilemap;
        this.animates = false;
        this.active = false;

        if (this.parentTilemap != null) {
            this.worldPoint.x = this.parentTilemap.x + this.x;
            this.worldPoint.y = this.parentTilemap.y + this.y;
        }

        this.tileID = -1;
    }
    MocuGame.MocuTile.prototype = new MocuGame.MocuSprite(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTile.constructor = MocuGame.MocuTile;
})();