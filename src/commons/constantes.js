'use strict';
//debugger;
var survivshim = survivshim || {};

survivshim.C = Object.freeze({
  STATE_MENU_TO_SHOW : 0,
  TILE_SIZE_PC : 32,
  ANIMATION_SPEED : 50,

  CHARACTER_STEP : 3,

  DIRECTION_UP :0,
  DIRECTION_DOWN :3,
  DIRECTION_LEFT :1,
  DIRECTION_RIGHT :2,

  COLOR_CONTEXTUAL : "#2F4f4f",
  COLOR_TEXT : "#deebf8",
  COLOR_TEXT_CHOOSEN : "#5EB6DD",
  COLOR_TURQUOISE : "#bdffff",
  COLOR_CONTEXTUAL_BUTTON : "#587878",
  COLOR_GRADIANT_GREEN : "#89de20",
  COLOR_GRADIANT_YELLOW : "#f1eb20",
  COLOR_GRADIANT_ORANGE : "#f19C20",
  COLOR_GRADIANT_RED : "#f81a2d",

  TYPE_COLLECT_MATERIAU : 1,
  //MATERIAU
  MATERIAU_SILEX : 1,
  MATERIAU_SALADE : 2,

  //ACTIONS
  ACTION_NONE : 0,
  ACTION_COLLECT : 1,
  ACTION_CRAFT : 2,

  CLICK_ON_WINDOW : true,
  CLICK_OUTSIDE_WINDOW : false,

  STATE_INVENTORY_MATERIAU : 1,
  STATE_INVENTORY_EQUIPEMENT : 2,
  STATE_INVENTORY_CONSOMMABLE : 3,

  TYPE_INVENTORY_MATERIAU : 1,
  TYPE_INVENTORY_EQUIPEMENT : 2,
  TYPE_INVENTORY_CONSOMMABLE : 3,

  MAX_TIME_BEFORE_FAINTING : 5000,

  HUNGER_STATE_NO : 1,
  HUNGER_STATE_LOW : 2,
  HUNGER_STATE_MIDDLE : 3,
  HUNGER_STATE_HIGH : 4,


});
