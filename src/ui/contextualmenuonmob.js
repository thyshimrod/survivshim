'use strict';
var survivshim = survivshim || {};

survivshim.ContextualMenuOnMob = function (){
  this.active = false;
  this.x = 300;
  this.y = 100;
  this.width = 50;
  this.height = 20;
  this.ctx = null;
  this.mob = null;
};

survivshim.ContextualMenuOnMob.prototype ={
    showMenu : function(mob){
        this.active = true;
        this.mob = mob;
        this.x = mob.x + 40 ;
        this.y = mob.y ;
    },

    hideMenu : function(){
        this.icon = null;
        this.active = false;
    },

    //TODO REFACTOR TO SPLIT RENDERING MATERIAUX
    render : function(){
        if ( this.active === true && this.mob !== null ){
            let nbMateriaux = this.mob.collect.length;
            if (nbMateriaux > 0){
                this.height = 20 + (nbMateriaux+1) * 20;
            }

            this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x +survivshim.gameEngine.centerX - survivshim.character.x,
                        this.y +survivshim.gameEngine.centerY- survivshim.character.y,
                        this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x +survivshim.gameEngine.centerX - survivshim.character.x,
                this.y +survivshim.gameEngine.centerY- survivshim.character.y, this.width, this.height);
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = survivshim.C.COLOR_TURQUOISE;
            let text = "Collecter";
            this.ctx.fillText(text ,
                this.x +survivshim.gameEngine.centerX - survivshim.character.x +5 ,
                this.y +survivshim.gameEngine.centerY- survivshim.character.y + 13);
            var i=0;
            var _this = this;
            this.mob.collect.forEach(function(col){
                let mat = new survivshim.Materiau();
                mat.init(col.templateid);
                let text = mat.name;
                _this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
                _this.ctx.fillText(text ,
                    _this.x +survivshim.gameEngine.centerX - survivshim.character.x +5 ,
                    _this.y +survivshim.gameEngine.centerY- survivshim.character.y + 13 + (20 * (i +1)));
                i++;
            })
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            text = "Detruire";
            this.ctx.fillText(text ,
                this.x +survivshim.gameEngine.centerX - survivshim.character.x +5 ,
                this.y +survivshim.gameEngine.centerY- survivshim.character.y + 13 + (20 * (nbMateriaux +1)));
        }
    },
    

    onClickActions : function(x,y){
        let nbMateriaux = this.mob.collect.length;
        if ( y > (this.y +survivshim.gameEngine.centerY- survivshim.character.y + 13 + (20 * nbMateriaux+1))){
            this.mob.remove();
            this.hideMenu();
        }else{
            var i = 0;
            var _this = this;
            this.mob.collect.forEach(function(col){
                if ( y > (_this.y +survivshim.gameEngine.centerY- survivshim.character.y +13 +  (20 * i+1))){
                    survivshim.character.addItemCollected(col.templateid,1);
                    survivshim.collectMenu.showMenu(col, _this.mob.x, _this.mob.y, _this.mob.sizeX, _this.mob.sizeY   );
                    survivshim.character.changeAction(survivshim.C.ACTION_COLLECT);
                    _this.hideMenu();
                }
                i++;
            })

        }
    },


    onClick : function(x,y){
        if (this.active === true ){
            if (x < (this.x +survivshim.gameEngine.centerX - survivshim.character.x + this.width)
            &&  x > this.x +survivshim.gameEngine.centerX - survivshim.character.x
            &&  y < this.y +survivshim.gameEngine.centerY- survivshim.character.y + this.height
            &&  y > this.y +survivshim.gameEngine.centerY- survivshim.character.y){
                this.onClickActions(x,y);
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();    
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
}