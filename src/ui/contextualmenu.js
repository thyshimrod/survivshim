'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenu = function (){
  this.active = false;
  this.item = null;
};

survivshim.ContextualMenu.prototype ={

    showMenu : function(item){
        if (item !== null){
            this.item = item;
            this.active = true;
        }
    },

    hideMenu : function(){
        this.item = null;
        this.active = false;
    },

    render : function(){
        if (this.item !== null && this.active === true){
            var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            ctx.fillRect(this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX,
                        this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY,
                         100,100);
            ctx.font = "1Opx Arial";
            ctx.fillStyle = "white ";
            let text = this.item.name;
            ctx.fillText(text ,
                this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +10, 
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 10);
            
            text = "Materiau";
            ctx.fillText(text ,
                    this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +30, 
                    this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 30);
            text = survivshim.materiaux[this.item.collect.materiau].name + " : " + this.item.collect.quantity;
            ctx.fillText(text ,
                    this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +10, 
                    this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 50);

            text = "Recolter";
            ctx.fillText(text ,
                this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +30, 
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 80);
        }
    },

    onClick : function(x,y){
        if (this.active === true){
            if ((x< this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +100) 
            && (x >this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX ) 
            && (y< this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 100) 
            && (y>this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY )){
                if ((y > this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +70)
                && (y < this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +90)){
                    //this.item.pickup();
                    survivshim.collectMenu.item = this.item;
                    survivshim.collectMenu.active = true;
                    this.hideMenu();
                }   

                return true;
            }
        }
        return false;
    }
};