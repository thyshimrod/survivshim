'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenuOnMateriauMenu = function (){
  this.active = false;
  this.materiau = null;
  this.x = 0;
  this.y = 0;
};

survivshim.ContextualMenuOnMateriauMenu.prototype ={
    showMenu : function(materiau){
        if (materiau !== null){
            this.materiau = materiau.materiau;
            this.x = materiau.x;
            this.y = materiau.y
            this.active = true;
        }
    },

    hideMenu : function(){
        this.materiau = null;
        this.active = false;
    },

    render : function(){
        if (this.materiau !== null && this.active === true){
            var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            ctx.fillRect(this.x,
                        this.y,
                            100,100);
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x, this.y, 100, 100);
            ctx.stroke();
        }
    },

    onClick : function(x,y){
        if (this.active === true ){
            if (x < (this.x + 100)
            &&  x > this.x
            &&  y < this.y + 100
            &&  y > this.y){
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();    
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
}