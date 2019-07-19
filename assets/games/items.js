'use strict';

var survivshim = survivshim || {};

survivshim.items = {
    1 : {
        "name"    : "Couteau en silex",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/murmures.png",
        "sprite" : { "x" : 32, "y" : 2976},
        "use" : survivshim.C.STATE_INVENTORY_EQUIPEMENT,
        "location" : survivshim.C.ITEM_LOCATION_RIGHTHAND
    },
    2 : {
        "name" : "feu de camp",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/murmures.png",
        "sprite" : { "x" : 800, "y" : 384},
        "use" : survivshim.C.STATE_INVENTORY_EQUIPEMENT,
        "location" : survivshim.C.ITEM_LOCATION_FLOOR
    },
    3 :  {
        "name"    : "Hache en silex",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/murmures.png",
        "sprite" : { "x" : 832, "y" : 3008},
        "use" : survivshim.C.STATE_INVENTORY_EQUIPEMENT,
        "location" : survivshim.C.ITEM_LOCATION_RIGHTHAND
    },
    4 :  {
        "name"    : "Lance en silex",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/murmures.png",
        "sprite" : { "x" : 448, "y" : 3040},
        "use" : survivshim.C.STATE_INVENTORY_EQUIPEMENT,
        "location" : survivshim.C.ITEM_LOCATION_RIGHTHAND
    },
    5 : {
        "name"    : "Pioche en silex",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/murmures.png",
        "sprite" : { "x" : 448, "y" : 2976},
        "use" : survivshim.C.STATE_INVENTORY_EQUIPEMENT,
        "location" : survivshim.C.ITEM_LOCATION_RIGHTHAND
    }
};