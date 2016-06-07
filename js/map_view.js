/* global PIXI */
/* global requestAnimFrame */

export default class MapView {
  constructor(map, parent) {
    this.map = map;
    this.w = 800;
    this.h = 600;
    const renderer = PIXI.autoDetectRenderer(this.w, this.h, {});
    parent.appendChild(renderer.view);
    const stage = new PIXI.Container();
    stage.interactive = true;
    const graphics = new PIXI.Graphics();
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
    graphics.alpha = 0.25;
    stage.addChild(graphics);
    renderer.render(stage);
  }
}
