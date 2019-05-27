'use strict';

var survivshim = survivshim || {};

survivshim.materiaux = {
    1 : {
        "name"    : "Silex",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 32, "y" : 1824},
        "use" : survivshim.C.TYPE_INVENTORY_MATERIAU
    },
    2 : {
        "name" : "salade",
        "size":{"x" : 16, "y" : 16},
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 224, "y" : 1088},
        "use" : survivshim.C.TYPE_INVENTORY_CONSOMMABLE,
        "effect" : [
          {"name" : "faim", "value" : 1000},
          {"name" : "soif", "value" : 1000}
        ]
      },
      3 : {
        "name" : "champignons",
        "size":{"x" : 16, "y" : 16},
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 64, "y" : 1120},
        "use" : survivshim.C.TYPE_INVENTORY_CONSOMMABLE,
        "effect" : [
          {"name" : "faim", "value" : 1000},
          {"name" : "soif", "value" : 1000}
        ]
      },
      4 : {
        "name"    : "Branche",
        "size":{"x" : 32, "y" : 32},
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 256, "y" : 1664},
        "use" : survivshim.C.TYPE_INVENTORY_MATERIAU
      },

};