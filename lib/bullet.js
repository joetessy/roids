import { movingObject } from './moving_object';

const DEFAULTS = {
  COLOR: '#fc0000',
  RADIUS: 7,
};

let image = new Image();
image.src = 'lib/img/laser.png';

export function bulletFactory({pos, vel, angle}){
  return Object.assign(Object.create(movingObject),{
    type: 'bullet',
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    image,
    size: 50,
    vel,
    pos,
    angle,
    isWrappable: false,

    collideWith(otherObject){
      if (otherObject.color === '#505050'){
        this.game.bullets = [];
        pos = otherObject.pos;
        this.game.addExplosion(pos);
        this.game.remove(otherObject);
        this.game.killCount += 1;
        this.game.domHandler.updateScore(this.game.killCount);
      }
    }
  });

}
