/**
 * Created by Matt on 6/19/2017.
 */

function Tile(x,y) {

    // Declare some variables
    var id = "" + x + "-" + y;
    var jid = "#" + id; // This is to make life easier when using jQuery
    var color = "none";

    // Set the color of the tile object and the tile in the html
    this.setColor = function(inputColor) {
        if(inputColor == "white") {
            color = inputColor;
            $(jid).addClass("white").addClass("tile");
        }
        if(inputColor == "black") {
            color = inputColor;
            $(jid).addClass("black").addClass("tile");
        }

    };

    // Flip the color of the tile object and the tile in the html
    this.flip = function(currentColor) {
        if(currentColor === "black") {
            $(jid).removeClass("white");
            $(jid).addClass("black");
            color = "black";
        } else {
            $(jid).removeClass("black");
            $(jid).addClass("white");
            color = "white";
        }
    };

    // All functions below are self explanatory
    this.getColor = function() {
        return color;
    };

    this.getId = function() {
        return id;
    };

    this.getJId = function() {
        return jid;
    };

    this.getCoords = function() {
        var arr = [id.substring(0,id.indexOf("-")), id.substring(id.indexOf("-")+1)];
        return arr;
    };

    // For testing
    this.log = function() {
        console.log(id + " " + color);
    };
}
