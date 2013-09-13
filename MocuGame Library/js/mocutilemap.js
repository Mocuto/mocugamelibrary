(function ()
{
    MocuGame.MocuTilemap = function (position, size, tileSize, tilemapString, tilesheetLocation) {
        MocuGame.MocuGroup.call(this, position, size);
    }
    MocuGame.MocuTilemap.prototype = new MocuGame.MocuGroup;
    MocuGame.MocuTilemap.constructor = MocuGame.MocuTilemap;

    //Here is how 
})();