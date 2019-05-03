'use strict';
var survivshim = survivshim || {};

survivshim.CollectMenu = function (){
  this.active = false;
  this.item = null;
  this.collected = 0;
};

survivshim.CollectMenu.prototype ={
    showMenu : function(item){
        if (item !== null){
            this.item = item;
            this.active = true;
            this.collected = 0;
        }
    },

    hideMenu : function(){
        this.item = null;
        this.active = false;
        survivshim.character.changeAction(survivshim.C.ACTION_NONE);
    },

    render : function(){
        if (this.item !== null && this.active === true){
            var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            ctx.fillRect(this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX,
                        this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY,
                         200,70);
            ctx.font = "1Opx Arial";
            ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Collecte en cours";
            ctx.fillText(text ,
                this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +10, 
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 10);

            ctx.beginPath();
            ctx.fillStyle = survivshim.C.COLOR_TURQUOISE;
            let prct = Math.floor(this.collected / (this.collected + this.item.collect.quantity) * 100);
            ctx.fillRect(this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +30,
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 30,
                prct,
                10
                );
            text = "Stop";
            ctx.fillText(text ,
                    this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +70, 
                    this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 60);
    
            
        }else if (this.item === null && this.active === true){
            this.hideMenu();
        }
    },

    onClick : function(x,y){
        if (this.active === true && this.item !== null){
            if ((x< this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +200) 
            && (x >this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX ) 
            && (y< this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 80) 
            && (y>this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY )){
                if ((y > this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +55)
                && (y < this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +80)){
                    this.hideMenu();
                }   
                return survivshim.C.CLICK_ON_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};