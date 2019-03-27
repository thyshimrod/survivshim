'use strict';
var survivshim = survivshim || {};

survivshim.Tileset = function (){
  this.tilesets = {};
};

survivshim.Tileset.prototype = {
  get : function(name){
    if (!(name in this.tilesets)){
      var tileset = new Image();
      tileset.src = name;
      this.tilesets[name] = tileset;
    }
    return this.tilesets[name];
  }
};
