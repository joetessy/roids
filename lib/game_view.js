const game = require('./game');

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
