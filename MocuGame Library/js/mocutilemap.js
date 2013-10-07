(function ()
{
    MocuGame.MocuTilemap = function (position, size, tileSize, tilemapString, tilesheetLocation, tilesheetSize) {
        MocuGame.MocuGroup.call(this, position, size);
        this.tileSize = tileSize;
        this.tilesheetLocation = tilesheetLocation;
        this.widthInTiles = Math.floor(this.width / this.tileSize.x);
        this.heightInTiles = Math.floor(this.height / this.tileSize.y);
        this.tileArray = MocuGame.createArray(this.widthInTiles, this.heightInTiles);
        this.tilesheetSize = tilesheetSize;

        //Fill tileArray based off of tilemapString
        var tokens = tilemapString.split(",");
        for (var i = 0; i < tokens.length; i++) {
            if (tokens == "_") {
                continue;
            }
            else if (tokens[i][0] == "(") {
                var subtokens = tokens[i].substring(1, tokens[i].length - 1).split(" ");
                //Create animated tile
                var tile = new MocuGame.MocuTile(new MocuGame.Point((i % this.widthInTiles) * tileSize.x,
                    Math.floor(i / this.widthInTiles) * tileSize.y),
                    tileSize, this.tilesheetLocation, this);
                var pointString = "";
                var animationSpeed = new Number(subtokens[0]);
                for (var j = 1; j < subtokens.length; j++) {
                    var tileNum = new Number(subtokens[j]);
                    pointString += new String(tileNum % (this.tilesheetSize.x / this.tileSize.x)) + "," +
                        new String(Math.floor(tileNum / (this.tilesheetSize.x / this.tileSize.x))) + " ";
                }

                tile.addAnimation("Tile", pointString, animationSpeed, true, false);
                tile.play("Tile");
                tile.animates = true;

                this.tileArray[(i % this.widthInTiles)][Math.floor(i / this.widthInTiles)] = tile;
                this.add(tile);
            }
            else { //Create normal tile
                var tileNum = new Number(tokens[i]);
                var tile = new MocuGame.MocuTile(new MocuGame.Point((i % this.widthInTiles) * tileSize.x,
                    Math.floor(i / this.widthInTiles) * tileSize.y),
                    tileSize, this.tilesheetLocation, this);

                //console.log("ddd " + 0 % 2);

                tile.frame.x = tileNum % (this.tilesheetSize.x / this.tileSize.x);
                tile.frame.y = Math.floor(tileNum / (this.tilesheetSize.x / this.tileSize.x));

                this.tileArray[(i % this.widthInTiles)][Math.floor(i / this.widthInTiles)] = tile;
                //tile.velocity.x = 1;
                this.add(tile);
            }
        }
    }
    MocuGame.MocuTilemap.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTilemap.constructor = MocuGame.MocuTilemap;

    //Here is how 
})();