'use strict';

var survivshim = survivshim || {};

survivshim.Item = function(){
    this.spriteset = null;
    this.name = "";
    this.sprites = {};
    this.size = {};
    this.quantity = 1;
    this.status = survivshim.C.ITEM_STATUS_UNWEARED;
    this.use = "undefined";
    this.location = "undefined";
    this.decor = "undefined";
    this.itemType = 0;
    this.damage = 0;
};
  
survivshim.Item.prototype = {
    init : function(templateId){
        this.templateId = templateId;
        var src = survivshim.items[templateId];
        this.spriteset = survivshim.tileset.get(src.tileset);
        this.name = src.name;
        this.sprite = {"state" : src.sprite.state, "x" : src.sprite.x, "y" : src.sprite.y};
        this.size = {"x" :src.size.x , "y": src.size.y};
        this.use = src.use;
        this.location = src.location;
        if (typeof src.decor !== "undefined"){
          this.decor = src.decor;
        }
        this.itemType = src.itemtype;
        if (this.itemType === survivshim.C.ITEM_TYPE_WEAPON){
          this.initWeapon(src);
        }
      },

      initWeapon : function(src){
        this.damage = src.damage;
      },

      render : function(x,y,scale = 1){
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           this.sprite.x,
           this.sprite.y,
           this.size.x,
           this.size.y,
           x,
           y,
           survivshim.gameEngine.tileSize * scale,
           survivshim.gameEngine.tileSize * scale);
      }
};