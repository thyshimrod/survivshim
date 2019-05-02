'use strict';
var survivshim = survivshim || {};

survivshim.BlueprintMenu = function (){
    this.active = false;
    this.x = 100;
    this.y = 100;
    this.maxX = 400;
    this.maxY = 400;
    this.blueprint = null;
    this.ctx = null;
    this.canBuild = false;
    this.timerBuild = 0;
};

survivshim.BlueprintMenu.prototype ={
    showMenu : function(blueprint){
        this.active = true;

        //this.blueprint = blueprint;
        this.blueprint = new survivshim.Blueprint();
        this.blueprint.init();
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
    },

    hideMenu : function(){
        this.active = false;
        survivshim.character.changeAction(survivshim.C.ACTION_NONE);
    },

    showMateriaux : function(){
        this.ctx.fillStyle = "white";
        let text = "Materiaux";
        this.ctx.fillText(text ,
            this.x + 300, 
            this.y + 10);
        var _this = this;
        var i = 0;
        this.canBuild = true;
        this.blueprint.listOfMateriaux.forEach(function(mat){
            mat.render(_this.x +220 + 40 *i  ,_this.y +40);
            let materiauInInventory = survivshim.character.getMateriau(mat.id);
            let qtyInInventory = materiauInInventory === null ? 0 : materiauInInventory.quantity;
            _this.ctx.fillStyle = "white";
            if (qtyInInventory < mat.quantity){
                _this.ctx.fillStyle = "red";
                _this.canBuild = false;
            }
            
            let text = qtyInInventory+ " / " + mat.quantity;
            _this.ctx.fillText(text ,
                _this.x +230 + 40 *i  ,
                _this.y +80);    
            i += 1;
        });
    },

    renderFrame : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x,
                    this.y,
                    this.maxX,
                    this.maxY);
                    this.ctx.font = "1Opx Arial";
                    this.ctx.fillStyle = "white";
        let text = "Blueprint";
        this.ctx.fillText(text ,
            this.x + 10, 
            this.y + 10);
        
        this.ctx.fillRect(this.x + 200,
                this.y,
                3,
                200);
        this.ctx.fillRect(this.x ,
            this.y+200,
            this.maxX,
            3);
    },

    renderAction : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL_BUTTON;
        this.ctx.fillRect(this.x + 150,
                    this.y+290,
                    100,
                    30);
        this.ctx.fillStyle = "white";
        if ( !this.canBuild || survivshim.character.action !== survivshim.C.ACTION_NONE){
            this.ctx.fillStyle = "red";
        }
        let text = "Construire";
        this.ctx.fillText(text ,
                this.x + 180, 
                this.y + 310);
    },

    renderCraft : function(){
        let d = new Date();
        let newTick = d.getTime(); 
        if((newTick - this.timerBuild) > this.blueprint.timeToBuild){
            this.ctx.fillStyle = "white";
            let text = "Construction finie";
            this.ctx.fillText(text ,
                this.x + 160, 
                this.y + 310);
        }else{
            this.ctx.beginPath();
            this.ctx.fillStyle = survivshim.C.COLOR_TURQUOISE;    
            let prct = Math.floor((newTick - this.timerBuild) /(this.blueprint.timeToBuild) * 100 );
            this.ctx.fillRect(this.x + 160, this.y+290, prct, 10);
        }
        
    },

    renderItem : function(){
        this.blueprint.resultItem.render(this.x + 180,this.y + 220);
        this.ctx.fillStyle = "white";
        let text = this.blueprint.resultItem.name;
        this.ctx.fillText(text ,
                this.x + 180 -  ((text.length)), 
                this.y + 270 );
    },

    render : function(){
        if (this.active === true && this.blueprint !== null){
            this.renderFrame();
            this.showMateriaux();
            this.renderItem();
            if ( survivshim.character.action === survivshim.C.ACTION_CRAFT){
                this.renderCraft();
            }else{
                this.renderAction();
            }
        }
    },

    onClick : function(x,y){
        if (this.active === true && this.blueprint !== null){
            if(x < (this.x + this.maxX) && x > (this.x)
            && y < (this.y + this.maxY) && y > (this.y)){
                if(x < (this.x + 300) && x > (this.x + 150) 
                && y < (this.y + 320) && y > (this.y + 290)){
                    if (this.canBuild && survivshim.character.action === survivshim.C.ACTION_NONE ){
                        survivshim.character.changeAction(survivshim.C.ACTION_CRAFT);
                        let d = new Date();
                        this.timerBuild = d.getTime(); 
                    }
                }
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
    }
};