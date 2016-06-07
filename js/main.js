import Map from './map';
import MapView from './map_view';
/* global document */

function start() {
  const m = new Map({ scale: 1 });
  const mv = new MapView(m, document.body);
  mv.map.draw();
}

document.body.onload = start;
