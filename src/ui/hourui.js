'use strict';
var survivshim = survivshim || {};

survivshim.HourUi = function (){
    this.x = 0;
    this.y = 50;
    this.width = 40;
    this.height = 60;
    this.ctx = null;    
    this.hour = 9;
};

survivshim.HourUi.prototype ={

    newDay : function(){
        survivshim.console.addMessage("Nouvelle Journée !!");
        survivshim.character.levelUp();
    },

    calcDate : function(){
        let d = new Date();
        let hour = (Math.floor((d.getTime() - survivshim.gameEngine.startTimer)/10000) + 7) % 24;
        if (hour === 9 && this.hour !== 9){
            this.newDay();
        }
        this.hour = hour;
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
        text = "20 °c";
        this.ctx.fillText(text , this.x + 6 , this.y  + 40);
    },


    onClick : function(x,y){
        if(x < (this.x + this.width ) && x > this.x
        && y < (this.y + this.height) && y > this.y){
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}