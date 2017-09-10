const movingObject = require('./moving_object');
const Util = require('./utils');

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

function asteroid(options){
  let newAsteroid = movingObject({
      game: options.game,
      pos: options.game.randomPosition(),
      color: DEFAULTS.COLOR,
      radius: DEFAULTS.RADIUS,
      vel: Util.randomVec(DEFAULTS.SPEED)
    });
    newAsteroid.collideWith = function(otherObject){
      if (otherObject.color === 'green'){
        otherObject.relocate();
      }
    };
  return newAsteroid;
}


module.exports = asteroid;
