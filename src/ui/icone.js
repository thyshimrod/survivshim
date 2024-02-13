'use strict';

var survivshim = survivshim || {};

survivshim.Icone = function(){
    this.x = 0;
    this.y = 0;
    this.tx = 0;
    this.ty = -1;
    this.icon = "";
    this.templateId = 0;
    this.spriteset = "";
};
  
survivshim.Icone.prototype = {

    load : function(templateId,x,y){
        this.templateId = templateId;
        var src = survivshim.icons[templateId];
        this.tx = src.sprite.x;
        this.ty = src.sprite.y;
        this.spriteset = survivshim.tileset.get(src.tileset);
        this.name = src.name;
        this.x = x;
        this.y = y;
    },

    render : function(){
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        
        ctx.drawImage(
            this.spriteset,
            this.tx,
            this.ty,
            32,
            32,
            this.x,
            this.y,
            32,
            32);
    },

    
};