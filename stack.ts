import Konva from 'konva';

export class Stack extends Konva.Group {
  constructor(private groups: Array<Konva.Group>) {
    super();
    const margin = 8;
    let shift = 0;
    let stackWidth = 0;

    groups.forEach((group, i) => {
      group.x(shift);
      this.add(group);
      const groupWidth = group.width();
      if (i != groups.length - 1) {
        stackWidth += groupWidth + margin;
        shift += groupWidth + margin;
      } else {
        stackWidth += groupWidth;
      }
    });
    this.size({ width: stackWidth, height: 32 });
  }

  clone(): this {
    return new Stack(this.groups) as this;
  }
}
