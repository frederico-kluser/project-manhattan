import {enums} from '../helpers/enums';
import {
  fixPropertySize,
  helperBubbleStructure,
  injectedCssUpdater,
  makeOnlyElementtouchable,
  styleTagElementGetter,
  styleTagUpdater,
  updateHelperBubble,
} from './styleGeneral';
import * as styleGeneral from './styleGeneral';
import {ElementBuilder, Elements} from '../core/elements';
import * as general from '../helpers/general';

const {helperBubble, helperInput, helperText} = enums.helperBubble;

describe('object styleGeneral', () => {
  it('property symbol', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.symbol).toStrictEqual(enums.icons.search);
  });

  it('property icon property tag', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.icon.tagName).toStrictEqual('SPAN');
  });

  it('property icon property class', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.icon.className).toStrictEqual('material-icons');
  });

  it('property icon property innerText', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.icon.innerText).toStrictEqual(enums.icons.search);
  });

  it('property text property tag', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.text.tagName).toStrictEqual('DIV');
  });

  it('property text property class', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.text.className).toStrictEqual(helperText);
  });

  it('property input property tag', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.input.tagName).toStrictEqual('INPUT');
  });

  it('property input property class', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.input.className).toStrictEqual(helperInput);
  });

  it('property element property tag', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.element.tagName).toStrictEqual('DIV');
  });

  it('property element property class', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.element.className).toStrictEqual(helperBubble);
  });

  it('property element property chield', () => {
    expect.assertions(1);

    expect(helperBubbleStructure.element.childElementCount).toStrictEqual(3);
  });
});

describe('function updateHelperBubble', () => {
  it('execute function', () => {
    expect.assertions(11);

    const updateHelperBubbleSpy = jest.spyOn(styleGeneral, 'updateHelperBubble');
    const {input, element} = helperBubbleStructure;
    updateHelperBubble();

    expect(updateHelperBubbleSpy).toHaveBeenCalledTimes(1);
    expect(helperBubbleStructure.text.innerText).toStrictEqual('');
    expect(helperBubbleStructure.symbol).toStrictEqual(enums.icons.search);
    expect(helperBubbleStructure.icon.innerText).toStrictEqual(enums.icons.search);
    expect(input.getAttribute('placeholder')).toStrictEqual('');
    expect(input.getAttribute('type')).toStrictEqual('text');
    expect(input.getAttribute('size')).toStrictEqual('0');
    expect(input.getAttribute('maxlength')).toStrictEqual('0');
    expect(helperBubbleStructure.input.value).toStrictEqual('');
    expect(input.getAttribute('style')).toStrictEqual('');
    expect(element.getAttribute('style')).toStrictEqual('transition: opacity 0.25s;');
  });

  it('object helperBubbleStructure property input', () => {
    expect.assertions(4);

    updateHelperBubble();

    expect(helperBubbleStructure.input.getAttribute('size')).toStrictEqual('0');
    expect(helperBubbleStructure.input.getAttribute('maxlength')).toStrictEqual('0');
    helperBubbleStructure.input.value = 1;
    helperBubbleStructure.input.dispatchEvent(new Event('keydown'));
    expect(helperBubbleStructure.input.getAttribute('size')).toStrictEqual('3');
    expect(helperBubbleStructure.input.getAttribute('maxlength')).toStrictEqual('3');
  });

  it('execute function with parameters', () => {
    expect.assertions(13);

    jest.useFakeTimers();

    const updateHelperBubbleSpy = jest.spyOn(styleGeneral, 'updateHelperBubble');

    const {input, element} = helperBubbleStructure;
    const helperBubbleInputSpy = jest.spyOn(input, 'focus');
    updateHelperBubble('test', 'test', 'test');
    jest.runAllTimers();

    expect(updateHelperBubbleSpy).toHaveBeenCalledTimes(3);
    expect(helperBubbleStructure.text.innerText).toStrictEqual('test');
    expect(helperBubbleStructure.symbol).toStrictEqual('test');
    expect(helperBubbleStructure.icon.innerText).toStrictEqual('test');
    expect(input.getAttribute('placeholder')).toStrictEqual('test');
    expect(input.getAttribute('type')).toStrictEqual('text');
    expect(input.getAttribute('size')).toStrictEqual('4');
    expect(input.getAttribute('maxlength')).toStrictEqual('4');
    expect(helperBubbleStructure.input.value).toStrictEqual('');
    expect(input.getAttribute('style')).toStrictEqual('display: initial;');
    expect(element.getAttribute('style')).toStrictEqual('opacity:1;max-width:500px;border:none;');
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(helperBubbleInputSpy).toHaveBeenCalledTimes(1);
  });
});

describe('function fixPropertySize', () => {
  it('execute function with wrong values', () => {
    expect.assertions(2);

    expect(fixPropertySize('test', 'test', false)).toStrictEqual('test');
    expect(fixPropertySize('test', 'test', true)).toStrictEqual('test: test;');
  });

  it('execute function with number size', () => {
    expect.assertions(2);

    expect(fixPropertySize('100', 'width', false)).toStrictEqual('100px');
    expect(fixPropertySize('100', 'width', true)).toStrictEqual('width: 100px;');
  });

  it('execute function with relative size', () => {
    expect.assertions(2);

    expect(fixPropertySize('100vh', 'width')).toStrictEqual('100vh');
    expect(fixPropertySize('100vw', 'width', true)).toStrictEqual('width: 100vw;');
  });
});

describe('function styleTagUpdater and injectedCssUpdater', () => {
  it('execute function', () => {
    expect.assertions(2);

    injectedCssUpdater();
    styleTagUpdater();

    expect(styleTagElementGetter().innerHTML).toMatchSnapshot();
    expect(document.getElementsByTagName('head')[0].innerHTML).toMatchSnapshot();
  });

  it('execute function having element', () => {
    expect.assertions(1);

    jest
      .spyOn(general, 'unicGlobalVarNameGenerator')
      .mockImplementation()
      .mockReturnValueOnce('mockId1');
    jest.spyOn(general, 'getRandomColor').mockImplementation().mockReturnValue('#FFFFFF');

    ElementBuilder(document.body, 'div');

    styleTagUpdater();

    expect(styleTagElementGetter().innerHTML).toMatchSnapshot();
  });
});

describe('function makeOnlyElementtouchable', () => {
  it('execute function', () => {
    expect.assertions(2);

    jest
      .spyOn(general, 'unicGlobalVarNameGenerator')
      .mockImplementation()
      .mockReturnValueOnce('mockId2');
    jest.spyOn(general, 'getRandomColor').mockImplementation().mockReturnValue('#FFFFFF');

    ElementBuilder(document.body, 'div');

    const mockId1 = Elements.mockId1.elementGetter();
    const mockId2 = Elements.mockId2.elementGetter();

    makeOnlyElementtouchable(mockId1);

    expect(mockId1.getAttribute('style')).toBeNull();
    expect(mockId2.getAttribute('style')).toStrictEqual('pointer-events: none !important;');
  });
});
