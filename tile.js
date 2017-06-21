/**
 * Created by Matt on 6/19/2017.
 */

function Tile(x,y) {

    var id = "" + x + "-" + y;
    var jid = "#" + id;
    var color = "none";

    var initialize = function() {

    };

    var putDown = function() {

    };

    this.setColor = function(inputColor) {
        // $(jid).removeClass("white");
        // $(jid).removeClass("black");
        // if(inputColor == "white") {
        //     color = inputColor;
        //     $(jid).addClass("white").addClass("tile");
        // }
        // if(inputColor == "black") {
        //     color = inputColor;
        //     $(jid).addClass("black").addClass("tile");
        // }
        var box = $(jid);
        if(inputColor === "black") {
            putDown1();
        } else {
            putDown2();
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

function animationClick(){
    console.log(“clicked”);
    if(currentTurn === “black”){
        $(this).click(putDown1());
    }else if(currentTurn === “white”){
        $(this).click(putDown2());

    }

}

function putDown1(){
    $(“.token”).on(‘click’, function(){
        $(this).width(250);
        $(this).css(‘animation’,‘fadeout 2s’);
        $(this).css(‘opacity’,‘1’);
        $(this).children(“.front”).prepend(‘<img id=“theImg” src=“reversi_assets/white.png” />‘);
        $(this).children(“.back”).prepend(‘<img id=“theImg” src=“reversi_assets/black.png” />‘);
    });
}


function putDown2(){
    $(“.token”).on(‘click’, function(){
        var newToken = creatToken();
        $(this).append(newToken);
        $(this).width(250);
        $(this).css(‘animation’,‘fadeout 2s’);
        $(this).css(‘opacity’,‘1’);
        $(this).children(“.front”).prepend(‘<img id=“theImg” src=“reversi_assets/black.png” />‘);
        $(this).children(“.back”).prepend(‘<img id=“theImg” src=“reversi_assets/white.png” />‘);
    });
}

function creatToken(){
    var x =$(‘<div>‘).addClass(‘front’);
    var y =$(‘<div>‘).addClass(‘back’);
    var z =$(‘<div>‘).addClass(‘token’);
    var plz =$(‘<section>‘).addClass(‘container’);
    z.append(x);
    z.append(y);
    plz.append(z)
    return plz;

}