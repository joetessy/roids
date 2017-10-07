import { movingObject } from './moving_object';
import { bulletFactory } from './bullet';
import { Util } from './utils';
import { makeHealthBar } from './healthbar.js';

export function ship({game}){
  let bulletImage = new Image();
  bulletImage.src = 'lib/img/laser.png';

  let image = new Image();
  image.src = 'lib/img/xwing.png';
  return Object.assign(Object.create(movingObject), {
    game,
    type: 'ship',
    image,
    size: 55,
    pos: [game.DIMX / 2, game.DIMY/2],
    color: 'green',
    radius: 20,
    vel: 0,
    health: 100,
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
          this.angle -= .2;
        }, .25);
      } else {
        interval = setInterval(() => {
          this.angle += .2;
        }, .25);
      }
      setTimeout(() => clearInterval(interval), 75);
    },

    fireBullet(){
      this.game.playAudio('blaster');
      let pos1 = Util.findCoord(this.pos, 20, this.angle + 90),
          pos2 = Util.findCoord(this.pos, 20, this.angle - 90);

      let vel = 70, angle = this.angle;
      const bullet = bulletFactory({
        pos: pos1,
        vel,
        type: 'xwing_bullet',
        angle, image: bulletImage,
        size: 50});

      const bullet2 = bulletFactory({
        pos: pos2,
        vel,
        angle,
        type: 'xwing_bullet',
        image: bulletImage, size: 50});
        this.game.bullets.push(bullet, bullet2);
    },
    loadHealthBar(){
      return makeHealthBar({pos: this.pos, health: this.health, ship: this});
    },

    collideWith(){

    }, draw(ctx){
      this.drawRectangles(ctx);
      this.drawSprite(ctx, this.image, this.size);
    },

    drawRectangles(ctx){
      let topLimit = this.pos[1] - 50;
      let healthLeft = this.health / 100,
          healthGone = (100 - this.health) / 100;

      let start = this.pos[0] - 35,
          end = this.pos[0] - 47 + 90,
          range = 68;

      let greenParams = [start, topLimit, range * healthLeft, 5];
      let redParams = [start + range * healthLeft, topLimit, range * healthGone, 5];

      ctx.fillStyle = "green" ;
      ctx.fillRect(...greenParams);

      ctx.fillStyle = "red" ;
      ctx.fillRect(...redParams);

    }
  });
}
