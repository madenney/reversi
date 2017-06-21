/**
 * Created by Matt on 6/19/2017.
 */

function Game() {

    var board;

    var score = [2,2];
    var legalTiles;
    var currentTurn = "black";
    reset = false;

    var initialize = function() {
        board = new Board(8,8);
        board.setup();
    };

    var resetGame = function() {
        console.log("GAME OVER");
    };

    var doTurn = function() {
        currentTurn = "black";
        // Get legal tiles and add click listeners to them
        legalTiles = board.getLegalTiles(currentTurn);
        if(legalTiles.length == 0) {
            if(reset == true) { resetGame(); return;}
            reset = true;
            botTurn();
            return;
        }
        reset = false;
        for(var i = 0; i < legalTiles.length; i++) {
            setHover(legalTiles[i]);
            setClickListener(legalTiles[i]);
        }
    };

    var updateScore = function(){
        $('#rebelScore').text(score[0]);
        $('#empireScore').text(score[1]);
    };

    var botTurn = function() {
        setTimeout(function() {
            currentTurn = "white";
            var choices = board.getLegalTiles("white");
            if(choices.length == 0) {
                if(reset == true) {resetGame(); return}
                doTurn();
                return;
            }
            reset = false;

            var best = -1;
            var choiceMade = false;
            // Check for corners
            var corners = ["0-0","0-7","7-0","7-7"];
            for(var i = 0; i < choices.length; i++) {
                if(corners.includes(choices[i][0][0].getId())) {
                    console.log("Corner Found");
                    choiceMade = true;
                    var best = i;
                }
            }

            if(choiceMade === false ) {
                //Loop through choices and find the one that gives the most points
                for(var i = 0; i < choices.length; i++) {
                    var counter = 0;
                    for(var j = 0; j < choices[i].length; j++) {
                        for(var k = 1; k < choices[i][j].length; k++) {
                            counter++;
                        }
                    }
                    if(counter > best) {
                        best = i;
                    }
                }
                // If none have more than one, then choose randomly
                if(best == -1) {
                    console.log("Choosing randomly");
                    best = Math.floor(Math.random() * choices.length);
                }
            }

            // Flip tiles down the path
            choices[best][0][0].setColor(currentTurn);
            for(var i = 0; i < choices[best].length; i++){
                for(var j = 0; j < choices[best][i].length; j++){
                    choices[best][i][j].flip(currentTurn); // This will be .flip() once that gets working
                }
            }
            // get score
            score = board.getScore();
            updateScore();
            doTurn();
        }, 200);
    };

    var setClickListener = function(paths) {
        var tile = $(paths[0][0].getJId());
        var tileParent = tile.parent();
        //tileParent.addClass("clickable");
        tileParent.click(function() {
            // Remove click handlers and hover from legal tiles
            for(var i = 0; i < legalTiles.length; i++) {
                for(var j = 0; j < legalTiles[i].length; j++) {
                    for(var k = 0; k < legalTiles[i][j].length; k++){
                        $(legalTiles[i][j][k].getJId()).parent().removeClass("pathway clickable").off();
                    }
                }
            }
            // Flip tiles down the path
            paths[0][0].setColor(currentTurn);
            for(var i = 0; i < paths.length; i++){
                for(var j = 1; j < paths[i].length; j++){
                    paths[i][j].flip(currentTurn); // This will be .flip() once that gets working
                }
            }
            // get score
            score = board.getScore();
            updateScore();
            botTurn();
        });
    };

    var setHover = function(path) {

       $(path[0][0].getJId()).parent().hover(
           function() {
               $(path[0][0].getJId()).parent().addClass("pathway");
               for(var i = 0; i < path.length; i++) {
                   for(var j = 0; j < path[i].length; j++) {
                       $(path[i][j].getJId()).parent().addClass("pathway");
                   }
               }
           },
           function() {
               $(path[0][0].getJId()).parent().removeClass("pathway");
               for(var i = 0; i < path.length; i++) {
                   for(var j = 0; j < path[i].length; j++) {
                       $(path[i][j].getJId()).parent().removeClass("pathway");
                   }
               }
           }
       )
    };

    initialize();
    updateScore();
    doTurn();

}