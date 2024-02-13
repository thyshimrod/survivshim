'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenu = function (){
  this.active = false;
  this.showupTick = 0;
  this.showupStep = 0;
  this.showupMaxTick = 20;
  this.item = null;
  this.collectable = false;
  this.height = 100;
  this.width = 350;
  this.ctx = null;
  this.x = 0;
  this.y = 0;
  this.listOfCollectButton = [];
  this.icons = [];
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

            if (typeof this.item.collect !== "undefined" && this.item.collect.length > 0){
                this.height = 50 + this.item.collect.length*50;
                this.width = 350;
            }else{
                this.height = 20;
                this.width = 100;
            }
            this.showupTick = this.showupMaxTick;
            this.showupStep = (window.innerHeight - this.y) / this.showupMaxTick;
        }
    },

    hideMenu : function(){
        this.item = null;
        this.active = false;
    },

    renderMateriau : function(){
        this.icons = [];
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
            if (typeof col.tools !== "undefined"){
                let isToolEquiped = survivshim.character.isItemEquipedFromTemplateId(col.tools);
                if (!isToolEquiped){
                    _this.ctx.fillStyle = "red";
                    _this.collectable = false;
                    let icone = new survivshim.Item();
                    icone.init(col.tools);
                    icone.render(_this.x + 210, _this.y +  40 + 30*i,0.5);
                }
            }
            if( distance > 50){
                _this.ctx.fillStyle = "red";
                _this.collectable = false;
                let icone = new survivshim.Icone();
                icone.load(survivshim.C.ICON_WALK,_this.x + 210, _this.y +  40 + 30*i);
                icone.render(0.5);

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

    showUpMenu : function(){
        this.showupTick -= 1;
        if (this.showupTick > 0){
            let actualTransfo =  this.showupMaxTick - this.showupTick;
            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x  , window.innerHeight - (this.showupStep * actualTransfo),
                this.width / this.showupTick ,this.height / this.showupTick );
        }
    },

    renderMenu : function(){
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        
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
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        text = "X";
        this.ctx.fillText(text, this.x + this.width -10,this.y + 10 );


    },

    render : function(){
        if (this.item !== null && this.active === true){
            if (this.showupTick <= 0){
                this.renderMenu();
            }else{
                this.showUpMenu();
            }
            
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
                
                if((x > (this.x + this.width - 16)) && (x < (this.x + this.width))
                && (y > this.y) && (y < (this.y + 16))){
                    this.hideMenu();
                    return survivshim.C.CLICK_ON_WINDOW; 
                }  
                return survivshim.C.CLICK_ON_WINDOW;
            }
            this.hideMenu();
            return survivshim.C.CLICK_ON_WINDOW;
        }
    }
};