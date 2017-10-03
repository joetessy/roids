export const Util = {
  scale(vec, m){
    return [vec[0] * m, vec[1] * m];
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  rotate(x, y, rads){
    return [
      x * Math.cos(rads) - y * Math.sin(rads),
      y * Math.cos(rads) + x * Math.sin(rads)
    ];
  },

  getAngle(x, y){
    var angle = Math.atan2(x, y) + Math.PI;
    return angle;
  }
};
