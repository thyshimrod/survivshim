'use strict';
var survivshim = survivshim || {};

survivshim.HourUi = function (){
    this.x = 0;
    this.y = 50;
    this.width = 40;
    this.height = 40;
    this.ctx = null;    
    this.hour = 9;
};

survivshim.HourUi.prototype ={

    calcDate : function(){
        let d = new Date();
        this.hour = (Math.floor((d.getTime() - survivshim.gameEngine.startTimer)/10000) + 9) % 24;
    },
    

    render : function(){
        this.calcDate();
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        let text = this.hour + " : 00";
        this.ctx.fillText(text , this.x + 6 , this.y  + 25);
    },


    onClick : function(x,y){
        if(x < (this.x + this.width ) && x > this.x
        && y < (this.y + this.height) && y > this.y){
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}