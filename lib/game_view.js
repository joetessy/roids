import { game } from './game';
import { audio } from './audio.js';
let status = null;
export const gameView = {
  game,
  ctx: document.querySelector('canvas').getContext('2d'),
  audio,
  lastTime: 0,
  keys: {
    37: {down:false, action:(thisGame) => thisGame.ship.rotate('left')},
    38: {down:false, action:(thisGame) => thisGame.ship.power(.5)},
    39: {down:false, action:(thisGame) => thisGame.ship.rotate('right')},
    40: {down:false, action:(thisGame) => thisGame.ship.power(-.5)},
  },
  animate(time){
    for (var key in this.keys) {
      if (this.keys[key].down) {
        if (this.game.ship.length !== 0){
          this.keys[key].action(this.game);
        }
      }
    }
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

    document.addEventListener('keydown', e => {
      if (this.keys[e.keyCode]) {
        this.keys[e.keyCode].down = true ;
      }
    });

    document.addEventListener('keyup', e => {
      if (this.keys[e.keyCode]) {
        this.keys[e.keyCode].down = false;
      }
    });

    document.addEventListener('keypress', e => {
      if (e.keyCode === 32) {
        if (this.game.ship.length !== 0){
          this.game.ship.fireBullet();
        } else if (e.keyCode === 13){
          this.restart();
        }
      }
    });
// start the animation
    requestAnimationFrame(this.animate.bind(this));
  },

  restart(){
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
  },

  setAudio(){
    this.game.setAudio(this.audio);
  },

  bindKeyHandlers(){
    // key('up', () => {
    //   if (this.game.ship && this.game.ship.length !== 0){
    //     this.game.ship.power(4)
    //   };
    // });
    // key('down', () => {
    //   if (this.game.ship && this.game.ship.length !== 0){
    //     this.game.ship.power(-4)
    //   }
    // });
    // key('left', () => {
    //   if (this.game.ship && this.game.ship.length !== 0){
    //     this.game.ship.rotate('left')
    //   }
    // });
    // key('right', () => {
    //   if (this.game.ship && this.game.ship.length !== 0){
    //     this.game.ship.rotate('right')
    //   }
    // });
    // key('space', () => {
    //   if (this.game.ship && this.game.ship.length !== 0){
    //     this.game.ship.fireBullet();
    //   }
    // });

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
