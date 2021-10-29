import {ElementBuilder} from '../core/elements';
import {
  propertyCommands,
  propertyHasSizeType,
  propertyShiftCommands,
  propertySizeInPixels,
} from './cssProperties';

describe('object propertyShiftCommands', () => {
  it('default value', () => {
    expect.assertions(3);

    expect(propertyShiftCommands.h).not.toBeUndefined();
    expect(propertyShiftCommands.h()).not.toBeUndefined();
    expect(propertyShiftCommands).toMatchSnapshot();
  });
});

describe('object propertyHasSizeType', () => {
  it('default value', () => {
    expect.assertions(1);

    expect(propertyHasSizeType).toStrictEqual({
      padding: true,
      margin: true,
      top: true,
      left: true,
      width: true,
      height: true,
    });
  });
});

describe('object propertyCommands', () => {
  ElementBuilder(document.body, 'div');

  it('default value', () => {
    expect.assertions(6);

    expect(propertyCommands.height({command: 'height', value: ''})).toBeTruthy();
    expect(propertyCommands.left({command: 'left', value: ''})).toBeTruthy();
    expect(propertyCommands.margin({command: 'margin', value: ''})).toBeTruthy();
    expect(propertyCommands.padding({command: 'padding', value: ''})).toBeTruthy();
    expect(propertyCommands.top({command: 'top', value: ''})).toBeTruthy();
    expect(propertyCommands.width({command: 'width', value: ''})).toBeTruthy();
  });
});

describe('object propertySizeInPixels', () => {
  it('default value', () => {
    expect.assertions(1);

    expect(propertySizeInPixels).toStrictEqual({
      top: 'offsetTop',
      left: 'offsetLeft',
      width: 'clientWidth',
      height: 'clientHeight',
    });
  });
});
