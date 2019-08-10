'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenuOnMob = function (){
  this.active = false;
  this.x = 300;
  this.y = 100;
  this.width = 50;
  this.height = 20;
  this.ctx = null;
  this.mob = null;
};

survivshim.ContextualMenuOnMob.prototype ={
    showMenu : function(mob){
        this.active = true;
        this.mob = mob;
        this.x = mob.x + 40 ;
        this.y = mob.y ;
    },

    hideMenu : function(){
        this.icon = null;
        this.active = false;
    },

    render : function(){
        if ( this.active === true && this.mob !== null ){
            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x +survivshim.gameEngine.centerX - survivshim.character.x,
                        this.y +survivshim.gameEngine.centerY- survivshim.character.y,
                        this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x +survivshim.gameEngine.centerX - survivshim.character.x,
                this.y +survivshim.gameEngine.centerY- survivshim.character.y, this.width, this.height);
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Detruire";
            this.ctx.fillText(text ,
                this.x +survivshim.gameEngine.centerX - survivshim.character.x +5 ,
                        this.y +survivshim.gameEngine.centerY- survivshim.character.y +13);
        }
    },
    
    doAction : function(typeAction){
        if (typeAction === 1){
            this.mob.remove();
        }
    },


    onClick : function(x,y){
        if (this.active === true ){
            if (x < (this.x +survivshim.gameEngine.centerX - survivshim.character.x + this.width)
            &&  x > this.x +survivshim.gameEngine.centerX - survivshim.character.x
            &&  y < this.y +survivshim.gameEngine.centerY- survivshim.character.y + this.height
            &&  y > this.y +survivshim.gameEngine.centerY- survivshim.character.y){
                this.doAction(1);
                this.hideMenu();
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();    
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
}