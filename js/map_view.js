/* global PIXI */

export default class MapView {
  drawHexGrid(step) {
    const c = step / 2;
    const a = c / 2;
    const b = Math.sin(60 * Math.PI / 180.0) * c;
    let even = true;
    for (let y = 0; y < this.h - step; y += b) {
      for (let x = even ? 0 : a + c; x < this.w - step; x += step + c) {
        /*
        const arr = [x, y + b,
          x + a, y,
          x + a + c, y,
          x + 2 * c, y + b];
//          x + a + c, y + 2 * b,
//          x + a, y + 2 * b];
//        const al = arr.length;
*/
        this.graphics.moveTo(x, y + b);
        this.graphics.lineTo(x + a, y);
        this.graphics.lineTo(x + a + c, y);
        this.graphics.lineTo(x + 2 * c, y + b);
//        this.graphics.moveTo(arr[al - 2], arr[al - 1]);
//        this.graphics.drawPolygon(arr);
      }
      even = !even;
    }
  }
  constructor(map, parent) {
    this.map = map;
    this.w = 800;
    this.h = 600;
    const renderer = PIXI.autoDetectRenderer(this.w, this.h, {});
    parent.appendChild(renderer.view);
    const stage = new PIXI.Container();
    stage.interactive = true;
    const graphics = new PIXI.Graphics();
    this.graphics = graphics;
    graphics.alpha = 0.25;
    graphics.lineStyle(2, 0xFFFFFF, 1);
    const step = 64;
    for (let y = step; y < this.w; y += step) {
      graphics.moveTo(0, y);
      graphics.lineTo(this.w, y);
    }
    for (let x = step; x < this.w; x += step) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, this.h);
    }
    this.drawHexGrid(64);
    stage.addChild(graphics);
    renderer.render(stage);
  }
}
