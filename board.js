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


        for (var i = 0; i < rows; i++) {
            var row = [];
            //creates one row using a variable 
            var tr = $("<tr class='row'></tr>");
            for (var j = 0; j < cols; j++) {
                var tile = new Tile(i, j);
                //assigns a variable to an array of the coordinates for the individual boxes
                var tileValue = tile.getCoords();
                //creates checkered pattern for the individual boxes
                var identity = tile.getId();
                var t = $("<div>").attr("id", identity);
                if((tileValue[0]%2===0 && tileValue[1]%2===0) || (tileValue[0]%2===1 && tileValue[1]%2===1)){
                    var td = $('<td class="square blackgradient"></td>');
                    td.append(t);
                    tr.append(td);
                }
                else{
                    var td = $("<td class='square redgradient' ></td>");
                    td.append(t);
                    tr.append(td);
                }
                row.push(tile);
            }
            $('tbody').append(tr);
            tiles.push(row);
        }
    };

    var getScore = function() {
        var score1 = 0;
        var score2 = 0;
        var arr =[];
        for(tiles) {
            if tile is black, score1 ++
            if tile is white, score2 ++

        }
        push scores into arr
        return arr
    }

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
            if(!(tiles[Number(nextCoords[0]) + step[0]])) {return false;}
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

    var getscore
    {
        loop through
    }

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
