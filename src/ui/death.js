'use strict';
var survivshim = survivshim || {};

survivshim.Death = function (){
  this.active = false;
  this.x = survivshim.gameEngine.centerX - 200;
  this.y = survivshim.gameEngine.centerY - 200;
  this.width = 400;
  this.height = 200;
  this.ctx = null;
};

survivshim.Death.prototype ={

    render : function(){
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        this.ctx.font = "32px Arial";
        let text = "Vous etes mort";
        this.ctx.fillText(text , this.x + 100 , this.y + 40 );
        this.ctx.font = "16px Arial";
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect( this.x + 130, this.y + 135, 130,40);
        this.ctx.stroke();
        text = "Recommencer";
        this.ctx.fillText(text ,this.x + 140, this.y + 160);
    },

    onClick : function(x,y){
        if(x < (this.x + this.width ) && x > this.x
        && y < (this.y + this.height) && y > this.y){
            if(x > (this.x +130) && x < (this.x + 250)
            && y > (this.y + 130) && y < (this.y + 300)){
                survivshim.gameEngine.init();
            }
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}