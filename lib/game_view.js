import { game } from './game';
import { audio } from './audio.js';

export const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  audio,
  lastTime: 0,
  animate(time){
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  },
  start(status){
    this.game.gameOver();
    this.game.killCount = 0;
    this.game.createShip();
    this.game.domHandler.restartStats();
    this.lastTime = 0;
    this.game.distributeAsteroids();
    if (status === 'started'){
      return;
    }
// start the animation
    requestAnimationFrame(this.animate.bind(this));
  },

  setAudio(){
    this.game.setAudio(this.audio);
  },

  bindKeyHandlers(){
    let status = null;
    key('up', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.power(4)
      };
    });
    key('down', () => {
      if (this.game.ship && this.game.ship.length !== 0){
        this.game.ship.power(-4)
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
