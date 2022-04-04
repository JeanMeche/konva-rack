import Konva from 'konva';
import { FeedHeader } from '../Feed/feed-header';

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
  }
}
