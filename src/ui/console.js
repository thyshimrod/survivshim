'use strict';
var survivshim = survivshim || {};

survivshim.Console = function (){
  this.active = false;
  this.x = 300;
  this.y = 0;
  this.width = 700;
  this.height = 100;
  this.messages = [];
  this.ctx = null;
  this.nbMessageMax = 8;
};

survivshim.Console.prototype ={
    renderMessages : function(){
        let nbMessage = 0;
        for (let i = this.messages.length-1; i >= 0 && nbMessage < this.nbMessageMax ; i--){
            let text = this.messages[i];
            this.ctx.fillStyle = text.alert;
            this.ctx.fillText(text.text,
                this.x + 10, 
                this.y + 10 + 10* (this.nbMessageMax - nbMessage));
            nbMessage ++;
        }
    },

    render : function(){
        this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
        this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
        this.renderMessages();
    },

    addMessage : function(text,alert = survivshim.C.MESSAGE_ALERT_INFO){
        this.messages.push({"text" : text, "alert" : alert});
    },

    onClick : function(x,y){
        if(x < (this.x + this.width ) && x > this.x
        && y < (this.y + this.height) && y > this.y){
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}