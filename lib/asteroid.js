import { movingObject } from './moving_object';
import { bulletFactory } from './bullet';
import { Util } from './utils';

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

export function makeAsteroid(){
  let bulletImage = new Image();
  bulletImage.src = 'lib/img/tielaser2.png';

  let image = new Image();
  image.src = 'lib/img/tie.png';
  let pos = movingObject.game.randomAsteroid();
  let angle = 0;
  if (movingObject.game.ship.length !== 0){
    angle = Util.getAngle(pos, movingObject.game.ship.pos);
  }

  return Object.assign(Object.create(movingObject),
  {
    type: 'asteroid',
    image,
    size: 40,
    angle,
    pos,
    color: DEFAULTS.COLOR,
    radius: DEFAULTS.RADIUS,
    vel: Math.floor(Math.random() * 3) + 1.5,
    collideWith(otherObject){
      if (otherObject.type === 'ship'){
        this.clear();
        this.game.playAudio('explosion');
        this.game.playAudio('death');
        this.game.death(otherObject, otherObject.pos);
        this.game.addExplosion(this.pos, [100, 100]);
        this.clear();
        this.game.remove(this);
      }
    },
    fireBullet(){
      this.game.playAudio('tieBlaster');
      let bulletPos = this.pos,
          bulletVel = 20, bulletAngle = 180 + this.angle;
      const bullet = bulletFactory({
        pos: bulletPos,
        vel: bulletVel,
        angle: bulletAngle,
        image: bulletImage,
        type: 'tie_bullet', size: 43
      });
      this.game.bullets.push(bullet);
    },
    clear(){
      clearInterval(this.interval);
    }
  });
}
