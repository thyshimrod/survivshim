'use strict';
var survivshim = survivshim || {};

survivshim.MateriauMenu = function (){
  this.active = false;
};

survivshim.MateriauMenu.prototype ={
    showMenu : function(){
        this.active = true;
        this.x = 100;
        this.y = 100;
        this.maxX = 400;
        this.maxY = 400;
    },

    hideMenu : function(){
        this.active = false;
        survivshim.character.changeAction(survivshim.C.ACTION_NONE);
    },

    render : function(){
        if (this.active === true){
            var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            ctx.fillRect(this.x,
                        this.y,
                        this.maxX,
                        this.maxY);
            ctx.font = "1Opx Arial";
            ctx.fillStyle = "white";
            let text = "Materiaux";
            ctx.fillText(text ,
                this.x + 10, 
                this.y + 10);

            
        }else if (this.item === null){
            this.hideMenu();
        }
    },

    onClick : function(x,y){
        if (this.active === true ){
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
            //return true;
        }
        return false;
    }
};