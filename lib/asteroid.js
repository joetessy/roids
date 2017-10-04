import { movingObject } from './moving_object';
import { Util } from './utils';

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

export function makeAsteroid(){
  let image = new Image();
  image.src = 'lib/img/tie.png';
  return Object.assign(Object.create(movingObject),
  {
    type: 'asteroid',
    image,
    size: 45,
    angle: Math.floor(Math.random() * 361),
    pos: movingObject.game.randomPosition(),
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Math.floor(Math.random() * 4) + 3,
    collideWith(otherObject){
      if (otherObject.color === 'green'){
        otherObject.relocate();
      }
    },
  });
}
