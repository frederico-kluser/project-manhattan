/* eslint-disable complexity */
import {
  enums,
  keyCodeCommandsEnum,
  keyCodeLettersEnum,
  keyCodeNumbersEnum,
} from '../helpers/enums.js';
import {conditionalFunctionExecute} from '../helpers/general.js';
import {propertyCommands, propertyShiftCommands} from '../styles/cssProperties.js';
import {
  helperBubbleStructure,
  styleTagUpdater,
  updateHelperBubble,
} from '../styles/styleGeneral.js';
import {ElementBuilder, elementIdGetter, Elements} from './elements.js';
// import recognition from './voice.js';

let key;

let stopKeyboardCommands = false;
export const stopKeyboardCommandsGetter = () => stopKeyboardCommands;
export const stopKeyboardCommandsSetter = value => {
  stopKeyboardCommands = !!value;
};

export let keyboardShortcutsListenerBool = false;

let shortCutCommands = {
  command: '',
  icon: enums.icons.search,
  placeholder: '',
  value: '',
};
export const shortCutCommandsSetter = (command, placeholder = '...') => {
  shortCutCommands.command = command;
  shortCutCommands.placeholder = placeholder;
  return true;
};

const elementInfo = {
  tag: '',
  className: '',
  text: '',
};

export const commandResetter = () => {
  keyboardShortcutsListenerBool = false;
  shortCutCommands = {
    command: '',
    icon: enums.icons.search,
    placeholder: '',
    value: '',
  };
};

const commandExecutor = () => {
  const {command} = shortCutCommands;
  const {freeMode, sizeMode, moveMode} = enums.mod;
  const {className, innerText, newElement} = enums.command;

  console.log('Execute command');
  console.log(command);

  let commandResetterBool = true;

  if (propertyCommands[command]) {
    propertyCommands[command](shortCutCommands);
  } else {
    switch (command) {
      case freeMode:
      case sizeMode:
      case moveMode:
        Elements[elementIdGetter()].modeSetter(command);
        break;
      case newElement:
        commandResetterBool = false;
        shortCutCommands.command = 'className';
        shortCutCommands.icon = enums.icons.playlist_add;
        shortCutCommands.placeholder = 'classes separated by space';
        elementInfo.tag = shortCutCommands.value;
        break;
      case className:
        commandResetterBool = false;
        shortCutCommands.command = 'innerText';
        shortCutCommands.placeholder = 'text thats will inserted';
        elementInfo.className = shortCutCommands.value;
        break;
      case innerText:
        elementInfo.text = shortCutCommands.value;
        // eslint-disable-next-line no-case-declarations
        const element = Elements[elementIdGetter()].elementGetter();
        // eslint-disable-next-line no-new
        new ElementBuilder(element, elementInfo.tag, elementInfo.className, elementInfo.text);
        break;
    }
  }

  styleTagUpdater();

  if (commandResetterBool) {
    commandResetter();
  } else {
    updateHelperBubble(
      shortCutCommands.command,
      shortCutCommands.icon,
      shortCutCommands.placeholder
    );
  }
};

const getControlCommands = {
  s: () => shortCutCommandsSetter(enums.mod.sizeMode),
  1: () => shortCutCommandsSetter(enums.mod.sizeMode),
  m: () => shortCutCommandsSetter(enums.mod.moveMode),
  2: () => shortCutCommandsSetter(enums.mod.moveMode),
  f: () => shortCutCommandsSetter(enums.mod.freeMode),
  3: () => shortCutCommandsSetter(enums.mod.freeMode),
};

const getShiftCommands = {
  ...propertyShiftCommands,
  n: () => shortCutCommandsSetter(enums.command.newElement, 'div, h1, p'),
  v: () => {
    // recognition.continuous = false;
    // recognition.start();
    console.log('I will add voice');
  },
};

export const keyboardShortcutsListener = e => {
  key = e.which || e.keyCode;
  console.log('key :', key);
  const letter = keyCodeLettersEnum[key];
  const number = keyCodeNumbersEnum[key];
  shortCutCommands.value = helperBubbleStructure.input.value;

  if (keyboardShortcutsListenerBool && keyCodeCommandsEnum[key] === 'enter') {
    commandExecutor();
  } else if (e.shiftKey && !stopKeyboardCommandsGetter()) {
    keyboardShortcutsListenerBool = conditionalFunctionExecute(
      getShiftCommands[letter],
      commandResetter
    );
    if (keyboardShortcutsListenerBool) {
      updateHelperBubble(
        shortCutCommands.command,
        enums.icons.shortcut,
        shortCutCommands.placeholder
      );
    }
  } else if (
    e.ctrlKey &&
    !stopKeyboardCommandsGetter() &&
    conditionalFunctionExecute(getControlCommands[letter], getControlCommands[number])
  ) {
    const mod = shortCutCommands.command;
    commandExecutor();
    updateHelperBubble(`${mod} activate`, enums.icons.mode);
  }
};

document.addEventListener('keydown', keyboardShortcutsListener, false);
document.addEventListener(
  'mousemove',
  () => {
    if (keyboardShortcutsListenerBool) {
      commandResetter();
      updateHelperBubble();
    }
  },
  false
);
