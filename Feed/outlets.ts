import Konva from 'konva';
import { Colors } from '../style';

export interface OutletsConfig {
  side: 'left' | 'right';
}

export class Outlets extends Konva.Group {
  static width = 84;
  static outletSize = 24;

  constructor(config: OutletsConfig) {
    super();
    const backgroundRect = new Konva.Rect({
      stroke: '#aaa',
      strokeWidth: 1,
      fill: '#fff',
      width: Outlets.width,
      cornerRadius: 4,
    });

    const outletsCount = 32;
    const outlets = [...Array(outletsCount).keys()].map((index) => {
      const rect = new Konva.Rect({
        width: Outlets.outletSize,
        height: Outlets.outletSize,
        stroke: Colors.green,
      });
      const text = new Konva.Text({
        fontSize: 11,
        text: `A${index + 1}`,
        height: Outlets.outletSize,
        width: Outlets.outletSize,
        align: 'center',
        verticalAlign: 'middle',
      });

      let group: Konva.Group;
      if (config.side === 'left') {
        group = new Konva.Group({
          x: 8,
          y: 8 + (Outlets.outletSize + 8) * index,
        });
      } else {
        group = new Konva.Group({
          x: Outlets.width - Outlets.outletSize - 8,
          y: 8 + (Outlets.outletSize + 8) * index,
        });
      }
      group.add(rect, text);
      return group;
    });

    this.add(backgroundRect, ...outlets);

    backgroundRect.height(this.getClientRect().height + 8);
  }
}
