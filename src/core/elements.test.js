/* eslint-disable no-new */
import {injectedCssUpdater} from '../styles/style';
import {ElementBuilder, Elements, elementIdGetter} from './elements';
import * as general from '../helpers/general';

// const general = jest.createMockFromModule('../helpers/general.js');
jest
  .spyOn(general, 'unicGlobalVarNameGenerator')
  .mockImplementation()
  .mockReturnValueOnce('mockId1')
  .mockReturnValueOnce('mockId2')
  .mockReturnValueOnce('mockId3');
jest.spyOn(general, 'getRandomColor').mockImplementation().mockReturnValue('#FFFFFF');

describe('class ElementBuilder', () => {
  it('object Elements start a empty object', () => {
    expect.assertions(1);

    expect(Elements).toStrictEqual({});
  });

  it('test new ElementBuider instance default values', () => {
    expect.assertions(5);

    jest.spyOn(general, 'createElement');
    const {className, id, onDraggingElement, style, tag, text} = new ElementBuilder(
      document.body,
      'div'
    );

    expect(general.createElement).toHaveBeenCalledWith({
      tag,
      id,
      className,
      text,
    });
    expect(className).toStrictEqual('');
    expect(onDraggingElement).toStrictEqual(false);
    expect(style['background-color']).toStrictEqual('#FFFFFF');
    expect(text).toStrictEqual('');
  });

  it('class ElementBuider change Elements content', () => {
    expect.assertions(1);

    const quantOfElements = Object.keys(Elements).length;
    expect(quantOfElements).toStrictEqual(1);
  });

  it('class ElementBuilder inject children on Elements', () => {
    expect.assertions(1);

    const {element} = Elements[elementIdGetter()];
    new ElementBuilder(element, 'div');
    new ElementBuilder(element, 'div');
    const quantOfElements = Object.keys(Elements).length;

    expect(quantOfElements).toStrictEqual(3);
  });

  it('function injectedCssUpdater insert style tag on html head', () => {
    expect.assertions(1);

    injectedCssUpdater();

    const style = document.getElementsByTagName('head')[0].getElementsByTagName('style')[0];

    expect(style).not.toBeUndefined();
  });

  it('take a snapshot of Elements', () => {
    expect.assertions(1);

    expect(Elements).toMatchSnapshot();
  });
});

// const { element } = Elements[elementIdGetter()];
// element.dispatchEvent(new Event('mousedown'));
// element.dispatchEvent(new Event('mousemove'));
