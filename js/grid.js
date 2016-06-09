/* global PIXI */

function clasp(x, lim) {
  return x > lim ? lim : x;
}

export default class Grid {
  constructor(w, h, step) {
    this.w = w;
    this.h = h;
    this.step = step;
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.25;
    this.graphics.lineStyle(2, 0xFFFFFF, 1);
  }
  drawSquare() {
    const step = this.step;
    for (let y = step; y < this.w; y += step) {
      this.graphics.moveTo(0, y);
      this.graphics.lineTo(this.w, y);
    }
    for (let x = step; x < this.w; x += step) {
      this.graphics.moveTo(x, 0);
      this.graphics.lineTo(x, this.h);
    }
  }
  drawHex() {
    const c = this.step / 2;
    const a = c / 2;
    const b = Math.sin(60 * Math.PI / 180.0) * c;

    let odd = false;
    for (let y = 0; y < this.h; y += b) {
      if (odd) {
        this.graphics.moveTo(clasp(0, this.w), clasp(y, this.h));
        this.graphics.lineTo(clasp(a, this.w), clasp(y + b, this.h));
      }
      for (let x = odd ? a + c : 0; x < this.w; x += this.step + c) {
        this.graphics.moveTo(clasp(x, this.w), clasp(y + b, this.h));
        this.graphics.lineTo(clasp(x + a, this.w), clasp(y, this.h));
        this.graphics.lineTo(clasp(x + a + c, this.w), clasp(y, this.h));
        this.graphics.lineTo(clasp(x + 2 * c, this.w), clasp(y + b, this.h));
      }
      odd = !odd;
    }
  }
  draw() {
    this.drawSquare();
  }
}
