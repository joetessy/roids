function movingObject({pos, vel, radius, color, game}){
  return {
    pos,
    vel,
    radius,
    color,
    game,
    draw: function(ctx){
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    move: function(){
      pos[0] += vel[0];
      pos[1] += vel[1];
      this.game.wrap(pos);
    }
  };
}

module.exports = movingObject;
