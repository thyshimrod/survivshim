'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenuOnMateriauMenu = function (){
  this.active = false;
  this.materiau = null;
  this.x = 0;
  this.y = 0;
  this.width = 50;
  this.height = 40;
  this.ctx = null;
};

survivshim.ContextualMenuOnMateriauMenu.prototype ={
    showMenu : function(materiau){
        if (materiau !== null){
            this.materiau = materiau.item;
            this.x = materiau.x + 32;
            this.y = materiau.y
            this.active = true;
        }
    },

    hideMenu : function(){
        this.materiau = null;
        this.active = false;
    },

    renderMenuContentConsommable : function(){
        let text = "Manger";
        this.ctx.fillText(text ,
            this.x + 5, 
            this.y + 13);
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y+20);
        this.ctx.lineTo(this.x + this.width, this.y + 20);
        this.ctx.stroke();
        text = "Detruire";
        this.ctx.fillText(text ,
            this.x + 5, 
            this.y + 33);
    },

    renderMenuContent : function(){
        if (this.materiau.use === survivshim.C.TYPE_INVENTORY_CONSOMMABLE){
            this.renderMenuContentConsommable();
        }
    },

    render : function(){
        if (this.materiau !== null && this.active === true){
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
            this.renderMenuContent();
        }
    },

    doActionConsommable : function(action){
        if ( action === 1) {
            survivshim.character.eat(this.materiau);
        }else if (action === 2){
            survivshim.character.removeMateriau(this.materiau);
        }
        
    },

    doAction : function(action){
        if (this.materiau.use === survivshim.C.TYPE_INVENTORY_CONSOMMABLE){
            this.doActionConsommable(action);
        }else{

        }
        this.hideMenu();
    },

    onClick : function(x,y){
        if (this.active === true ){
            if (x < (this.x + this.width)
            &&  x > this.x
            &&  y < this.y + this.height
            &&  y > this.y){
                if (y < (this.y+20)){
                    this.doAction(1);
                }else{
                    this.doAction(2);
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