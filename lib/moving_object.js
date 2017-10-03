import { game } from './game.js';
import { Util } from './utils';


document.addEventListener('DOMContentLoaded', function(){
  movingObject.game = game;
});

export const movingObject = {
  isWrappable: true,
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  },

  move(){
    this.pos = [this.pos[0] + this.vel[0],   this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(this.pos)){
      if (!this.isWrappable){
        this.game.remove(this);
      }
    }
  },

  rotateAndCache(img, angle){
    var offscreenCanvas = document.createElement('canvas');
    var offscreenCtx = offscreenCanvas.getContext('2d');
    var size = Math.max(img.width, img.height);

    offscreenCanvas.width = size;
    offscreenCanvas.height = size;

    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(angle + Math.PI/2);
    offscreenCtx.drawImage(img, -(img.width/2), -(img.height/2));

    return offscreenCanvas;
  },

  drawSprite(ctx, img, size){
    if (this.vel !== [0,0]){
      this.angle = Util.getAngle(this.vel[1], this.vel[0]) + Math.PI;
      let angle = this.angle ;
      let rotatedShip = this.rotateAndCache(img, angle);
      ctx.drawImage(
        rotatedShip,
        this.pos[0] - (size / 2),
        this.pos[1] - (size / 2),
        size,
        size);
    }
  },

  isCollidedWith(otherObject){
    let distance = Math.pow((
      Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2)
    ), 0.5);
    return distance <= this.radius + otherObject.radius;
  },
};
