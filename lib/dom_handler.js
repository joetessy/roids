
export const domHandler = {
  displayLives(numLives){
    document.querySelector('.lives').innerHTML = '';
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

  gameOver(count){
    document.querySelector('.score').innerHTML = 'SCORE: ' + count;
    this.show('.gameover');
    this.show('.score');
  },

  hide(className){
    document.querySelector(className).classList.add('hide');
  },

  show(className){
    document.querySelector(className).classList.remove('hide');
  },

  updateScore(killCount){
    document.querySelector('.killcount').innerHTML = killCount +
    "  <img src='lib/img/tie-icon.png' style='height: 30px'/>";
  },

  restartStats(){
    this.updateScore(0);
    this.show('.killcount');
    this.displayLives(3);
  }


};
