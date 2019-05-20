'use strict';
var survivshim = survivshim || {};

survivshim.IconMenu = function (){
  this.active = false;
  this.x = 0;
  this.y = 0;
  this.icons = [];
  this.spriteset = null;
};

survivshim.IconMenu.prototype ={
    init : function(){
        this.spriteset = survivshim.tileset.get("assets/tileset/iconset.png");
        let icon = { "x" : 0 , "y" : 0, "tx" : 1600, "ty" : 4000 , "icon" : "decor"};
        this.icons.push(icon);
    },

    render : function(){
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        var _this = this;
        this.icons.forEach(function (icon){
            ctx.drawImage(
                _this.spriteset,
                icon.tx,
                icon.ty,
                32,
                32,
                icon.x,
                icon.y,
                32,
                32);
        })
    },

    onClick : function(x,y){
        if(y < (this.y + 32) && x < ( 32* this.icons.length)){
            var _this = this;
            var _x = x;
            var _y = y;
            this.icons.forEach(function (icon){
                if ( _x >= icon.x && _x <= (icon.x + 32)){
                    if(icon.icon === "decor"){
                        console.log("decor");
                    //    survivshim.blueprintMenu.showMenu();
                    }else if (icon.icon === "stats"){
                    //    survivshim.statsMenu.showMenu();
                    }else if (icon.icon === "inventaire"){
                    //    survivshim.inventaireMenu.showMenu();
                    }
                }
  0         })
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};