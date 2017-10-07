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
  numAsteroids: 1,
  remainingAsteroids: 1,
  numLives: 5,
  domHandler,
  killCount: 0,

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
    this.playAudio('r2');
    this.domHandler.updateScore(this.killCount);
    this.numAsteroids += 1;
    this.remainingAsteroids = this.numAsteroids;
    this.distributeAsteroids();
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
    this.ship = ship({game: this});
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
    }, (Math.random() * 3000 + 1000));
  },

  distributeAsteroids(){
    this.asteroids.forEach((roid) => {
      roid.clear();
    });

    const delayAsteroid = (i) =>{
      setTimeout(() => {
        this.addAsteroid(makeAsteroid());
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
    this.explosions.push(makeExplosion(pos, size));
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
      obj.clear();
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
      this.remainingAsteroids -= 1;
    } else if (obj.type === 'xwing_bullet'){
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj.type === 'tie_bullet'){
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if (obj.type === 'ship'){
      this.ship = [];
    }
  },

  isOutOfBounds(pos){
    if (pos[0] <= 0 ||
        pos[0] >= this.DIMX ||
        pos[1] <= 0 ||
        pos[1] >= this.DIMY || ){
      return true;
    }
    return false;
  }

};
