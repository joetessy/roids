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
    let dx = x[0] - y[0],
        dy = x[1] - y[1];
    let rad = Math.atan2(dy,dx);
    return this.toDegrees(rad) + 90;
  },

  findCoord(point, distance, angle){
    angle = angle * Math.PI / 180;
    let xdif = Math.round(100 * Math.sin(angle) * distance) / 100;
    let ydif = Math.round(100 * Math.cos(angle) * distance) / 100;
    return [
        point[0] + xdif,
        point[1] - ydif
    ];
  },

  toRadians (angle) {
    return angle * (Math.PI / 180);
  },

  toDegrees (angle) {
    return angle * (180 / Math.PI);
  }
};
