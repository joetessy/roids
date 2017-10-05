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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);




document.addEventListener('DOMContentLoaded', function(){
  movingObject.game = __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* game */];
});

const movingObject = {
  isWrappable: true,
  draw(ctx){
    this.drawSprite(ctx, this.image, this.size);
  },

  move(){
    this.pos = this.calculateMove();
    if (this.game.isOutOfBounds(this.pos)){
      if (!this.isWrappable){
        this.game.remove(this);
      }
    }
  },

  calculateMove(){
    var current = this.pos,
        angle = this.angle,
        distance = this.vel;
    return __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* Util */].findCoord(current, distance, angle);
  },

  rotateAndCache(img, angle){
    var offscreenCanvas = document.createElement('canvas');
    var offscreenCtx = offscreenCanvas.getContext('2d');
    var size = Math.max(img.width, img.height);

    offscreenCanvas.width = size;
    offscreenCanvas.height = size;

    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* Util */].toRadians(angle));
    offscreenCtx.drawImage(img, -(img.width/2), -(img.height/2));

    return offscreenCanvas;
  },

  drawSprite(ctx, img, size){
    let angle = this.angle;
    let rotated = this.rotateAndCache(img, angle);
    ctx.drawImage(
      rotated,
      this.pos[0] - (size / 2),
      this.pos[1] - (size / 2),
      size,
      size);
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  scale(vec, m){
    return [vec[0] * m, vec[1] * m];
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  rotate(x, y, rads){
    return [
      x * Math.cos(rads) - y * Math.sin(rads),
      y * Math.cos(rads) + x * Math.sin(rads)
    ];
  },

  getAngle(x, y){
    var angle = Math.atan2(x, y) + Math.PI;
    return angle;
  },

  findCoord(point, distance, angle){
    angle = angle * Math.PI / 180;
    let xdif = Math.round(100 * Math.sin(angle) * distance) / 100;
    let ydif = Math.round(100 * Math.cos(angle) * distance) / 100;
    return [
        point[0] + xdif,
        point[1] - ydif
    ];
  },

  toRadians (angle) {
    return angle * (Math.PI / 180);
  },

  toDegrees (angle) {
    return angle * (180 / Math.PI);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explosion_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_handler_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ship_js__ = __webpack_require__(8);





const game = {
  asteroids: [],
  bullets: [],
  explosions: [],
  DIMX: window.innerWidth,
  DIMY: window.innerHeight,
  numAsteroids: 2,
  numLives: 3,
  domHandler: __WEBPACK_IMPORTED_MODULE_2__dom_handler_js__["a" /* domHandler */],
  killCount: 0,

  setAudio(audio){
    this.audio = audio;
  },

  playAudio(sound) {
    if (this.audio.on) this.audio.playSound(sound);
  },

  randomAsteroid(){
    return [
      Math.floor(Math.random() * 10 ) + this.DIMX,
      Math.floor(Math.random() * 10 ) + this.DIMY
    ];
  },

  randomPosition(){
    return [
      Math.floor(Math.random() * this.DIMX) +  1,
      Math.floor(Math.random() * this.DIMY) +  1
    ];
  },

  checkStatus(){
    if (this.checkRoundWon()){
      this.nextRound();
    } else if (this.checkGameOver()){
      this.numLives = 3;
      this.gameOver();
    }
  },

  checkGameOver(){
    return this.numLives === 0;
  },

  checkRoundWon(){
    return this.asteroids.length === 0 && this.numLives > 0;
  },

  nextRound(){
    this.playAudio('r2');
    this.domHandler.updateScore(this.killCount);
    this.numAsteroids += 2;
    this.addAsteroids();
  },

  death(deadShip, pos){
    this.killCount += 1;
    this.domHandler.updateScore(this.killCount);
    this.numLives -= 1;
    this.addExplosion(pos);
    this.remove(deadShip);
    if (this.numLives > 0){
      setTimeout(function(){
        this.createShip();
      }.bind(this), 1000);
    }
    this.domHandler.removeLife();
  },

  gameOver(){
    this.domHandler.gameOver(this.killCount);
    this.ship = [];
    this.domHandler.hide('.killcount');
  },

  createShip(){
    this.ship = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ship_js__["a" /* ship */])({game: this});
  },

  allObjects(){
    return [].concat(this.explosions, this.asteroids, this.ship, this.bullets);
  },

  addAsteroids(){
    this.asteroids = [];
    for (let i = 0; i < this.numAsteroids; i++){
      this.asteroids.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__asteroid_js__["a" /* makeAsteroid */])());
    }
    this.playAudio('tie');
  },

  addExplosion(pos){
    this.explosions.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__explosion_js__["a" /* makeExplosion */])(pos));
  },

  draw(ctx){
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    this.allObjects().forEach((obj) => {
      return obj.draw(ctx);
    });
    this.checkStatus();
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
      pos[0] = this.DIMX;
    } else if (pos[0] >= this.DIMX){
      pos[0] = 0;
    }
    if (pos[1] <= 0){
      pos[1] = this.DIMY;
    } else if (pos[1] >= this.DIMY){
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
    } else if (obj.type === 'ship'){
      this.ship = [];
    }
  },

  isOutOfBounds(pos){
    if (pos[0] <= 0 ||
        pos[0] >= this.DIMX - 20 ||
        pos[1] <= 0 ||
        pos[1] >= this.DIMY - 20){
      return true;
    }
    return false;
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = game;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(10);



const gameView = {
  game: __WEBPACK_IMPORTED_MODULE_0__game__["a" /* game */],
  ctx: document.querySelector('canvas').getContext('2d'),
  audio: __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* audio */],
  start(status){
    this.game.numAsteroids = 2;
    this.game.killCount = 0;
    this.game.createShip();
    this.game.domHandler.restartStats();
    this.game.addAsteroids();
    if (status === 'started'){
      return;
    } else {
      setInterval(function(){
        gameView.game.step(gameView.ctx);
        gameView.game.draw(gameView.ctx);
      }, 15);
    }
  },

  setAudio(){
    this.game.setAudio(this.audio);
  },

  bindKeyHandlers(){
    let status = null;
    key('up', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.power(3)
      };
    });
    key('down', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.power(-3)
      }
    });
    key('left', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.rotate('left')
      }
    });
    key('right', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.rotate('right')
      }
    });
    key('space', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.fireBullet();
      }
    });

    key('enter', () => {
      if (status === null){
        this.game.setAudio(this.audio);
        this.start(status);
        this.game.domHandler.show('.killcount');
        status = 'started';
      } else {
        this.start(status);
      }
      this.game.domHandler.hide('.start');
      this.game.domHandler.hide('.gameover');
      this.game.domHandler.hide('.score');
    });
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = gameView;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeAsteroid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);



const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

function makeAsteroid(){
  let image = new Image();
  image.src = 'lib/img/tie.png';
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),
  {
    type: 'asteroid',
    image,
    size: 45,
    angle: Math.floor(Math.random() * 300),
    pos: __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */].game.randomAsteroid(),
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Math.floor(Math.random() * 2) + 3,
    collideWith(otherObject){
      if (otherObject.type === 'ship'){
        this.game.playAudio('explosion');
        this.game.playAudio('death');
        this.game.death(otherObject, otherObject.pos);
        this.game.addExplosion(this.pos);
        this.game.remove(this);
      }
    },

    draw(ctx){
      this.drawSprite(ctx, this.image, this.size);
    }
  });
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(3);


document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.audio').addEventListener('click', function(){
    __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].audio.toggleAudio();
  });
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].bindKeyHandlers();
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].ctx.canvas.width  = window.innerWidth - 20;
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].ctx.canvas.height = window.innerHeight - 20;

});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bulletFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


const DEFAULTS = {
  COLOR: '#fc0000',
  RADIUS: 7,
};

let image = new Image();
image.src = 'lib/img/laser.png';

function bulletFactory({pos, vel, angle}){
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),{
    type: 'bullet',
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    image,
    size: 50,
    vel,
    pos,
    angle,
    isWrappable: false,

    collideWith(otherObject){
      if (otherObject.color === '#505050'){
        this.game.playAudio('explosion');
        this.game.bullets = [];
        pos = otherObject.pos;
        this.game.addExplosion(pos);
        this.game.remove(otherObject);
        this.game.killCount += 1;
        this.game.domHandler.updateScore(this.game.killCount);
      }
    }
  });

}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeExplosion;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


function makeExplosion(pos){
  let image = new Image();
  image.src = 'lib/img/explosion.png';
  image.width = 900;
  image.height = 900;
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),
  {
    type: 'explosion',
    image,
    size: [100, 100],
    sliceX: 0,
    sliceY: 0,
    pos,
    once: true,
    speed: 50,
    draw(ctx){
      if (this.sliceX > 800){
        this.sliceY += 100;
        this.sliceX = 0;
      }
      ctx.drawImage(
        this.image,
        this.sliceX,
        this.sliceY,
        this.size[0], this.size[1],
        this.pos[0] - (this.size[0] / 2),
        this.pos[1] - (this.size[1] / 2),
        this.size[0] * .9 , this.size[1] * .9);
      this.sliceX += 100;
    },
    collideWith(){},
    move(){}
  });


}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ship;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);




function ship({game}){
  let image = new Image();
  image.src = 'lib/img/xwing.png';
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]), {
    game,
    type: 'ship',
    image,
    size: 60,
    pos: [game.DIMX / 2, game.DIMY/2],
    color: 'green',
    radius: 20,
    vel: 0,
    direction: [0,0],
    angle: 0,

    relocate(){
      this.pos = this.game.randomPosition();
    },

    power(power){
      if (this.vel <= 9){
        this.vel += power;
        if (this.vel !== 0){
          if (this.vel < 0){
            this.game.playAudio('reverse');
          } else {
            this.game.playAudio('power');
          }
        }
      }
    },

    rotate(direction){
      let interval;
      let currAngle = this.angle;
      if (direction === 'left') {
        interval = setInterval(() => {
          this.angle -= 1;
        }, .25);
      } else {
        interval = setInterval(() => {
          this.angle += 1;
        }, .25);
      }
      setTimeout(() => clearInterval(interval), 75);
    },

    fireBullet(){
      this.game.playAudio('blaster');
      let pos1 = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* Util */].findCoord(this.pos, 25, this.angle + 90),
          pos2 = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* Util */].findCoord(this.pos, 25, this.angle - 90);

      let vel = 50, angle = this.angle;
      const bullet = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* bulletFactory */])({
        pos: pos1,
        vel,
        angle});

      const bullet2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* bulletFactory */])({
        pos: pos2,
        vel,
        angle});

      this.game.bullets.push(bullet, bullet2);
    },

    collideWith(){

    }
  });
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const domHandler = {
  displayLives(numLives){
    document.querySelector('.lives').innerHTML = '';
    for (let i = 0; i < numLives; i++){
      let life = new Image();
      life.src = 'lib/img/life.png';
      life.height = 40;
      life.width = 40;
      document.querySelector('.lives').append(life);
    }
  },
  removeLife(){
    var lives = document.querySelector('.lives');
    lives.removeChild(lives.getElementsByTagName('img')[0]);
  },

  gameOver(count){
    document.querySelector('.score').innerHTML = 'SCORE: ' + count;
    this.show('.gameover');
    this.show('.score');
  },

  hide(className){
    document.querySelector(className).classList.add('hide');
  },

  show(className){
    document.querySelector(className).classList.remove('hide');
  },

  updateScore(killCount){
    document.querySelector('.killcount').innerHTML = killCount +
    "  <img src='lib/img/tie-icon.png' style='height: 30px'/>";
  },
  toggleAudio(){
    if (Array.from(document.querySelector('.audio').classList).includes('on')){
      document.querySelector('.audio').className = 'audio off';
      document.querySelector('.audio').src = 'lib/img/soundoff.svg';
    } else {
      document.querySelector('.audio').className = 'audio on';
      document.querySelector('.audio').src = 'lib/img/soundon.svg';
    }
  },

  restartStats(){
    this.updateScore(0);
    this.show('.killcount');
    this.displayLives(3);
  }


};
/* harmony export (immutable) */ __webpack_exports__["a"] = domHandler;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(2);



const audio = {
  game: __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* game */],
  death: 'lib/audio/explosion.wav',
  death2: 'lib/audio/death2.wav',
  explosion: 'lib/audio/explosion2.wav',
  blaster: 'lib/audio/xwing2.wav',
  power: 'lib/audio/power.wav',
  reverse: 'lib/audio/reverse.wav',
  ties: [
    'lib/audio/tie1.wav',
    'lib/audio/tie2.wav',
    'lib/audio/tie3.wav',
    'lib/audio/tie4.wav',
    'lib/audio/tie5.wav',
    'lib/audio/tie6.wav',
    'lib/audio/tie7.wav',
  ],
  r2: [
    'lib/audio/r21.wav',
    'lib/audio/r22.wav',
    'lib/audio/r23.wav',
    'lib/audio/r25.wav',
    'lib/audio/r26.wav',
    'lib/audio/r27.wav',
  ],
  on: true,

  loadSound(sound, volume){
    sound = new Audio(sound);
    sound.volume = volume;
    sound.play();
    sound.addEventListener('ended', function(s) {
      sound.currentTime = 0;
    });
  },
  loadArr(arr, volume){
    let sound = arr[Math.floor(Math.random() * arr.length)];
    sound = new Audio(sound);
    sound.volume = volume;
    sound.play();
  },

  toggleAudio(){
    this.on = this.on === true ? false : true;
    this.game.domHandler.toggleAudio();
  },

  playSound(sound){
    switch(sound) {
      case 'death':
        this.loadSound(this.death2, 0.6);
        break;
      case 'blaster':
        this.loadSound(this.blaster, 0.8);
        break;
      case 'explosion':
        this.loadSound(this.explosion, 1);
        break;
      case 'power':
        this.loadSound(this.power, .6);
        break;
      case 'reverse':
        this.loadSound(this.reverse, .6);
        break;
      case 'tie':
        this.loadArr(this.ties, .5);
        break;
      case 'r2':
        this.loadArr(this.r2, .4);
        break;
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = audio;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map