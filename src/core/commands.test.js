import {stopKeyboardCommandsGetter, stopKeyboardCommandsSetter} from './commands.js';

describe('variable stopKeyboardCommands', () => {
  it('function stopKeyboardCommandsSetter(1) produces stopKeyboardCommandsGetter true', () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter(1);
    expect(stopKeyboardCommandsGetter()).toStrictEqual(true);
  });

  it("function stopKeyboardCommandsSetter('a') produces stopKeyboardCommandsGetter true", () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter('a');
    expect(stopKeyboardCommandsGetter()).toStrictEqual(true);
  });

  it('function stopKeyboardCommandsSetter(0) produces stopKeyboardCommandsGetter false', () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter(0);
    expect(stopKeyboardCommandsGetter()).toStrictEqual(false);
  });

  it("function stopKeyboardCommandsSetter('') produces stopKeyboardCommandsGetter false", () => {
    expect.assertions(1);
    stopKeyboardCommandsSetter('');
    expect(stopKeyboardCommandsGetter()).toStrictEqual(false);
  });
});
