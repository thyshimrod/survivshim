'use strict';
var survivshim = survivshim || {};

survivshim.DecorMenu = function (){
  this.active = false;
  this.x = 200;
  this.y = 200;
  this.width = 400;
  this.height = 400;
  this.ctx = null;
  this.decors = [];
  this.selectedDecor = null;
};

survivshim.DecorMenu.prototype ={
    showMenu : function(){
        this.active = true;
    },

    hideMenu : function(){
        this.active = false
    },

    renderMateriaux : function(){
        var i = 0;        
        for (let key in survivshim.decors){
            let decor = survivshim.decors[key];    
            let spriteset = survivshim.tileset.get(decor.tileset);
            this.ctx.drawImage(
                spriteset,
                decor.sprites[0].x,
                decor.sprites[0].y,
                decor.size.x,
                decor.size.y,
                i*32 + this.x,
                this.y,
                survivshim.gameEditor.tileSize,
                survivshim.gameEditor.tileSize);
            let locDecor = {};
            locDecor.decor = decor;
            locDecor.decor.templateId = key;
            locDecor.x = i*32 + this.x;
            locDecor.y = this.y;
            this.decors.push(locDecor);
            i++;
        }
    },

    render : function(){
        if (this.active){
            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x,
                        this.y,
                        this.width,
                        this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.stroke();
            this.renderMateriaux();
        }
    },

    onClick : function(x,y){
        if(this.active){
            if ( x > this.x
            && x < (this.x + this.width)
            && y > this.y
            && y < (this.y + this.height) ){
                var _x = x;
                var _y = y;
                var _this = this;
                this.decors.forEach(function(decor){
                    if ( _x > decor.x 
                    &&   _x < (decor.x + survivshim.gameEditor.tileSize)
                    &&   _y > decor.y
                    &&   _y < (decor.y + survivshim.gameEditor.tileSize)){
                        _this.selectedDecor = decor;
                        survivshim.gameEditor.modeEditor = survivshim.C.EDITOR_ACTION_ADD;
                        _this.hideMenu();
                    }
                })

                return survivshim.C.CLICK_ON_WINDOW;
            }
            this.hideMenu();
            return survivshim.C.CLICK_OUTSIDE_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};