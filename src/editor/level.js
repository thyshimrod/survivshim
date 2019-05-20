'use strict';
var survivshim = survivshim || {};

survivshim.LevelEditor = function (){
    this.decors = [];
    this.tiles = [];
    this.maxX = 100;
    this.maxY = 100;
}

survivshim.LevelEditor.prototype ={
    init : function(){
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