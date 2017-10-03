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
    vel: [0,0],
    direction: [0,0],
    angle: null,

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

    power(impulse){
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    },

    fireBullet(){
      let pos1 = [this.pos[0] + 20, this.pos[1]],
          pos2 = [this.pos[0] - 20, this.pos[1]];

      if (this.vel[0] === 0 && this.vel[1] === 0) return;
      let bulletVel = this.vel.map((el) => el * 5);
      const bullet = bulletFactory({
        pos: pos1,
        vel: bulletVel,
        angle: this.angle});
      const bullet2 = bulletFactory({
        pos: pos2,
        vel: bulletVel,
        angle: this.angle});
        
      this.game.bullets.push(bullet, bullet2);
    },

    collideWith(){

    }
  });
}
