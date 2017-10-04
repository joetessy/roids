import { game } from './game';

export const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  start(){
    this.game.createShip();
    this.bindKeyHandlers();
    setInterval(function(){
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }.bind(this), 20);
  },
  bindKeyHandlers(){
    key('up', () => this.game.ship.power(3));
    key('down', () => this.game.ship.power(-3));
    key('left', () => this.game.ship.rotate('left'));
    key('right', () => this.game.ship.rotate('right'));
    key('space', () => this.game.ship.fireBullet());
  }
};
