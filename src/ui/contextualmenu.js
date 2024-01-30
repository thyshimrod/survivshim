'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenu = function (){
  this.active = false;
  this.item = null;
  this.collectable = false;
  this.height = 100;
  this.width = 350;
  this.ctx = null;
  this.x = 0;
  this.y = 0;
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
            this.x = this.item.x + survivshim.gameEngine.centerX-survivshim.character.x;
            this.y = this.item.y + survivshim.gameEngine.centerY-survivshim.character.y;
            if (this.item.collect.length > 0 ){
                this.height = 100;
                this.width = 350;
            }else{
                this.height = 10;
                this.width = 100;
            }
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
            this.x + 30, 
            this.y + 30);
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
                _this.x +30, 
                _this.y + 50 + 30*i);
            // TODO : this condition is for further work, col.tools is for the moment always undefined
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
                    _this.x + 150, 
                    _this.y + 50 + 30*i);
                    
                _this.ctx.beginPath();
                _this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
                let btn = {
                    "x" : _this.x + 140,
                    "y" : _this.y +  38 + 30*i,
                    "width" : 60,
                    "height" : 20,
                    "item" : _this.item,
                    "materiau" : col.templateid,
                    "actiontype" : action.actiontype,
                    "collectable" : _this.collectable
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
            if (typeof this.item.collect !== "undefined"){
                this.height = 50 + this.item.collect.length*50;
            }else{
                this.height = 20;
            }
            this.ctx.fillRect(this.x ,this.y ,
                this.width,this.height  );
                        
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x ,this.y ,
                this.width ,this.height  );
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = "white ";
            let text = this.item.name;
            this.ctx.fillText(text ,
                this.x + 10, 
                this.y + 10);
            if (this.item.collect.length > 0 ){
                this.renderMateriau();
            }
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_RED;
            this.ctx.fillRect(this.x + this.width - 16,
                this.y + 2,
                12,12  );
        }
    },

    onClick : function(x,y){
        if (this.active === true){
            if ((x > this.x) && (x < (this.x + this.width))
            && (y > this.y) && (y < (this.y + this.height))){
                var _this = this;

                this.listOfCollectButton.forEach(function (btn){
                    if(x > btn.x && x < (btn.x + btn.width)
                    && y > btn.y && y < (btn.y + btn.height)){
                        if (btn.collectable === true){
                            if (btn.actiontype === survivshim.C.TYPE_ACTION_COLLECT){
                                survivshim.collectMenu.showMenu(_this.item,btn.materiau);
                                survivshim.character.changeAction(survivshim.C.ACTION_COLLECT);
                            }else if (btn.actiontype === survivshim.C.TYPE_ACTION_CONSUME){
                                survivshim.character.eatFromDecor(_this.item,btn.materiau);
                            }
                            _this.hideMenu();
                        }
                        
                    }
                })  
                return survivshim.C.CLICK_ON_WINDOW;
            }
            this.hideMenu();
            return survivshim.C.CLICK_ON_WINDOW;
        }
    }
};