var survivshim = survivshim || {};

survivshim.Materiau = function(){
    this.id = 0;
    this.name = "";
    this.quantity = 0;
    this.spriteset;
    this.sprite = {};
    this.size = {};
};

survivshim.Materiau.prototype ={
    init : function(id){
        this.id = id;
        var src = survivshim.materiaux[id];
        this.spriteset = survivshim.tileset.get(src.tileset);
        this.sprite = src.sprite;
        this.size = src.size;
    }
};

