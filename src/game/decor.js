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
    this.collect = [] ;
    this.ratio = {"x" : 1, "y" : 1};
    this.timer = 0;
    this.startTicks = 0;
    this.animation = {};
    this.animationState = 0;
    this.animationTick = 0;
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
      let d = new Date();
      let newTick = d.getTime();
  
      src.sprites.forEach(function(sp){
        _this.sprites.push({"state" : sp.state, "x" : sp.x, "y" : sp.y});
      })
      this.sizeX = src.size.x;
      this.sizeY = src.size.y;
      if (typeof src.collect !== "undefined"){
        var _this = this;
        src.collect.forEach(function(col){
          let collect = {
            "templateid" : col.templateid,
            "quantity" : col.quantity,
            "chance" : col.chance,
            "speed" : col.speed,
            "tools" : col.tools
          }; 
          _this.collect.push(collect);
        })
      }
      if (typeof src.ratio !== "undefined"){
        this.ratio.x = src.ratio.x;
        this.ratio.y = src.ratio.y;
      }
      if (typeof src.timer !== "undefined"){
        this.timer = src.timer;
        this.startTicks = newTick;
      }
      if (typeof src.animation !== "undefined"){
        this.animation = {
          "timer" : src.animation.timer,
          "number" : src.animation.number
        }
      }
    },

    getTile : function(){
      let tx = Math.round(this.x/survivshim.gameEngine.tileSize);
      let ty = Math.round(this.y/survivshim.gameEngine.tileSize);
      return {"x" : tx, "y" : ty  };
   },

    getLights : function(){
      if (this.templateId === "8"){
        let light = {
          "x" : this.x*survivshim.gameEngine.tileSize+survivshim.gameEngine.centerX - survivshim.character.x -100,
          "y" : this.y*survivshim.gameEngine.tileSize+survivshim.gameEngine.centerY - survivshim.character.y -100,
          "w" : 232,
          "h" : 232
        }
        return light;
      }
      return null;
    },

    loadFromJs : function(src){
      this.x = src.x*survivshim.gameEngine.tileSize;
      this.y = src.y*survivshim.gameEngine.tileSize;
      this.load(src.id);
    },

    render : function(){
        let d = new Date();
        let newTick = d.getTime();
        if (this.timer > 0){  
          if (newTick - this.startTicks > this.timer){
            this.toRemove = true;
          }
        }

        let posX = this.sprites[this.state].x;
        let posY = this.sprites[this.state].y;
        if (typeof this.animation.timer !== "undefined"){
          if ((newTick - this.animationTick) > this.animation.timer){
            this.animationTick = newTick;
            this.animationState += 1;
            this.animationState %= this.animation.number;
          }
          posX += 32 * this.animationState;
        }
        
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           posX,
           posY,
           this.sizeX,
           this.sizeY,
           this.x+survivshim.gameEngine.centerX - survivshim.character.x,
           this.y+survivshim.gameEngine.centerY - survivshim.character.y,
           survivshim.gameEngine.tileSize * this.ratio.x,
           survivshim.gameEngine.tileSize * this.ratio.y);//survivshim.gameEngine.tileSize);
      },

};