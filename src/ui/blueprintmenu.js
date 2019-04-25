'use strict';
var survivshim = survivshim || {};

survivshim.BlueprintMenu = function (){
    this.active = false;
    this.x = 100;
    this.y = 100;
    this.maxX = 400;
    this.maxY = 400;
    this.blueprint = null;
    this.ctx = null;
};

survivshim.BlueprintMenu.prototype ={
    showMenu : function(blueprint){
        this.active = true;
        this.blueprint = blueprint;
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
    },

    hideMenu : function(){
        this.active = false;
        survivshim.character.changeAction(survivshim.C.ACTION_NONE);
    },

    showMateriaux : function(){
        this.ctx.fillStyle = "white";
        let text = "Materiaux";
        this.ctx.fillText(text ,
            this.x + 300, 
            this.y + 10);
        
    },

    renderFrame : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x,
                    this.y,
                    this.maxX,
                    this.maxY);
                    this.ctx.font = "1Opx Arial";
                    this.ctx.fillStyle = "white";
        let text = "Blueprint";
        this.ctx.fillText(text ,
            this.x + 10, 
            this.y + 10);
        
        this.ctx.fillRect(this.x + 200,
                this.y,
                3,
                200);
        this.ctx.fillRect(this.x ,
            this.y+200,
            this.maxX,
            3);
    },

    renderAction : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL_BUTTON;
        this.ctx.fillRect(this.x + 150,
                    this.y+250,
                    100,
                    30);
        this.ctx.fillStyle = "white";
        let text = "Construire";
        this.ctx.fillText(text ,
                this.x + 180, 
                this.y + 270);
    },


    render : function(){
        if (this.active === true && this.blueprint !== null){
            this.renderFrame();
            this.renderAction();
            this.showMateriaux();    
        }
    },

    onClick : function(x,y){
        if (this.active === true && this.blueprint !== null){
            /*if ((x< this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +200) 
            && (x >this.item.x * survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX ) 
            && (y< this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 80) 
            && (y>this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY )){
                if ((y > this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +55)
                && (y < this.item.y * survivshim.gameEngine.tileSize  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +80)){
                    this.hideMenu();
                }   
                return true;
            }*/
            this.hideMenu();
            return true;
        }

        return false;
    }
};