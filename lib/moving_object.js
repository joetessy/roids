let movingObject = {
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  move(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.game.wrap(this.pos);
  },
  isCollidedWith(otherObject){
    let distance = Math.pow((
      Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2)
    ), 0.5);
    return distance <= this.radius + otherObject.radius;
  },
};

function movingObjectFactory({pos, vel, radius, color, game}){
  return Object.assign(Object.create(movingObject), {
    pos,
    vel,
    radius,
    color,
    game,
  });
}

module.exports = movingObjectFactory;
