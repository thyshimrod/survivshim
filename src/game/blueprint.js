'use strict';

var survivshim = survivshim || {};

survivshim.Blueprint = function(){
    this.resultItem = 0;
    this.listOfMateriaux = [];
    this.timeToBuild = 0;
    this.timerBuild = -1;
    this.isCraftDone = false;
    this.templateId = 0;
    this.name = "";
};
  
survivshim.Blueprint.prototype = {
    init : function(templateId){
        var src = survivshim.blueprints[templateId];
        var _this = this;
        src.materiaux.forEach(function (materiau){
            let mat = new survivshim.Materiau();
            mat.init(materiau.templateId);
            mat.quantity = materiau.quantity;
            _this.listOfMateriaux.push(mat);
        });
        this.resultItem = new survivshim.Item();
        this.resultItem.init(src.item);
        this.name = src.name;
        this.timeToBuild = src.timetobuild;
        this.tiredNess = src.tiredness;
    },

    removeMateriauxOnceCrafted : function(){
        this.listOfMateriaux.forEach(function (materiau){
            let materiauInInventory = survivshim.character.getMateriau(materiau.id);
            if (materiauInInventory !== null){
                materiauInInventory.quantity -= materiau.quantity;
            }
        })
    },

    craftCompleted : function(){
        this.removeMateriauxOnceCrafted();
        let item = new survivshim.Item();
        item.init(this.resultItem.templateId);
        survivshim.character.addItemToInventory(item);
        this.isCraftDone = true;
    },

    startCrafting : function(){
        let d = new Date();
        this.timerBuild = d.getTime(); 
    },

    craft : function(){
        if (this.timerBuild === -1){
            this.startCrafting();    
        }
        let prct = this.getPercentCompletion();
        if (prct >= 100 && !this.isCraftDone){
            this.craftCompleted();
        }
    },

    getPercentCompletion : function(){
        let d = new Date();
        let newTick = d.getTime(); 
        let prct = Math.floor((newTick - this.timerBuild) /(this.timeToBuild) * 100 );
        return prct;
    }
};