'use strict';
var survivshim = survivshim || {};

survivshim.EquipementMenu = function (){
  this.active = false;
  this.x = 400;
  this.y = 300;
  this.height = 400;
  this.width = 400;
  this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
  this.icons = [];
};

survivshim.EquipementMenu.prototype ={
    toggleMenu : function(){
        if(this.active) this.hideMenu()
        else this.showMenu();
    },
    
    showMenu : function(blueprint){
        this.active = true;
        let icon = { "x" : 180 , "y" : 80, "tx" : 33, "ty" : 33 , "icon" : survivshim.C.ITEM_LOCATION_HEAD , "item" : undefined};
        this.icons.push(icon);
        icon = { "x" : 100 , "y" : 150, "tx" : 33, "ty" : 33 , "icon" : survivshim.C.ITEM_LOCATION_LEFTHAND , "item" : undefined};
        this.icons.push(icon);
        icon = { "x" : 260 , "y" : 150, "tx" : 33, "ty" : 33 , "icon" : survivshim.C.ITEM_LOCATION_RIGHTHAND, "item" : undefined};
        this.icons.push(icon);
        icon = { "x" : 180 , "y" : 150, "tx" : 33, "ty" : 33 , "icon" : survivshim.C.ITEM_LOCATION_BODY, "item" : undefined};
        this.icons.push(icon);
        icon = { "x" : 180 , "y" : 220, "tx" : 33, "ty" : 33 , "icon" : survivshim.C.ITEM_LOCATION_LEGS, "item" : undefined};
        this.icons.push(icon);
        icon = { "x" : 180 , "y" : 280, "tx" : 33, "ty" : 33 , "icon" : survivshim.C.ITEM_LOCATION_FOOT, "item" : undefined};
        this.icons.push(icon);
    },

    hideMenu : function(){
        this.active = false;
    },

    renderEquipement : function(){
        var _this = this;
        this.icons.forEach(function(icon){
            _this.ctx.beginPath();
            _this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            _this.ctx.rect(_this.x + icon.x,_this.y + icon.y,icon.tx,icon.tx);
            _this.ctx.stroke();
            var _icon = icon;
            if ( typeof survivshim.character.inventory[survivshim.C.TYPE_INVENTORY_EQUIPEMENT] !== "undefined"){
                survivshim.character.inventory[survivshim.C.TYPE_INVENTORY_EQUIPEMENT].forEach(function(item){
                    if (_icon.icon === item.location && item.status === survivshim.C.ITEM_STATUS_WEARED ){
                     item.render(_this.x + icon.x,_this.y + icon.y);
                     icon.item = item;
                    }
                })
            }      
        })
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

            this.renderEquipement();
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
           var _this = this;
           var _x = x;
           var _y = y;
           this.icons.forEach(function(icon){
               if (_x > (_this.x + icon.x) && _x < (_this.x + icon.x + icon.tx)
                && _y > (_this.y + icon.y) && _y < (_this.y + icon.y + icon.ty)){
                    let position = {"x" : _this.x, "y" : _this.y};
                    survivshim.contextualMenuOnEquipementMenu.showMenu(icon,position);
                }
           });


           return survivshim.C.CLICK_ON_WINDOW;
        }else{
            this.hideMenu();
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}