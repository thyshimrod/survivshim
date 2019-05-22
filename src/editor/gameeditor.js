'use strict';
var survivshim = survivshim || {};

survivshim.GameEditor = function (){
    this.tileSize = survivshim.C.TILE_SIZE_PC;
    this.decalageX = 0;
    this.decalageY = 0;
    this.clientX = 0;
    this.clientY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.modeEditor = survivshim.C.EDITOR_ACTION_NONE;
}

survivshim.GameEditor.prototype ={

    gameLoop: function (){
        survivshim.gameEditor.decalageX += survivshim.gameEditor.speedX;
        survivshim.gameEditor.decalageY += survivshim.gameEditor.speedY;
        survivshim.levelEditor.render();
        survivshim.iconMenu.render();
        survivshim.decorMenu.render();
    },

    init : function(){
        survivshim.tileset = new survivshim.Tileset();
        survivshim.canvas = new survivshim.Canvas();
        survivshim.canvas.init();
        survivshim.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
        survivshim.levelEditor = new survivshim.LevelEditor();
        survivshim.levelEditor.init();
        survivshim.iconMenu = new survivshim.IconMenu();
        survivshim.iconMenu.init();
        survivshim.decorMenu = new survivshim.DecorMenu();
        this.centerX = window.innerWidth / 2 -  this.tileSize / 2 ;
        this.centerY = window.innerHeight / 2 - this.tileSize / 2 - 70;
        var _this = this;
        var ctx = survivshim.canvas.canvasMouse.addEventListener('mousemove', survivshim.gameEditor.mouseMoveEvent);
        var ctx = survivshim.canvas.canvasMouse.addEventListener('click', survivshim.gameEditor.clickEvent);
    },

    clickEvent : function(evt){
        let clickOnMenu =  survivshim.iconMenu.onClick(evt.pageX,evt.pageY)
                         ||survivshim.decorMenu.onClick(evt.pageX,evt.pageY);
        if (!clickOnMenu){
            let decor = survivshim.levelEditor.getDecorUnderMouse(evt.pageX,evt.pageY);
            if (decor != null && survivshim.gameEditor.modeEditor === survivshim.C.EDITOR_ACTION_DELETE){
                survivshim.levelEditor.removeDecor(decor);
            }else if (decor === null 
                && survivshim.gameEditor.modeEditor == survivshim.C.EDITOR_ACTION_ADD 
                && survivshim.decorMenu.selectedDecor !== null){
                    console.log(survivshim.decorMenu.selectedDecor);
                survivshim.levelEditor.addDecor(survivshim.decorMenu.selectedDecor.decor.templateId,
                    evt.pageX + survivshim.gameEditor.decalageX,
                    evt.pageY + survivshim.gameEditor.decalageY);
            }
        }
    },

    mouseMoveEvent : function(evt){
        if (evt.pageX < survivshim.iconMenu.getSize() && evt.pageY > 50){
            survivshim.gameEditor.speedX += survivshim.C.EDITOR_VITESSE_DEFILEMENT;    
        }else if (evt.pageX > (window.innerWidth-50)){
            survivshim.gameEditor.speedX -= survivshim.C.EDITOR_VITESSE_DEFILEMENT;
        }else{
            survivshim.gameEditor.speedX = 0;
        }
        if (evt.pageY < 50 && evt.pageX > survivshim.iconMenu.getSize()){
            survivshim.gameEditor.speedY += survivshim.C.EDITOR_VITESSE_DEFILEMENT;    
        }else if (evt.pageY > (window.innerHeight-50)){
            survivshim.gameEditor.speedY -= survivshim.C.EDITOR_VITESSE_DEFILEMENT;
        }else{
            survivshim.gameEditor.speedY = 0;
        }
    }
}

survivshim.gameEditor = new survivshim.GameEditor();
survivshim.gameEditor.init();

setInterval(survivshim.gameEditor.gameLoop,1000/60)