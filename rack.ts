import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Rect } from 'konva/lib/shapes/Rect';
import { Asset } from './asset';
import { UUnit } from './u-unit';

export class Rack extends Konva.Group {
  static units = 42;
  static width = 420;
  static height = Rack.units * UUnit.height;

  private shadowRectangle: Konva.Rect;

  constructor() {
    super();

    const rect = new Rect({
      fill: '#ccc',
      height: Rack.height,
      width: Rack.width,
    });

    this.add(rect);

    let row = 0;
    ['Salamèche', 'Carapuce', 'Bulbizare', 'Pikachu'].forEach((name, i) => {
      const asset = new Asset({
        width: Rack.width,
        manufaturer: 'Eaton',
        type: 'server',
        uSize: i + 1,
        name: `${name} XXXXXXXXXX`,
        dragStart: this.dragStart,
        dragMove: this.dragMove,
        dragEnd: this.dragEnd,
      });
      this.addAsset(asset, row);
      row += i + 1;
    });

    this.shadowRectangle = new Konva.Rect({
      x: 0,
      y: 0,
      fill: '#FF7B17',
      opacity: 0.6,
      stroke: '#CF6412',
      strokeWidth: 3,
      dash: [20, 2],
    });

    this.shadowRectangle.hide();
    this.add(this.shadowRectangle);
  }

  addAsset(asset: Asset, row: number) {
    asset.y(row * UUnit.height);
    this.add(asset);
  }

  private dragStart = (e: KonvaEventObject<DragEvent>, asset: Asset) => {
    this.shadowRectangle.size(asset.groupSize);
    this.shadowRectangle.show();
    this.shadowRectangle.moveToTop();
    asset.scale({ x: 0.8, y: 0.8 });
    asset.moveToTop();
  };

  private dragEnd = (e: KonvaEventObject<DragEvent>, asset: Asset) => {
    asset.position({
      x: 0,
      y: Math.round(asset.y() / UUnit.height) * UUnit.height,
    });
    asset.scale({ x: 1, y: 1 });
    //  this.stage.batchDraw();
    this.shadowRectangle.hide();
  };

  private dragMove = (e: KonvaEventObject<DragEvent>, asset: Asset) => {
    this.shadowRectangle.position({
      x: 0,
      y: Math.round(asset.y() / UUnit.height) * UUnit.height,
    });
    //  this.stage.batchDraw();
  };
}
