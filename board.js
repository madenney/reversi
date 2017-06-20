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
                if((tileValue[0]%2===0 && tileValue[1]%2===0) || (tileValue[0]%2===1 && tileValue[1]%2===1)){
                    var identity = tile.getId();
                    console.log(identity);
                    tr.append("<td class='square blackgradient' id=" + identity + "></td>");   
                }
                else{
                    var identity = tile.getId();
                    console.log(identity);
                    tr.append("<td class='square redgradient' id=" + identity + "></td>");   
                }


                row.push(tile);
            }
            $('tbody').append(tr);
            tiles.push(row);
        }
        console.log(tiles);


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
                if(tiles[Number(coords[0]) + i][Number(coords[1]) + j]) {
                    arr.push(tiles[Number(coords[0]) + i][Number(coords[1]) + j]);
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
    // this.getScore(){
    //     //loop through tiles
    //     //tiles[i][j].getColor();
    // }

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
