'use strict';

var survivshim = survivshim || {};

survivshim.decors = {
    "0" :
  {
    "name" : "arbre",
    "typedecor" : 0,
    "blocking" : true,
    "size":{"x" : 32, "y" : 64},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 160, "y" : 1024},
    ],
  },
  "1" :
  {
    "name" : "petites pierres",
    "typedecor" : 0,
    "blocking" : false,
    "size":{"x" : 32, "y" : 32},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 32, "y" : 1824},
    ],
    "collect" : { "templateid" : survivshim.C.MATERIAU_SILEX, "quantity" : 10, "chance" : 50, "speed" : 1}
  },
  "2" :
  {
    "name" : "petites fougeres",
    "typedecor" : 0,
    "blocking" : true,
    "size":{"x" : 32, "y" : 32},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 64, "y" : 1344},
    ],
  },
  "3" :
  {
    "name" : "bambous",
    "typedecor" : 0,
    "blocking" : true,
    "size":{"x" : 32, "y" : 64},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 256, "y" : 1664},
    ],
  },

  "4" :
  {
    "name" : "champignons",
    "typedecor" : 0,
    "blocking" : false,
    "size":{"x" : 32, "y" : 32},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 64, "y" : 1120},
    ],
  },
  "5" :
  {
    "name" : "flower 1",
    "typedecor" : 0,
    "blocking" : false,
    "size":{"x" : 32, "y" : 32},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 0, "y" : 1056},
    ],
  },
  "6" :
  {
    "name" : "petits arbres",
    "typedecor" : 0,
    "blocking" : true,
    "size":{"x" : 32, "y" : 64},
    "ratio" : {"x" : 1, "y" : 2},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 0, "y" : 1280},
    ],
  },
  "7" :
  {
    "name" : "salade",
    "typedecor" : 0,
    "blocking" : true,
    "size":{"x" : 16, "y" : 16},
    "ratio" : {"x" : 0.5, "y" : 0.5},
    "tileset" : "assets/tileset/tileset1.png",
    "sprites" : [
      { "state" : 0, "x" : 224, "y" : 1088},
    ],
    "collect" : { "templateid" : survivshim.C.MATERIAU_SALADE, "quantity" : 1, "chance" : 100, "speed" : 1}
  },
};