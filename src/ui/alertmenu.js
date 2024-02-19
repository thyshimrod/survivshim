'use strict';
var survivshim = survivshim || {};

survivshim.AlertMenu = function (){
    this.x = 2;
    this.y = 120;
    this.icons = [];

};

survivshim.AlertMenu.prototype ={
    init : function(){
    },

    checkNewBluePrint : function(){
        if (survivshim.character.newBP > 0 ){
            var _found = false;
            this.icons.forEach(function (icon){
                if (icon.templateId === survivshim.C.ICON_NEW_BLUEPRINT){
                    _found = true;
                }
            })

            if (!_found){
                let icon = new survivshim.Icone();
                icon.load(survivshim.C.ICON_NEW_BLUEPRINT,this.x,this.y + ( 32 * this.icons.length ));
                this.icons.push(icon);
            }
        }
    },

    check : function(){
        this.checkNewBluePrint();
    },

    render : function(){
        this.check();
        this.icons.forEach(function (icon){
            icon.render();
        })
    },
};