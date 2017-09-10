import { movingObject } from './moving_object';

export function ship({game}){
  return Object.assign(Object.create(movingObject), {
    game,
    pos: [500,300],
    color: 'green',
    radius: 10,
    vel: [0,0],
    relocate(){
      this.pos = this.game.randomPosition();
    },
    power(impulse){
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
  });
}
