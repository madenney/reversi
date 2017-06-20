/**
 * Created by Matt on 6/19/2017.
 *
 *
 * To make this easier, Open Adjacent Tiles will be called OATs
 */

function Board(x,y) {

    var rows = x;
    var cols = y;
    var tiles = [];

    var initialize = function() {
        console.log("Initializing Board Object");
        var maxTileContainerWidth = 150;

        // Get some values and do some math to find width of tile container
        var boardWidth = $("#board-container").css("width").slice(0, -2);
        boardWidth = boardWidth - $("#board-container").css("border-width").slice(0, 2);
        var boardHeight = $("#board-container").css("height").slice(0, -2);
        boardHeight = boardHeight - $("#board-container").css("border-width").slice(0, 2);
        var potentialTileContainerWidth = boardWidth / cols;
        var potentialTileContainerHeight = boardHeight / rows;
        if (potentialTileContainerHeight < potentialTileContainerWidth) {
            var tileContainerWidth = potentialTileContainerHeight;
        } else {
            var tileContainerWidth = potentialTileContainerWidth;
        }
        if (tileContainerWidth > maxTileContainerWidth) {
            tileContainerWidth = maxTileContainerWidth;
        }
        //tileContainerWidth = Math.floor(tileContainerWidth);
        console.log("tileContainerWidth: " + tileContainerWidth);
        // Create board
        var board = $("<div>").attr("id", "board");
        board.css({"width": tileContainerWidth * cols, "height": tileContainerWidth * rows});

        // Create tile containers
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var j = 0; j < cols; j++) {
                // Create tile containers and add them to the board
                var tileContainer = $("<div>").addClass("tile-container");
                tileContainer.css({"width": tileContainerWidth, "height": tileContainerWidth});
                var tileElement = $("<div>").addClass("tile");
                var tileID = "" + i + "-" + j;
                tileElement.attr("id", tileID);
                tileContainer.text(tileID);
                tileContainer.append(tileElement);
                board.append(tileContainer);

                // Create tile object and add it to the tiles array
                var tile = new Tile(i, j);
                row.push(tile);
            }
            tiles.push(row);
        }
        $("#board-container").append(board);
    };

    this.setup = function() {
        tiles[3][3].setColor("white");
        tiles[3][4].setColor("black");
        tiles[4][3].setColor("black");
        tiles[4][4].setColor("white");

    };

    var getOccupiedTiles = function() {
        var arr = [];
        for(var i = 0; i < tiles.length; i++) {
            for (var j = 0; j < tiles[0].length; j++) {
                if(tiles[i][j].getColor() !== "none") {
                    arr.push(tiles[i][j]);
                }
            }
        }
        return arr;
    };

    var getAdjacentTiles = function(tile) {
        var arr = [];
        var coords = tile.getCoords();
        for(var i = -1; i < 2; i++) {
            for(var j = -1; j < 2; j++) {
                if(i == 0 && j == 0) {continue;} // Skip self
                // If statement to make sure it exists (if at the edge of the board)
                if(tiles[Number(coords[0]) + i]){
                    if(tiles[Number(coords[0]) + i][Number(coords[1]) + j]) {
                        arr.push(tiles[Number(coords[0]) + i][Number(coords[1]) + j]);
                    }
                }
            }
        }
        return arr;
    };

    this.getOATs = function() {
        var occupied = getOccupiedTiles();
        var OATs = [];
        for(var i = 0; i < occupied.length; i++) {
            var adjacentTiles = getAdjacentTiles(occupied[i]);
            for (var j = 0; j < adjacentTiles.length; j++){
                if(adjacentTiles[j].getColor() === "none"){
                    addWithoutRepeats(adjacentTiles[j], OATs);
                }
            }
        }
        return OATs;
    };

    var followPath = function(tile, nextTile) {
        var color = nextTile.getColor();
        tileCoords = tile.getCoords();
        nextCoords = nextTile.getCoords();
        var path = [tile, nextTile];
        var step = [nextCoords[0] - tileCoords[0], nextCoords[1] - tileCoords[1]];
        for(var i = 0; i < 9; i++) { // <<<<<<<<<< Change this loop later.
            var next = tiles[Number(nextCoords[0]) + step[0]][ Number(nextCoords[1]) + step[1]];
            if(!next) {return false;}
            if(next.getColor() == "none") {return false;}
            if(next.getColor() === color) {
                path.push(next);
                nextCoords = next.getCoords();
            } else {
                break;
            }
        }
        return path;
    };

    var getLegality = function(tile, color) {

        if(color == "black") { var otherColor = "white";}
        else { var otherColor = "black";}
        var adj = getAdjacentTiles(tile);
        var paths = [];
        for(var i = 0; i < adj.length; i++) {
            if(adj[i].getColor() === otherColor) {
                var path = followPath(tile,adj[i]);
                if(path) {paths.push(path);}
            }
        }
        if(paths.length > 0) { return paths;}
        else {return false;}
    };

    this.getLegalTiles = function(color) {
        var oats = this.getOATs();
        var legalOatPaths = [];
        for(var i = 0; i < oats.length; i++) {
            var legalOatPath = getLegality(oats[i], color);
            if(legalOatPath) {legalOatPaths.push(legalOatPath);}
        }
        return legalOatPaths;
    };

    this.logTiles = function(){
        console.log("Logging Tiles: ");
        for(var i = 0; i < tiles.length; i++) {
            for(var j = 0; j < tiles[0].length; j++) {
                tiles[i][j].log();
            }
        }
    };

    var addWithoutRepeats = function(newTile, tileArray) {
        for(var i = 0; i < tileArray.length; i++) {
            if(tileArray[i] === newTile) {
                return;
            }
        }
        tileArray.push(newTile);
    };

    initialize();
}
