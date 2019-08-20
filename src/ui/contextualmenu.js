'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenu = function (){
  this.active = false;
  this.item = null;
  this.collectable = false;
  this.height = 100;
  this.width = 100;
  this.ctx = null;

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

    renderMateriau : function(){
        this.collectable = true;
        let text = "Materiau";
        this.ctx.fillText(text ,
                this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +30, 
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 30);
        text = survivshim.materiaux[this.item.collect.templateid].name + " : " + this.item.collect.quantity;
        this.ctx.fillText(text ,
                this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +10, 
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 50);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX + 20, 
            this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 67,
                60,20);
        this.ctx.stroke();
        let objDistance = {};
        objDistance.x = this.item.x*survivshim.gameEngine.tileSize;
        objDistance.y = this.item.y*survivshim.gameEngine.tileSize;
        let distance = calcDistance(survivshim.character,objDistance);
        if (typeof this.item.collect.tools !== "undefined"){
            this.ctx.fillStyle = "red";
            this.collectable = false;
        }else if( distance > 50){
            this.ctx.fillStyle = "red";
            this.collectable = false;
        }
        
        text = "Recolter";
        this.ctx.fillText(text ,
            this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +30, 
            this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 80);
    },

    render : function(){
        if (this.item !== null && this.active === true){
            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            if (typeof this.item.collect.templateid !== "undefined"){
                this.height = 150;
            }else{
                this.height = 20;
            }
            this.ctx.fillRect(this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX,
                        this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY,
                         this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX,
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY,
                this.width,this.height);
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = "white ";
            let text = this.item.name;
            this.ctx.fillText(text ,
                this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +10, 
                this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 10);
            
            if (typeof this.item.collect.templateid !== "undefined"){
                this.renderMateriau();
            }
        }
    },

    onClick : function(x,y){
        if (this.active === true){
            if ((x< this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +100) 
            && (x >this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX ) 
            && (y< this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 100) 
            && (y>this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY )){
                if ((y > this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +70)
                && (y < this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +90)
                && this.collectable){
                    survivshim.collectMenu.showMenu(this.item);
                    survivshim.character.changeAction(survivshim.C.ACTION_COLLECT);
                    this.hideMenu();
                }   
                return survivshim.C.CLICK_ON_WINDOW;
            }
            this.hideMenu();
            return survivshim.C.CLICK_OUTSIDE_WINDOW;
        }
        
    }
};