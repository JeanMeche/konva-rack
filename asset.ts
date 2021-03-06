import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { Gauge } from './gauge';
import { Stack } from './stack';
import { boldStyle, Colors, textStyle } from './style';
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
  uSize: number;

  private titleBg: Konva.Line;

  constructor(private config: AssetConfig) {
    super({
      ...config,
      draggable: true,
      centeredScaling: true,
      id: config.name,
      offset: {
        x: config.width / 2,
        y: (UUnit.height * config.uSize) / 2,
      },
      width: config.width,
      height: UUnit.height * config.uSize + UUnit.vMargin * (config.uSize - 1),
      x: config.width / 2,
    });

    this.groupSize = {
      width: config.width,
      height: UUnit.height * config.uSize + UUnit.vMargin * (config.uSize - 1),
    };
    this.uSize = config.uSize;

    const backgroundRect = new Konva.Rect({
      width: this.groupSize.width,
      height: this.groupSize.height,

      fill: '#424e54',
      strokeWidth: 1,

      shadowColor: 'black',
      shadowBlur: 3,
      shadowOffset: { x: 0, y: 1 },
      shadowOpacity: 0.12,
    });

    this.add(backgroundRect);

    this.assetName();
    this.manufaturerAndInfos();
  }

  topLeft(): { x: number; y: number } {
    const y = this.y();
    return {
      x: 0 - this.groupSize.width / 2,
      y: y - this.groupSize.height / 2,
    };
  }

  private assetName() {
    const titleWidth = this.config.width / 3;
    this.titleBg = new Konva.Line({
      points: [
        0,
        0,
        titleWidth + 15,
        0,
        titleWidth,
        UUnit.height,
        0,
        UUnit.height,
      ],
      fill: Colors.blue,
      closed: true,
      shadowBlur: 4,
      shadowOffset: { x: 0, y: 4 },
      shadowOpacity: 0.25,
    });
    this.add(this.titleBg);

    var assetName = new Konva.Text({
      x: 12,
      text: this.config.name,
      fontSize: 14,
      fontFamily: 'arial',
      fill: Colors.darkSlate,
      width: titleWidth - 4,
      height: UUnit.height,
      verticalAlign: 'middle',
      wrap: 'none',
      padding: 8,
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

  private manufaturerAndInfos() {
    const tag = new Tag('URL', (e) => {
      window.open('http://perdu.com', '_blank').focus();
    });
    const vmCount = new Tag('12 VM');
    const powerGauge = new Gauge({
      percentage: 0.4,
      height: 20,
      width: 80,
      label: '500 W',
      color: '#B3D7EC',
      textColor: 'black',
    });
    if (this.config.uSize === 1) {
      const stack = new Stack([tag, vmCount, powerGauge]);
      stack.position({ x: this.groupSize.width - stack.width() - 12, y: 3 });
      this.add(stack);
      const labelShift = 8;

      const labelWidth =
        this.groupSize.width -
        this.titleBg.width() -
        stack.width() -
        labelShift -
        12;
      const manufaturerLabel = new Konva.Text({
        ...boldStyle,
        fontSize: 14,
        text: this.config.manufaturer,
        width: labelWidth,
        height: UUnit.height,
        x: this.titleBg.width() + labelShift,
        verticalAlign: 'middle',
        ellipsis: true,
      });
      this.add(manufaturerLabel);
    } else {
      const stack = new Stack([tag, vmCount]);
      stack.position({ x: this.groupSize.width - stack.width() - 12, y: 3 });
      this.add(stack);

      const manufaturerLabel = new Konva.Text({
        ...textStyle,
        fontSize: 12,
        fontStyle: '600',
        text: this.config.manufaturer,
        width: this.config.width / 3,
        y: UUnit.height + 8,
        x: 12,
      });
      this.add(manufaturerLabel);
    }
  }
}
