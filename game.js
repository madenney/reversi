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

    var reset = function() {
        console.log("GAME OVER");
    };

    var doTurn = function() {
        currentTurn = "black";
        // Get legal tiles and add click listeners to them
        legalTiles = board.getLegalTiles(currentTurn);
        if(legalTiles.length == 0) {
            if(reset == true) { reset(); return;}
            reset = true;
            botTurn();
            return;
        }
        reset = false;
        console.log("Current Turn: " + currentTurn);
        // x = board.getLegalTiles(currentTurn);
        // console.log("Legal Tiles")
        // for (var i = 0; i < x.length; i++) {
        //     for(var j = 0; j < x[i].length; j++) {
        //         console.log(x[i][j][0].getId());
        //     }
        // }
        // console.log("--------------");
        for(var i = 0; i < legalTiles.length; i++) {
            setHover(legalTiles[i]);
            setClickListener(legalTiles[i]);
        }
    };

    // var nextTurn = function(){
    //     if(currentTurn == "black"){currentTurn = "white";}
    //     else{currentTurn = "black";}
    //     doTurn();
    // };
    var updateScore = function(){
        $('#rebelScore').text(score[0]);
        $('#empireScore').text(score[1]);
    };

    var botTurn = function() {
        setTimeout(function() {
            currentTurn = "white";
            var choices = board.getLegalTiles("white");
            if(choices.length == 0) {
                if(reset == true) {reset(); return}
                doTurn();
                return;
            }
            reset = false;
            //Loop through choices and find the one that gives the most points
            var best = -1;
            console.log(choices);
            for(var i = 0; i < choices.length; i++) {
                var counter = 0;
                console.log(choices[i]);
                for(var j = 0; j < choices[i].length; j++) {
                    console.log(choices[i][j]);
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

            // Choose Randomly
            //var choice = choices[Math.floor(Math.random() * choices.len)]

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
        }, 1000);
    };

    var setClickListener = function(paths) {
        var tile = $(paths[0][0].getJId());
        var tileParent = tile.parent();
        tileParent.addClass("clickable");
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