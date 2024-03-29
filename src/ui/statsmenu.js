'use strict';
var survivshim = survivshim || {};

survivshim.StatsMenu = function (){
  this.active = false;
  this.x = 0;
  this.y = 150;
  this.height = 200;
  this.width = 300;
  this.ctx = survivshim.canvas.canvasAnimation.getContext("2d");
};

survivshim.StatsMenu.prototype ={
    toggleMenu : function(){
        if(this.active) this.hideMenu()
        else this.showMenu();
    },
    
    showMenu : function(blueprint){
        this.active = true;
        this.x = Math.floor(window.innerWidth / 2) - Math.floor(this.width /2);
        this.y = Math.floor(window.innerHeight / 2) - Math.floor(this.height /2);
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
        this.ctx.fillStyle = survivshim.C.COLOR_GRADIANT_RED;
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
        let prct = (newTick - survivshim.character.lastTimeDrink) / survivshim.C.HUNGER_FACTOR;
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
        let prct = (newTick - survivshim.character.lastTimeDrink) / survivshim.C.HUNGER_FACTOR;
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
        let prct = (newTick - survivshim.character.lastTimeEat) / survivshim.C.HUNGER_FACTOR;
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
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = survivshim.C.COLOR_TURQUOISE;
            this.ctx.rect(this.x,this.y,this.width,this.height);
            this.ctx.stroke();
            this.ctx.fillStyle = survivshim.C.COLOR_TEXT;
            let text = "Statistiques";
            this.ctx.fillText(text ,this.x + 10, this.y + 10);

            text = "Niveau :  " + survivshim.character.level;
            this.ctx.fillText(text ,this.x + 10, this.y + 30);

            text = "X";
            this.ctx.fillText(text, this.x + this.width -10,this.y + 10 );
            
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