import { movingObject } from './moving_object';
import { bulletFactory } from './bullet';
import { Util } from './utils';

export function ship({game}){
  return Object.assign(Object.create(movingObject), {
    game,
    type: 'ship',
    pos: [500,300],
    color: 'green',
    radius: 10,
    vel: 0,
    direction: [0,0],
    angle: 0,

    draw(ctx){
      if (!this.image){
        this.image = new Image();
        this.image.src = 'lib/img/xwing.png';
      }
      this.drawSprite(ctx, this.image, 50);
    },

    relocate(){
      this.pos = this.game.randomPosition();
    },

    power(power){
      this.vel += power;
    },

    rotate(direction){
      if (direction === 'left') {
        this.angle -= 20;
      } else {
        this.angle += 20;
      }
    },

    move(){
      this.pos = this.calculateMove();
      if (this.game.isOutOfBounds(this.pos)){
        if (!this.isWrappable){
          this.game.remove(this);
        }
      }
    },

    fireBullet(){
      let pos1 = Util.findCoord(this.pos, 20, this.angle + 90),
          pos2 = Util.findCoord(this.pos, 20, this.angle - 90);

      let vel = 50, angle = this.angle;
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

    bulletPos(origin){
      let angle = this.angle,
      cx = this.pos[0],
      cy = this.pos[1],
      x = origin[0],
      y = origin[1],
      cos = Math.cos(Util.toRadians(angle)),
      sin = Math.sin(Util.toRadians(angle)),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
      return [nx, ny];
    },

    collideWith(){

    }
  });
}
