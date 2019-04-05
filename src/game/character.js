'use strict';

var survivshim = survivshim || {};

survivshim.Character = function(){
  this.x = 0 ;
  this.y = 0;
  this.spriteset = null;
  this.sprite = "";
  this.animation = 0;
  this.direction = 0;
  this.size = 64;
  this.step = survivshim.C.CHARACTER_STEP;
  this.path = [];
  this.movingTick = 0;
  this.inventory = {};
  this.action = 0;
  this.lastTickCollect = 0;
};

survivshim.Character.prototype = {
    init : function() {
        this.sprite = "assets/sprites/fille.png";
        this.spriteset = survivshim.tileset.get(this.sprite);
    },

    render : function(){
        var ctx = survivshim.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           this.animation*this.size,
           this.direction*this.size,
           this.size,
           this.size,
           survivshim.gameEngine.centerX,
           survivshim.gameEngine.centerY,
           survivshim.gameEngine.tileSize,
           survivshim.gameEngine.tileSize);
    },

    changeAction : function(action){
      this.action = action;
    },

    getTile : function(){
        let tx = Math.round(this.x/survivshim.gameEngine.tileSize);
        let ty = Math.round(this.y/survivshim.gameEngine.tileSize);
        return {"x" : tx, "y" : ty  };
    },

    goToTarget : function(x,y){
        let grid = survivshim.zone.getAPathArray();
        let tileChar = this.getTile();
        let tx = Math.floor((x-survivshim.gameEngine.centerX+this.x)/survivshim.gameEngine.tileSize);
        let ty = Math.floor((y-survivshim.gameEngine.centerY+this.y)/survivshim.gameEngine.tileSize);
        var pthFinding = new survivshim.Apath();
        var result =  pthFinding.findShortestPath([tileChar.x,tileChar.y],[tx,ty], grid,true);
        this.path = pthFinding.path;
        this.grid = [];
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

    loop : function(){
      if (this.action === survivshim.C.ACTION_NONE){
        this.move();
      }else if (this.action === survivshim.C.ACTION_COLLECT){
        this.collect();
      }
    },

    addMateriau : function(materiau, qty){
      if (typeof this.inventory["materiau"] === "undefined"){
        this.inventory["materiau"] = [];
      }
      var foundMateriau = null;
      var _materiau = materiau
      this.inventory["materiau"].forEach(function(mat){
        if(mat.materiau == _materiau){
          foundMateriau = mat;
        }
      })
      if (foundMateriau === null){
        foundMateriau = {
          "materiau" : materiau,
          "qty" : qty
        }
        this.inventory["materiau"].push(foundMateriau);
      }else{
        foundMateriau.qty += qty;
      }
    },

    collect : function(){
      let item = survivshim.collectMenu.item;
      if (item !== null && typeof item !== "undefined"){
        
        let d = new Date();
        let newTick = d.getTime();  
        if (newTick - this.lastTickCollect > 500){  
          this.lastTickCollect = newTick;
          item.collect.quantity -= item.collect.speed;
          survivshim.collectMenu.collected += item.collect.speed
          if (item.collect.quantity <= 0){
            item.toRemove = true;
            survivshim.collectMenu.hideMenu();
          }
          this.addMateriau(item.collect.materiau,item.collect.speed);
        }
      }
    },

    move : function(){
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
    
}