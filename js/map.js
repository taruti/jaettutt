/* global PIXI */

export default class Map {
  constructor(options) {
    this.creatures = [];
    this.grid = options.grid;
    this.container = new PIXI.Container();
    this.container.addChild(this.grid.graphics);
  }

  draw() {
    this.grid.draw();
    for (const c of this.creatures) {
      c.draw();
    }
  }

  addCreature(x, y, critter) {
    critter.move(x, y);
    this.creatures.push(critter);
    this.container.addChild(critter.draw());
  }
}
