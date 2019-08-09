'use strict';
var survivshim = survivshim || {};

survivshim.GameEngine = function (){
    this.tileSize = survivshim.C.TILE_SIZE_PC;
    this.centerX = 0;
    this.centerY = 0;
    this.startTimer = 0;
}

survivshim.GameEngine.prototype ={
    gameLoop: function (){
        if (survivshim.zone !== "undefined"){
            if (survivshim.character.hitPoints > 0){
                survivshim.zone.loop();
            }else{
                survivshim.death.render();
            }
        }

    },

    clickEvent : function(evt){
        if (survivshim.character.hitPoints > 0){
            survivshim.zone.clickEvent(evt);
        }else{
            survivshim.death.onClick(evt.pageX,evt.pageY)
        }
    },

    init : function(){
        let d = new Date();
        this.startTimer = d.getTime();
        this.centerX = window.innerWidth / 2 -  this.tileSize / 2 ;
        this.centerY = window.innerHeight / 2 - this.tileSize / 2 - 70;
        survivshim.tileset = new survivshim.Tileset();
        survivshim.canvas = new survivshim.Canvas();
        survivshim.death = new survivshim.Death();
        survivshim.canvas.init();
        survivshim.zone = new survivshim.Zone();
        survivshim.zone.init();
        survivshim.character = new survivshim.Character();
        survivshim.character.init();
        survivshim.contextualMenu = new survivshim.ContextualMenu();
        survivshim.collectMenu = new survivshim.CollectMenu();
        survivshim.materiauMenu = new survivshim.MateriauMenu();
        survivshim.blueprintMenu = new survivshim.BlueprintMenu();
        survivshim.listblueprintMenu = new survivshim.ListBlueprintMenu();
        survivshim.statsMenu = new survivshim.StatsMenu();
        survivshim.inventaireMenu = new survivshim.InventaireMenu();
        survivshim.iconMenu = new survivshim.IconMenu();
        survivshim.equipementMenu = new survivshim.EquipementMenu();
        survivshim.contextualMenuOnMob = new survivshim.ContextualMenuOnMob();
        survivshim.hourui = new survivshim.HourUi();
        survivshim.console = new survivshim.Console();
        survivshim.night = new survivshim.Night();
        survivshim.sommeilMenu = new survivshim.SommeilMenu();
        survivshim.console.addMessage("Welcome To SurvivShim");
        survivshim.console.addMessage("We hope you will survive !!");
        survivshim.iconMenu.init();
        survivshim.contextualMenuOnInventoryMenu = new survivshim.ContextualMenuOnInventoryMenu();
        survivshim.contextualMenuOnEquipementMenu = new survivshim.ContextualMenuOnEquipementMenu();
        survivshim.canvas.canvasMouse.addEventListener("click",survivshim.gameEngine.clickEvent);
    },
    
    
}

survivshim.gameEngine = new survivshim.GameEngine();
survivshim.gameEngine.init();

setInterval(survivshim.gameEngine.gameLoop,1000/60)