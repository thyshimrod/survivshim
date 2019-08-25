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
  this.tx = 0;
  this.ty = 0;
  this.sizeX = 0;
  this.sizeY = 0;
};

survivshim.CollectMenu.prototype ={
    showMenu : function(item, x, y, sizeX, sizeY){
        if (item !== null){
            this.tx = x;
            this.ty = y;
            this.item = item;
            this.active = true;
            this.collected = 0;
            this.sizeX = sizeX;
            this.sizeY = sizeY;
            if (item instanceof survivshim.Creature){
                this.x = this.tx  + survivshim.gameEngine.centerX-survivshim.character.x + this.sizeX;
                this.y = this.ty  + survivshim.gameEngine.centerY-survivshim.character.y - this.sizeY;
                console.log(survivshim.gameEngine.centerY + "//" + survivshim.character.y + "//" + this.sizeY);
            }else{
                this.x = this.tx * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.sizeX;
                this.y = this.ty * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerY-survivshim.character.y + this.sizeY;
            }
            console.log(this.x + "//" + this.y + "@@" + x + "//" + y);
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
            let prct = Math.floor(this.collected / (this.collected + this.item.quantity) * 100);
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