/* eslint-disable no-new */
import {injectedCssUpdater} from '../styles/styleGeneral';
import {ElementBuilder, Elements, elementIdGetter, ElementConfig} from './elements';
import * as general from '../helpers/general';
import * as drag from './drag';

jest
  .spyOn(general, 'unicGlobalVarNameGenerator')
  .mockImplementation()
  .mockReturnValueOnce('mockId1')
  .mockReturnValueOnce('mockId2')
  .mockReturnValueOnce('mockId3');
jest.spyOn(general, 'getRandomColor').mockImplementation().mockReturnValue('#FFFFFF');

describe('function ElementBuilder', () => {
  it('object Elements start a empty object', () => {
    expect.assertions(3);

    expect(Elements).toStrictEqual({});
    expect(Object.keys(Elements)).toHaveLength(0);
    ElementBuilder(document.body, 'div');
    expect(Object.keys(Elements)).toHaveLength(1);
  });

  it('inject children on Elements', () => {
    expect.assertions(4);

    expect(Object.keys(Elements)).toHaveLength(1);
    const elementFather = Elements[elementIdGetter()].elementGetter();

    ElementBuilder(elementFather, 'div');
    const elementSon1 = Elements[elementIdGetter()].elementGetter();

    ElementBuilder(elementFather, 'div');
    const elementSon2 = Elements[elementIdGetter()].elementGetter();

    const quantOfElements = Object.keys(Elements).length;

    expect(quantOfElements).toStrictEqual(3);
    expect(elementFather.childNodes[0]).toStrictEqual(elementSon1);
    expect(elementFather.childNodes[1]).toStrictEqual(elementSon2);
  });

  it('function injectedCssUpdater insert style tag on html head', () => {
    expect.assertions(3);

    const styleTagContent = () =>
      document.getElementsByTagName('head')[0].getElementsByTagName('style')[0];

    expect(styleTagContent()).toBeUndefined();
    injectedCssUpdater();
    expect(styleTagContent()).not.toBeUndefined();
    expect(styleTagContent()).toMatchSnapshot();
  });

  it('take a snapshot of Elements', () => {
    expect.assertions(1);

    expect(Elements).toMatchSnapshot();
  });

  it('test created elements', () => {
    expect.assertions(4);

    const element = Elements[elementIdGetter()].elementGetter();

    const dragStartEventSetterSpied = jest.spyOn(drag, 'dragStartEventSetter');
    const dragMoveEventSetterSpied = jest.spyOn(drag, 'dragMoveEventSetter');
    const dragEndEventSetterSpied = jest.spyOn(drag, 'dragEndEventSetter');

    element.dispatchEvent(new Event('mousedown'));
    element.dispatchEvent(new Event('mousemove'));
    element.dispatchEvent(new Event('mouseup'));

    expect(element).toMatchSnapshot();
    // fix this for call all functions
    expect(dragStartEventSetterSpied).not.toHaveBeenCalled();
    expect(dragMoveEventSetterSpied).not.toHaveBeenCalled();
    expect(dragEndEventSetterSpied).not.toHaveBeenCalled();
    // element.dispatchEvent(new Event('contextmenu'));
  });

  it('take a snapshot of constructor ElementConfig', () => {
    expect.assertions(1);

    expect(ElementConfig).toMatchSnapshot();
  });
});
