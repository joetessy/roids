import { game } from './game.js';


export const audio = {
  game,
  death: new Audio('lib/audio/explosion.wav'),
  death2: new Audio('lib/audio/death2.wav'),
  explosion: new Audio('lib/audio/explosion2.wav'),
  blaster: new Audio('lib/audio/xwing2.wav'),
  power: new Audio('lib/audio/power.wav'),
  reverse: new Audio('lib/audio/reverse.wav'),
  tieBlaster: new Audio('lib/audio/tielaser.wav'),
  ties: [
    new Audio('lib/audio/tie1.wav'),
    new Audio('lib/audio/tie2.wav'),
    new Audio('lib/audio/tie3.wav'),
    new Audio('lib/audio/tie4.wav'),
    new Audio('lib/audio/tie5.wav'),
    new Audio('lib/audio/tie6.wav'),
    new Audio('lib/audio/tie7.wav'),
  ],
  r2: [
    new Audio('lib/audio/r21.wav'),
    new Audio('lib/audio/r22.wav'),
    new Audio('lib/audio/r23.wav'),
    new Audio('lib/audio/r25.wav'),
    new Audio('lib/audio/r26.wav'),
    new Audio('lib/audio/r27.wav'),
  ],
  hit: [
    new Audio('lib/audio/hit1.wav'),
    new Audio('lib/audio/hit2.wav'),
  ],
  on: true,

  loadSound(sound, volume){
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play();
    sound.addEventListener('ended', function(s) {
      sound.currentTime = 0;
    });
  },
  loadArr(arr, volume){
    let sound = arr[Math.floor(Math.random() * arr.length)];
    sound.volume = volume;
    sound.play();
  },

  toggleAudio(){
    this.on = this.on === true ? false : true;
    this.game.domHandler.toggleAudio();
  },

  playSound(sound){
    switch(sound) {
      case 'death':
        this.loadSound(this.death2, 0.6);
        break;
      case 'blaster':
        this.loadSound(this.blaster, 0.7);
        break;
      case 'explosion':
        this.loadSound(this.explosion, 1);
        break;
      case 'power':
        this.loadSound(this.power, .6);
        break;
      case 'reverse':
        this.loadSound(this.reverse, .6);
        break;
      case 'tie':
        this.loadArr(this.ties, .5);
        break;
      case 'r2':
        this.loadArr(this.r2, .4);
        break;
      case 'tieBlaster':
        this.loadSound(this.tieBlaster, .5);
        break;
      case 'hit':
        this.loadArr(this.hit, .6);
        break;
    }
  }

};
