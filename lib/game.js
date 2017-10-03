// let makeAsteroid = require('./asteroid');
import { makeAsteroid } from './asteroid.js';
import { ship } from './ship.js';

export const game = {
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
    this.ship = ship({game: this});
  },

  allObjects(){
    return [].concat(this.asteroids, this.ship, this.bullets);
  },

  addAsteroids(){
    for (let i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(makeAsteroid());
    }
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
