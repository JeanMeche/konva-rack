import Konva from 'konva';
import { Feed } from './Feed/feed';
import { RackContainer } from './rack-container';
import { Colors } from './style';

const width = window.innerWidth;
const height = window.innerHeight;
const shadowOffset = 20;
const tween = null;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  draggable: true,
});

var layer = new Konva.Layer();

const rack = new RackContainer();

const leftFeed = new Feed({ color: Colors.teal, side: 'left' });
leftFeed.position({ x: rack.x() - Feed.width - 12, y: rack.y() });

const rightFeed = new Feed({ color: Colors.orange, side: 'right' });
rightFeed.position({ x: rack.x() + RackContainer.width + 12, y: rack.y() });
layer.add(leftFeed, rightFeed);

layer.add(rack);

// create smaller preview stage
const previewStage = new Konva.Stage({
  container: 'preview',
  width: window.innerWidth / 6,
  height: window.innerHeight / 6,
  scaleX: 1 / 6,
  scaleY: 1 / 6,
});

document.getElementById('reset').addEventListener('click', (e: MouseEvent) => {
  stage.position({ x: 0, y: 0 });
});

// clone original layer, and disable all events on it
// we will use "let" here, because we can redefine layer later
/*
let previewLayer = layer.clone({ listening: false });
previewStage.add(previewLayer);
*/
// stage.add(gridLayer);
stage.add(layer);

/*
const WIDTH = width;
const HEIGHT = rack.getClientRect().height * 1.2;
const PADDING = 20;

var scrollLayers = new Konva.Layer();
stage.add(scrollLayers);

var verticalBar = new Konva.Rect({
  width: 10,
  height: 100,
  fill: 'grey',
  opacity: 0.8,
  x: stage.width() - 10,
  y: PADDING,
  draggable: true,
  dragBoundFunc: function (pos) {
    pos.x = stage.width() - PADDING - 10;
    pos.y = Math.max(
      Math.min(pos.y, stage.height() - this.height() - PADDING),
      PADDING
    );
    return pos;
  },
});
scrollLayers.add(verticalBar);

verticalBar.on('dragmove', function () {
  // delta in %
  const availableHeight = stage.height() - PADDING * 2 - verticalBar.height();
  var delta = (verticalBar.y() - PADDING) / availableHeight;

  layer.y(-(HEIGHT - stage.height()) * delta);
});
*/

/*
var horizontalBar = new Konva.Rect({
  width: 100,
  height: 10,
  fill: 'grey',
  opacity: 0.8,
  x: PADDING,
  y: stage.height() - PADDING - 10,
  draggable: true,
  dragBoundFunc: function (pos) {
    pos.x = Math.max(
      Math.min(pos.x, stage.width() - this.width() - PADDING),
      PADDING
    );
    pos.y = stage.height() - PADDING - 10;

    return pos;
  },
});
scrollLayers.add(horizontalBar);*/
/*
stage.on('wheel', function (e) {
  // prevent parent scrolling
  e.evt.preventDefault();
  const dx = e.evt.deltaX;
  const dy = e.evt.deltaY;

  const minX = -(WIDTH - stage.width());
  const maxX = 0;

  const x = Math.max(minX, Math.min(layer.x() - dx, maxX));

  const minY = -(HEIGHT - stage.height());
  const maxY = 0;

  const y = Math.max(minY, Math.min(layer.y() - dy, maxY));
  layer.position({ x, y });

  const availableHeight = stage.height() - PADDING * 2 - verticalBar.height();
  const vy =
    (layer.y() / (-HEIGHT + stage.height())) * availableHeight + PADDING;
  verticalBar.y(vy);
  */
/*
  const availableWidth = stage.width() - PADDING * 2 - horizontalBar.width();

  const hx = (layer.x() / (-WIDTH + stage.width())) * availableWidth + PADDING;
  horizontalBar.x(hx);
});
*/

function redraw() {
  var container = document.querySelector<HTMLElement>('#container');

  stage.width(container.offsetWidth);
  stage.height(container.offsetHeight);
}

window.addEventListener('resize', redraw);
