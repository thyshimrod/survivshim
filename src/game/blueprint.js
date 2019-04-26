'use strict';

var survivshim = survivshim || {};

survivshim.Blueprint = function(){
    this.resultItem = 0;
    this.listOfMateriaux = [];
};
  
survivshim.Blueprint.prototype = {
    init : function(){
        let mat = new survivshim.Materiau();
        mat.init(1);
        mat.quantity = 5;
        this.listOfMateriaux.push(mat);
        this.resultItem = 1;
    },
};