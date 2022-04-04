import Konva from 'konva';
import { FeedGauge } from '../Feed/feed-gauge';
import { FeedHeader } from '../Feed/feed-header';
import { Outlets } from '../Feed/outlets';

export interface FeedConfig {
  color: string;
  side: 'left' | 'right';
}

export class Feed extends Konva.Group {
  static width = 300;
  static height = 1000;

  constructor(config: FeedConfig) {
    super();

    const backgroundRect = new Konva.Rect({
      height: Feed.height,
      width: Feed.width,
      cornerRadius: 8,

      shadowColor: 'black',
      shadowBlur: 2,
      shadowOffset: { y: 1, x: 0 },
      shadowOpacity: 0.4,
      fill: '#fff',
    });

    const header = new FeedHeader(config);
    this.add(backgroundRect, header);

    const feedGauge = new FeedGauge({
      side: config.side,
      percentage: 0.8,
      critical: 180,
      warning: 105,
      max: 250,
    });

    const outlets = new Outlets({ side: config.side });
    if (config.side === 'left') {
      outlets.position({
        x: Feed.width - Outlets.width - 12,
        y: FeedHeader.height + 12,
      });
      feedGauge.position({
        x: 100,
        y: FeedHeader.height + 24,
      });
    } else {
      outlets.position({
        x: 12,
        y: FeedHeader.height + 12,
      });
      feedGauge.position({
        x: Outlets.width + 64,
        y: FeedHeader.height + 24,
      });
    }
    this.add(outlets, feedGauge);

    backgroundRect.height(
      FeedHeader.height + 12 + outlets.getClientRect().height + 12
    );
  }
}
