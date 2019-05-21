'use strict';
var survivshim = survivshim || {};

survivshim.LevelEditor = function (){
    this.decors = [];
    this.tiles = [];
    this.maxX = 100;
    this.maxY = 100;
    this.name = "";
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