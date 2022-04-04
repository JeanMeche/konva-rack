import Konva from 'konva';
import { TextConfig } from 'konva/lib/shapes/Text';
import { Gauge } from './gauge';
import { RackContainer } from './rack-container';
import { UUnit } from './u-unit';

const textStyle: TextConfig = {
  fill: 'white',
  fontSize: 16,
  fontFamily: 'Arial',
  fontStyle: '400',
};

const boldStyle: TextConfig = {
  ...textStyle,
  fontSize: 18,
  fontStyle: 'bold',
};

export class RackHeader extends Konva.Group {
  static height = 164;

  constructor() {
    super({});
    const backgroundRect = new Konva.Rect({
      fill: '#424e54',
      height: RackHeader.height,
      width: RackContainer.width,
      cornerRadius: [8, 8, 0, 0],
    });
    this.add(backgroundRect);

    const titleText = new Konva.Text({
      text: 'Rack 01',
      x: 24,
      y: 24,
      ...boldStyle,
    });
    this.add(titleText);

    this.available();
    this.rackUsage();
    this.rackPower();
  }

  available() {
    const availableData = new Konva.Text({
      text: '29U, 16 Outlets',
      ...boldStyle,
    });

    const availableLabel = new Konva.Text({
      text: 'Available',
      y: 32,
      ...textStyle,
    });

    const availableGroup = new Konva.Group({
      y: 96,
      x: 24,
    });
    availableGroup.add(availableData, availableLabel);
    this.add(availableGroup);
  }

  rackUsage() {
    const data = new Konva.Text({
      text: '1846 W',
      ...boldStyle,
    });

    const label = new Konva.Text({
      text: 'Rack Usage',
      y: 32,
      ...textStyle,
    });

    const group = new Konva.Group({
      y: 96,
      x: RackContainer.width / 3 + 24,
    });
    group.add(data, label);
    this.add(group);
  }

  rackPower() {
    const label = new Konva.Text({
      text: 'Total Rack Power',
      align: 'right',
      y: 32,
      ...textStyle,
    });

    const gauge = new Gauge({ percentage: 0.5, label: `${5530} W` });

    const group = new Konva.Group({
      y: 96,
      x: (2 * RackContainer.width) / 3 + 32,
    });
    group.add(gauge, label);
    this.add(group);
  }
}
