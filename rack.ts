import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Rect } from 'konva/lib/shapes/Rect';
import { Asset } from './asset';
import { UUnit } from './u-unit';

export class Rack extends Konva.Group {
  static units = 42;
  static width = 420;
  static height = Rack.units * (UUnit.height + UUnit.vMargin);

  private shadowRectangle: Konva.Rect;
  private rackSlots: Record<number, Asset> = {};
  private initialDragCoordinate: { x: number; y: number } | undefined;
  private selectedAsset: Asset | undefined;
  private backDrop: Konva.Rect;
  constructor() {
    super();

    const rect = new Rect({
      height: Rack.height,
      width: Rack.width,
    });

    this.add(rect);

    (
      [
        ['Salamèche', 1],
        ['Carapuce', 2],
        ['Bulbizare', 14],
        ['Pikachu', 23],
      ] as Array<[string, number]>
    ).forEach(([name, row], i) => {
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
      asset.on('click', () => {
        this.handleSelection(asset);
      });
    });

    this.shadowRectangle = new Konva.Rect({
      x: 0,
      y: 0,
      opacity: 0.6,
      fill: '#71B249',
      stroke: '#456e2c',
      strokeWidth: 3,
      dash: [20, 2],
    });

    this.shadowRectangle.hide();
    this.add(this.shadowRectangle);

    this.backDrop = new Konva.Rect({
      width: Rack.width,
      height: Rack.height,
      opacity: 0.7,
      fill: 'white',
    });
    this.add(this.backDrop);
    this.backDrop.moveToBottom();
  }

  addAsset(asset: Asset, row: number) {
    asset.y(
      this.yForRow(row) +
        asset.groupSize.height / 2 -
        (Math.round(asset.uSize / 2) - 1) * UUnit.vMargin
    );
    this.add(asset);

    for (let i = 0; i < asset.uSize; i++) {
      this.rackSlots[row + i] = asset;
    }
  }

  private yForRow(row: number) {
    return UUnit.heightAndMargin * (row - 1);
  }

  private rowForY(y: number): number {
    return Math.round(y / UUnit.heightAndMargin) + 1;
  }

  private handleSelection(asset: Asset) {
    const scalingValue = 1.1;
    if (asset.scaleX() == scalingValue) {
      this.backDrop.moveToBottom();
      this.backDrop.opacity(0);
      asset.scale({ x: 1, y: 1 });
      this.selectedAsset?.scale({ x: 1, y: 1 });
      this.selectedAsset = undefined;
    } else {
      this.backDrop.moveToTop();
      this.backDrop.opacity(0.7);
      asset.scale({ x: scalingValue, y: scalingValue });
      asset.moveToTop();
      this.selectedAsset = asset;
    }
  }

  private dragStart = (e: KonvaEventObject<DragEvent>, asset: Asset) => {
    this.initialDragCoordinate = asset.position();
    this.shadowRectangle.size(asset.groupSize);
    this.shadowRectangle.show();
    this.shadowRectangle.moveToTop();
    // asset.scale({ x: 0.8, y: 0.8 });
    asset.moveToTop();
  };

  private dragEnd = (e: KonvaEventObject<DragEvent>, asset: Asset) => {
    if (this.isRowAvailable(this.rowForY(asset.topLeft().y), asset)) {
      const positionWithoutOffset = this.snapAsset(asset.topLeft());
      const assetSize = asset.size();
      asset.position({
        x: positionWithoutOffset.x + assetSize.width / 2,
        y: positionWithoutOffset.y + assetSize.height / 2,
      });
    } else {
      asset.position(this.initialDragCoordinate);
    }
    // asset.scale({ x: 1, y: 1 });
    this.shadowRectangle.hide();
  };

  private dragMove = (e: KonvaEventObject<DragEvent>, asset: Asset) => {
    this.shadowRectangle.position(this.snapAsset(asset.topLeft()));

    if (this.isRowAvailable(this.rowForY(asset.topLeft().y), asset)) {
      this.shadowRectangle.fill('#71B249');
      this.shadowRectangle.stroke('#456e2c');
    } else {
      this.shadowRectangle.fill('#FF7B17');
      this.shadowRectangle.stroke('#CF6412');
    }
  };

  private snapAsset({ x, y }: { x: number; y: number }): {
    x: number;
    y: number;
  } {
    const lineHeight = UUnit.height + UUnit.vMargin;
    return {
      x: 0,
      y: Math.round(y / lineHeight) * lineHeight,
    };
  }

  private isRowAvailable(row: number, asset: Asset): boolean {
    const rows = [...Array(asset.uSize).keys()].map((i) => row + i);
    const checkBounds = row + asset.uSize <= Rack.units + 1;
    return (
      checkBounds &&
      !rows.some((i) => {
        const slot = this.rackSlots[i - 1]?.id();
        return this.rackSlots[i] !== asset && this.rackSlots[i] !== undefined;
      })
    );
  }
}
