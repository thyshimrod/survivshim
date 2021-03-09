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

  MESSAGE_ALERT_INFO : "#deebf8",
  MESSAGE_ALERT_WARNING : "#FE9A2E",
  MESSAGE_ALERT_HIGH : "#FA5858",

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
  MATERIAU_MUSHROOM : 3,
  MATERIAU_BRANCHE : 4,
  MATERIAU_VIANDE : 5,
  MATERIAU_FOURRURE : 6,
  MATERIAU_EAU : 7,

  //ITEM
  ITEM_COUTEAU_SILEX : 1,
  ITEM_FEU_CAMP : 2,
  ITEM_HACHE_SILEX : 3,
  ITEM_LANCE_SILEX : 4,
  ITEM_PIOCHE_SILEX : 5,

  //ACTIONS
  ACTION_NONE : 0,
  ACTION_COLLECT : 1,
  ACTION_CRAFT : 2,

  // TYPE ACTION ON DECOR, ....
  TYPE_ACTION_COLLECT : 1,
  TYPE_ACTION_CONSUME : 2,

  CLICK_ON_WINDOW : true,
  CLICK_OUTSIDE_WINDOW : false,

  STATE_INVENTORY_MATERIAU : 1,
  STATE_INVENTORY_EQUIPEMENT : 2,
  STATE_INVENTORY_CONSOMMABLE : 3,

  STATE_LIST_BLUEPRINT_BLUEPRINTS : 1,
  STATE_LIST_BLUEPRINT_NEW : 2,

  TYPE_INVENTORY_MATERIAU : 1,
  TYPE_INVENTORY_EQUIPEMENT : 2,
  TYPE_INVENTORY_CONSOMMABLE : 3,

  MAX_TIME_BEFORE_FAINTING : 5000,

  HUNGER_STATE_NO : 1,
  HUNGER_STATE_LOW : 2,
  HUNGER_STATE_MIDDLE : 3,
  HUNGER_STATE_HIGH : 4,

  EDITOR_VITESSE_DEFILEMENT : 2,
  EDITOR_ACTION_NONE : 0,
  EDITOR_ACTION_ADD : 1,
  EDITOR_ACTION_DELETE : 2,

  HUNGER_FACTOR : 6000,

  ITEM_LOCATION_HEAD : 1,
  ITEM_LOCATION_RIGHTHAND : 2,
  ITEM_LOCATION_LEFTHAND : 3,
  ITEM_LOCATION_BODY : 4,
  ITEM_LOCAITON_LEGS : 5,
  ITEM_LOCATION_FOOT : 6,
  ITEM_LOCATION_FLOOR : 7,

  ITEM_STATUS_WEARED : 1,
  ITEM_STATUS_UNWEARED : 2,

  FLOATING_TEXT_TIMER_HIT : 1000,

  MOB_STATE_ALIVE : 0,
  MOB_STATE_DEAD : 1,

  MOB_ACTION_STATE_NONE : 0,
  MOB_ACTION_STATE_ATTACK : 1,
  MOB_ACTION_STATE_FLEE : 2,

  MOB_RAT : 1,
  MOB_BAT : 2,
  MOB_SCORPION : 3,

  TILE_GROUND_SOIL2 : 2,

});
