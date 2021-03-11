'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenu = function (){
  this.active = false;
  this.item = null;
  this.collectable = false;
  this.height = 100;
  this.width = 350;
  this.ctx = null;
  this.listOfCollectButton = [];
};

survivshim.ContextualMenu.prototype ={
    toggleMenu : function(){
        if(this.active) this.hideMenu()
        else this.showMenu();
    },

    showMenu : function(item){
        if (item !== null){
            this.item = item;
            this.active = true;
        }
    },

    hideMenu : function(){
        this.item = null;
        this.active = false;
    },

    renderMateriau : function(){
        this.collectable = true;
        let text = "Materiaux";
        this.ctx.fillText(text ,
            this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +30, 
            this.item.y  + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 30);
        var _this = this;
        var i = 0;
        let objDistance = {};
        objDistance.x = this.item.x;
        objDistance.y = this.item.y;
        var distance = calcDistance(survivshim.character,objDistance);
        this.listOfCollectButton = [];
        this.item.collect.forEach(function(col){
            _this.ctx.font = "1Opx Arial";
            _this.ctx.fillStyle = "white ";
            let text = survivshim.materiaux[col.templateid].name + " : " + col.quantity;
            _this.ctx.fillText(text ,
                _this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + _this.item.sizeX +30, 
                _this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - _this.item.sizeY + 50 + 30*i);
            
            if (typeof col.tools !== "undefined"){
                _this.ctx.fillStyle = "red";
                _this.collectable = false;
            }else if( distance > 50){
                _this.ctx.fillStyle = "red";
                _this.collectable = false;
            }
            _this.item.actions.forEach(function(action){
                let text = "";
                if (action.actiontype === survivshim.C.TYPE_ACTION_COLLECT)  text = "Recolter";
                if (action.actiontype === survivshim.C.TYPE_ACTION_CONSUME)  text = "Consommer";
                _this.ctx.fillText(text ,
                    _this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + _this.item.sizeX + 150, 
                    _this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - _this.item.sizeY + 50 + 30*i);
                    
                _this.ctx.beginPath();
                _this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
                let btn = {
                    "x" : _this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + _this.item.sizeX + 140,
                    "y" : _this.item.y  + survivshim.gameEngine.centerY-survivshim.character.y - _this.item.sizeY +  38 + 30*i,
                    "width" : 60,
                    "height" : 20,
                    "item" : _this.item,
                    "materiau" : col.templateid,
                    "actiontype" : action.actiontype
                };
                _this.listOfCollectButton.push(btn);
                _this.ctx.rect(btn.x, 
                    btn.y,
                    btn.width,
                    btn.height);
                
                _this.ctx.stroke();

            })
           
            i++;
        });
    },

    render : function(){
        if (this.item !== null && this.active === true){
            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            if (typeof this.item.collect.templateid !== "undefined"){
                this.height = 150;
            }else{
                this.height = 20;
            }
            this.ctx.fillRect(this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX,
                        this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY,
                         this.width,this.height + this.item.collect.length*30 + 30);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX,
                this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY,
                this.width ,this.height + this.item.collect.length*30 + 30);
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = "white ";
            let text = this.item.name;
            this.ctx.fillText(text ,
                this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX +10, 
                this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + 10);
            if (this.item.collect.length >= 0 ){
                this.renderMateriau();
            }
        }
    },

    onClick : function(x,y){
        if (this.active === true){
            if ((x < this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX + this.width) 
            && (x >this.item.x + survivshim.gameEngine.centerX-survivshim.character.x + this.item.sizeX ) 
            && (y < this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY + this.width) 
            && (y >this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY )){
                /*if ((y > this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +70)
                && (y < this.item.y + survivshim.gameEngine.centerY-survivshim.character.y - this.item.sizeY +90)
                && this.collectable){
                    survivshim.collectMenu.showMenu(this.item);
                    survivshim.character.changeAction(survivshim.C.ACTION_COLLECT);
                    this.hideMenu();
                } */
                var _this = this;
                this.listOfCollectButton.forEach(function (btn){
                    if(x > btn.x && x < (btn.x + btn.width)
                    && y > btn.y && y < (btn.y + btn.height)){
                        if (btn.actiontype === survivshim.C.TYPE_ACTION_COLLECT){
                            survivshim.collectMenu.showMenu(_this.item,btn.materiau);
                            survivshim.character.changeAction(survivshim.C.ACTION_COLLECT);
                        }else if (btn.actiontype === survivshim.C.TYPE_ACTION_CONSUME){
                            survivshim.character.eatFromDecor(_this.item,btn.materiau);
                        }
                       
                        _this.hideMenu();
                    }
                })  
                return survivshim.C.CLICK_ON_WINDOW;
            }
            this.hideMenu();
            return survivshim.C.CLICK_OUTSIDE_WINDOW;
        }
    }
};