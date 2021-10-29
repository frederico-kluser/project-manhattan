import regex from './regex';

describe('object regex', () => {
  it('test onlyNumbers regex', () => {
    expect.assertions(9);

    // eslint-disable-next-line camelcase
    const {onlyNumbers} = regex;

    expect(!!onlyNumbers.exec('123456789')).toBeTruthy();
    expect(!!onlyNumbers.exec('-1')).toBeTruthy();
    expect(!!onlyNumbers.exec('1')).toBeTruthy();
    expect(!!onlyNumbers.exec(1)).toBeTruthy();
    expect(!!onlyNumbers.exec(-1)).toBeTruthy();
    expect(!!onlyNumbers.exec()).toBeFalsy();
    expect(!!onlyNumbers.exec('a')).toBeFalsy();
    expect(!!onlyNumbers.exec({})).toBeFalsy();
    expect(!!onlyNumbers.exec(['a'])).toBeFalsy();
  });

  it('test test regex', () => {
    expect.assertions(9);

    // eslint-disable-next-line camelcase
    const {onlyNumbers} = regex;

    expect(regex.test('123456789', onlyNumbers)).toBeTruthy();
    expect(regex.test('-1', onlyNumbers)).toBeTruthy();
    expect(regex.test('1', onlyNumbers)).toBeTruthy();
    expect(regex.test(1, onlyNumbers)).toBeTruthy();
    expect(regex.test(-1, onlyNumbers)).toBeTruthy();
    expect(regex.test(undefined, onlyNumbers)).toBeFalsy();
    expect(regex.test('a', onlyNumbers)).toBeFalsy();
    expect(regex.test({}, onlyNumbers)).toBeFalsy();
    expect(regex.test(['a'], onlyNumbers)).toBeFalsy();
  });

  it('test getSizeType regex', () => {
    expect.assertions(4);

    const {getSizeType} = regex;

    expect(getSizeType('1px')).toStrictEqual('px');
    expect(getSizeType('-1vw')).toStrictEqual('vw');
    expect(getSizeType('1%')).toStrictEqual('%');
    expect(getSizeType('-1px')).toStrictEqual('px');
  });

  it('test insertSizeType regex', () => {
    expect.assertions(5);

    const {insertSizeType, onlyNumbers} = regex;

    expect(insertSizeType('10', onlyNumbers, 'px')).toStrictEqual('10px');
    expect(insertSizeType('1', onlyNumbers, '%')).toStrictEqual('1%');
    expect(insertSizeType('10vw', onlyNumbers, 'px')).toStrictEqual('10vw');
    expect(insertSizeType('1vh', onlyNumbers, '%')).toStrictEqual('1vh');
    expect(insertSizeType('', onlyNumbers, '%')).toStrictEqual('%');
  });
});
