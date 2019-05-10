var survivshim = survivshim || {};

survivshim.Creature = function(){
    this.x = 0;
    this.y = 14;
    this.sprite = null;
    this.spriteset = null;
    this.animation = 0;
    this.direction = 0;
    this.size = 32;
};

survivshim.Creature.prototype = {
    init : function(templateId){
        let mob = survivshim.creatures[templateId];
        this.spriteset = survivshim.tileset.get(mob.spriteset);
        this.size = mob.size;
    },

    render : function(){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           this.animation*this.size,
           this.direction*this.size,
           this.size,
           this.size,
           this.x*survivshim.gameEngine.tileSize+survivshim.gameEngine.centerX - survivshim.character.x,
           this.y*survivshim.gameEngine.tileSize+survivshim.gameEngine.centerY - survivshim.character.y,
           survivshim.gameEngine.tileSize,
           survivshim.gameEngine.tileSize);
    },

}