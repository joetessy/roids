function movingObject({pos, vel, radius, color}){
  return {
    pos,
    vel,
    radius,
    color,
    draw: function(ctx){
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
    },
    move: function(){
      pos[0] += vel[0];
      pos[1] += vel[2];
    }
  };
}

module.exports = movingObject;
