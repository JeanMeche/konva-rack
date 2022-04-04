import Konva from 'konva';
import { Feed, FeedConfig } from '../Feed/feed';
import { Gauge } from '../gauge';
import { RackHeader } from '../rack-header';
import { boldStyle, Colors } from '../style';

export class FeedHeader extends Konva.Group {
  constructor(config: FeedConfig) {
    super();

    const backgroundRect = new Konva.Rect({
      width: Feed.width,
      height: RackHeader.height,
      fill: Colors.darkSlate,
      cornerRadius: [8, 8, 0, 0],
    });

    const titleRect = new Konva.Rect({
      fill: config.color,
      height: 42,
      width: Feed.width,
      cornerRadius: [8, 8, 0, 0],
    });

    const titleText = new Konva.Text({
      ...boldStyle,
      text: config.side === 'left' ? 'Feed A' : 'Feed B',
      height: 42,
      verticalAlign: 'middle',
      x: 12,
    });

    const feedName = new Konva.Text({
      ...boldStyle,
      textDecoration: 'underline',
      fontSize: 20,
      text: 'EDF',
      x: 12,
      y: 52,
    });

    const gauge = new Gauge({
      color: config.color,
      percentage: 0.23,
      label: '23 %',
      width: 128,
    });
    gauge.position({
      y: RackHeader.height - 24 - 12,
      x: Feed.width - 128 - 12,
    });

    this.add(backgroundRect, titleRect, titleText, feedName, gauge);
  }
}
