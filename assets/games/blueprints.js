'use strict';

var survivshim = survivshim || {};

survivshim.blueprints = {
    1 : {
        "name"    : "Couteau en silex",
        "item" : survivshim.C.ITEM_COUTEAU_SILEX,
        "timetobuild" : 3000,
        "tiredness" : 10,
        "materiaux" : [
            {
                "templateId" : survivshim.C.MATERIAU_SILEX,
                "quantity" : 5
            }
        ]
    },
    2 : {
        "name"    : "Feu",
        "item" : survivshim.C.ITEM_FEU_CAMP,
        "timetobuild" : 3000,
        "tiredness" : 10,
        "materiaux" : [
            {
                "templateId" : survivshim.C.MATERIAU_SILEX,
                "quantity" : 5
            }
        ]
    },
};