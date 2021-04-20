import {stopKeyboardCommandsGetter, stopKeyboardCommandsSetter} from './commands.js';

describe('stopKeyboardCommands variable', () => {
  it('stopKeyboardCommandsSetter(1) produces stopKeyboardCommandsGetter true', () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter(1);
    expect(stopKeyboardCommandsGetter()).toStrictEqual(true);
  });

  it("stopKeyboardCommandsSetter('a') produces stopKeyboardCommandsGetter true", () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter('a');
    expect(stopKeyboardCommandsGetter()).toStrictEqual(true);
  });

  it('stopKeyboardCommandsSetter(0) produces stopKeyboardCommandsGetter false', () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter(0);
    expect(stopKeyboardCommandsGetter()).toStrictEqual(false);
  });

  it("stopKeyboardCommandsSetter('') produces stopKeyboardCommandsGetter false", () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter('');
    expect(stopKeyboardCommandsGetter()).toStrictEqual(false);
  });
});
