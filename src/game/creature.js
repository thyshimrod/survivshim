var survivshim = survivshim || {};

survivshim.Creature = function(){
    this.x = 0;
    this.y = 200;
    this.sprite = null;
    this.spriteset = null;
    this.animation = 0;
    this.direction = 0;
    this.size = 32;
    this.movingTick = 0;
    this.step = 1;
    this.hitpoints = 10;
    this.toRemove = false;
};

survivshim.Creature.prototype = {
    init : function(templateId){
        let mob = survivshim.creatures[templateId];
        this.spriteset = survivshim.tileset.get(mob.spriteset);
        this.size = mob.size;
    },

    animate : function(){
        let d = new Date();
        let newTick = d.getTime();
        if (newTick - this.movingTick > survivshim.C.ANIMATION_SPEED){
            this.movingTick = newTick;
            this.animation += 1;
            if (this.animation > 2) this.animation = 0;
        }
    },

    getTile : function(){
        let tx = Math.round(this.x/survivshim.gameEngine.tileSize);
        let ty = Math.round(this.y/survivshim.gameEngine.tileSize);
        return {"x" : tx, "y" : ty  };
    },

    move : function(){
        this.x += this.step;
        this.direction = survivshim.C.DIRECTION_RIGHT;
        this.animate();
    },

    hit : function(hp){
        this.hitpoints -= 1;
        if (this.hitpoints <= 0){
            this.toRemove = true;
        }
        let ft = new survivshim.FloatingText();
        ft.init(this.x, this.y,1,1000,survivshim.C.COLOR_GRADIANT_RED);
        survivshim.zone.floatingTexts.push(ft);
    },

    loop : function(){
        this.move();
    },

    render : function(){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           this.animation*this.size,
           this.direction*this.size,
           this.size,
           this.size,
           this.x+survivshim.gameEngine.centerX - survivshim.character.x,
           this.y+survivshim.gameEngine.centerY - survivshim.character.y,
           survivshim.gameEngine.tileSize,
           survivshim.gameEngine.tileSize);
    },

}   