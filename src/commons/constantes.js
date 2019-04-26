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
  COLOR_TURQUOISE : "#bdffff",
  COLOR_CONTEXTUAL_BUTTON : "#587878",

  //MATERIAU
  MATERIAU_SILEX : 1,

  //ACTIONS
  ACTION_NONE : 0,
  ACTION_COLLECT : 1,
  ACTION_CRAFT : 2,

  CLICK_ON_WINDOW : true,
  CLICK_OUTSIDE_WINDOW : false,
});
