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
    vel: Math.floor(Math.random() * 2) + 3,
    collideWith(otherObject){
      if (otherObject.color === 'green'){
        this.game.addExplosion(otherObject.pos);
        this.game.remove(otherObject);
        setTimeout(function(){
          this.game.createShip();
        }.bind(this), 1000);
      }
    },

    draw(ctx){
      this.drawSprite(ctx, this.image, this.size);
    }
  });
}
