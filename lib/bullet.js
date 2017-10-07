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
        this.game.remove(this);
        this.game.addExplosion(otherObject.pos);
        otherObject.clear();
        this.game.remove(otherObject);
        this.game.domHandler.updateScore(this.game.killCount);
      }
      if (otherObject.type === 'ship' && this.type === 'tie_bullet'){
        this.game.playAudio('hit');
        this.game.remove(this);
        otherObject.health -= 5;
        if (otherObject.health === 0){
          this.game.playAudio('explosion');
          this.game.playAudio('death');
          this.game.death(otherObject, otherObject.pos);
          this.game.addExplosion(otherObject.pos);
        }
      }
    }
  });

}
