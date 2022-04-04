import Konva from 'konva';
import { boldStyle, textStyle } from './style';

interface GaugeConfig {
  percentage: number;
  label: string;
  height?: number;
  width?: number;
  color?: string;
  textColor?: string;
}

export class Gauge extends Konva.Group {
  constructor(config: GaugeConfig) {
    const gaugeWidth = config.width ?? 128;
    const gaugeHeight = config.height ?? 24;
    const color = config.color ?? '#71B249';
    const textColor = config.textColor ?? 'white';

    super({
      height: gaugeHeight,
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
      width: gaugeWidth * config.percentage,
      height: gaugeHeight,
      cornerRadius: [24, 0, 0, 24],
      fill: color,
    });

    const gaugeValue = new Konva.Text({
      ...textStyle,
      width: gaugeWidth,
      height: gaugeHeight,
      text: config.label,
      fill: textColor,
      fontSize: gaugeHeight * 0.6,
      align: 'center',
      verticalAlign: 'middle',
    });

    this.add(gaugeBg, gaugeColor, gaugeValue);
  }
}
