import { game } from './game.js';
import { Util } from './utils';


document.addEventListener('DOMContentLoaded', function(){
  movingObject.game = game;
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

  setAngle(current, result){
    this.angle = Util.getAngle(current, result);
  },

  pathToShip(current, distance){
    let destPos = this.game.ship.pos;
    let deltaX = destPos[0] - current[0];
    let deltaY = destPos[1] - current[1];
    let subdis = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    deltaX /= subdis;
    deltaY /= subdis;
    let result = [];
    result[0] = current[0] + (deltaX * distance);
    result[1] = current[1] + (deltaY * distance);
    this.setAngle(current, result);
    return result;
  },

  calculateMove(timeDelta){
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    var current = this.pos,
        angle = this.angle,
        distance = this.vel * velocityScale;
    if (this.game.ship.length !== 0 && this.type === 'asteroid'){
      return this.pathToShip(current, distance);
    }
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
