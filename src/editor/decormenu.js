'use strict';
var survivshim = survivshim || {};

survivshim.DecorMenu = function (){
  this.active = false;
  this.x = 200;
  this.y = 200;
  this.width = 400;
  this.height = 400;
  this.ctx = null;
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
        if(y < (this.y + 32) && x < ( 32* this.icons.length)){
            var _this = this;
            var _x = x;
            var _y = y;
            this.icons.forEach(function (icon){
                if ( _x >= icon.x && _x <= (icon.x + 32)){
                    if(icon.icon === "decor"){
                        console.log("decor");
                    }else if (icon.icon === "destroy"){
                        console.log("destroy");
                    }
                }
            })
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};