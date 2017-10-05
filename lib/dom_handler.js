
export const domHandler = {
  displayLives(numLives){
    for (let i = 0; i < numLives; i++){
      let life = new Image();
      life.src = 'lib/img/life.png';
      life.height = 40;
      life.width = 40;
      document.querySelector('.lives').append(life);
    }
  },
  removeLife(){
    var lives = document.querySelector('.lives');
    lives.removeChild(lives.getElementsByTagName('img')[0]);
  },

  gameOver(){
    document.querySelector('.gameover').classList.remove('hide');
    document.querySelector('.start').classList.remove('hide');
  },

  hide(className){
    document.querySelector(className).classList.add('hide');
  },

  updateScore(killCount){
    document.querySelector('.killcount').innerHTML = killCount;
  }


};
