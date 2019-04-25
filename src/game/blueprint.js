'use strict';

var survivshim = survivshim || {};

survivshim.Blueprint = function(){
    this.resultItem = 0;
    this.listOfMateriaux = [];
};
  
survivshim.Blueprint.prototype = {
    init : function(){
        this.listOfMateriaux = [{ "id" : "1", "qty" : "5"}];
        this.resultItem = 1;
    },
};