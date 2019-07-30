'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenuOnEquipementMenu = function (){
  this.active = false;
  this.materiau = null;
  this.x = 300;
  this.y = 100;
  this.width = 50;
  this.height = 40;
  this.ctx = null;
};

survivshim.ContextualMenuOnEquipementMenu.prototype ={
    showMenu : function(){
        this.active = true;
        
    },

    hideMenu : function(){
        this.materiau = null;
        this.active = false;
    },

    render : function(){
        if ( this.active === true){
            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x,
                        this.y,
                        this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        }
    },


    onClick : function(x,y){
        if (this.active === true ){
            if (x < (this.x + this.width)
            &&  x > this.x
            &&  y < this.y + this.height
            &&  y > this.y){
                if (y < (this.y+20)){
                    this.doAction(1);
                }
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();    
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
}