import { game } from './game.js';
import { Util } from './utils';


document.addEventListener('DOMContentLoaded', function(){
  movingObject.game = game;
  window.asteroids = game.asteroids;
  window.bullets = game.bullets;
});

const NORMAL_FRAME_TIME_DELTA = 1000 / 40;

export const movingObject = {
  isWrappable: true,
  draw(ctx){
    this.drawSprite(ctx, this.image, this.size);
  },

  move(timeDelta = 1){
    this.pos = this.calculateMove(timeDelta);
    if (this.game.isOutOfBounds(this.pos)){
      if (!this.isWrappable){
        this.game.remove(this);
      }
    }
  },

  calculateMove(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    var current = this.pos,
        angle = this.angle,
        distance = this.vel * velocityScale;
    return Util.findCoord(current, distance, angle);
  },

  rotateAndCache(img, angle){
    var offscreenCanvas = document.createElement('canvas');
    var offscreenCtx = offscreenCanvas.getContext('2d');
    var size = Math.max(img.width, img.height);

    offscreenCanvas.width = size;
    offscreenCanvas.height = size;

    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(Util.toRadians(angle));
    offscreenCtx.drawImage(img, -(img.width/2), -(img.height/2));

    return offscreenCanvas;
  },

  drawSprite(ctx, img, size){
    let angle = this.angle;
    let rotated = this.rotateAndCache(img, angle);
    ctx.drawImage(
      rotated,
      this.pos[0] - (size / 2),
      this.pos[1] - (size / 2),
      size,
      size);
  },

  isCollidedWith(otherObject){
    let distance = Math.pow((
      Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2)
    ), 0.5);
    return distance <= this.radius + otherObject.radius;
  },
};
