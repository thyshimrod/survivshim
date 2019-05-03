'use strict';

var survivshim = survivshim || {};

survivshim.Blueprint = function(){
    this.resultItem = 0;
    this.listOfMateriaux = [];
    this.timeToBuild = 0;
    this.timerBuild = -1;
    this.isCraftDone = false;
};
  
survivshim.Blueprint.prototype = {
    init : function(){
        let mat = new survivshim.Materiau();
        mat.init(1);
        mat.quantity = 5;
        this.listOfMateriaux.push(mat);
        this.resultItem = new survivshim.Item();
        this.resultItem.init(1);
        this.timeToBuild = 3000;
    },

    craft : function(){
        if (this.timerBuild === -1){
            let d = new Date();
            this.timerBuild = d.getTime(); 
        }
        let prct = this.getPercentCompletion();
        if (prct >= 100 && !this.isCraftDone){
            this.listOfMateriaux.forEach(function (materiau){
                let materiauInInventory = survivshim.character.getMateriau(materiau.id);
                if (materiauInInventory !== null){
                    materiauInInventory.quantity -= materiau.quantity;
                }
            });
            this.isCraftDone = true;
        }
    },

    getPercentCompletion : function(){
        let d = new Date();
        let newTick = d.getTime(); 
        let prct = Math.floor((newTick - this.timerBuild) /(this.timeToBuild) * 100 );
        return prct;
    }


};