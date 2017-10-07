import { gameView } from './game_view';

document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.audio').addEventListener('click', function(){
    gameView.audio.toggleAudio();
    window.game = gameView.game;
  });

  gameView.bindKeyHandlers();
  gameView.ctx.canvas.width  = window.innerWidth - 20;
  gameView.ctx.canvas.height = window.innerHeight - 20;
});
