/* global PIXI */

import Creature from './creature.js';
import Grid from './grid.js';
import Map from './map.js';

export default class MapView {
  constructor(map, parent) {
    this.w = 800;
    this.h = 600;
    this.map = new Map({
      grid: new Grid(this.w, this.h, 64),
    });
    const renderer = PIXI.autoDetectRenderer(this.w, this.h, {});
    parent.appendChild(renderer.view);
    this.map.addCreature(200, 100, new Creature());
    this.map.draw();
    renderer.render(this.map.container);
  }
}
