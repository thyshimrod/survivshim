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
            ctx.font = "1Opx Arial";
            ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Equipement";
            ctx.fillText(text ,
                this.x + 10, 
                this.y + 15);            
            text = "Materiaux";
            ctx.fillText(text ,
                this.x + 150, 
                this.y + 15);            
            text = "Consommable";
            ctx.fillText(text ,
                this.x + 300, 
                this.y + 15);
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x, this.y, this.width, 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x, this.y, 120, 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x, this.y, 250, 20);
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