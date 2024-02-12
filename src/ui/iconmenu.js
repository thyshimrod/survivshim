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
        let icon = new survivshim.Icone();
        icon.load(survivshim.C.ICON_BLUEPRINT,0,0);
        this.icons.push(icon);
        icon = new survivshim.Icone();
        icon.load(survivshim.C.ICON_STATS,33,0);
        this.icons.push(icon);
        icon = new survivshim.Icone();
        icon.load(survivshim.C.ICON_INVENTAIRE,66,0);
        this.icons.push(icon);
        icon = new survivshim.Icone();
        icon.load(survivshim.C.ICON_SOMMEIL,132,0);
        this.icons.push(icon);
        icon = new survivshim.Icone();
        icon.load(survivshim.C.ICON_EQUIPEMENT,99,0);
        this.icons.push(icon);
    },

    render : function(){
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        var _this = this;
        this.icons.forEach(function (icon){
            ctx.drawImage(
                icon.spriteset,
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

    closeAll : function(){
        if(survivshim.listblueprintMenu.active) survivshim.listblueprintMenu.hideMenu();
        if(survivshim.statsMenu.active) survivshim.statsMenu.hideMenu();
        if(survivshim.inventaireMenu.active) survivshim.inventaireMenu.hideMenu();
        if(survivshim.sommeilMenu.active) survivshim.sommeilMenu.hideMenu();
        if(survivshim.equipementMenu.active) survivshim.equipementMenu.hideMenu();
    },

    onClick : function(x,y){
        if(y < (this.y + 32) && x < ( 32* this.icons.length)){
            var _this = this;
            var _x = x;
            var _y = y;
            this.icons.forEach(function (icon){
                if ( _x >= icon.x && _x <= (icon.x + 32)){
                    _this.closeAll();
                    if(icon.name === "blueprint"){
                        survivshim.listblueprintMenu.toggleMenu();
                    }else if (icon.name === "stats"){
                        survivshim.statsMenu.toggleMenu();
                    }else if (icon.name === "inventaire"){
                        survivshim.inventaireMenu.toggleMenu();
                    }else if (icon.name === "sommeil"){
                        survivshim.sommeilMenu.toggleMenu();
                    }else if(icon.name === "equipement"){
                        survivshim.equipementMenu.toggleMenu();
                    }
                }
  0         })
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};