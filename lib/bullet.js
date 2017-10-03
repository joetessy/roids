import { movingObject } from './moving_object';

const DEFAULTS = {
  COLOR: '#fc0000',
  RADIUS: 2,
};

export function bulletFactory({pos, vel, angle}){
  return Object.assign(Object.create(movingObject),{
    type: 'bullet',
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel,
    pos,
    angle,
    isWrappable: false,
    collideWith(otherObject){
      if (otherObject.color === '#505050'){
        this.game.remove(otherObject);
      }
    },
    draw(ctx){
      if (!this.image){
        this.image = new Image();
        this.image.src = 'lib/img/laser.png';
      }
      this.drawSprite(ctx, this.image, 20);
    }
  });

}
