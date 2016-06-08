/* global PIXI */

import Grid from './grid.js';

export default class MapView {
  constructor(map, parent) {
    this.map = map;
    this.w = 800;
    this.h = 600;
    const renderer = PIXI.autoDetectRenderer(this.w, this.h, {});
    parent.appendChild(renderer.view);
    const stage = new PIXI.Container();
    stage.interactive = true;
    this.grid = new Grid(this.w, this.h, 64);
    this.grid.drawSquare();
    this.grid.drawHex();
    stage.addChild(this.grid.graphics);
    renderer.render(stage);
  }
}
