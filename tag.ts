import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

export class Tag extends Konva.Group {
  private backgroundRect: Konva.Rect;

  constructor(
    text: string,
    onClick?: (e: KonvaEventObject<MouseEvent>) => void
  ) {
    super({});

    const height = 20;

    const label = new Konva.Text({
      fontSize: 11,
      fontFamily: 'Arial',
      fill: 'black',
      text,
      height,
      verticalAlign: 'middle',
      align: 'center',
    });

    this.backgroundRect = new Konva.Rect({
      x: label.x(),
      y: label.y(),
      width: label.width() + 16,
      height,
      fill: '#ccc',
      cornerRadius: 20,
    });
    label.width(this.backgroundRect.getClientRect().width);

    this.size(this.backgroundRect.size());
    this.add(this.backgroundRect, label);

    if (onClick) {
      this.on('mouseover', function () {
        this.backgroundRect.fill('#999');
      });

      this.on('mouseout', function () {
        this.backgroundRect.fill('#ccc');
      });

      this.on('click', (e) => {
        onClick(e);
      });
    }
  }
}
