'use strict';

var survivshim = survivshim || {};

survivshim.Blueprint = function(){
    this.resultItem = 0;
    this.listOfMateriaux = [];
};
  
survivshim.Blueprint.prototype = {
    init : function(){
        this.listOfMateriaux = [{ "1" : "5"}];
        this.resultItem = 1;
    },
};