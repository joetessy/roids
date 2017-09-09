const gameView = require('./game_view');

document.addEventListener('DOMContentLoaded', function(){
  gameView.game.addAsteroids();
  gameView.start();
});
