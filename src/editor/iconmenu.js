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
        icon = { "x" : 32 , "y" : 0, "tx" : 64, "ty" : 4128 , "icon" : "destroy"};
        this.icons.push(icon);
        icon = { "x" : 64 , "y" : 0, "tx" : 1120, "ty" : 4736 , "icon" : "save"};
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

    getSize : function(){
        return (32 * this.icons.length);
    },

    onClick : function(x,y){
        if(y < (this.y + 32) && x < ( 32* this.icons.length)){
            var _this = this;
            var _x = x;
            var _y = y;
            this.icons.forEach(function (icon){
                if ( _x >= icon.x && _x <= (icon.x + 32)){
                    if(icon.icon === "decor"){
                        survivshim.decorMenu.showMenu();
                    }else if (icon.icon === "destroy"){
                        survivshim.gameEditor.modeEditor = survivshim.C.EDITOR_ACTION_DELETE;
                        console.log("pwet");
                        console.log(survivshim.gameEditor.modeEditor);
                    }else if (icon.icon === "save"){
                        survivshim.levelEditor.saveToJs();
                    }
                }
  0         })
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};