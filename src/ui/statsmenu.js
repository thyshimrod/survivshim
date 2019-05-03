'use strict';
var survivshim = survivshim || {};

survivshim.StatsMenu = function (){
  this.active = false;
  this.x = 200;
  this.y = 200;
  this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
};

survivshim.StatsMenu.prototype ={
    showMenu : function(blueprint){
        this.active = true;
    },

    hideMenu : function(){
        this.active = false;
    },

    renderTiredNess : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        let text = "Fatigue";
        this.ctx.fillText(text ,this.x + 10, this.y + 130);
        this.ctx.beginPath();
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;    

        let prct = (survivshim.character.fatigue / survivshim.character.maxFatigue) *100;
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        if (prct > 30 && prct <60){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_YELLOW;
        }else if (prct > 60 && prct <90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_ORANGE;
        }else if (prct > 90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_RED;
        }
        prct = prct > 100 ? 100 : prct;
        this.ctx.fillRect(this.x + 70, this.y + 120, prct, 10);
    },
    
    renderHitPoints : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        let text = "Points de vie";
        this.ctx.fillText(text ,this.x + 10, this.y + 110);
        this.ctx.beginPath();
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;    

        let prct = (survivshim.character.hitPoints / survivshim.character.maxHitPoints) *100;
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        if (prct > 20 && prct <=40){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_ORANGE;
        }else if (prct > 40 && prct <= 60){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_YELLOW;
        }else if (prct > 60){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        }
        prct = prct > 100 ? 100 : prct;
        this.ctx.fillRect(this.x + 70, this.y + 100, prct, 10);
    },

    renderSleepStats : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        let text = "Sommeil";
        this.ctx.fillText(text ,this.x + 10, this.y + 90);
        this.ctx.beginPath();
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;    
        let d = new Date();
        let newTick = d.getTime();
        let prct = (newTick - survivshim.character.lastTimeDrink) / 600;
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        if (prct > 30 && prct <60){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_YELLOW;
        }else if (prct > 60 && prct <90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_ORANGE;
        }else if (prct > 90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_RED;
        }
        prct = prct > 100 ? 100 : prct;
        this.ctx.fillRect(this.x + 70, this.y + 80, prct, 10);
    },

    renderDrinkStats : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        let text = "soif";
        this.ctx.fillText(text ,this.x + 10, this.y + 70);
        this.ctx.beginPath();
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;    
        let d = new Date();
        let newTick = d.getTime();
        let prct = (newTick - survivshim.character.lastTimeDrink) / 600;
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        if (prct > 30 && prct <60){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_YELLOW;
        }else if (prct > 60 && prct <90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_ORANGE;
        }else if (prct > 90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_RED;
        }
        prct = prct > 100 ? 100 : prct;
        this.ctx.fillRect(this.x + 70, this.y + 60, prct, 10);
    },

    renderHungryStats : function(){
        this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
        let text = "faim";
        this.ctx.fillText(text ,this.x + 10, this.y + 50);
        this.ctx.beginPath();
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;    
        let d = new Date();
        let newTick = d.getTime();
        let prct = (newTick - survivshim.character.lastTimeEat) / 600;
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_GREEN;
        if (prct > 30 && prct <60){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_YELLOW;
        }else if (prct > 60 && prct <90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_ORANGE;
        }else if (prct > 90){
            this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_RED;
        }
        prct = prct > 100 ? 100 : prct;
        this.ctx.fillRect(this.x + 70, this.y + 40, prct, 10);
    },

    render : function(){
        if (this.active === true){
            this.ctx.fillStyle = survivshim.C.COLOR_CONTEXTUAL;
            this.ctx.fillRect(this.x,this.y,300,200);

            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Statistiques";
            this.ctx.fillText(text ,this.x + 10, this.y + 10);
            
            this.renderHungryStats();
            this.renderDrinkStats();
            this.renderSleepStats();
            this.renderHitPoints();
            this.renderTiredNess();

        }
    },

    onClick : function(x,y){
        if (this.active === true ){
            this.hideMenu();
            return survivshim.C.CLICK_ON_WINDOW;
        }
        return survivshim.C.CLICK_OUTSIDE_WINDOW;
    }

}