import { movingObject } from './moving_object';
import { Util } from './utils';

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

export function makeAsteroid({game}){
  return Object.assign(Object.create(movingObject),
  {
    game: game,
    pos: game.randomPosition(),
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Util.randomVec(DEFAULTS.SPEED),
    collideWith(otherObject){
      if (otherObject.color === 'green'){
        otherObject.relocate();
      }
    }
  });
}
