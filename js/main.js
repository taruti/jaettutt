// import Map from './map';
import MapView from './map_view';
/* global document */

function start() {
  const mv = new MapView(undefined, document.body);
  mv.map.draw();
}

document.body.onload = start;
