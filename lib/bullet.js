import { movingObject } from './moving_object';

const DEFAULTS = {
  COLOR: '#fc0000',
  RADIUS: 7,
};



export function bulletFactory({pos, vel, angle, image, type, size}){
  return Object.assign(Object.create(movingObject),{
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    image,
    type,
    size,
    vel,
    pos,
    angle,
    isWrappable: false,

    collideWith(otherObject){
      if (otherObject.type === 'asteroid' && this.type === 'xwing_bullet'){
        this.game.bullets = [];
        pos = otherObject.pos;
        this.game.addExplosion(pos);
        this.game.remove(otherObject);
        this.game.killCount += 1;
        this.game.domHandler.updateScore(this.game.killCount);
      }
      if (otherObject.type === 'ship' && this.type === 'tie_bullet'){
        this.game.remove(this);
        this.game.playAudio('hit');
      }
    }
  });

}
