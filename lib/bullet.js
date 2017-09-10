import { movingObject } from './moving_object';

const DEFAULTS = {
  COLOR: "black",
  RADIUS: 2,
};

export function bulletFactory(pos, vel, game){
  return Object.assign(Object.create(movingObject),{
    game,
    type: 'bullet',
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel,
    pos,
    collideWith(otherObject){
      if (otherObject.color === '#505050'){
        this.game.remove(otherObject);
      }
    }
  });

}
