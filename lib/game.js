let asteroid = require('./asteroid');

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
