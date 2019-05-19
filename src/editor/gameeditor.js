'use strict';
var survivshim = survivshim || {};

survivshim.GameEditor = function (){
    this.tileSize = survivshim.C.TILE_SIZE_PC;
    this.decalageX = 0;
    this.decalageY = 0;
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
    }
}

survivshim.gameEditor = new survivshim.GameEditor();
survivshim.gameEditor.init();

setInterval(survivshim.gameEditor.gameLoop,1000/60)