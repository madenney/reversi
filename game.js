/**
 * Created by Matt on 6/19/2017.
 */

// Game Object
function Game(playerColor) {

    // Declare some variables
    var board;
    var score = [2,2];
    var legalTiles;
    var currentTurn = playerColor;
    var pcolor = playerColor;
    reset = false;

    // Initialize the game
    var initialize = function() {
        board = new Board(8,8);
        board.setup();
    };

    // Reset Game
    var resetGame = function() {
        if(score[0] == score[1]){
            window.location.href = "tie.html";
        }
        if(pcolor === "black") {
            if(score[0] > score[1]) {
                window.location.href = "win.html";
            } else {
                window.location.href = "lose.html";
            }
        } else {
            if(score[1] > score[0]) {
                window.location.href = "win.html";
            } else {
                window.location.href = "lose.html";
            }
        }
    };

    // Switch Turn
    var switchTurn = function() {
        if(currentTurn === "white") {
            currentTurn = "black";
            $("#player1").addClass("pathway");
            $("#player2").removeClass("pathway");
        }
        else{
            currentTurn = "white";
            $("#player2").addClass("pathway");
            $("#player1").removeClass("pathway");
        }

    };

    // Update Score
    var updateScore = function(){
        $('#rebelScore').text(score[0]);
        $('#empireScore').text(score[1]);
    };

    // Player Turn
    var doTurn = function() {
        switchTurn();
        // Get legal tiles and add click listeners to them
        legalTiles = board.getLegalTiles(currentTurn);

        // If there are no legal tiles
        if(legalTiles.length == 0) {
            if(reset == true) { resetGame(); return;}
            reset = true;
            botTurn();
            return;
        }
        reset = false;

        // Set click listeners to each legal tile and hover effect to each pathway
        for(var i = 0; i < legalTiles.length; i++) {
            setHover(legalTiles[i]);
            setClickListener(legalTiles[i]);
        }
    };


    var botTurn = function() {

        switchTurn();

        // Put this in a set timeout to make it look like the bot is thinking
        var thinkTime = Math.floor(Math.random() * 2500) + 1000;
        setTimeout(function() {
            // Get legal tiles
            var choices = board.getLegalTiles(currentTurn);

            // If there are no legal tiles
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
                    choiceMade = true;
                    var best = i;
                }
            }

            // If no corners found
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
                // If no paths have more than one tile, then choose randomly
                if(best == -1) {
                    best = Math.floor(Math.random() * choices.length);
                }
            }

            // Flip tiles down the path
            choices[best][0][0].setColor(currentTurn);
            for(var i = 0; i < choices[best].length; i++){
                for(var j = 0; j < choices[best][i].length; j++){
                    choices[best][i][j].flip(currentTurn);
                }
            }
            // get score
            score = board.getScore();
            updateScore();
            doTurn();
        }, thinkTime); // Change this value to make the bot think at different speeds
    };

    // Set click listeners onto legal tiles
    var setClickListener = function(paths) {
        // Get tile clicked on and its parent
        var tile = $(paths[0][0].getJId());
        var tileParent = tile.parent();
        //tileParent.addClass("clickable"); // < for testing

        // Click function
        tileParent.click(function() {
            // Remove click handlers and hover from legal tiles
            for(var i = 0; i < legalTiles.length; i++) {
                for(var j = 0; j < legalTiles[i].length; j++) {
                    for(var k = 0; k < legalTiles[i][j].length; k++){
                        $(legalTiles[i][j][k].getJId()).parent().removeClass("pathway clickable").off();
                    }
                }
            }
            // Flip tile clicked
            paths[0][0].setColor(currentTurn);
            // Flip tiles down the path
            for(var i = 0; i < paths.length; i++){
                for(var j = 1; j < paths[i].length; j++){
                    paths[i][j].flip(currentTurn); // This will be .flip() once that gets working
                }
            }
            // get score and update
            score = board.getScore();
            updateScore();
            botTurn();
        });
    };

    // Set hover effects onto path
    var setHover = function(path) {
       $(path[0][0].getJId()).parent().hover(
           // Function for hover
           function() {
               $(path[0][0].getJId()).parent().addClass("pathway");
               for(var i = 0; i < path.length; i++) {
                   for(var j = 0; j < path[i].length; j++) {
                       $(path[i][j].getJId()).parent().addClass("pathway");
                   }
               }
           },
           // Function for off hover
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
    if(currentTurn === "black") {
        botTurn();
    } else {
        switchTurn();
        doTurn();
    }

}