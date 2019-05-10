'use strict';
var survivshim = survivshim || {};

survivshim.Canvas = function (){
  this.canvasTile = undefined;
  this.canvasCreature = undefined;
  this.canvasAnimation = undefined;
  this.canvasMouse = undefined;
  this.canvasNight = undefined;
};

survivshim.Canvas.prototype ={
  init : function(){
    this.canvasTile = document.getElementById("layerTile");
    this.canvasCreature = document.getElementById("layerCreature");
    this.canvasAnimation = document.getElementById("layerAnimation");
    this.canvasNight = document.getElementById("layerNight");
    this.canvasMouse = document.getElementById("layerMouse");
  },

  setCanvasSize : function(width, height){
    this.canvasTile.width = width;
    this.canvasTile.height = height;
    this.canvasCreature.width = width;
    this.canvasCreature.height = height;
    this.canvasAnimation.width = width;
    this.canvasAnimation.height = height;
    this.canvasMouse.width = width;
    this.canvasMouse.height = height;
    this.canvasNight.width = width;
    this.canvasNight.height = height;
  },

  clearOneCanvas : function(canvas){
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  },

  clearCanvas : function(){
    this.clearOneCanvas(this.canvasTile);
    this.clearOneCanvas(this.canvasCreature);
    this.clearOneCanvas(this.canvasAnimation);
    this.clearOneCanvas(this.canvasNight);
  },
};
