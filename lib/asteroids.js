import { gameView } from './game_view';

document.addEventListener('DOMContentLoaded', function(){
  gameView.game.addAsteroids();
  gameView.start();
  window.ship = gameView.game.ship;
  window.game = gameView.game;
});
