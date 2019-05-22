'use strict';
var survivshim = survivshim || {};

survivshim.LevelEditor = function (){
    this.decors = [];
    this.tiles = [];
    this.maxX = 100;
    this.maxY = 100;
    this.name = "";
    this.action = 0;
}

survivshim.LevelEditor.prototype ={
    initFromJs : function(objLevel){
        this.name = objLevel.name;
        this.maxX = objLevel.maxX;
        this.maxY = objLevel.maxY;
        var _this = this;
        objLevel.decors.forEach(function(decorJs){
            let decor = new survivshim.Decor();
            decor.loadFromJs(decorJs);
            _this.decors.push(decor);
        })
        objLevel.tiles.forEach(function(tile){
            let tempTile = new survivshim.Tile();
            tempTile.init(tile.id, tile.x, tile.y);
            this.tiles.push(tempTile);
        })
    },

    addDecor : function(templateId, x, y){
        let decor = new survivshim.Decor();
        console.log(templateId);
        decor.load(templateId);
        decor.x = Math.floor (x / survivshim.gameEditor.tileSize);
        decor.y = Math.floor (y / survivshim.gameEditor.tileSize);
        this.decors.push(decor);
    },

    removeDecor: function(decor){
      var _decor = decor;
      var index = -1;
      var i = 0;
      this.decors.forEach(function (it){
        if (it === _decor){
          index = i;
        }
        i += 1;
      });
      if (index !== -1){
        this.decors.splice(index,1);
      }
    },

    getDecorUnderMouse : function(x,y){
        var foundDecor = null;
        this.decors.forEach(function(decor){
            if ((decor.x*survivshim.gameEditor.tileSize + survivshim.gameEditor.decalageX) < (x ) 
             && (decor.x*survivshim.gameEditor.tileSize + decor.sizeX + survivshim.gameEditor.decalageX)  > (x)
             && (decor.y*survivshim.gameEditor.tileSize + survivshim.gameEditor.decalageY) < (y ) 
             && (decor.y*survivshim.gameEditor.tileSize + decor.sizeX +survivshim.gameEditor.decalageY)  > (y))
             {
                 foundDecor = decor;
             }
        })
        return foundDecor;
    },

    initFromJs : function(){
        let level = survivshim.levels[0];
        var _this = this;
        for (let i=0;i<this.maxY;i++){
            for (let j=0;j<this.maxX;j++){
                let tempTile = new survivshim.Tile();
                tempTile.init("2", j, i);
                this.tiles.push(tempTile);
            }
        }
        level.decors.forEach(function(decorjs){
            let decor = new survivshim.Decor();
            decor.loadFromJs(decorjs);
            _this.decors.push(decor);
        })
        this.name = survivshim.levels[0].name;
    },

    init : function(){
        var objLevel = JSON.parse(localStorage.getItem('characterStored'));
        if (typeof objLevel !== 'undefined' && objLevel !== null){
            this.initFromStore(objLevel);
        }else{
            this.initFromJs();
        }
    },

    saveToJs : function(){
        var saveJs = {};
        var tiles = [];
        this.tiles.forEach(function(tile){
            let tileJs = tile.getJs();
            tiles.push(tileJs);
        })
        saveJs.tiles = tiles;
        var decors = [];
        this.decors.forEach(function(decor){
            let decorJs = decor.getJs();
            decors.push(decorJs);
        })
        saveJs.decors = decors;
        saveJs.name = this.name;
        saveJs.maxX = this.maxX;
        saveJs.maxY = this.maxY;
        localStorage.setItem(this.name, JSON.stringify(saveJs));
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
    }
}