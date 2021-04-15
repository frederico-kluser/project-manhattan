/* eslint-disable complexity */
import {enums, keyCodeCommands, keyCodeLetters, keyCodeNumbers} from '../helpers/enums.js';
import {dynamicFunction} from '../helpers/general.js';
import {attributeCommands, attributeShiftCommands} from '../styles/attributes.js';
import {helper, updateGlobalStyle, updateHelper} from '../styles/style.js';
import {ElementBuilder, elementIdGetter, Elements} from './elements.js';
import recognition from './voice.js';

let key;

export let activeCommands = false;
let shortCutCommands = {
  command: '',
  icon: enums.icons.search,
  placeholder: '',
  value: '',
};
const elementInfo = {
  tag: '',
  className: '',
  text: '',
};

export const resetCommands = () => {
  activeCommands = false;
  shortCutCommands = {
    command: '',
    icon: enums.icons.search,
    placeholder: '',
    value: '',
  };
};

// eslint-disable-next-line complexity
const executeCommands = () => {
  const {command} = shortCutCommands;
  const {sizeMode, moveMode} = enums.mod;
  const {className, innerText, newElement} = enums.command;

  console.log('Execute command');
  console.log(command);

  let resetCommandsBool = true;

  if (attributeCommands[command]) {
    attributeCommands[command](shortCutCommands);
  } else {
    // eslint-disable-next-line default-case
    switch (command) {
      case sizeMode:
      case moveMode:
        Elements[elementIdGetter()].mode = command;
        break;
      case newElement:
        resetCommandsBool = false;
        shortCutCommands.command = 'className';
        shortCutCommands.icon = enums.icons.playlist_add;
        shortCutCommands.placeholder = 'classes separated by space';
        elementInfo.tag = shortCutCommands.value;
        break;
      case className:
        resetCommandsBool = false;
        shortCutCommands.command = 'innerText';
        shortCutCommands.placeholder = 'text thats will inserted';
        elementInfo.className = shortCutCommands.value;
        break;
      case innerText:
        elementInfo.text = shortCutCommands.value;
        // eslint-disable-next-line no-case-declarations
        const {element} = Elements[elementIdGetter()];
        // eslint-disable-next-line no-new
        new ElementBuilder(element, elementInfo.tag, elementInfo.className, elementInfo.text);
        break;
    }
  }

  updateGlobalStyle();

  if (resetCommandsBool) {
    resetCommands();
  } else {
    updateHelper(shortCutCommands.command, shortCutCommands.icon, shortCutCommands.placeholder);
  }
};

export const setCommands = (command, placeholder = '...') => {
  shortCutCommands.command = command;
  shortCutCommands.placeholder = placeholder;
  return true;
};

const getControlCommands = {
  s: () => setCommands(enums.mod.sizeMode),
  1: () => setCommands(enums.mod.sizeMode),
  m: () => setCommands(enums.mod.moveMode),
  2: () => setCommands(enums.mod.moveMode),
};

const getShiftCommands = {
  ...attributeShiftCommands,
  n: () => setCommands(enums.command.newElement, 'div, h1, p'),
  v: () => {
    recognition.continuous = false;
    recognition.start();
  },
};

export const getCommands = e => {
  key = e.which || e.keyCode;
  console.log('key :', key);
  const letter = keyCodeLetters[key];
  const number = keyCodeNumbers[key];
  shortCutCommands.value = helper.input.value;

  if (activeCommands && keyCodeCommands[key] === 'enter') {
    executeCommands();
  } else if (e.shiftKey) {
    activeCommands = dynamicFunction(getShiftCommands[letter], resetCommands);
    if (activeCommands) {
      updateHelper(shortCutCommands.command, enums.icons.shortcut, shortCutCommands.placeholder);
    }
  } else if (e.ctrlKey && dynamicFunction(getControlCommands[letter], getControlCommands[number])) {
    const mod = shortCutCommands.command;
    executeCommands();
    updateHelper(`${mod} activate`, enums.icons.mode);
  }
};

document.addEventListener('keydown', getCommands, false);
document.addEventListener(
  'mousemove',
  () => {
    if (activeCommands) {
      resetCommands();
      updateHelper();
    }
  },
  false
);
