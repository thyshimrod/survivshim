'use strict';
var survivshim = survivshim || {};

survivshim.EquipementMenu = function (){
  this.active = false;
  this.x = 400;
  this.y = 400;
  this.height = 400;
  this.width = 400;
  this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
  this.icons = [];
};

survivshim.EquipementMenu.prototype ={
    showMenu : function(blueprint){
        this.active = true;
        let icon = { "x" : 190 , "y" : 20, "tx" : 33, "ty" : 33 , "icon" : "head"};
        this.icons.push(icon);
    },

    hideMenu : function(){
        this.active = false;
    },

    render : function(){
        if (this.active === true){
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x,this.y,this.width,this.height);
            this.ctx.stroke();
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Equipement";
            this.ctx.fillText(text ,this.x + 10, this.y + 10);
            text = "X";
            this.ctx.fillText(text,this.x + this.width -10, this.y +10);
        }
    },

    onClick : function(x,y){
        if ( this.active === true 
            && x < (this.x + this.width) && x > (this.x)
            && y < (this.y + this.height) && y > (this.y)){
           if (x > (this.x + this.width -10)
            && y < (this.y + 15)){
                this.hideMenu();  
           }
            return survivshim.C.CLICK_ON_WINDOW;
        }else{
            this.hideMenu();
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}