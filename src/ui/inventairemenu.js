'use strict';
var survivshim = survivshim || {};

survivshim.InventaireMenu = function (){
  this.active = false;
  this.x = 100;
  this.y = 100;
  this.ctx = null;
  this.width = 420;
  this.height = 400;
  this.sizeCellMenu = 140;
  this.state = survivshim.C.STATE_INVENTORY_MATERIAU;
  this.listOfItems = [];
};

survivshim.InventaireMenu.prototype ={
    toggleMenu : function(){
        if(this.active) this.hideMenu()
        else this.showMenu();
    },
    
    showMenu : function(item){
        this.active = true;
        this.x = Math.floor(window.innerWidth / 2) - Math.floor(this.width /2);
        this.y = Math.floor(window.innerHeight / 2) - Math.floor(this.height /2);
    },

    hideMenu : function(){
        this.active = false;
    },

    renderFrame : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x,
                    this.y,
                    this.width,
                    this.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
        this.ctx.font = "1Opx Arial";
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        if (this.state === survivshim.C.STATE_INVENTORY_EQUIPEMENT){
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT_CHOOSEN;
        }
        let text = "Equipement";
        this.ctx.fillText(text ,
            this.x + 10, 
            this.y + 15);            
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        if (this.state === survivshim.C.STATE_INVENTORY_MATERIAU){
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT_CHOOSEN;
        }
        text = "Materiaux";
        this.ctx.fillText(text ,
            this.x + 150, 
            this.y + 15);
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        if (this.state === survivshim.C.STATE_INVENTORY_CONSOMMABLE){
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT_CHOOSEN;
        }            
        text = "Consommable";
        this.ctx.fillText(text ,
            this.x + 300, 
            this.y + 15);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.sizeCellMenu, 20);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x + this.sizeCellMenu, this.y, this.sizeCellMenu, 20);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x + this.sizeCellMenu * 2, this.y, this.sizeCellMenu, 20);
        this.ctx.stroke();  

        text = "X";
        this.ctx.fillText(text,this.x + this.width -10, this.y +10);
    },

    renderItem : function(typeItem){
        var i = 0;
        var j = 0;
        var ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        this.listOfItems = [];
        var _this = this;
        if(typeof survivshim.character.inventory[typeItem] !== "undefined" &&  survivshim.character.inventory[typeItem] !== null){
            survivshim.character.inventory[typeItem].forEach(function(item){
                if ( item.status !== survivshim.C.ITEM_STATUS_WEARED){
                    item.render(_this.x + i * 40 + 10,_this.y + j * 60 + 40);
                    let itemDisplayed = {};
                    itemDisplayed.item = item;
                    itemDisplayed.x = _this.x + i * 40 + 10;
                    itemDisplayed.y = _this.y + j * 60 + 40;
                    _this.listOfItems.push(itemDisplayed);
                    ctx.font = "1Opx Arial";
                    ctx.fillStyle = survivshim.C.COLOR_TEXT;
                    let text = item.quantity;
                    ctx.fillText(text ,
                        _this.x + i * 40 + 20, 
                        _this.y + j * 60 + 80);
                    i += 1;
                    if (i > 10){
                        i = 0;
                        j += 1;
                    }
                }
                
            });
        }
    },

    renderConsommable : function(){
        this.renderItem(survivshim.C.TYPE_INVENTORY_CONSOMMABLE)
    },

    renderMateriau : function(){
        this.renderItem(survivshim.C.TYPE_INVENTORY_MATERIAU)
    },

    renderEquipement : function(){
        this.renderItem(survivshim.C.TYPE_INVENTORY_EQUIPEMENT)
    },

    render : function(){
        if (this.active === true){
            this.ctx= survivshim.canvas.canvasAnimation.getContext("2d");
            this.renderFrame();
            if (this.state == survivshim.C.STATE_INVENTORY_CONSOMMABLE) {
                this.renderConsommable();
            }else if (this.state == survivshim.C.STATE_INVENTORY_MATERIAU) {
                this.renderMateriau();
            }else if (this.state == survivshim.C.STATE_INVENTORY_EQUIPEMENT) {
                this.renderEquipement();
            }
        }
    },

    onClick : function(x,y){
        if(this.active === true){
            if ( x < (this.x + this.width) && x > (this.x)
              && y < (this.y + this.height) && y > (this.y)){
                if ( x > this.x && x < (this.x + this.sizeCellMenu)
                && y < (this.y + 20)){
                    this.state = survivshim.C.STATE_INVENTORY_EQUIPEMENT;
                }else if ( x > (this.x + this.sizeCellMenu) && x < (this.x + this.sizeCellMenu*2)
                && y < (this.y + 20)){
                    this.state = survivshim.C.STATE_INVENTORY_MATERIAU;
                }else if ( x > (this.x + this.sizeCellMenu * 2) && x < (this.x + this.sizeCellMenu * 3 -10)
                && y < (this.y + 20)){
                    this.state = survivshim.C.STATE_INVENTORY_CONSOMMABLE;
                }else if (x > (this.x + this.sizeCellMenu * 3 -10)){
                    this.hideMenu();
                }else{
                    var _x = x;
                    var _y = y;
                    var _this = this;
                    this.listOfItems.forEach(function (item){
                        if(_x > item.x && _x < (item.x + survivshim.C.TILE_SIZE_PC)
                        && _y > item.y && _y < (item.y + survivshim.C.TILE_SIZE_PC)){
                            survivshim.contextualMenuOnInventoryMenu.showMenu(item);
                        }
                    });
                }
                return survivshim.C.CLICK_ON_WINDOW;
            }else{
                this.hideMenu();
                return survivshim.C.CLICK_OUTSIDE_WINDOW;
            }
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }
};