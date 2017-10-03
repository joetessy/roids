import { gameView } from './game_view';


document.addEventListener('DOMContentLoaded', function(){
  gameView.game.addAsteroids();
  gameView.start();
});
