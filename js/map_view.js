/* global PIXI */

export default class MapView {
  drawHexGrid(step) {
    const c = step / 2;
    const a = c / 2;
    const b = Math.sin(60 * Math.PI / 180.0) * c;
    function clasp(x, lim) {
      if (x < 0) { return 0; }
      if (x > lim) { return lim; }
      return x;
    }
    let odd = false;
    for (let y = 0; y < this.h; y += b) {
      if (odd) {
        this.graphics.moveTo(clasp(0, this.w), clasp(y, this.h));
        this.graphics.lineTo(clasp(a, this.w), clasp(y + b, this.h));
      }
      for (let x = odd ? a + c : 0; x < this.w; x += step + c) {
        this.graphics.moveTo(clasp(x, this.w), clasp(y + b, this.h));
        this.graphics.lineTo(clasp(x + a, this.w), clasp(y, this.h));
        this.graphics.lineTo(clasp(x + a + c, this.w), clasp(y, this.h));
        this.graphics.lineTo(clasp(x + 2 * c, this.w), clasp(y + b, this.h));
      }
      odd = !odd;
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
