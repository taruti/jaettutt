export default class Creature {
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(2, 0xFF1111, 1);
  }
  draw() {
    let x = this.x || 0;
    let y = this.y || 0;
    let scale = this.scale || 64;
    this.graphics.drawCircle(x, y, scale/2);
    return this.graphics;
  }

}
