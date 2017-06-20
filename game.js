/**
 * Created by Matt on 6/19/2017.
 */

function Game() {

    var board;
    var rebelScore = 0;
    var empireScore = 0;
    var legalTiles;
    var currentTurn = "black";

    var initialize = function() {
        board = new Board(8,8);
        board.setup();
    };

    var doTurn = function() {
        // Get legal tiles and add click listeners to them
        legalTiles = board.getLegalTiles(currentTurn);
        console.log("--------------")
        for(var i = 0; i < legalTiles.length; i++) {
            setClickListener(legalTiles[i]);
        }
    };

    var nextTurn = function(){
        if(currentTurn == "black"){currentTurn = "white";}
        else{currentTurn = "black";}
        doTurn();
    };

    var setClickListener = function(paths) {
        tile = $(paths[0][0].getJId());
        tile.addClass("clickable");
        tile.click(function() {
            // Remove Clickable from legal tiles
            for(var i = 0; i < legalTiles.length; i++) {
                for(var j = 0; j < legalTiles[i].length; j++) {
                    $(legalTiles[i][j][0].getJId()).removeClass("clickable").off();
                }
            }
            // Flip tiles down the path
            paths[0][0].setColor(currentTurn);
            for(var i = 0; i < paths.length; i++){
                for(var j = 1; j < paths[i].length; j++){
                    paths[i][j].setColor(currentTurn); // This will be .flip() once that gets working
                }
            }
            nextTurn();
        });
    };


    this.getTurn= function() {
        return currentTurn;
    };

    initialize();
    doTurn();
}