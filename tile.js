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
        $(jid).removeClass("white");
        $(jid).removeClass("black");
        if(inputColor == "white") {
            color = inputColor;
            $(jid).addClass("white");
        }
        if(inputColor == "black") {
            color = inputColor;
            $(jid).addClass("black");
        }
    };

    this.flip = function() {
        if(color === "white") {
            color = "black";
        } else {
            color = "white";
        }
    };

    this.getColor = function() {
        return color;
    };

    this.getId = function() {
        return id;
    };

    this.getCoords = function() {
        var arr = [id.substring(0,id.indexOf("-")), id.substring(id.indexOf("-")+1)];
        return arr;
    }

    this.log = function() {
        console.log(id + " " + color);
    };

    initialize();
}