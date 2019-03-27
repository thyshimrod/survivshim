'use strict';

var survivshim = survivshim || {};

survivshim.Zone = function (){
    this.tiles = [];
    this.tileset = null;
    this.aPathArray = null;
    this.aPathTiles = null;
    this.maxX = 100;
    this.maxY = 100;
}

survivshim.Zone.prototype ={
    init : function(){
        survivshim.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
        this.tileSet = survivshim.tileset.get("assets/tileset/tileset1.png");
        survivshim.canvas.canvasMouse.addEventListener("click",survivshim.zone.clickEvent);
        
        for (let i=0;i<this.maxY;i++){
            for (let j=0;j<this.maxX;j++){
                let tempTile = new survivshim.Tile();
                tempTile.init("2", j, i);
                this.tiles.push(tempTile);
            }
        }
    },

    render : function(){
        survivshim.canvas.clearCanvas();
        var _this = this;
        this.tiles.forEach(function(tile){
            tile.render(_this.tileSet);
        });
        survivshim.character.move();
        survivshim.character.render();

    },

    getAPathArray : function (){
        this.aPathArray = this.aPathArrayGenerate();
        return this.aPathArray;
    },

    getTilesForAPath : function(){
        if (typeof this.aPathTiles === 'undefined' || this.aPathTiles === null){
          var _this = this;
          this.aPathTiles = {};
          this.tiles.forEach(function(tile){
            _this.aPathTiles[tile.x + "/" + tile.y] = tile;
          });
        }
        return this.aPathTiles;
      },

    aPathArrayGenerate : function(){
        let grid = [];
        let tiles= this.getTilesForAPath();
        for (var i=0;i<this.maxY;i++){
          grid[i] = [];
        }
        for (let i=0;i<this.maxY;i++){
          for (let j=0;j<this.maxX;j++){
            let brick = {'x' : j, 'y' : i, 'F' : -1, 'G' : -1, 'status' : 'Obstacle','cameFrom' : {}};
            if (( j + "/" + i) in tiles){
              if(tiles[j + "/" + i].type == "ground")
                brick.status = 'Empty';
            }
            grid[i][j] = brick;
          }
        }
    
        return grid;
      },

    clickEvent : function(evt){
        survivshim.character.goToTarget(evt.pageX,evt.pageY);
    },
}