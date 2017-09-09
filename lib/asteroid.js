const movingObject = require('./moving_object');
const Util = require('./utils');

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 15,
  SPEED: 4
};

function asteroid(pos){
  let newAsteroid = movingObject({
      pos,
      color: DEFAULTS.COLOR,
      radius: DEFAULTS.RADIUS,
      vel: Util.randomVec(DEFAULTS.SPEED)
    });
  return newAsteroid;
}


module.exports = asteroid;
