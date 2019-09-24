'use strict';

var survivshim = survivshim || {};

survivshim.Zone = function (){
    this.tiles = [];
    this.tileset = null;
    this.aPathArray = null;
    this.aPathTiles = null;
    this.maxX = 100;
    this.maxY = 100;
    this.decors = [];
    this.creatures = [];
    this.floatingTexts = [];
    this.limitToDraw = 40 * survivshim.gameEngine.tileSize;
}

survivshim.Zone.prototype ={
    init : function(){
        survivshim.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
        this.tileSet = survivshim.tileset.get("assets/tileset/tileset1.png");
        
        
        for (let i=0;i<this.maxY;i++){
            for (let j=0;j<this.maxX;j++){
                let tempTile = new survivshim.Tile();
                tempTile.init(survivshim.C.TILE_GROUND_SOIL2, j, i);
                this.tiles.push(tempTile);
            }
        }
        let level = survivshim.levels[0];
        var _this = this;
        level.decors.forEach(function(decorjs){
            let decor = new survivshim.Decor();
            decor.loadFromJs(decorjs);
            _this.decors.push(decor);
        })
        let mob = new survivshim.Creature();
        mob.init(survivshim.C.MOB_BAT);
        this.creatures.push(mob);
    },

    renderLights : function(listOfLights){
        var ctx = survivshim.canvas.canvasNight.getContext("2d");
        ctx.fillStyle = "black"; 
        ctx.globalAlpha = 0.1;
        listOfLights.forEach(function(light){
            ctx.clearRect(light.x, light.y, light.w, light.h);
        })
    },

    render : function(){
        var lights = [];
        survivshim.canvas.clearCanvas();
        var _this = this;
        var posChar = survivshim.character.getTile();
        
        this.tiles.forEach(function(tile){
            if( ((posChar.x - _this.limitToDraw) < tile.x) && 
                ((posChar.x + _this.limitToDraw) > tile.x) &&
                ((posChar.y - _this.limitToDraw) < tile.y) &&
                ((posChar.y + _this.limitToDraw) > tile.y)
              ){
                tile.render(_this.tileSet);
              }
        });
        this.decors.forEach(function(decor){
            if( ((posChar.x - _this.limitToDraw) < decor.x) && 
                ((posChar.x + _this.limitToDraw) > decor.x) &&
                ((posChar.y - _this.limitToDraw) < decor.y) &&
                ((posChar.y + _this.limitToDraw) > decor.y)
                ){
                    decor.render();
                    let light = decor.getLights();
                    if (light !== null){
                        lights.push(light);
                    }
                }
        })

        this.creatures.forEach(function(mob){
            let tilePos = mob.getTile();
            if( ((posChar.x - 40) < tilePos.x) && 
                ((posChar.x + 40) > tilePos.x) &&
                ((posChar.y - 40) < tilePos.y) &&
                ((posChar.y + 40) > tilePos.y)
                ){
                    mob.render();
                }
        })

        this.floatingTexts.forEach(function(text){
            text.render();
        })
        
        survivshim.character.render();
        survivshim.contextualMenu.render();
        survivshim.collectMenu.render();
        survivshim.materiauMenu.render();
        survivshim.blueprintMenu.render();
        survivshim.listblueprintMenu.render();
        survivshim.statsMenu.render();
        survivshim.iconMenu.render();
        survivshim.inventaireMenu.render();
        survivshim.console.render();
        survivshim.hourui.render();
        survivshim.night.render();
        this.renderLights(lights);
        survivshim.sommeilMenu.render();
        survivshim.equipementMenu.render();
        survivshim.contextualMenuOnInventoryMenu.render();
        survivshim.contextualMenuOnEquipementMenu.render();
        survivshim.contextualMenuOnMob.render();
        
    },

    removeThings : function(arrayToRemove){
        var _arrayToRemove = arrayToRemove;
        arrayToRemove.forEach(function(item){
            if (item.toRemove === true){
                const index = _arrayToRemove.indexOf(item);
                if (index !== -1) {
                    _arrayToRemove.splice(index, 1);
                }
                return;
            }
        })
    },
    
    manageHour : function(){
        if (this.hour > 24){
            this.hour -= 24;
        }
    },

    loop: function(){
        survivshim.character.loop();
        this.creatures.forEach(function(mob){
            mob.loop();
        });
        this.manageHour();
        this.removeThings(this.creatures);
        this.removeThings(this.decors);
        this.removeThings(this.floatingTexts);
        this.render();
    },

    getAPathArray : function (){
        this.aPathArray = this.aPathArrayGenerate();
        return this.aPathArray;
    },

    getTilesForAPath : function(){
        if (typeof this.aPathTiles === 'undefined' || this.aPathTiles === null){
          var _this = this;
          this.aPathTiles = {};
          this.tiles.forEach(function(tile){
              let tilePos = tile.getTile();
            _this.aPathTiles[tilePos.x + "/" + tilePos.y] = tile;
          });
        }
        return this.aPathTiles;
      },

    aPathArrayGenerate : function(){
        let grid = [];
        let tiles= this.getTilesForAPath();
        for (var i=0;i<this.maxY;i++){
          grid[i] = [];
        }
        for (let i=0;i<this.maxY;i++){
          for (let j=0;j<this.maxX;j++){
            let brick = {'x' : j, 'y' : i, 'F' : -1, 'G' : -1, 'status' : 'Obstacle','cameFrom' : {}};
            if (( j + "/" + i) in tiles){
              if(tiles[j + "/" + i].type === "ground")
              
                brick.status = 'Empty';
            }
            grid[i][j] = brick;
          }
        }

        this.decors.forEach(function(elt){
            let tilePos = elt.getTile();
            if (elt.blocking){
                grid[tilePos.y][tilePos.x].status = "Obstacle";
            }
        });
    
        return grid;
      },

    getTheDecorUnderMouse : function(x,y){
        var _x = Math.floor((x - survivshim.gameEngine.centerX + survivshim.character.x ));
        var _y = Math.floor((y - survivshim.gameEngine.centerY + survivshim.character.y ));
        var result = null;
        this.decors.forEach(function(elt){
            if ( _x >= (elt.x )
              && _x < (elt.x  + elt.sizeX)
              && _y >= (elt.y )
              && _y < (elt.y  + elt.sizeY)  
            ){
                result = elt;
            }
        });
        return result;
    },

    getMobUnderMouse : function(x,y){
        var _x = Math.floor((x - survivshim.gameEngine.centerX + survivshim.character.x ));/// survivshim.gameEngine.tileSize);
        var _y = Math.floor((y - survivshim.gameEngine.centerY + survivshim.character.y ));// survivshim.gameEngine.tileSize);
        var result = null;
        this.creatures.forEach(function(elt){
            if ( _x >= elt.x 
              && _x < (elt.x + elt.size)
              && _y >= elt.y
              && _y < (elt.y + elt.size)  
            ){
                result = elt;
            }
        });
        return result;
    },

    showContextualMenu : function(decor){
        survivshim.contextualMenu.showMenu(decor);
    },

    clickEvent : function(evt){
        let clickOnMenu =  survivshim.iconMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.hourui.onClick(evt.pageX,evt.pageY) 
                        || survivshim.sommeilMenu.onClick(evt.pageX,evt.pageY) 
                        || survivshim.contextualMenuOnInventoryMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.contextualMenuOnEquipementMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.contextualMenuOnMob.onClick(evt.pageX,evt.pageY) 
                        || survivshim.contextualMenu.onClick(evt.pageX,evt.pageY) 
                        || survivshim.collectMenu.onClick(evt.pageX,evt.pageY) 
                        || survivshim.blueprintMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.listblueprintMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.materiauMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.statsMenu.onClick(evt.pageX,evt.pageY)
                        || survivshim.console.onClick(evt.pageX,evt.pageY)                       
                        || survivshim.equipementMenu.onClick(evt.pageX,evt.pageY)      
                        || survivshim.inventaireMenu.onClick(evt.pageX,evt.pageY);
                       
        if (clickOnMenu === survivshim.C.CLICK_OUTSIDE_WINDOW){
            let decor = survivshim.zone.getTheDecorUnderMouse(evt.pageX,evt.pageY);
            if (decor !== null ){
                survivshim.zone.showContextualMenu(decor);
            }else{
                let mob = survivshim.zone.getMobUnderMouse(evt.pageX,evt.pageY)
                if (mob != null && mob.state === survivshim.C.MOB_STATE_ALIVE){
                    survivshim.character.interactWithMob(mob);
                }else if (mob !== null && mob.state === survivshim.C.MOB_STATE_DEAD){
                    survivshim.contextualMenuOnMob.showMenu(mob);
                }else{
                    survivshim.contextualMenu.hideMenu();
                    survivshim.zone.showContextualMenu(decor);
                    survivshim.character.goToTarget(evt.pageX,evt.pageY);
                }
            }
        }
    },
}