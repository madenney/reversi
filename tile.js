/**
 * Created by Matt on 6/19/2017.
 */

function Tile(x,y) {

    var id = "" + x + "-" + y;
    var jid = "#" + id;
    var color = "none";

    var initialize = function() {

    };

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
    this.log = function() {
        console.log(id + " " + color);
    };

    initialize();
}
