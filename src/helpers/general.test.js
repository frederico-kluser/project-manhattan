/* eslint-disable no-prototype-builtins */
import {
  builderMenu,
  conditionalFunctionExecute,
  createElement,
  getRandomColor,
  unicGlobalVarNameGenerator,
} from './general';
import * as general from './general';

describe('funcion unicGlobalVarNameGenerator', () => {
  it('test random ids', () => {
    expect.assertions(4);

    expect(unicGlobalVarNameGenerator()).not.toBeUndefined();
    expect(typeof unicGlobalVarNameGenerator()).toStrictEqual('string');
    expect(unicGlobalVarNameGenerator().charAt(0)).toStrictEqual('_');
    expect(unicGlobalVarNameGenerator()).toHaveLength(10);
  });
});

describe('function getRandomColor', () => {
  it('test returned color', () => {
    expect.assertions(2);

    expect(getRandomColor()).toHaveLength(7);
    expect(getRandomColor().charAt(0)).toStrictEqual('#');
  });
});

describe('function createElement', () => {
  it('test returned empty div element', () => {
    expect.assertions(8);

    const element = createElement({tag: 'div'});

    expect(element.tagName).toStrictEqual('DIV');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('');
  });

  it('test returned p with class', () => {
    expect.assertions(8);

    const element = createElement({tag: 'p', className: 'show'});

    expect(element.tagName).toStrictEqual('P');
    expect(element.className).toStrictEqual('show');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('');
  });

  it('test returned section with custom property', () => {
    expect.assertions(8);

    const element = createElement({
      tag: 'section',
      attributes: [{attribute: 'custom-property', value: 'test'}],
    });

    expect(element.tagName).toStrictEqual('SECTION');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toStrictEqual('test');
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('');
  });

  it('test returned article with chield', () => {
    expect.assertions(8);

    const element = createElement({tag: 'article', chield: [createElement({tag: 'div'})]});

    expect(element.tagName).toStrictEqual('ARTICLE');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(1);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('<div></div>');
  });

  it('test returned span with text', () => {
    expect.assertions(8);

    const element = createElement({tag: 'span', text: 'test'});

    expect(element.tagName).toStrictEqual('SPAN');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toStrictEqual('test');
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('');
  });

  it('test returned header element', () => {
    expect.assertions(8);

    const element = createElement({tag: 'header', id: 'test'});

    expect(element.tagName).toStrictEqual('HEADER');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('test');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('');
  });

  it('test returned footer element', () => {
    expect.assertions(8);

    const element = createElement({tag: 'footer', style: 'color:red;'});

    expect(element.tagName).toStrictEqual('FOOTER');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toStrictEqual('color:red;');
    expect(element.innerHTML).toStrictEqual('');
  });

  it('test returned h1 element', () => {
    expect.assertions(8);

    const element = createElement({tag: 'h1', html: 'test'});

    expect(element.tagName).toStrictEqual('H1');
    expect(element.className).toStrictEqual('');
    expect(element.getAttribute('custom-property')).toBeNull();
    expect(element.childElementCount).toStrictEqual(0);
    expect(element.innerText).toBeUndefined();
    expect(element.id).toStrictEqual('');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.innerHTML).toStrictEqual('test');
  });
});

describe('function conditionalFunctionExecute', () => {
  it('text execute first function', () => {
    expect.assertions(1);

    const firstFunction = () => 'first';
    const secondFunction = () => '';

    expect(conditionalFunctionExecute(firstFunction, secondFunction)).toBeTruthy();
  });

  it('text execute second function', () => {
    expect.assertions(1);

    const firstFunction = () => '';
    const secondFunction = () => 'second';

    expect(conditionalFunctionExecute(firstFunction, secondFunction)).toBeTruthy();
  });

  it('text execute two false functions', () => {
    expect.assertions(1);

    const firstFunction = () => '';
    const secondFunction = () => '';

    expect(conditionalFunctionExecute(firstFunction, secondFunction)).toBeFalsy();
  });
});

describe('function builderMenu', () => {
  it('text execute function', () => {
    expect.assertions(2);

    const argument = {
      preventDefault: () => true,
    };
    const spyBuilderMenu = jest.spyOn(general, 'builderMenu');
    const spyArgument = jest.spyOn(argument, 'preventDefault');
    builderMenu(argument);

    expect(spyBuilderMenu).toHaveBeenCalledWith(argument);
    // eslint-disable-next-line jest/prefer-called-with
    expect(spyArgument).toHaveBeenCalled();
  });
});
