import { movingObject } from './moving_object';

export function makeExplosion(pos){
  let image = new Image();
  image.src = 'lib/img/explosion.png';
  image.width = 900;
  image.height = 900;
  return Object.assign(Object.create(movingObject),
  {
    type: 'explosion',
    image,
    size: [100, 100],
    sliceX: 0,
    sliceY: 0,
    pos,
    once: true,
    speed: 50,
    draw(ctx){
      if (this.sliceX > 800){
        this.sliceY += 100;
        this.sliceX = 0;
      }
      ctx.drawImage(
        this.image,
        this.sliceX,
        this.sliceY,
        this.size[0], this.size[1],
        this.pos[0] - (this.size[0] / 2),
        this.pos[1] - (this.size[1] / 2),
        this.size[0] * .9 , this.size[1] * .9);
      this.sliceX += 100;
    },
    collideWith(){},
    move(){}
  });


}
