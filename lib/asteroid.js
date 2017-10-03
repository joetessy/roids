import { movingObject } from './moving_object';
import { Util } from './utils';

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

export function makeAsteroid(){
  return Object.assign(Object.create(movingObject),
  {
    type: 'asteroid',
    pos: movingObject.game.randomPosition(),
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Util.randomVec(DEFAULTS.SPEED),
    collideWith(otherObject){
      if (otherObject.color === 'green'){
        otherObject.relocate();
      }
    },
    draw(ctx){
      if (!this.image){
        this.image = new Image();
        this.image.src = 'lib/img/tie.png';
      }
      this.drawSprite(ctx, this.image, 40);
    }
  });
}
