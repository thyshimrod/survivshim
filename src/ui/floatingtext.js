'use strict';
var survivshim = survivshim || {};

survivshim.FloatingText = function (){
    this.x = 0;
    this.y = 50;
    this.width = 40;
    this.height = 60;
    this.timerStart = 0;
    this.timer = 0;
    this.toRemove = false;
    this.text = "";
    this.color = "";
};

survivshim.FloatingText.prototype ={
    init : function(x,y,text,timer,color){
        this.text = text;
        this.x = x;
        this.y = y;
        this.color = color;
        this.timer = timer;
        let d = new Date();
        this.timerStart = d.getTime();
    },

    render : function(){
        let ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillText(this.text,
            this.x + survivshim.gameEngine.centerX - survivshim.character.x, 
            this.y + survivshim.gameEngine.centerY - survivshim.character.y);
        this.y -= 1;

        let d = new Date();
        let newTick = d.getTime();
        if(newTick - this.timerStart > this.timer){
            this.toRemove = true;
        }

    }
};