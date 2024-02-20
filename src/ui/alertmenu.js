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
        }else{
            let indexIconToRemove = -1;
            for (var itIcon = 0 ; itIcon < this.icons.length ; itIcon++){
                if (this.icons[itIcon].templateId === survivshim.C.ICON_NEW_BLUEPRINT){
                    indexIconToRemove = itIcon;
                    break;
                }
            }
            if (indexIconToRemove !== -1){
                this.icons.splice(indexIconToRemove,1);
            }
        }
    },

    check : function(){
        this.checkNewBluePrint();
    },

    onClick : function(x,y){
        if( this.icons.length > 0
            && x < (this.x + 32) 
            && y > this.y 
            && y < ( this.y + (32 * this.icons.length))){
            var _this = this;
            var _x = x;
            var _y = y;
            for (let itIcon = 0 ; itIcon < this.icons.length ; itIcon++){
                if ( y > this.icons[itIcon].y && y < (this.icons[itIcon].y + 32)){
                    if (this.icons[itIcon].templateId === survivshim.C.ICON_NEW_BLUEPRINT){
                        survivshim.listblueprintMenu.showMenu(survivshim.C.STATE_LIST_BLUEPRINT_NEW);
                    }
                }
            }
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    },

    render : function(){
        this.check();
        this.icons.forEach(function (icon){
            icon.render();
        })
    },
};