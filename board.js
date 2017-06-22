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


    // Create Board
    var initialize = function() {

        // Loop through rows
        for (var i = 0; i < rows; i++) {
            var row = [];
            // Loop through columns
            var tr = $("<tr class='row'></tr>");
            for (var j = 0; j < cols; j++) {
                // Create tile object, using currents coords as parameters
                var tile = new Tile(i, j);
                // Get the coords back in the form of an array
                var tileValue = tile.getCoords();
                // Get the coords back in the form of a string
                var identity = tile.getId();
                // Add tile to row
                row.push(tile);

                var buffer = $("<div>").addClass("buffer");
                var t = $("<div>").attr("id", identity);
                if((tileValue[0]%2===0 && tileValue[1]%2===0) || (tileValue[0]%2===1 && tileValue[1]%2===1)){
                    var td = $('<td class="square blackgradient"></td>');
                }
                else{
                    var td = $("<td class='square redgradient' ></td>");
                }
                buffer.append(t);
                td.append(buffer);
                tr.append(td);
            }
            $('tbody').append(tr);
            tiles.push(row);
        }
    };

    // Initial setup for board
    this.setup = function() {
        tiles[3][3].setColor("white");
        tiles[3][4].setColor("black");
        tiles[4][3].setColor("black");
        tiles[4][4].setColor("white");
    };

    // Loop through all tiles and return occupied ones
    var getOccupiedTiles = function() {
        var arr = [];
        for(var i = 0; i < tiles.length; i++) {
            for (var j = 0; j < tiles[i].length; j++) {
                if(tiles[i][j].getColor() !== "none") {
                    arr.push(tiles[i][j]);
                }
            }
        }
        return arr;
    };

    // Return 8 tiles around the original tile
    var getAdjacentTiles = function(tile) {
        var arr = [];
        var coords = tile.getCoords();
        // Starting at (-1,-1), loop around the original tile
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

    // Get Occupied Adjacent Tiles
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

    // Starting with two tiles, follow path
    var followPath = function(tile, nextTile) {
        var color = nextTile.getColor();
        // Get coords of both tiles
        tileCoords = tile.getCoords();
        nextCoords = nextTile.getCoords();

        // Calculate vector
        var vector = [nextCoords[0] - tileCoords[0], nextCoords[1] - tileCoords[1]];

        //Create initial path
        var path = [tile, nextTile];
        // Loop to continue until edge of board, empty square, or enemy tile
        for(var i = 0; i < 9; i++) {
            // If edge of board in X direction, return false
            if(!(tiles[Number(nextCoords[0]) + vector[0]])) {return false;}
            var next = tiles[Number(nextCoords[0]) + vector[0]][ Number(nextCoords[1]) + vector[1]];
            // If edge of board in Y direction, return false
            if(!next) {return false;}
            // If next tile is empty, return false
            if(next.getColor() == "none") {return false;}
            // If enemy tile, continue
            if(next.getColor() === color) {
                path.push(next);
                nextCoords = next.getCoords();
            } else {
                break;
            }
        }
        return path;
    };

    // Takes a tile and a color and figures out if its legal
    var getLegality = function(tile, color) {
        if(color == "black") { var otherColor = "white";}
        else { var otherColor = "black";}
        var adj = getAdjacentTiles(tile);
        var paths = [];
        // Loop through adjacent tiles and check for enemy tiles
        for(var i = 0; i < adj.length; i++) {
            if(adj[i].getColor() === otherColor) {
                // If found, follow path
                var path = followPath(tile,adj[i]);
                // If path is legal, add to array of paths
                if(path) {paths.push(path);}
            }
        }
        // If at least one path was found, then return path
        if(paths.length > 0) { return paths;}
        else {return false;}
    };

    // Basically the main function of this object
    // Returns an array of pathways, each starting with a legal tile
    this.getLegalTiles = function(color) {
        var oats = this.getOATs();
        var legalOatPaths = [];
        // Loop through oats and find legal paths
        for(var i = 0; i < oats.length; i++) {
            var legalOatPath = getLegality(oats[i], color);
            if(legalOatPath) {legalOatPaths.push(legalOatPath);}
        }
        return legalOatPaths;
    };


    // For testing
    this.logTiles = function(){
        console.log("Logging Tiles: ");
        for(var i = 0; i < tiles.length; i++) {
            for(var j = 0; j < tiles[0].length; j++) {
                tiles[i][j].log();
            }
        }
    };

    // Self explanatory
    var addWithoutRepeats = function(newTile, tileArray) {
        for(var i = 0; i < tileArray.length; i++) {
            if(tileArray[i] === newTile) {
                return;
            }
        }
        tileArray.push(newTile);
    };

    // counts tiles and returns a score in an array of elements
    this.getScore = function(){
        var arr = [0,0];
        for(var i = 0; i < tiles.length; i++){
            for(var j = 0; j < tiles[0].length; j++){
                if(tiles[i][j].getColor() === 'black'){
                    arr[0]++;
                }
                else if(tiles[i][j].getColor() === 'white'){
                    arr[1]++;
                }
            }
        }
        return arr;
    };


    // Return the number of occupied tiles
    this.getOccupiedCount = function() {
        return getOccupiedTiles().length;
    };

    initialize();
}
