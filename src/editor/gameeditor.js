'use strict';
var survivshim = survivshim || {};

survivshim.GameEditor = function (){
    this.tileSize = survivshim.C.TILE_SIZE_PC;
    this.decalageX = 0;
    this.decalageY = 0;
    this.clientX = 0;
    this.clientY = 0;
}

survivshim.GameEditor.prototype ={

    gameLoop: function (){
       survivshim.levelEditor.render();
    },

    init : function(){
        survivshim.tileset = new survivshim.Tileset();
        survivshim.canvas = new survivshim.Canvas();
        survivshim.canvas.init();
        survivshim.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
        survivshim.levelEditor = new survivshim.LevelEditor();
        survivshim.levelEditor.init();
        this.centerX = window.innerWidth / 2 -  this.tileSize / 2 ;
        this.centerY = window.innerHeight / 2 - this.tileSize / 2 - 70;
        var _this = this;
        var ctx = survivshim.canvas.canvasMouse.addEventListener('mousemove', survivshim.gameEditor.clickEvent);
    },

    clickEvent : function(evt){
        if (evt.pageX < 50){
            survivshim.gameEditor.decalageX +=8;    
        }else if (evt.pageX > (window.innerWidth-50)){
            survivshim.gameEditor.decalageX -= 8;
        }
        if (evt.pageY < 50){
            survivshim.gameEditor.decalageY +=8;    
        }else if (evt.pageY > (window.innerHeight-50)){
            survivshim.gameEditor.decalageY -= 8;
        }
    }
}

survivshim.gameEditor = new survivshim.GameEditor();
survivshim.gameEditor.init();

setInterval(survivshim.gameEditor.gameLoop,1000/60)