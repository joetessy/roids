import { game } from './game';
import { audio } from './audio.js';

export const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  audio,
  start(status){
    this.game.numAsteroids = 2;
    this.game.killCount = 0;
    this.game.createShip();
    this.game.domHandler.restartStats();
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

  setAudio(){
    this.game.setAudio(this.audio);
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
        this.game.setAudio(this.audio);
        this.start(status);
        this.game.domHandler.show('.killcount');
        status = 'started';
      } else {
        this.start(status);
      }
      this.game.domHandler.hide('.start');
      this.game.domHandler.hide('.gameover');
      this.game.domHandler.hide('.score');
    });
  }
};
