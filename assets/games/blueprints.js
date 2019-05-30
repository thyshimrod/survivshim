'use strict';

var survivshim = survivshim || {};

survivshim.blueprints = {
    1 : {
        "name"    : "Couteau en silex",
        "item" : survivshim.C.ITEM_COUTEAU_SILEX,
        "timetobuild" : 3000,
        "tiredness" : 10,
        "level" : 1,
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
        "level" : 1,
        "materiaux" : [
            {
                "templateId" : survivshim.C.MATERIAU_SILEX,
                "quantity" : 5
            }
        ]
    },
    3 : {
        "name"    : "Hache en silex",
        "item" : survivshim.C.ITEM_HACHE_SILEX,
        "timetobuild" : 3000,
        "tiredness" : 10,
        "level" : 2,
        "materiaux" : [
            {
                "templateId" : survivshim.C.MATERIAU_SILEX,
                "quantity" : 5
            },
            {
                "templateId" : survivshim.C.MATERIAU_BRANCHE,
                "quantity" : 1
            }
        ]
    },
    4 : {
        "name"    : "Lance en silex",
        "item" : survivshim.C.ITEM_LANCE_SILEX,
        "timetobuild" : 3000,
        "tiredness" : 10,
        "level" : 2,
        "materiaux" : [
            {
                "templateId" : survivshim.C.MATERIAU_SILEX,
                "quantity" : 5
            },
            {
                "templateId" : survivshim.C.MATERIAU_BRANCHE,
                "quantity" : 3
            }
        ]
    },
    5 : {
        "name"    : "Pioche en silex",
        "item" : survivshim.C.ITEM_PIOCHE_SILEX,
        "timetobuild" : 3000,
        "tiredness" : 10,
        "level" : 2,
        "materiaux" : [
            {
                "templateId" : survivshim.C.MATERIAU_SILEX,
                "quantity" : 5
            },
            {
                "templateId" : survivshim.C.MATERIAU_BRANCHE,
                "quantity" : 3
            }
        ]
    }
};