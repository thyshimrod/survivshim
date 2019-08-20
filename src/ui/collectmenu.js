'use strict';
var survivshim = survivshim || {};

survivshim.CollectMenu = function (){
  this.active = false;
  this.item = null;
  this.collected = 0;
  this.height = 70;
  this.width = 200;
  this.x = 0;
  this.y = 0;
};

survivshim.CollectMenu.prototype ={
    showMenu : function(item){
        if (item !== null){
            this.item = item;
            this.active = true;
            this.collected = 0;
            if (item instanceof survivshim.Creature){
                this.x = this.item.x  + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX;
                this.y = this.item.y  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY;
            }else{
                this.x = this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX;
                this.y = this.item.y * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerY-survivshim.character.y + this.item.sizeY;
            }
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
            
            ctx.fillRect(this.x,
                        this.y,
                         this.width,this.height);
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x,
                this.y,
                 this.width,this.height);
            ctx.stroke();
            ctx.font = "1Opx Arial";
            ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Collecte en cours";
            ctx.fillText(text ,
                this.x +10, 
                this.y + 10);

            ctx.beginPath();
            ctx.fillStyle = survivshim.C.COLOR_TURQUOISE;
            let prct = Math.floor(this.collected / (this.collected + this.item.collect.quantity) * 100);
            ctx.fillRect(this.x +30,
                this.y + 30,
                prct,
                10
                );
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x + 60, 
                this.y + 45,
                    50,20);
            ctx.stroke();
            text = "Stop";
            ctx.fillText(text ,
                    this.x +70, 
                    this.y + 60);
    
            
        }else if (this.item === null && this.active === true){
            this.hideMenu();
        }
    },

    onClick : function(x,y){
        if (this.active === true && this.item !== null){
            if ((x < this.x + 200) 
            && ( x > this.x ) 
            && ( y < this.y + 80) 
            && ( y > this.y )){
                if (( y > this.y + 55)
                && (  y < this.y + 80)){
                    this.hideMenu();
                }   
                return survivshim.C.CLICK_ON_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};