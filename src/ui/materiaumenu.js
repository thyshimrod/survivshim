'use strict';
var survivshim = survivshim || {};

survivshim.MateriauMenu = function (){
  this.active = false;
};

survivshim.MateriauMenu.prototype ={
    toggleMenu : function(){
        if(this.active) this.hideMenu()
        else this.showMenu();
    },

    showMenu : function(){
        this.active = true;
        this.x = 100;
        this.y = 100;
        this.width = 400;
        this.height = 400;
        this.materiaux = [];
    },

    hideMenu : function(){
        this.active = false;
    },

    renderMateriaux : function(){
        var i = 0;
        var j = 0;
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        this.materiaux = [];
        var _this = this;
        if(typeof survivshim.character.inventory["materiau"] !== "undefined" &&  survivshim.character.inventory["materiau"] !== null){
            survivshim.character.inventory["materiau"].forEach(function(mat){
                mat.render(_this.x + i * 40 + 10,_this.y + j * 60 + 40);
                let materiau = {};
                materiau.materiau = mat;
                materiau.x = _this.x + i * 40 + 10;
                materiau.y = _this.y + j * 60 + 40;
                _this.materiaux.push(materiau);
                ctx.font = "1Opx Arial";
                ctx.fillStyle = survivshim.C.COLOR_TEXT;
                let text = mat.quantity;
                ctx.fillText(text ,
                    _this.x + i * 40 + 20, 
                    _this.y + j * 60 + 80);
                i += 1;
                if (i > 10){
                    i = 0;
                    j += 1;
                }
                
            });
        }
    },

    render : function(){
        if (this.active === true){
            var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
            ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            ctx.fillRect(this.x,
                        this.y,
                        this.width,
                        this.height);
            ctx.font = "1Opx Arial";
            ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Materiaux";
            ctx.fillText(text ,
                this.x + 10, 
                this.y + 10);
            ctx.beginPath();
            ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            this.renderMateriaux();
        }
    },

    onClick : function(x,y){
        if (this.active === true ){
            if(x > this.x && x < (this.x + this.width )
            && y > this.y && y < (this.y + this.height)){
                var _x = x;
                var _y = y;
                var _this = this;
                this.materiaux.forEach(function (materiau){
                    if(_x > materiau.x && _x < (materiau.x + survivshim.C.TILE_SIZE_PC)
                    && _y > materiau.y && _y < (materiau.y + survivshim.C.TILE_SIZE_PC)){
                        survivshim.contextualMenuOnInventoryMenu.showMenu(materiau);
                    }
                });

                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();    
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};