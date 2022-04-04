import Konva from 'konva';
import { Colors } from './style';

export class UUnit extends Konva.Group {
  static height: number = 26;
  static width: number = 60;
  static vMargin: number = 3;
  static heightAndMargin = UUnit.height + UUnit.vMargin;

  constructor(public count: number, public align: 'left' | 'right') {
    super();
    const us = Array.from({ length: count }).map((_, i) => {
      const rect = new Konva.Rect({
        width: UUnit.width,
        height: UUnit.height,
        fill: Colors.lightGrey,
        stroke: '#444',
        strokeWidth: 0.5,
      });

      const text = new Konva.Text({
        fontSize: 14,
        fontFamily: 'arial',
        text: `${i + 1}`,
        height: UUnit.height,
        width: UUnit.width,
        verticalAlign: 'middle',
        align,
        padding: 8,
      });

      const group = new Konva.Group({
        y: UUnit.height * i + UUnit.vMargin * i,
      });
      group.add(rect, text);

      return group;
    });
    this.add(...us);
  }

  clone(): this {
    return new UUnit(this.count, this.align) as this;
  }
}
