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
  this.lastTimeEat = 0;
  this.lastTimeDrink = 0;
  this.hitPoints = 100;
  this.maxHitPoints = 100;
  this.fatigue = 0;
  this.maxFatigue = 100;
};

survivshim.Character.prototype = {
    init : function() {
        this.sprite = "assets/sprites/fille.png";
        this.spriteset = survivshim.tileset.get(this.sprite);
        let d = new Date();
        let newTick = d.getTime();
        this.lastTimeEat = newTick;
        this.lastTimeDrink = newTick;
        this.lastTimeSleep = newTick;
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
      }else if (this.action === survivshim.C.ACTION_CRAFT){
        survivshim.blueprintMenu.blueprint.craft();
      }
    },

    getMateriau : function(idMat){
      if (typeof this.inventory[survivshim.C.TYPE_INVENTORY_MATERIAU] === "undefined"){
        return null;
      }else{
        var foundMateriau = null;
        var _idMat = idMat;
        this.inventory[survivshim.C.TYPE_INVENTORY_MATERIAU].forEach(function(mat){
          if(mat.id == _idMat){
            foundMateriau = mat;
          }
        })  
        return foundMateriau;
      }
    },

    getItem : function(item){
      if (typeof this.inventory[item.use] === "undefined"){
        return null;
      }else{
        var foundItem = null;
        var _item = item;
        this.inventory[item.use].forEach(function(it){
          if(it.id == _item.id){
            foundItem = it;
          }
        })  
        return foundItem;
      }
    },

    eat : function(item){
      let d = new Date();
      let newTick = d.getTime();
      this.lastTimeEat += item.satiete;
      let materiauInInventory = this.getItem(item );
      if (materiauInInventory !== null){
          materiauInInventory.quantity -= 1;
          if (materiauInInventory.quantity <= 0){
            this.removeMateriau(item);
          }
      }
    },

    removeMateriau : function(item){
      var _item = item;
      var index = -1;
      var i = 0;
      this.inventory[item.use].forEach(function (it){
        if (it.id === _item.id){
          index = i;
        }
        i += 1;
      });
      if (index !== -1){
        this.inventory[item.use].splice(index,1);
      }
    },

    addItemToInventory : function(item){
      if (typeof this.inventory[survivshim.C.TYPE_INVENTORY_EQUIPEMENT] === "undefined"){
        this.inventory[survivshim.C.TYPE_INVENTORY_EQUIPEMENT] = [];
      }
      this.inventory[survivshim.C.TYPE_INVENTORY_EQUIPEMENT].push(item);
    },

    addItemCollected : function(materiau, qty){
      var collectedItem = new survivshim.Materiau();
      collectedItem.init(materiau);
      collectedItem.quantity = qty;
      if (typeof this.inventory[collectedItem.use] === "undefined"){
        this.inventory[collectedItem.use] = [];
      }
      
      var foundMateriau = null;
      var _materiau = materiau
      this.inventory[collectedItem.use].forEach(function(mat){
        if(mat.id == _materiau){
          foundMateriau = mat;
        }
      })
      if (foundMateriau === null){
        this.inventory[collectedItem.use].push(collectedItem);
      }else{
        foundMateriau.quantity += qty;
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
          this.addItemCollected(item.collect.materiau,item.collect.speed);
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