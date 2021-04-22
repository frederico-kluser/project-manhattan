/* eslint-disable no-prototype-builtins */
import {getRandomColor, unicGlobalVarNameGenerator} from './general';

describe('funcion unicGlobalVarNameGenerator', () => {
  it('test random ids', () => {
    expect.assertions(4);

    expect(unicGlobalVarNameGenerator()).not.toBeUndefined();
    expect(typeof unicGlobalVarNameGenerator()).toStrictEqual('string');
    expect(unicGlobalVarNameGenerator().charAt(0)).toStrictEqual('_');
    expect(unicGlobalVarNameGenerator()).toHaveLength(10);
  });

  it('test while conditional', () => {
    expect.assertions(2);

    jest.spyOn(window, 'hasOwnProperty').mockImplementation(() => true);
    expect(window.hasOwnProperty()).toBeTruthy();
    jest.spyOn(window, 'hasOwnProperty').mockImplementation(() => false);
    expect(window.hasOwnProperty()).toBeFalsy();
  });
});

describe('function getRandomColor', () => {
  it('test returned color', () => {
    expect.assertions(2);

    expect(getRandomColor()).toHaveLength(7);
    expect(getRandomColor().charAt(0)).toStrictEqual('#');
  });
});
