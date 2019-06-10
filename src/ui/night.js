'use strict';
var survivshim = survivshim || {};

survivshim.Night = function (){
  this.canvasTile = undefined;
  this.canvasCreature = undefined;
  this.canvasAnimation = undefined;
  this.canvasMouse = undefined;
  this.canvasNight = undefined;
  this.width = 232;
  this.height = 232;
  this.alpha = 0;
};

survivshim.Night.prototype ={
    calcAlpha : function(){
        let hour = survivshim.hourui.getHour();
        if (hour > 9 && hour < 18){
            this.alpha = 0;
        }else if (hour == 19 || hour == 8){
            this.alpha = 0.2;
        }else if (hour == 20 || hour == 7){
            this.alpha = 0.3;
        }else if (hour == 21 || hour == 6){
            this.alpha = 0.5;
        }else if (hour == 22 || hour == 5){
            this.alpha = 0.8;
        }else if (hour >= 23 && hour<=4){
            this.alpha = 1;
        }
    },

    render : function(){
        this.calcAlpha();

        let ctx = survivshim.canvas.canvasNight.getContext("2d");
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "black"; 
        ctx.fillRect(0, 0, survivshim.canvas.canvasNight.width, survivshim.canvas.canvasNight.height); 
        ctx.globalAlpha = 0.1;
        ctx.clearRect(survivshim.gameEngine.centerX-100, survivshim.gameEngine.centerY-100, 232, 232);
    }
}