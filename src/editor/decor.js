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
    this.toRemove = false;
    this.materiau = null;
    this.qtyMateriau = 0;
    this.quality = 0;
    this.collect = {};
    this.ratio = {"x" : 1, "y" : 1};
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
      if (typeof src.collect !== "undefined"){
        this.collect.materiau = src.collect.templateid;
        this.collect.quantity = src.collect.quantity;
        this.collect.chance = src.collect.chance;
        this.collect.speed = src.collect.speed;
      }
      if (typeof src.ratio !== "undefined"){
        this.ratio.x = src.ratio.x;
        this.ratio.y = src.ratio.y;
      }
    },

    loadFromJs : function(src){
      this.x = src.x;
      this.y = src.y;
      this.load(src.id);
    },

    render : function(){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        //console.log(this.x*survivshim.gameEditor.tileSize+survivshim.gameEditor.decalageX + "/" + (this.y*survivshim.gameEditor.tileSize+survivshim.gameEditor.decalageY));
        ctx.drawImage(
           this.spriteset,
           this.sprites[this.state].x,
           this.sprites[this.state].y,
           this.sizeX,
           this.sizeY,
           this.x*survivshim.gameEditor.tileSize+survivshim.gameEditor.decalageX,
           this.y*survivshim.gameEditor.tileSize+survivshim.gameEditor.decalageY,
           survivshim.gameEditor.tileSize * this.ratio.x,
           survivshim.gameEditor.tileSize * this.ratio.y);
      },

};