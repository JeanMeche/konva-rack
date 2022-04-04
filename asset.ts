import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { boldStyle } from './style';
import { Tag } from './tag';
import { UUnit } from './u-unit';

interface AssetConfig extends RectConfig {
  name: string;
  manufaturer;
  type: 'server' | 'UPS';
  uSize: number;

  dragStart?: (e: KonvaEventObject<DragEvent>, asset: Asset) => void;
  dragEnd?: (e: KonvaEventObject<DragEvent>, assset: Asset) => void;
  dragMove?: (e: KonvaEventObject<DragEvent>, asset: Asset) => void;
}

export class Asset extends Konva.Group {
  groupSize: { width: number; height: number };

  constructor(private config: AssetConfig) {
    super({
      ...config,
      draggable: true,
      centeredScaling: true,
      //      offsetX: -width / 2,
      //      offsetY: -height / 2,
      //rotation: 90,
    });
    this.groupSize = {
      width: config.width,
      height: UUnit.height * config.uSize,
    };
    const backgroundRect = new Konva.Rect({
      width: this.groupSize.width,
      height: this.groupSize.height,
      // x: -width / 2,
      // y: -height / 2,
      fill: '#424e54',
      strokeWidth: 1,
      shadowColor: 'black',
      shadowBlur: 2,
      shadowOffset: { x: 0, y: 1 },
      shadowOpacity: 0.4,
    });

    this.add(backgroundRect);

    this.assetName();
    this.manufaturer();
  }

  assetName() {
    const titleWidth = this.config.width / 3 - 20;
    const titleBg = new Konva.Line({
      points: [
        0,
        0,
        titleWidth,
        0,
        titleWidth + 20,
        UUnit.height,
        0,
        UUnit.height,
      ],
      fill: '#4da3d4',
      closed: true,
    });
    this.add(titleBg);

    var assetName = new Konva.Text({
      x: 12,
      text: this.config.name,
      fontSize: 16,
      fontFamily: 'arial',
      fill: 'white',
      width: titleWidth,
      height: UUnit.height,
      verticalAlign: 'middle',
      wrap: 'none',
      ellipsis: true,
    });
    this.add(assetName);

    this.on('dragstart', (e) => this.config.dragStart?.(e, this));
    this.on('dragend', (e) => this.config.dragEnd?.(e, this));
    this.on('dragmove', (e) => this.config.dragMove?.(e, this));

    this.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    this.on('mouseout', function () {
      document.body.style.cursor = 'default';
    });
  }

  manufaturer() {
    if (this.config.uSize === 1) {
    } else {
      const manufaturerLabel = new Konva.Text({
        ...boldStyle,
        fontSize: 14,
        text: this.config.manufaturer,
        width: this.config.width / 3,
        y: UUnit.height + 8,
        x: 8,
      });

      this.add(manufaturerLabel);

      const tag = new Tag('URL', (e) => {
        window.open('http://perdu.com', '_blank').focus();
      });
      tag.position({ x: 100, y: 0 });
      this.add(tag);
    }
  }
}
