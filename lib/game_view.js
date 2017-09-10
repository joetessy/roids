const game = require('./game');

const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  start(){
    this.game.createShip();
    setInterval(function(){
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }.bind(this), 20);
  }
};

module.exports = gameView;
