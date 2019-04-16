'use strict';
var survivshim = survivshim || {};

survivshim.GameEngine = function (){
    this.tileSize = survivshim.C.TILE_SIZE_PC;
    this.centerX = 0;
    this.centerY = 0;
}

survivshim.GameEngine.prototype ={
    gameLoop: function (){
        if (survivshim.zone !== "undefined"){
            survivshim.zone.loop();
        }

    },

    showMateriauMenu : function(){
        survivshim.materiauMenu.showMenu();
    },

    showBlueprintMenu : function(){
        survivshim.blueprintMenu.showMenu();
    },

    init : function(){
        this.centerX = window.innerWidth / 2 -  this.tileSize / 2 ;
        this.centerY = window.innerHeight / 2 - this.tileSize / 2 - 70;
        survivshim.tileset = new survivshim.Tileset();
        survivshim.canvas = new survivshim.Canvas();
        survivshim.canvas.init();
        survivshim.zone = new survivshim.Zone();
        survivshim.zone.init();
        survivshim.character = new survivshim.Character();
        survivshim.character.init();
        survivshim.contextualMenu = new survivshim.ContextualMenu();
        survivshim.collectMenu = new survivshim.CollectMenu();
        survivshim.materiauMenu = new survivshim.MateriauMenu();
        survivshim.blueprintMenu = new survivshim.BlueprintMenu();
        let btnMAteriau = document.getElementById("btnMateriau");
        btnMAteriau.addEventListener("click",survivshim.gameEngine.showMateriauMenu);
        let btnBlueprint = document.getElementById("btnBlueprint");
        btnBlueprint.addEventListener("click",survivshim.gameEngine.showBlueprintMenu);
    },
}

survivshim.gameEngine = new survivshim.GameEngine();
survivshim.gameEngine.init();

setInterval(survivshim.gameEngine.gameLoop,1000/60)