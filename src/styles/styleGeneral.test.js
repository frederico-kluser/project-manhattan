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
const baseStyle = `
body {
  background-color: #212121;
}

body {
  margin: 0px;
  padding: 0px;
}

.noselect {
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.kluser_helper {
  background-color: #212121;
  border-radius: 10px;
  border: 1px solid #FFFFFF;
  height: 30px;
  left: 25px;
  max-width: 30px;
  min-width: 30px;
  opacity: 0.1;
  overflow: hidden;
  position: fixed;
  text-align: center;
  top: 25px;
  transition-timing-function: linear;
  transition: all 0.25s;
  transition: opacity 0.25s, max-width 0.5s;
  width: auto;
}

.kluser_helper:hover {
  opacity: 1;
}

.kluser_helper .material-icons {
  background-color: #212121;
  color: #FFFFFF;
  font-size: 20px;
  left: 0px;
  line-height: 30px;
  position: absolute;
  width: 30px;
  z-index: 1;
}

.kluser_text {
  color: #FFFFFF;
  float: left;
  font-family: 'Roboto Mono', monospace;
  font-helperBubbleDefaultPixelSize: 14px;
  height: 30px;
  line-height: 30px;
  margin-left: 38px;
  padding-right: 16px;
  position: relative;
  text-align: right;
}

.kluser_text:empty {
  display: none;
}

.kluser_input {
  background-color: transparent;
  border: none;
  color: #EEEEEE;
  display: none;
  float: left;
  font-family: 'Roboto Mono', monospace;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding-right: 16px;
  padding: 0px;
}

.kluser_input::placeholder {
  color: #BDBDBD;
}
`;
const baseStyleWithMockId1 = `${baseStyle}
#mockId1 {
	background-color: #FFFFFF;
	border: 1px solid black;
	height: 100px;
	left: 100px;
	position: relative;
	top: 100px;
	width: 100px;
}
`;
const baseStyleWithLinks = `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&amp;display=swap" rel="stylesheet"><style type="text/css">${baseStyle}</style>`;

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

    expect(styleTagElementGetter().innerHTML).toStrictEqual(baseStyle);
    expect(document.getElementsByTagName('head')[0].innerHTML).toStrictEqual(baseStyleWithLinks);
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

    expect(styleTagElementGetter().innerHTML).toStrictEqual(baseStyleWithMockId1);
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
