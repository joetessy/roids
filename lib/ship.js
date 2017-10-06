import { movingObject } from './moving_object';
import { bulletFactory } from './bullet';
import { Util } from './utils';

export function ship({game}){
  let image = new Image();
  image.src = 'lib/img/xwing.png';
  return Object.assign(Object.create(movingObject), {
    game,
    type: 'ship',
    image,
    size: 60,
    pos: [game.DIMX / 2, game.DIMY/2],
    color: 'green',
    radius: 20,
    vel: 0,
    direction: [0,0],
    angle: 0,

    relocate(){
      this.pos = this.game.randomPosition();
    },

    power(power){
      if (this.vel + power <= 16 && this.vel + power >= -16){
        this.vel += power;
        if (this.vel !== 0){
          if (this.vel < 0){
            this.game.playAudio('reverse');
          } else {
            this.game.playAudio('power');
          }
        }
      }
    },

    rotate(direction){
      let interval;
      let currAngle = this.angle;
      if (direction === 'left') {
        interval = setInterval(() => {
          this.angle -= 1;
        }, .25);
      } else {
        interval = setInterval(() => {
          this.angle += 1;
        }, .25);
      }
      setTimeout(() => clearInterval(interval), 75);
    },

    fireBullet(){
      this.game.playAudio('blaster');
      let pos1 = Util.findCoord(this.pos, 25, this.angle + 90),
          pos2 = Util.findCoord(this.pos, 25, this.angle - 90);

      let vel = 70, angle = this.angle;
      const bullet = bulletFactory({
        pos: pos1,
        vel,
        angle});

      const bullet2 = bulletFactory({
        pos: pos2,
        vel,
        angle});

      this.game.bullets.push(bullet, bullet2);
    },

    collideWith(){

    }
  });
}
