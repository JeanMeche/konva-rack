import Konva from 'konva';

export class UUnit extends Konva.Group {
  static height: number = 30;
  static width: number = 60;

  constructor(public count: number, public align: 'left' | 'right') {
    super();
    const us = Array.from({ length: count }).map((_, i) => {
      const rect = new Konva.Rect({
        width: UUnit.width,
        height: UUnit.height,
        fill: '#ddd',
        stroke: '#bbb',
      });

      const text = new Konva.Text({
        fontSize: 18,
        fontFamily: 'arial',
        text: `${i + 1}`,
        height: UUnit.height,
        width: UUnit.width,
        verticalAlign: 'middle',
        align,
        padding: 8,
      });

      const group = new Konva.Group({ y: UUnit.height * i });
      group.add(rect, text);

      return group;
    });
    this.add(...us);
  }

  clone(): this {
    return new UUnit(this.count, this.align) as this;
  }
}
