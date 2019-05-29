'use strict';
var survivshim = survivshim || {};

survivshim.ListBlueprintMenu = function (){
    this.active = false;
    this.x = 300;
    this.y = 300;
    this.width = 400;
    this.height = 400;
    this.blueprint = null;
    this.ctx = null;
    this.canBuild = false;
    this.timerBuild = 0;
    this.cellSize = 200
    this.listOfBP = [];
    this.state = survivshim.C.STATE_LIST_BLUEPRINT_BLUEPRINTS;
};

survivshim.ListBlueprintMenu.prototype ={
    showMenu : function(){
        this.active = true;
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
    },

    hideMenu : function(){
        this.active = false;
        survivshim.character.changeAction(survivshim.C.ACTION_NONE);
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
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        if (this.state === survivshim.C.STATE_LIST_BLUEPRINT_BLUEPRINTS){
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT_CHOOSEN;
        }
        let text = "Blueprint";
        this.ctx.fillText(text ,
            this.x + 70, 
            this.y + 15);
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        if (this.state === survivshim.C.STATE_LIST_BLUEPRINT_NEW){
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT_CHOOSEN;
        }
        text = "Nouveau";
        this.ctx.fillText(text ,
                this.x + 280, 
                this.y + 15);

        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x , this.y, this.cellSize, 20);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x + this.cellSize, this.y, this.cellSize, 20);
        this.ctx.stroke();
        
    },

    renderBP : function(){
        var i = 0;
        var _this = this;
        survivshim.character.listOfBP.forEach(function(bp){
            let blueprint = new survivshim.Blueprint();
            blueprint.init(bp);
            blueprint.resultItem.render(_this.x + 20 +i*60,_this.y + 50);
            _this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = blueprint.resultItem.name;
            _this.ctx.fillText(text ,
                _this.x + 20 +i*60 -  ((text.length)), 
                _this.y + 50 );
            let BP = {
                "x" : _this.x +20 +i*60,
                "y" : _this.y + 50,
                "id" : bp
            };
            _this.listOfBP.push(BP);
            i++;
        })
    },

    renderNewBP : function(){

    },

    render : function(){
        if (this.active === true ){
            this.renderFrame();
            if (this.state === survivshim.C.STATE_LIST_BLUEPRINT_BLUEPRINTS){
                this.renderBP();
            }else{
                this.renderNewBP();
            }
        }
    },

    onClick : function(x,y){
        if (this.active === true ){
            if(x < (this.x + this.width) && x > (this.x)
            && y < (this.y + this.height) && y > (this.y)){
                if ( x < (this.x + this.cellSize) && y < (this.y + 30)){
                    this.state = survivshim.C.STATE_LIST_BLUEPRINT_BLUEPRINTS;
                }else if (x > (this.x + this.cellSize) && y < (this.y + 30)){
                    this.state = survivshim.C.STATE_LIST_BLUEPRINT_NEW;   
                }else if (this.state === survivshim.C.STATE_LIST_BLUEPRINT_BLUEPRINTS){
                    var _x = x;
                    var _y = y;
                    var _this = this;
                    this.listOfBP.forEach(function(bp){
                        if (_x > bp.x 
                            && _x < (bp.x +32)
                            && _y > bp.y
                            && _y < (bp.y+32)){
                                _this.hideMenu();
                                survivshim.blueprintMenu.showMenu(bp.id);
                            }
                    })
                }
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
    }
};