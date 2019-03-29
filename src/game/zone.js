'use strict';

var survivshim = survivshim || {};

survivshim.Zone = function (){
    this.tiles = [];
    this.tileset = null;
    this.aPathArray = null;
    this.aPathTiles = null;
    this.maxX = 100;
    this.maxY = 100;
    this.decors = [];
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

        let tempDecor = new survivshim.Decor();
        tempDecor.load("0");
        tempDecor.x = 10;
        tempDecor.y = 10;
        this.decors.push(tempDecor);
        tempDecor = new survivshim.Decor();
        tempDecor.load("1");
        tempDecor.x = 4;
        tempDecor.y = 4;
        this.decors.push(tempDecor);
        tempDecor = new survivshim.Decor();
        tempDecor.load("2");
        tempDecor.x = 4;
        tempDecor.y = 7;
        this.decors.push(tempDecor);
        
        tempDecor = new survivshim.Decor();
        tempDecor.load("4");
        tempDecor.x = 2;
        tempDecor.y = 2;
        this.decors.push(tempDecor);
        tempDecor = new survivshim.Decor();
        tempDecor.load("5");
        tempDecor.x = 3;
        tempDecor.y = 3;
        this.decors.push(tempDecor);
        tempDecor = new survivshim.Decor();
        tempDecor.load("6");
        tempDecor.x = 12;
        tempDecor.y = 12;
        this.decors.push(tempDecor);
        tempDecor = new survivshim.Decor();
        tempDecor.load("3");
        tempDecor.x = 1;
        tempDecor.y = 10;
        this.decors.push(tempDecor);
    },

    render : function(){
        survivshim.canvas.clearCanvas();
        var _this = this;
        this.tiles.forEach(function(tile){
            tile.render(_this.tileSet);
        });
        this.decors.forEach(function(decor){
            decor.render();
        })
        
        survivshim.character.render();
        survivshim.contextualMenu.render();

    },

    removeDecors : function(){
        var _this = this;
        this.decors.forEach(function(decor){
            if (decor.toRemove === true){
                const index = _this.decors.indexOf(decor);
                if (index !== -1) {
                    _this.decors.splice(index, 1);
                }        
                return;
            }
        })
    },

    loop: function(){
        survivshim.character.move();
        this.removeDecors();
        this.render();
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

        this.decors.forEach(function(elt){
            if (elt.blocking){
                grid[elt.y][elt.x].status = "Obstacle";
            }
        });
    
        return grid;
      },

    getTheDecorUnderMouse : function(x,y){
        var _x = x - survivshim.gameEngine.centerX + survivshim.character.x;
        var _y = y - survivshim.gameEngine.centerY + survivshim.character.y;
        var result = null;
        this.decors.forEach(function(elt){
            if (((_x-survivshim.gameEngine.tileSize)< elt.x*survivshim.gameEngine.tileSize) && ((_x+survivshim.gameEngine.tileSize)>elt.x*survivshim.gameEngine.tileSize ) && ((_y-survivshim.gameEngine.tileSize)< elt.y*survivshim.gameEngine.tileSize) && ((_y+survivshim.gameEngine.tileSize)>elt.y*survivshim.gameEngine.tileSize )){
            result = elt;
            }
        });
        return result;
    },

    showContextualMenu : function(decor){
        survivshim.contextualMenu.showMenu(decor);
    },

    clickEvent : function(evt){
        let clickOnMenu = survivshim.contextualMenu.onClick(evt.pageX,evt.pageY);
        if (clickOnMenu === false){
            let decor = survivshim.zone.getTheDecorUnderMouse(evt.pageX,evt.pageY);
            if (decor !== null ){
                survivshim.zone.showContextualMenu(decor);
            }else{
                survivshim.contextualMenu.hideMenu();
                survivshim.zone.showContextualMenu(decor);
                survivshim.character.goToTarget(evt.pageX,evt.pageY);
            }
        }
    },
}