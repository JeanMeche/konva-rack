import Konva from 'konva';
import { Rack } from './rack';
import { RackHeader } from './rack-header';
import { UUnit } from './u-unit';

export class RackContainer extends Konva.Group {
  static unitOffset = 12;
  static width =
    Rack.width + (UUnit.width * 4) / 3 + RackContainer.unitOffset * 2;

  constructor() {
    super({ x: UUnit.width * 6, y: UUnit.height * 2 });
    const containerBg = new Konva.Rect({
      cornerRadius: 8,
      height: RackHeader.height + Rack.height + 12,
      width: RackContainer.width,

      shadowColor: 'black',
      shadowBlur: 2,
      shadowOffset: { y: 1, x: 0 },
      shadowOpacity: 0.4,
    });
    this.add(containerBg);

    const leftUnits = new UUnit(Rack.units, 'left');
    leftUnits.position({ x: RackContainer.unitOffset, y: RackHeader.height });
    this.add(leftUnits);

    const rightUnits = new UUnit(Rack.units, 'right');
    rightUnits.position({
      x: RackContainer.width - UUnit.width - RackContainer.unitOffset,
      y: RackHeader.height,
    });
    this.add(rightUnits);

    const rackHeader = new RackHeader();
    this.add(rackHeader);

    const rack = new Rack();
    rack.position({
      x: RackContainer.unitOffset + (UUnit.width * 2) / 3,
      y: RackHeader.height,
    });
    this.add(rack);
  }
}
