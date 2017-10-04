import { gameView } from './game_view';

document.addEventListener('DOMContentLoaded', function(){
  gameView.bindKeyHandlers();
  gameView.ctx.canvas.width  = window.innerWidth - 20;
  gameView.ctx.canvas.height = window.innerHeight - 20;
  
});
