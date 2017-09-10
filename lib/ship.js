const movingObject = require('./moving_object');

function ship(options){
  let newShip = Object.create(movingObject({
      game: options.game,
      pos: [500,300],
      color: 'green',
      radius: 10,
      vel: [0,0]
    }));

  newShip.relocate = function(){
    this.pos = this.game.randomPosition();
  };
  
  return newShip;
}

module.exports = ship;
