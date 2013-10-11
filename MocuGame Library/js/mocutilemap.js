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
        this.collisionStartingIndex = 0;

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

                tile.density = (new Number(subtokens[1]) >= this.collisionStartingIndex);
                tile.tileID = new Number(subtokens[1]);

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

                tile.frame.x = tileNum % (this.tilesheetSize.x / this.tileSize.x);
                tile.frame.y = Math.floor(tileNum / (this.tilesheetSize.x / this.tileSize.x));

                this.tileArray[(i % this.widthInTiles)][Math.floor(i / this.widthInTiles)] = tile;

                tile.density = (tileNum >= this.collisionStartingIndex);
                tile.tileID = tileNum;

                this.add(tile);
            }
        }
    };
    MocuGame.MocuTilemap.prototype = new MocuGame.MocuGroup(new MocuGame.Point, new MocuGame.Point);
    MocuGame.MocuTilemap.constructor = MocuGame.MocuTilemap;


    /*
        getTileAtPoint is a function that returns the tile at the given world point, or null if no such tile exists

        Returns:
        (MocuTile) The tile at that 
    */

    MocuGame.MocuTilemap.prototype.getTileAtPoint = function (point) {
        if (!this.containsPoint(point)) {
            return;
        }
        var pos = this.getWorldPoint();
        var positionInTilemap = new MocuGame.Point(point.x - pos.x, point.y - pos.y);
        var tilemapPoint = new MocuGame.Point(Math.floor(positionInTilemap.x / this.tileSize.x),
            Math.floor(positionInTilemap.y / this.tileSize.y));

        return this.tileArray[tilemapPoint.x][tilemapPoint.y];
    }

    /*
        getTilesInRange is a function that returns the tiles in a given range (world point orientation)

        Parameters:
        position - A Point object denoting the top left position of the range
        size - A Point desribing the dimensions of the range

        Returns:
        (Array) an array of the tiles that exist in the range.
    */

    MocuGame.MocuTilemap.prototype.getTilesInRange = function (position, size) {
        var pos = this.getWorldPoint();
        var positionInTilemap = new MocuGame.Point(point.x - pos.x, point.y - pos.y);
        var tilemapPoint = new MocuGame.Point(Math.floor(positionInTilemap.x / this.tileSize.x),
            Math.floor(positionInTilemap.y / this.tileSize.y));

        var tilemapSize = new MocuGame.Point(Math.ceil(size.x / this.tileSize.x),
            Math.ceil(positionInTilemap.y / this.size.y));

        var returnTiles = new Array();

        for (var x = 0; x < tilemapSize.x; x++) {
            for (var y = 0; y < tilemapSize.y; y++) {
                if (typeof this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y] !== "undefined") {
                    returnTiles.push(this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y]);
                }
            }
        }
        return returnTiles;
    }
    /*
        getTilesInRange is a function that returns the tiles in a given range (world point orientation)

        Parameters:
        position - A Point object denoting the top left position of the range
        size - A Point desribing the dimensions of the range

        Returns:
        (Array) an array of the tiles that exist in the range.
    */

    MocuGame.MocuTilemap.prototype.getDenseTilesInRange = function (position, size) {
        var pos = this.getWorldPoint();
        var positionInTilemap = new MocuGame.Point(position.x - pos.x, position.y - pos.y);
        var tilemapPoint = new MocuGame.Point(Math.floor(positionInTilemap.x / this.tileSize.x),
            Math.floor(positionInTilemap.y / this.tileSize.y));

        var tilemapSize = new MocuGame.Point(Math.ceil(size.x / this.tileSize.x),
            Math.ceil(size.y / this.tileSize.y));

        var returnTiles = new Array();

        for (var x = 0; x < tilemapSize.x; x++) {
            for (var y = 0; y < tilemapSize.y; y++) {
                if (typeof this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y] !== "undefined") {
                    if (this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y].tileID >= this.collisionStartingIndex) {
                        returnTiles.push(this.tileArray[tilemapPoint.x + x][tilemapPoint.y + y]);
                    }
                }
            }
        }
        return returnTiles;
    }
})();