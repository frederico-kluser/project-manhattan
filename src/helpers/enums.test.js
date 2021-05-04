import {enums, keyCodeCommandsEnum, keyCodeLettersEnum, keyCodeNumbersEnum} from './enums';

describe('variable enums', () => {
  it('enums have exactly...', () => {
    expect.assertions(1);

    expect(enums).toMatchSnapshot();
  });
});

describe('variable keyCodeLettersEnum', () => {
  it('keyCodeLettersEnum have exactly...', () => {
    expect.assertions(1);

    expect(keyCodeLettersEnum).toMatchSnapshot();
  });
});

describe('variable keyCodeNumbersEnum', () => {
  it('keyCodeNumbersEnum have exactly...', () => {
    expect.assertions(1);

    expect(keyCodeNumbersEnum).toMatchSnapshot();
  });
});

describe('variable keyCodeCommandsEnum', () => {
  it('enums have exactly...', () => {
    expect.assertions(1);

    expect(keyCodeCommandsEnum).toMatchSnapshot();
  });
});
