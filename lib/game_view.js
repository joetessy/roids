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
    key('up', () => this.game.ship.power([0, -2]));
    key('down', () => this.game.ship.power([0, 2]));
    key('left', () => this.game.ship.power([-2, 0]));
    key('right', () => this.game.ship.power([2, 0]));
    key('space', () => this.game.ship.fireBullet());
  }
};
