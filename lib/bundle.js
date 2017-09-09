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
/***/ (function(module, exports, __webpack_require__) {

const gameView = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', function(){
  gameView.game.addAsteroids();
  gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const game = __webpack_require__(3);

const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  start(){
    setInterval(function(){
      this.game.moveObjects(this.ctx);
      this.game.draw(this.ctx);
    }.bind(this), 20);
  }
};

module.exports = gameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const movingObject = __webpack_require__(4);
const Util = __webpack_require__(5);

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

function asteroid(options){
  let newAsteroid = movingObject({
      game: options.game,
      pos: options.game.randomPosition(),
      color: DEFAULTS.COLOR,
      radius: DEFAULTS.RADIUS,
      vel: Util.randomVec(DEFAULTS.SPEED)
    });
  return newAsteroid;
}


module.exports = asteroid;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let asteroid = __webpack_require__(2);

const game = {
  asteroids: [],

  randomPosition(){
    return [
      Math.floor(Math.random() * this.DIMX) +  1,
      Math.floor(Math.random() * this.DIMY) +  1
    ];
  },

  addAsteroids(){
    let mahRoids = [];
    for (let i = 0; i < this.NUM_ASTEROIDS; i++){
      mahRoids.push(asteroid({game: this}));
    }
    this.asteroids = mahRoids;
  },

  draw(ctx){
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    this.asteroids.forEach((roid) => {
      return roid.draw(ctx);
    });
  },

  moveObjects(ctx){
    this.asteroids.forEach((roid) => roid.move());
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
  }
};

game.DIMX = 1000;
game.DIMY = 600;
game.NUM_ASTEROIDS = 10;

module.exports = game;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function movingObject({pos, vel, radius, color, game}){
  return {
    pos,
    vel,
    radius,
    color,
    game,
    draw: function(ctx){
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    move: function(){
      pos[0] += vel[0];
      pos[1] += vel[1];
      this.game.wrap(pos);
    }
  };
}

module.exports = movingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  scale(vec, m){
    return [vec[0] * m, vec[1] * m];
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  }
};

module.exports = Util;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map