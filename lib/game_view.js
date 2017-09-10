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
    key('w', () => this.game.ship.power([0, -4]));
    key('a', () => this.game.ship.power([-4, 0]));
    key('s', () => this.game.ship.power([0, 4]));
    key('d', () => this.game.ship.power([4, 0]));
    key('space', () => this.game.ship.fireBullet());
  }
};
