import { game } from './game.js';


export const audio = {
  game,
  death: 'lib/audio/explosion.wav',
  death2: 'lib/audio/death2.wav',
  explosion: 'lib/audio/explosion2.wav',
  blaster: 'lib/audio/xwing2.wav',
  power: 'lib/audio/power.wav',
  reverse: 'lib/audio/reverse.wav',
  tieBlaster: 'lib/audio/tielaser.wav',
  ties: [
    'lib/audio/tie1.wav',
    'lib/audio/tie2.wav',
    'lib/audio/tie3.wav',
    'lib/audio/tie4.wav',
    'lib/audio/tie5.wav',
    'lib/audio/tie6.wav',
    'lib/audio/tie7.wav',
  ],
  r2: [
    'lib/audio/r21.wav',
    'lib/audio/r22.wav',
    'lib/audio/r23.wav',
    'lib/audio/r25.wav',
    'lib/audio/r26.wav',
    'lib/audio/r27.wav',
  ],
  on: true,

  loadSound(sound, volume){
    sound = new Audio(sound);
    sound.volume = volume;
    sound.play();
    sound.addEventListener('ended', function(s) {
      sound.currentTime = 0;
    });
  },
  loadArr(arr, volume){
    let sound = arr[Math.floor(Math.random() * arr.length)];
    sound = new Audio(sound);
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
        this.loadSound(this.blaster, 0.8);
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
        this.loadSound(this.tieBlaster, .6);
        break;
    }
  }

};
