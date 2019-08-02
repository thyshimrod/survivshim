'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenuOnEquipementMenu = function (){
  this.active = false;
  this.materiau = null;
  this.x = 300;
  this.y = 100;
  this.width = 50;
  this.height = 20;
  this.ctx = null;
  this.icon = null;
};

survivshim.ContextualMenuOnEquipementMenu.prototype ={
    showMenu : function(icon,position){
        this.active = true;
        this.icon = icon;
        this.x = icon.x + 40 + position.x;
        this.y = icon.y + position.y;
    },

    hideMenu : function(){
        this.icon = null;
        this.active = false;
    },

    render : function(){
        if ( this.active === true && this.icon !== null && typeof this.icon.item !== "undefined"){
            console.log(typeof this.icon.item );
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
            let text = "Retirer";
            this.ctx.fillText(text ,
                this.x + 5, 
                this.y + 13);
        }
    },
    
    doActionUnEquip : function(action){
        survivshim.character.unequip(this.icon.item);
    },

    doAction : function(typeAction){
        if (typeAction === 1){
            this.doActionUnEquip();
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