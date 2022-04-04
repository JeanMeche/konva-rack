import Konva from 'konva';
import { Colors } from '../style';

export interface FeedGaugeConfig {
  side: 'left' | 'right';
  critical?: number;
  warning?: number;
  min?: number;
  max?: number;
  percentage: number;
}

export class FeedGauge extends Konva.Group {
  static height = 500;
  static width = 48;

  constructor(config: FeedGaugeConfig) {
    super();
    const backgroundRect = new Konva.Rect({
      height: FeedGauge.height,
      width: FeedGauge.width,
      cornerRadius: FeedGauge.width,
      fill: '#eee',
    });

    const colorRect = new Konva.Rect({
      height: FeedGauge.height * config.percentage,
      y: FeedGauge.height - FeedGauge.height * config.percentage,
      width: FeedGauge.width,
      cornerRadius: [0, 0, FeedGauge.width, FeedGauge.width],

      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 48, y: 0 },
      fillLinearGradientColorStops: [0, '#65A81C', 1, '#7ED321'],
    });

    this.add(backgroundRect, colorRect);

    const decile = FeedGauge.height / 10;
    [...Array(9).keys()].map((i) => {
      const y = decile * (i + 1);
      const line = new Konva.Line({
        points: [0, y, FeedGauge.width, y],
        stroke: 'white',
        strokeWidth: 2,
        dash: [FeedGauge.width / 2 - 10, 20],
      });
      this.add(line);
    });

    if (config.critical & config.max) {
      const y =
        FeedGauge.height - (config.critical / config.max) * FeedGauge.height;

      const critical = new Konva.Line({
        points: [-8, y, FeedGauge.width + 8, y],
        stroke: 'red',
        strokeWidth: 2,
        dash: [8, 4],
      });

      const label = new Konva.Text({ text: 'Critical', fill: '#727E84' });
      const labelSize = label.getClientRect();
      if (config.side === 'left') {
        label.position({
          x: -labelSize.width - 12,
          y: y - labelSize.height / 2,
        });
      } else {
        label.position({
          x: FeedGauge.width + 12,
          y: y - labelSize.height / 2,
        });
      }
      this.add(critical, label);
    }

    if (config.warning & config.max) {
      const y =
        FeedGauge.height - (config.warning / config.max) * FeedGauge.height;

      const warning = new Konva.Line({
        points: [-8, y, FeedGauge.width + 8, y],
        stroke: 'yellow',
        strokeWidth: 2,
        dash: [8, 4],
      });

      const label = new Konva.Text({ text: 'Warning', fill: '#727E84' });
      const labelSize = label.getClientRect();
      if (config.side === 'left') {
        label.position({
          x: -labelSize.width - 12,
          y: y - labelSize.height / 2,
        });
      } else {
        label.position({
          x: FeedGauge.width + 12,
          y: y - labelSize.height / 2,
        });
      }
      this.add(warning, label);
    }

    const minValue = new Konva.Text({ text: '0W', fontSize: 18 });
    const minLabelSize = minValue.getClientRect();
    const maxValue = new Konva.Text({ text: '250 W', fontSize: 18 });
    const maxLabelSize = maxValue.getClientRect();

    if (config.side === 'left') {
      minValue.position({ x: -minLabelSize.width - 12, y: FeedGauge.height });
      maxValue.position({ x: -maxLabelSize.width - 12, y: 0 });
    } else {
      minValue.position({ x: FeedGauge.width + 12, y: FeedGauge.height });
      maxValue.position({ x: FeedGauge.width + 12, y: 0 });
    }

    this.add(minValue, maxValue);
  }
}
