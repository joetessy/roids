// let makeAsteroid = require('./asteroid');
import { makeAsteroid } from './asteroid.js';
import { ship } from './ship.js';

export const game = {
  asteroids: [],
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
    return [].concat(this.asteroids, this.ship);
  },

  addAsteroids(){
    let mahRoids = [];
    for (let i = 0; i < this.NUM_ASTEROIDS; i++){
      mahRoids.push(makeAsteroid({game: this}));
    }
    this.asteroids = mahRoids;
  },

  draw(ctx){
    ctx.clearRect(0, 0, this.DIMX, this.DIMY);
    this.allObjects().forEach((obj) => {
      return obj.draw(ctx);
    });
  },

  moveObjects(ctx){
    let objects = this.allObjects();
    objects.forEach((obj) => obj.move());
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
    this.moveObjects(ctx);
    this.checkCollisions();
  },

  remove(asteroid){
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

};
