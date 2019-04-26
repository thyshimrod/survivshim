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
                    this.y+250,
                    100,
                    30);
        this.ctx.fillStyle = "white";
        if ( !this.canBuild ){
            this.ctx.fillStyle = "red";
        }
        let text = "Construire";
        this.ctx.fillText(text ,
                this.x + 180, 
                this.y + 270);
    },

    render : function(){
        if (this.active === true && this.blueprint !== null){
            this.renderFrame();
            this.renderAction();
            this.showMateriaux();    
        }
    },

    onClick : function(x,y){
        if (this.active === true && this.blueprint !== null){
            if(x < (this.x + 250) && x > (this.x + 150) 
            && y < (this.y + 280) && y > (this.y + 250)){
                if (this.canBuild){

                }
            }else{
                this.hideMenu();
            }
            return survivshim.C.CLICK_ON_WINDOW;
        }

        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};