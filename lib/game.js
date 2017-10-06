import { makeAsteroid } from './asteroid.js';
import { makeExplosion } from './explosion.js';
import { domHandler } from './dom_handler.js';
import { ship } from './ship.js';
import { Util } from './utils.js';

export const game = {
  asteroids: [],
  bullets: [],
  explosions: [],
  DIMX: window.innerWidth,
  DIMY: window.innerHeight,
  numAsteroids: 2,
  numLives: 3,
  domHandler,
  killCount: 0,

  setAudio(audio){
    this.audio = audio;
  },

  playAudio(sound) {
    if (this.audio.on) this.audio.playSound(sound);
  },

  randomAsteroid(){
    return [
      Math.floor(Math.random() * this.DIMX) +  1,
      Math.floor(Math.random() * this.DIMY) +  1
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
    this.ship = ship({game: this});
  },

  allObjects(){
    return [].concat(this.explosions, this.asteroids, this.ship, this.bullets);
  },

  addAsteroids(){
    this.asteroids = [];
    for (let i = 0; i < this.numAsteroids; i++){
      this.asteroids.push(makeAsteroid());
    }
    this.playAudio('tie');
  },

  addExplosion(pos){
    this.explosions.push(makeExplosion(pos));
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
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    } else if (obj.type === 'bullet'){
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj.type === 'ship'){
      this.ship = [];
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
