'use strict';
var survivshim = survivshim || {};

survivshim.InventaireMenu = function (){
  this.active = false;
  this.x = 100;
  this.y = 100;
  this.width = 400;
  this.height = 400;
};

survivshim.InventaireMenu.prototype ={
    showMenu : function(item){
        this.active = true;
    },

    hideMenu : function(){
        this.active = false;
    },

    render : function(){
        if (this.active === true){
            var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            ctx.fillRect(this.x,
                        this.y,
                        this.width,
                        this.height);
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();            
        }
    },

    onClick : function(x,y){
        if(this.active === true){
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};