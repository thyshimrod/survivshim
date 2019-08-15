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
    this.path = []; 
    this.hitpoints = 10;
    this.toRemove = false;
    this.state = survivshim.C.MOB_STATE_ALIVE;
    this.corpse = {
        "tileset" : "assets/tileset/murmures.png",
        "size": {"x" : 32, "y" : 32},
        "position" : { "x" : 160, "y":352}
    };
    this.collect = [];
};

survivshim.Creature.prototype = {
    init : function(templateId){
        let mob = survivshim.creatures[templateId];
        this.spriteset = survivshim.tileset.get(mob.spriteset);
        this.size = mob.size;
        var _this = this;
        mob.collect.forEach(function(col){
            let collect = {
                "templateid" : col.templateid,
                "quantity" : col.quantity,
                "chance" : col.chance,
                "speed" : col.speed
            }
            _this.collect.push(col);
        });
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
        /*
        this.x += this.step;
        this.direction = survivshim.C.DIRECTION_RIGHT;
        this.animate();
        */
       if (this.path.length > 0){
        this.animate();
        var nextTile = this.path[this.path.length-1];
        var currentTile = this.getTile();
        let dist = calcDistance(this, {x: nextTile.x*survivshim.gameEngine.tileSize, y: nextTile.y*survivshim.gameEngine.tileSize});
        if (dist >10 ){
          var dx = nextTile.x*survivshim.gameEngine.tileSize - this.x;
          var dy = nextTile.y*survivshim.gameEngine.tileSize - this.y;
          if (Math.abs(dx) > this.step){
            if (dx > 0){
              this.x += this.step;
              this.direction = survivshim.C.DIRECTION_RIGHT;
            }else {
              this.x -= this.step;
              this.direction = survivshim.C.DIRECTION_LEFT;
            }
          }
          if (Math.abs(dy) > this.step){
            if (dy > 0){
              this.y += this.step;
              this.direction = survivshim.C.DIRECTION_UP;
            }else{
              this.y -= this.step;
              this.direction = survivshim.C.DIRECTION_DOWN;
            }
          }
        }else{
          this.path.splice(this.path.length-1);
        }
      }
    },

    goToTarget : function(x,y){
        let grid = survivshim.zone.getAPathArray();
        let tileMob = this.getTile();
        let tx = Math.floor(x/survivshim.gameEngine.tileSize);
        let ty = Math.floor(y/survivshim.gameEngine.tileSize);
        var pthFinding = new survivshim.Apath();
        var result =  pthFinding.findShortestPath([tileMob.x,tileMob.y],[x,y], grid,true);
        this.path = pthFinding.path;
        this.grid = [];
    },

    remove : function(){
        this.toRemove = true;
    },

    death : function(){
        this.state = survivshim.C.MOB_STATE_DEAD;
        this.spriteset = survivshim.tileset.get(this.corpse.tileset);
    },

    hit : function(hp){
        this.hitpoints -= 1;
        if (this.hitpoints <= 0){
            this.death();
        }
        let ft = new survivshim.FloatingText();
        ft.init(this.x, this.y,hp,survivshim.C.FLOATING_TEXT_TIMER_HIT,survivshim.C.COLOR_GRADIANT_RED);
        survivshim.zone.floatingTexts.push(ft);
    },

    loop : function(){
        if (this.state  === survivshim.C.MOB_STATE_ALIVE){
            if (this.path.length === 0 && survivshim.character.x !== 0){
                this.goToTarget(survivshim.character.x,survivshim.character.y); 
            }
            this.move();
        }
    },

    render : function(){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        if (this.state === survivshim.C.MOB_STATE_ALIVE){
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
        }else{
            ctx.drawImage(
                this.spriteset,
                this.corpse.position.x,
                this.corpse.position.y,
                this.corpse.size.x,
                this.corpse.size.x,
                this.x+survivshim.gameEngine.centerX - survivshim.character.x,
                this.y+survivshim.gameEngine.centerY - survivshim.character.y,
                survivshim.gameEngine.tileSize,
                survivshim.gameEngine.tileSize);
        }
    },

}   