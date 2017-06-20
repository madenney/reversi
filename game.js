/**
 * Created by Matt on 6/19/2017.
 */

function Game() {

    var board;
    var whiteScore = 0;
    var blackScore = 0;
    var turn = "black";

    var initialize = function() {
        board = new Board(8,8);
        board.setup();
    };

    this.getTurn= function() {
        //if turn black --> white -->css changes
        return turn;
    };
    
    initialize();
}