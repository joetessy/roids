import { movingObject } from './moving_object';

const DEFAULTS = {
  COLOR: '#fc0000',
  RADIUS: 2,
};

let image = new Image();
image.src = 'lib/img/laser.png';

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
        this.game.bullets = [];
        this.game.remove(otherObject);
      }
    },

    draw(ctx){
      if (!this.image){
        this.image = new Image();
        this.image.src = 'lib/img/laser.png';
      }
      this.drawSprite(ctx, image, 40);
    },

    move(){
      this.pos = this.calculateMove();
    }
  });

}
