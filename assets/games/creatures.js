'use strict';

var survivshim = survivshim || {};

survivshim.creatures = {
    1 : {
        "spriteset" : "assets/sprites/rats.png",
        "size" : 32,
        "collect" : [
            { "templateid" : survivshim.C.MATERIAU_VIANDE, 
              "quantity" : 10, "chance" : 50, "speed" : 1}
        ]
    }
};