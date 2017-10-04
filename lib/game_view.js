import { game } from './game';

export const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  start(status){
    this.game.createShip();
    this.game.addAsteroids();
    if (status === 'started'){
      return;
    } else {
      setInterval(function(){
        gameView.game.step(gameView.ctx);
        gameView.game.draw(gameView.ctx);
      }, 20);
    }
  },
  bindKeyHandlers(){
    let status = null;
    key('up', () => this.game.ship.power(3));
    key('down', () => this.game.ship.power(-3));
    key('left', () => this.game.ship.rotate('left'));
    key('right', () => this.game.ship.rotate('right'));
    key('space', () => this.game.ship.fireBullet());
    key('enter', () => {
      if (status === null){
        this.start(status);
        document.querySelector('.start').remove();
        status = 'started'
      } else {
        this.start(status);
      }
    });
  }
};
