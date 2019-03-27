'use strict';
var survivshim = survivshim || {};

survivshim.Tile = function (){
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.type = "";
  this.tx = 0;
  this.ty = 0;
  this.id = 0;
};

survivshim.Tile.prototype = {
    init : function(id, x, y){
        this.id = id;
        this.x = x ;
        this.y = y;
        this.tx = survivshim.tiles[id].x;
        this.ty = survivshim.tiles[id].y;
        this.size = survivshim.tiles[id].size;
        this.type = survivshim.tiles[id].type;
    },
    render : function(ts){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
            ts,
            this.tx,
            this.ty,
            this.size,
            this.size,
            this.x*survivshim.gameEngine.tileSize + survivshim.gameEngine.centerX-survivshim.character.x,
            this.y*survivshim.gameEngine.tileSize + survivshim.gameEngine.centerY-survivshim.character.y,
            survivshim.gameEngine.tileSize,
            survivshim.gameEngine.tileSize);
    }
}
