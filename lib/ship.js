import { movingObject } from './moving_object';
import { bulletFactory } from './bullet';

export function ship({game}){
  return Object.assign(Object.create(movingObject), {
    game,
    type: 'ship',
    pos: [500,300],
    color: 'green',
    radius: 10,
    vel: [0,0],

    relocate(){
      this.pos = this.game.randomPosition();
    },

    power(impulse){
      this.vel = impulse;
    },

    fireBullet(){
      if (this.vel[0] === 0 && this.vel[1] === 0) return;
      let bulletVel = this.vel.map((el) => el * 5);
      const bullet = bulletFactory(this.pos, bulletVel, this.game);
      this.game.bullets.push(bullet);
    },

    collideWith(){

    }
  });
}
