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
    angle: Math.floor(Math.random() * 300),
    pos: movingObject.game.randomAsteroid(),
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Math.floor(Math.random() * 2) + 3,
    collideWith(otherObject){
      if (otherObject.type === 'ship'){
        this.game.death(otherObject, otherObject.pos);
        this.game.addExplosion(this.pos);
        this.game.remove(this);
      }
    },

    draw(ctx){
      this.drawSprite(ctx, this.image, this.size);
    }
  });
}
