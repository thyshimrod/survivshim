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
  this.level = 0;
  this.movingTick = 0;
  this.inventory = {};
  this.action = 0;
  this.lastTickCollect = 0;
  this.lastTimeEat = 0;
  this.lastTimeDrink = 0;
  this.hitPoints = 10;
  this.maxHitPoints = 100;
  this.fatigue = 0;
  this.maxFatigue = 100;
  this.hungerState = survivshim.C.HUNGER_STATE_NO;
  this.lastTicksManageState = 0;
  this.listOfBP = [];
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
        this.hitPoints = 100;
        this.lastTickCollect = newTick;
        this.lastTimeEat = newTick;
        this.lastTimeDrink = newTick;
        this.x = 0 ;
        this.y = 0;
        this.animation = 0;
        this.direction = 0;
        this.action = 0;
        this.hungerState = survivshim.C.HUNGER_STATE_NO;
        this.thirstyState = survivshim.C.HUNGER_STATE_NO;
        this.lastTicksManageState = newTick;
        this.level = 1;
        this.newBP = 1;
    },

    addBP : function(templateId){
      this.listOfBP.push(templateId);
      this.newBP -= 1;
    },

    levelUp : function(){
      this.level += 1;
      this.newBP += 1;
      survivshim.console.addMessage("Vous êtes passés de niveau : niveau : " + this.level);
      survivshim.console.addMessage("Vous pouvez apprendre une nouvelle recette");
    },

    manageHunger : function(newTick){
      let prct = (newTick - survivshim.character.lastTimeEat) / survivshim.C.HUNGER_FACTOR;
      if (prct > 30 && prct <60){
          if (survivshim.character.hungerState !== survivshim.C.HUNGER_STATE_LOW){
              survivshim.character.hungerState = survivshim.C.HUNGER_STATE_LOW;
              survivshim.console.addMessage("Vous commencez à avoir faim!",survivshim.C.MESSAGE_ALERT_WARNING);
          }
      }else if (prct > 60 && prct <90){
          if (survivshim.character.hungerState !== survivshim.C.HUNGER_STATE_MIDDLE){
              survivshim.character.hungerState = survivshim.C.HUNGER_STATE_MIDDLE;
              survivshim.console.addMessage("Vous avez faim!",survivshim.C.MESSAGE_ALERT_WARNING);
          }
      }else if (prct > 90){
          if (survivshim.character.hungerState !== survivshim.C.HUNGER_STATE_HIGH){
              survivshim.character.hungerState = survivshim.C.HUNGER_STATE_HIGH;
              survivshim.console.addMessage("Vous mourrez de faim!",survivshim.C.MESSAGE_ALERT_HIGH);
          }
      }
      if (newTick - this.lastTicksManageState > 1000){
        this.lastTicksManageState = newTick;
        if (this.hungerState === survivshim.C.HUNGER_STATE_HIGH){
          this.hitPoints -= 3;
        }else if (this.hungerState === survivshim.C.HUNGER_STATE_MIDDLE){
          this.hitPoints -= 1;
        }else if (this.hungerState === survivshim.C.HUNGER_STATE_NO){
          this.hitPoints += 1;
        }
        if (this.hitPoints > this.maxHitPoints) this.hitPoints = this.maxHitPoints;
        if (this.hitPoints < 0) this.hitPoints = 0;
      }
    },
    
    manageThirsty : function(newTick){
      let prct = (newTick - survivshim.character.lastTimeDrink) / survivshim.C.HUNGER_FACTOR;
      if (prct > 30 && prct <60){
          if (survivshim.character.thirstyState !== survivshim.C.HUNGER_STATE_LOW){
              survivshim.character.thirstyState = survivshim.C.HUNGER_STATE_LOW;
              survivshim.console.addMessage("Vous commencez à avoir soif!",survivshim.C.MESSAGE_ALERT_WARNING);
          }
      }else if (prct > 60 && prct <90){
          if (survivshim.character.thirstyState !== survivshim.C.HUNGER_STATE_MIDDLE){
              survivshim.character.thirstyState = survivshim.C.HUNGER_STATE_MIDDLE;
              survivshim.console.addMessage("Vous avez soif!",survivshim.C.MESSAGE_ALERT_WARNING);
          }
      }else if (prct > 90){
          if (survivshim.character.thirstyState !== survivshim.C.HUNGER_STATE_HIGH){
              survivshim.character.thirstyState = survivshim.C.HUNGER_STATE_HIGH;
              survivshim.console.addMessage("Vous mourrez de soif!",survivshim.C.MESSAGE_ALERT_HIGH);
          }
      }
      if (this.thirstyState === survivshim.C.HUNGER_STATE_HIGH){
        this.hitPoints -= 3;
      }else if (this.thirstyState === survivshim.C.HUNGER_STATE_MIDDLE){
        this.hitPoints -= 1;
      }
    },

    interactWithMob : function(mob){
      mob.hit(1);
    },

    manageStates : function(){
      let d = new Date();
      let newTick = d.getTime();
      this.manageHunger(newTick);
      this.manageThirsty(newTick);
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
      this.manageStates();
    },

    unequip : function(item){
      item.status = survivshim.C.ITEM_STATUS_UNWEARED;
    },

    equip : function(item){
      item.status = survivshim.C.ITEM_STATUS_WEARED;
      if (item.location === survivshim.C.ITEM_LOCATION_FLOOR){
        let coord = this.getTile();
        let decorJs = { "id" : item.decor,
                        "x"  : coord.x,
                        "y"  : coord.y}
        let decor = new survivshim.Decor();
        decor.loadFromJs(decorJs);
        survivshim.zone.decors.push(decor);
        let itemInInventory = this.getItem(item ); 
        if (itemInInventory !== null){
          itemInInventory.quantity -= 1;
          if (itemInInventory.quantity <= 0){
            this.removeMateriau(item);
          }
        }
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
      var _this = this;
      if (typeof item.effect !== "undefined"){
        item.effect.forEach(function(effect){
          if (effect.name === "faim"){
            _this.lastTimeEat += item.value;  
          }else if (effect.name === "soif"){
            _this.lastTimeDrink += item.value;  
          }
        })
      }
      survivshim.console.addMessage("Vous avez consomme " + item.name);
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
      survivshim.console.addMessage(collectedItem.name + " ramassé");
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
      var item = survivshim.collectMenu.item;
      var materiauId = survivshim.collectMenu.materiauId;
      if (item !== null && typeof item !== "undefined"){
        
        let d = new Date();
        let newTick = d.getTime();  
        if (newTick - this.lastTickCollect > 500){  
          var _this = this;
          var i = 0;
          var indexToRemove = -1;
          item.collect.forEach(function(col){
            if (col.templateid === materiauId){
              col.quantity -= col.speed;
              survivshim.collectMenu.collected += col.speed;
              if (col.quantity <= 0){
                indexToRemove = i;
                survivshim.collectMenu.hideMenu();
              }     
              _this.addItemCollected(col.templateid,col.speed);
              _this.fatigue += 1;
            }
            i++;
          })
          if (indexToRemove !== -1){
            item.collect.splice(indexToRemove,1);
            if (item.collect.length === 0){
              item.toRemove = true;
            }
          }
          this.lastTickCollect = newTick;
          
        }
      }
    },

    hit : function(hp){
      this.hitPoints -= 1;
      let ft = new survivshim.FloatingText();
      ft.init(this.x, this.y,hp,survivshim.C.FLOATING_TEXT_TIMER_HIT,survivshim.C.COLOR_GRADIANT_YELLOW);
      survivshim.zone.floatingTexts.push(ft);
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