import Konva from 'konva';
import { boldStyle } from './style';

export class Gauge extends Konva.Group {
  constructor(precentage: number, label: string, color: string = '#71B249') {
    const gaugeWidth = 128;
    const gaugeHeight = 24;

    super({
      height: 24,
      y: -6,
      width: gaugeWidth,
    });

    const gaugeBg = new Konva.Rect({
      width: gaugeWidth,
      height: gaugeHeight,
      cornerRadius: gaugeHeight,
      fill: 'white',
      opacity: 0.5,
    });

    const gaugeColor = new Konva.Rect({
      width: gaugeWidth * precentage,
      height: 24,
      cornerRadius: [24, 0, 0, 24],
      fill: color,
    });

    const gaugeValue = new Konva.Text({
      width: gaugeWidth,
      height: gaugeHeight,
      text: label,
      ...boldStyle,
      fontSize: 16,
      align: 'center',
      verticalAlign: 'middle',
    });

    this.add(gaugeBg, gaugeColor, gaugeValue);
  }
}
