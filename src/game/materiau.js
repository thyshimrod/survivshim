var survivshim = survivshim || {};

survivshim.Materiau = function(){
    this.id = 0;
    this.name = "";
    this.quantity = 0;
    this.spriteset;
    this.sprite = {};
    this.size = {};
    this.use = 0;
};

survivshim.Materiau.prototype ={
    init : function(id){
        this.id = id;
        var src = survivshim.materiaux[id];
        this.spriteset = survivshim.tileset.get(src.tileset);
        this.sprite = src.sprite;
        this.name = src.name;
        this.size = src.size;
        this.use = src.use;
    },

    render : function(x,y){
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           this.sprite.x,
           this.sprite.y,
           this.size.x,
           this.size.y,
           x,
           y,
           survivshim.gameEngine.tileSize,
           survivshim.gameEngine.tileSize);
      }
};

