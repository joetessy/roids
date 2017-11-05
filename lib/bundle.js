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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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

const NORMAL_FRAME_TIME_DELTA = 1000 / 40;

const movingObject = {
  isWrappable: true,
  draw(ctx){
    this.drawSprite(ctx, this.image, this.size);
  },

  move(timeDelta = 1){
    this.pos = this.calculateMove(timeDelta);
    if (this.game.isOutOfBounds(this.pos)){
      if (!this.isWrappable){
        this.game.remove(this);
      }
    }
  },

  setAngle(current, result){
    this.angle = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* Util */].getAngle(current, result);
  },

  pathToShip(current, distance){
    let destPos = this.game.ship.pos;
    let deltaX = destPos[0] - current[0];
    let deltaY = destPos[1] - current[1];
    let subdis = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    deltaX /= subdis;
    deltaY /= subdis;
    let result = [];
    result[0] = current[0] + (deltaX * distance);
    result[1] = current[1] + (deltaY * distance);
    this.setAngle(current, result);
    return result;
  },

  calculateMove(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    var current = this.pos,
        angle = this.angle,
        distance = this.vel * velocityScale;
    if (this.game.ship.length !== 0 && this.type === 'asteroid'){
      return this.pathToShip(current, distance);
    }
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
    return distance <= this.radius + otherObject.radius + 20;
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
    let dx = x[0] - y[0],
        dy = x[1] - y[1];
    let rad = Math.atan2(dy,dx);
    return this.toDegrees(rad) + 90;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explosion_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_handler_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ship_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_js__ = __webpack_require__(1);






const game = {
  asteroids: [],
  bullets: [],
  explosions: [],
  DIMX: window.innerWidth,
  DIMY: window.innerHeight,
  numAsteroids: 1,
  remainingAsteroids: 1,
  numLives: 5,
  domHandler: __WEBPACK_IMPORTED_MODULE_2__dom_handler_js__["a" /* domHandler */],
  killCount: 0,
  lastRemoved: null,

  setAudio(audio){
    this.audio = audio;
  },

  playAudio(sound) {
    if (this.audio.on) this.audio.playSound(sound);
  },

  randomAsteroid(){
    let x,y;
    let side = Math.floor(Math.random() * 4) + 1;
    switch (side){
      case 1:
        x = 40;
        y = Math.random() * this.DIMY;
        return [x,y];
      case 2:
        x = Math.random() * this.DIMX;
        y = this.DIMY - 40;
        return [x,y];
      case 3:
        x = this.DIMX - 40;
        y = Math.random() * this.DIMY;
        return [x,y];
      case 4:
        x = Math.random() * this.DIMX;
        y =  40;
        return [x,y];
    }
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
      this.numLives = 5;
      this.gameOver();
    }
  },

  checkGameOver(){
    return this.numLives === 0;
  },

  checkRoundWon(){
    return this.remainingAsteroids === 0 && this.numLives > 0;
  },

  nextRound(){
    setTimeout(function(){
      this.explosions = [];
    }.bind(this), 1500);
    this.playAudio('r2');
    this.domHandler.updateScore(this.killCount);
    this.numAsteroids += 1;
    this.remainingAsteroids = this.numAsteroids;
    this.distributeAsteroids();
  },

  death(deadShip, pos){
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
    this.asteroids.forEach((roid) => roid.clear());
    this.asteroids = [];
    this.bullets = [];
    this.domHandler.gameOver(this.killCount);
    this.ship = [];
    this.remainingAsteroids = 1;
    this.numAsteroids = 1;
    this.domHandler.hide('.killcount');
  },

  createShip(){
    this.ship = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ship_js__["a" /* ship */])({game: this});
  },

  allObjects(){
    return [].concat(this.explosions,
      this.asteroids, this.ship, this.bullets);
  },

  asteroidFire(asteroid) {
    asteroid.interval = setInterval(() => {
      if (asteroid) {
        asteroid.fireBullet();
      }
    }, (Math.random() * 3000 + 700));
  },

  distributeAsteroids(){
    this.asteroids.forEach((roid) => {
      roid.clear();
    });

    const delayAsteroid = (i) =>{
      setTimeout(() => {
        this.addAsteroid(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__asteroid_js__["a" /* makeAsteroid */])());
      }, i * 1000 + 500);
    };

    this.asteroids = [];
    setTimeout(() => { for (let i = 0; i < this.numAsteroids; i++){
      delayAsteroid(i);
      }
    }, 1000);
  },

  addAsteroid(asteroid){
      if (this.asteroids.length < this.numAsteroids){
        this.playAudio('tie');
        this.asteroids.push(asteroid);
        this.asteroidFire(asteroid);
      }
  },

  addExplosion(pos, size){
    this.explosions.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__explosion_js__["a" /* makeExplosion */])(pos, size));
  },

  draw(ctx){
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    this.allObjects().forEach((obj) => {
      return obj.draw(ctx);
    });
    this.checkStatus();
  },

  moveObjects(delta){
    let objects = this.allObjects();
    objects.forEach((obj) => {
      if (obj.isWrappable){
        this.wrap(obj.pos);
      }
      obj.move(delta);
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

  step(timeDelta){
    this.moveObjects(timeDelta);
    this.checkCollisions();
  },

  remove(obj){
    if (obj.type === 'asteroid'){
      if (this.lastRemoved === obj.pos) return;
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
      this.remainingAsteroids -= 1;
      this.killCount += 1;
      this.lastRemoved = obj.pos;
    } else if (obj.type === 'xwing_bullet'){
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj.type === 'tie_bullet'){
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj.type === 'ship'){
      this.ship = [];
    } else if (obj.type === 'explosion'){
      this.explosions.splice(this.explosions.indexOf(obj), 1);
    }
  },

  isOutOfBounds(pos){
    if (pos[0] <= 0 ||
        pos[0] >= this.DIMX ||
        pos[1] <= 0 ||
        pos[1] >= this.DIMY ){
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
/* harmony export (immutable) */ __webpack_exports__["a"] = bulletFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


const DEFAULTS = {
  COLOR: '#fc0000',
  RADIUS: 7,
};



function bulletFactory({pos, vel, angle, image, type, size}){
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),{
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    image,
    type,
    size,
    vel,
    pos,
    angle,
    isWrappable: false,

    collideWith(otherObject){
      if (otherObject.type === 'asteroid' && this.type === 'xwing_bullet'){
        this.game.remove(this);
        this.game.playAudio('explosion');
        this.game.addExplosion(otherObject.pos);
        otherObject.clear();
        this.game.remove(otherObject);
        this.game.domHandler.updateScore(this.game.killCount);
      }
      if (otherObject.type === 'ship' && this.type === 'tie_bullet'){
        this.game.playAudio('hit');
        this.game.remove(this);
        otherObject.health -= 5;
        if (otherObject.health === 0){
          this.game.playAudio('explosion');
          this.game.playAudio('death');
          this.game.death(otherObject, otherObject.pos);
          this.game.addExplosion(otherObject.pos);
        }
      }
    }
  });

}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_js__ = __webpack_require__(7);



const gameView = {
  game: __WEBPACK_IMPORTED_MODULE_0__game__["a" /* game */],
  ctx: document.querySelector('canvas').getContext('2d'),
  audio: __WEBPACK_IMPORTED_MODULE_1__audio_js__["a" /* audio */],
  lastTime: 0,
  keys: {
    37: {down:false, action:(thisGame) => thisGame.ship.rotate('left')},
    38: {down:false, action:(thisGame) => thisGame.ship.power(.5)},
    39: {down:false, action:(thisGame) => thisGame.ship.rotate('right')},
    40: {down:false, action:(thisGame) => thisGame.ship.power(-.5)},
  },
  animate(time){
    for (var key in this.keys) {
      if (this.keys[key].down) {
        if (this.game.ship.length !== 0){
          this.keys[key].action(this.game);
        }
      }
    }
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  },
  start(status){
    this.game.gameOver();
    this.game.killCount = 0;
    this.game.createShip();
    this.game.domHandler.restartStats();
    this.lastTime = 0;
    this.game.distributeAsteroids();
    if (status === 'started'){
      return;
    }

    document.addEventListener('keydown', e => {
      if (this.keys[e.keyCode]) {
        this.keys[e.keyCode].down = true ;
      }
    });

    document.addEventListener('keyup', e => {
      if (this.keys[e.keyCode]) {
        this.keys[e.keyCode].down = false;
      }
    });

    document.addEventListener('keypress', e => {
      if (e.keyCode === 32) {
        if (this.game.ship.length !== 0){
          this.game.ship.fireBullet();
        }
      }
    });
// start the animation
    requestAnimationFrame(this.animate.bind(this));
  },

  setAudio(){
    this.game.setAudio(this.audio);
  },

  bindKeyHandlers(){
    let status = null;

    document.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
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
      }
    });
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = gameView;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeAsteroid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);




const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

function makeAsteroid(){
  let bulletImage = new Image();
  bulletImage.src = 'lib/img/tielaser2.png';

  let image = new Image();
  image.src = 'lib/img/tie.png';
  let pos = __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */].game.randomAsteroid();
  let angle = 0;
  if (__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */].game.ship.length !== 0){
    angle = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* Util */].getAngle(pos, __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */].game.ship.pos);
  }

  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]),
  {
    type: 'asteroid',
    image,
    size: 40,
    angle,
    pos,
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Math.floor(Math.random() * 3) + 1.5,
    collideWith(otherObject){
      if (otherObject.type === 'ship'){
        this.clear();
        this.game.playAudio('explosion');
        this.game.playAudio('death');
        this.game.death(otherObject, otherObject.pos);
        this.game.addExplosion(this.pos, [100, 100]);
        this.clear();
        this.game.remove(this);
      }
    },
    fireBullet(){
      this.game.playAudio('tieBlaster');
      let bulletPos = this.pos,
          bulletVel = 20, bulletAngle = 180 + this.angle;
      const bullet = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* bulletFactory */])({
        pos: bulletPos,
        vel: bulletVel,
        angle: bulletAngle,
        image: bulletImage,
        type: 'tie_bullet', size: 43
      });
      this.game.bullets.push(bullet);
    },
    clear(){
      clearInterval(this.interval);
    }
  });
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(4);


document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.audio').addEventListener('click', function(){
    __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].audio.toggleAudio();
  });
  window.game = __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].game;

  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].bindKeyHandlers();
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].ctx.canvas.width  = window.innerWidth - 20;
  __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* gameView */].ctx.canvas.height = window.innerHeight - 20;
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(2);



const audio = {
  game: __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* game */],
  death: new Audio('lib/audio/explosion.wav'),
  death2: new Audio('lib/audio/death2.wav'),
  explosion: new Audio('lib/audio/explosion2.wav'),
  blaster: new Audio('lib/audio/xwing2.wav'),
  power: new Audio('lib/audio/power.wav'),
  reverse: new Audio('lib/audio/reverse.wav'),
  tieBlaster: new Audio('lib/audio/tielaser.wav'),
  ties: [
    new Audio('lib/audio/tie1.wav'),
    new Audio('lib/audio/tie2.wav'),
    new Audio('lib/audio/tie3.wav'),
    new Audio('lib/audio/tie4.wav'),
    new Audio('lib/audio/tie5.wav'),
    new Audio('lib/audio/tie6.wav'),
    new Audio('lib/audio/tie7.wav'),
  ],
  r2: [
    new Audio('lib/audio/r21.wav'),
    new Audio('lib/audio/r22.wav'),
    new Audio('lib/audio/r23.wav'),
    new Audio('lib/audio/r25.wav'),
    new Audio('lib/audio/r26.wav'),
    new Audio('lib/audio/r27.wav'),
  ],
  hit: [
    new Audio('lib/audio/hit1.wav'),
    new Audio('lib/audio/hit2.wav'),
  ],
  on: true,

  loadSound(sound, volume){
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
    sound.addEventListener('ended', function(s) {
      sound.currentTime = 0;
    });
  },
  loadArr(arr, volume){
    let sound = arr[Math.floor(Math.random() * arr.length)];
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
        this.loadSound(this.blaster, 0.7);
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
      case 'tieBlaster':
        this.loadSound(this.tieBlaster, .5);
        break;
      case 'hit':
        this.loadArr(this.hit, .6);
        break;
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = audio;



/***/ }),
/* 8 */
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
    this.displayLives(5);
  }


};
/* harmony export (immutable) */ __webpack_exports__["a"] = domHandler;



/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ship;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__healthbar_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__healthbar_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__healthbar_js__);





function ship({game}){
  let bulletImage = new Image();
  bulletImage.src = 'lib/img/laser.png';

  let image = new Image();
  image.src = 'lib/img/xwing.gif';
  return Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* movingObject */]), {
    game,
    type: 'ship',
    image,
    size: 67,
    pos: [game.DIMX / 2, game.DIMY/2],
    color: 'green',
    radius: 20,
    vel: 0,
    health: 100,
    direction: [0,0],
    angle: 0,

    relocate(){
      this.pos = this.game.randomPosition();
    },

    power(power){
      if (this.vel + power <= 16 && this.vel + power >= -16){
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
        this.angle -= 4;
      } else {
        this.angle += 4;
      }
    },

    fireBullet(){
      this.game.playAudio('blaster');
      let pos1 = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* Util */].findCoord(this.pos, 25, this.angle + 90),
          pos2 = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* Util */].findCoord(this.pos, 25, this.angle - 90);

      let vel = 70, angle = this.angle;
      const bullet = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* bulletFactory */])({
        pos: pos1,
        vel,
        type: 'xwing_bullet',
        angle, image: bulletImage,
        size: 50});

      const bullet2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* bulletFactory */])({
        pos: pos2,
        vel,
        angle,
        type: 'xwing_bullet',
        image: bulletImage, size: 50});
        this.game.bullets.push(bullet, bullet2);
    },
    loadHealthBar(){
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__healthbar_js__["makeHealthBar"])({pos: this.pos, health: this.health, ship: this});
    },

    collideWith(){

    }, draw(ctx){
      this.drawRectangles(ctx);
      this.drawSprite(ctx, this.image, this.size);
    },

    drawRectangles(ctx){
      let topLimit = this.pos[1] - 50;
      let healthLeft = this.health / 100,
          healthGone = (100 - this.health) / 100;

      let start = this.pos[0] - 35,
          end = this.pos[0] - 47 + 90,
          range = 68;

      let greenParams = [start, topLimit, range * healthLeft, 5];
      let redParams = [start + range * healthLeft, topLimit, range * healthGone, 5];

      ctx.fillStyle = "green" ;
      ctx.fillRect(...greenParams);

      ctx.fillStyle = "red" ;
      ctx.fillRect(...redParams);

    }
  });
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map