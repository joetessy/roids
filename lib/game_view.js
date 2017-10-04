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
      }, 15);
    }
  },

  bindKeyHandlers(){
    let status = null;
    key('up', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.power(3)
      };
    });
    key('down', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.power(-3)
      }
    });
    key('left', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.rotate('left')
      }
    });
    key('right', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.rotate('right')
      }
    });
    key('space', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.fireBullet();
      }
    });

    key('enter', () => {
      if (status === null){
        this.start(status);
        document.querySelector('.start').remove();
        status = 'started';
      } else {
        this.start(status);
      }
    });
  }
};
