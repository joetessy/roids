/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', function(){
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].game.addAsteroids();
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].start();
  window.ship = __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].game.ship;
  window.game = __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].game;
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


const gameView = {
  game: __WEBPACK_IMPORTED_MODULE_0__game__["a" /* game */],
  ctx: document.querySelector('canvas').getContext('2d'),
  start(){
    this.game.createShip();
    this.bindKeyHandlers();
    setInterval(function(){
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }.bind(this), 20);
  },
  bindKeyHandlers(){
    key('w', () => this.game.ship.power([0, -4]));
    key('a', () => this.game.ship.power([-4, 0]));
    key('s', () => this.game.ship.power([0, 4]));
    key('d', () => this.game.ship.power([4, 0]));
    key('v', () => this.game.ship.fireBullet());
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = gameView;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeAsteroid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(5);



const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

function makeAsteroid(game){
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),
  {
    type: 'asteroid',
    game: game,
    pos: game.randomPosition(),
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* Util */].randomVec(DEFAULTS.SPEED),
    collideWith(otherObject){
      if (otherObject.color === 'green'){
        otherObject.relocate();
      }
    }
  });
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ship_js__ = __webpack_require__(6);
// let makeAsteroid = require('./asteroid');



const game = {
  asteroids: [],
  bullets: [],
  DIMX: 1000,
  DIMY: 600,
  NUM_ASTEROIDS: 10,

  randomPosition(){
    return [
      Math.floor(Math.random() * this.DIMX) +  1,
      Math.floor(Math.random() * this.DIMY) +  1
    ];
  },

  createShip(){
    this.ship = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ship_js__["a" /* ship */])({game: this});
  },

  allObjects(){
    return [].concat(this.asteroids, this.ship, this.bullets);
  },

  addAsteroids(){
    let mahRoids = [];
    for (let i = 0; i < this.NUM_ASTEROIDS; i++){
      mahRoids.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__asteroid_js__["a" /* makeAsteroid */])(this));
    }
    this.asteroids = mahRoids;
  },

  draw(ctx){
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    this.allObjects().forEach((obj) => {
      return obj.draw(ctx);
    });
  },

  moveObjects(){
    let objects = this.allObjects();
    objects.forEach((obj) => {
      if (obj.isWrappable){
        this.wrap(obj.pos);
      }
      obj.move();
    });
  },

  wrap(pos){
    if (pos[0] <= 0){
      pos[0] = 1000;
    } else if (pos[0] >= 1000){
      pos[0] = 0;
    }
    if (pos[1] <= 0){
      pos[1] = 600;
    } else if (pos[1] >= 600){
      pos[1] = 0;
    }
    return pos;
  },

  checkCollisions(){
    let objects = this.allObjects();
    for (let i = 0; i < objects.length; i++){
      for (let j = 0; j < objects.length; j++){
        if (i === j) continue;
        if (objects[i].isCollidedWith(objects[j])){
          objects[i].collideWith(objects[j]);
        }
      }
    }
  },

  step(ctx){
    this.moveObjects();
    this.checkCollisions();
  },

  remove(obj){
    if (obj.type === 'asteroid'){
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    } else if (obj.type === 'bullet'){
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    }
  },

  isOutOfBounds(pos){
    if (pos[0] <= 0 || pos[0] >= 1000 || pos[1] <= 0 || pos[1] >= 600){
      return true;
    }
    return false;
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = game;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


const movingObject = {
  isWrappable: true,
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  },

  move(){
    this.pos = [this.pos[0] + this.vel[0],   this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(this.pos)){
      if (!this.isWrappable){
        this.game.remove(this);
      }
    }
  },

  isCollidedWith(otherObject){
    let distance = Math.pow((
      Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2)
    ), 0.5);
    return distance <= this.radius + otherObject.radius;
  },
};
/* harmony export (immutable) */ __webpack_exports__["a"] = movingObject;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  scale(vec, m){
    return [vec[0] * m, vec[1] * m];
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ship;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(8);



function ship({game}){
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]), {
    game,
    type: 'ship',
    pos: [500,300],
    color: 'green',
    radius: 10,
    vel: [0,0],

    relocate(){
      this.pos = this.game.randomPosition();
    },

    power(impulse){
      this.vel = impulse;
    },

    fireBullet(){
      if (this.vel[0] === 0 && this.vel[1] === 0) return;
      let bulletVel = this.vel.map((el) => el * 5);
      const bullet = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* bulletFactory */])(this.pos, bulletVel, this.game);
      this.game.bullets.push(bullet);
    },

    collideWith(){

    }
  });
}


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bulletFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(4);


const DEFAULTS = {
  COLOR: "black",
  RADIUS: 2,
};

function bulletFactory(pos, vel, game){
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),{
    game,
    type: 'bullet',
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel,
    pos,
    isWrappable: false,
    collideWith(otherObject){
      if (otherObject.color === '#505050'){
        this.game.remove(otherObject);
      }
    }
  });

}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map