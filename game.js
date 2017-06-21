/**
 * Created by Matt on 6/19/2017.
 */

function Game() {

    var board;

    var score = [2,2];
    var legalTiles;
    var currentTurn = "black";

    var initialize = function() {
        board = new Board(8,8);
        board.setup();
    };

    var doTurn = function() {
        // Get legal tiles and add click listeners to them
        legalTiles = board.getLegalTiles(currentTurn);
        console.log("Current Turn: " + currentTurn);
        x = board.getLegalTiles(currentTurn);
        console.log("Legal Tiles")
        for (var i = 0; i < x.length; i++) {
            for(var j = 0; j < x[i].length; j++) {
                console.log(x[i][j][0].getId());
            }
        }
        console.log("--------------");
        for(var i = 0; i < legalTiles.length; i++) {
            setClickListener(legalTiles[i]);
        }
    };

    var nextTurn = function(){
        if(currentTurn == "black"){currentTurn = "white";}
        else{currentTurn = "black";}
        doTurn();
    };
    var nowScore = function(){
        $('#rebelScore').text(score[0]);
        $('#empireScore').text(score[1]);

    };
    var setClickListener = function(paths) {
        var tile = $(paths[0][0].getJId());
        var tileParent = tile.parent();
        tileParent.addClass("clickable");
        tileParent.click(function() {
            // Remove Clickable from legal tiles
            for(var i = 0; i < legalTiles.length; i++) {
                for(var j = 0; j < legalTiles[i].length; j++) {
                    $(legalTiles[i][j][0].getJId()).parent().removeClass("clickable").off();
                }
            }
            // Flip tiles down the path
            paths[0][0].setColor(currentTurn);
            for(var i = 0; i < paths.length; i++){
                for(var j = 1; j < paths[i].length; j++){
                    paths[i][j].flip(currentTurn); // This will be .flip() once that gets working
                }
            }
            score = board.updateScore();
            nowScore();
            nextTurn();
        });
    };


    nowScore();
    initialize();
    doTurn();

}