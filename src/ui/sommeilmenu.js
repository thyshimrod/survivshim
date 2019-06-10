'use strict';
var survivshim = survivshim || {};

survivshim.SommeilMenu = function (){
  this.active = false;
  this.x = 200;
  this.y = 200;
  this.width = 200;
  this.height = 200;
  this.nbHourSommeil = 3;
  this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
};

survivshim.SommeilMenu.prototype ={
    showMenu : function(){
        this.active = true;
    },

    hideMenu : function(){
        this.active = false;
    },

    

    render : function(){
        if (this.active === true){
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x,this.y,this.width,this.height);
            this.ctx.stroke();
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Sommeil";
            this.ctx.fillText(text ,this.x + 80, this.y + 10);

            text = "Faire un somme de 3h";
            this.ctx.fillText(text ,this.x + 40, this.y + 80);

            text = "Dormir";
            this.ctx.fillText(text ,this.x + 80, this.y + 120);

            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x + 65, this.y + 105,60,20);
            this.ctx.stroke();
        }
    },

    onClick : function(x,y){
        if (this.active === true ){
            if( x > this.x && x < (this.x + this.width)
            && y > this.y && y < (this.y + this.height)){
                if ( x > (this.x + 60) && x < (this.x + 120)
                && y > (this.y + 110) && y < (this.y + 130)){
                    this.hideMenu();        
                    survivshim.hourui.sommeil += this.nbHourSommeil;
                }
                return survivshim.C.CLICK_ON_WINDOW;
            }
            this.hideMenu();
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}