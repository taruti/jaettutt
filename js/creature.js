/* global PIXI */
export default class Creature {
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(2, 0xFF1111, 1);
  }
  draw() {
    const x = this.x || 0;
    const y = this.y || 0;
    const scale = this.scale || 64;
    this.graphics.drawCircle(x, y, scale / 2);
    return this.graphics;
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }

}
