var survivshim = survivshim || {};

survivshim.Decor = function(){
    this.x = 0;
    this.y = 0;
    this.sprites = [];
    this.templateId = 0;
    this.tileset = undefined;
    this.sizeX = 32;
    this.sizeY = 32;
    this.state = 0;
    this.typeDecor = 0;
};

survivshim.Decor.prototype = {
    load : function(templateId){
      this.templateId = templateId;
      var src = survivshim.decors[templateId];
      this.spriteset = survivshim.tileset.get(src.tileset);
      this.typeDecor = src.typedecor;
      this.name = src.name;
      this.blocking = src.blocking;
      var _this = this;
  
      src.sprites.forEach(function(sp){
        _this.sprites.push({"state" : sp.state, "x" : sp.x, "y" : sp.y});
      })
      this.sizeX = src.size.x;
      this.sizeY = src.size.y;
    },

    render : function(){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           this.sprites[this.state].x,
           this.sprites[this.state].y,
           this.sizeX,
           this.sizeY,
           this.x*survivshim.gameEngine.tileSize+survivshim.gameEngine.centerX - survivshim.character.x,
           this.y*survivshim.gameEngine.tileSize+survivshim.gameEngine.centerY - survivshim.character.y,
           survivshim.gameEngine.tileSize,
           this.sizeY);//survivshim.gameEngine.tileSize);
      },

};