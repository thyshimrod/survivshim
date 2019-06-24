'use strict';
var survivshim = survivshim || {};

survivshim.BlueprintMenu = function (){
    this.active = false;
    this.x = 300;
    this.y = 300;
    this.width = 400;
    this.height = 400;
    this.blueprint = null;
    this.ctx = null;
    this.canBuild = false;
    this.timerBuild = 0;
};

survivshim.BlueprintMenu.prototype ={
    showMenu : function(blueprintId = 1){
        this.active = true;
        //this.blueprint = blueprint;
        this.blueprint = new survivshim.Blueprint();
        this.blueprint.init(blueprintId);
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
    },

    hideMenu : function(){
        this.active = false;
        survivshim.character.changeAction(survivshim.C.ACTION_NONE);
    },

    showMateriaux : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
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
            _this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
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
                    this.width,
                    this.height);
                    this.ctx.font = "1Opx Arial";
                    this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
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
            this.width,
            3);
        text = "X";
        this.ctx.fillText(text,this.x + this.width - 10, this.y +10);
    },

    renderAction : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL_BUTTON;
        this.ctx.fillRect(this.x + 150,this.y+290,100,30);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x + 150,this.y+290,100,30);
        this.ctx.stroke();
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
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
        let prctCompletion = this.blueprint.getPercentCompletion();
        if(prctCompletion > 100){
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Construction finie";
            this.ctx.fillText(text ,
                this.x + 160, 
                this.y + 310);
        }else{
            this.ctx.beginPath();
            this.ctx.fillStyle = survivshim.C.COLOR_TURQUOISE;    
            this.ctx.fillRect(this.x + 160, this.y+290, prctCompletion, 10);
        }
    },

    renderItem : function(){
        this.blueprint.resultItem.render(this.x + 180,this.y + 220);
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
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
            if(x < (this.x + this.width) && x > (this.x)
            && y < (this.y + this.height) && y > (this.y)){
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