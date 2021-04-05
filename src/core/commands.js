/* eslint-disable no-undef */
var key;

const keyCodeLetters = {
  87: 'w',
};

const keyCodeNumbers = {
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
};

const keyCodeCommands = {
  13: 'enter',
  8: 'backspace',
};

var activeCommands = false;
var shortCutCommands = {
  command: '',
  value: '',
  type: '',
};

const resetCommands = () => {
  activeCommands = false;
  shortCutCommands = {
    command: '',
    value: '',
    type: '',
  };
};

const executeCommands = () => {
  const {command, value} = shortCutCommands;

  switch (command) {
    case 'width':
      width = value;
      element.setAttribute('style', `width:${width}px;height:${height}px;`);
      break;

    default:
      break;
  }
};

const getValue = () => {
  if (keyCodeCommands[key] !== undefined || keyCodeNumbers[key] !== undefined) {
    switch (keyCodeCommands[key]) {
      case 'backspace':
        shortCutCommands.value = backSpaceText(shortCutCommands.value);
        break;
      case 'enter':
        executeCommands();
        break;
      default:
        shortCutCommands.value += keyCodeNumbers[key];
        break;
    }
  } else {
    resetCommands();
  }

  console.log('shortCutCommands');
  console.log(shortCutCommands);
};

const setCommands = command => {
  shortCutCommands.command = command;
  return true;
};

const getCommandSwitch = {
  w: () => setCommands('width'),
  h: () => setCommands('height'),
};

const getCommands = e => {
  key = e.which || e.keyCode;
  console.log('key :', key);
  const letter = keyCodeLetters[key];

  if (activeCommands) {
    getValue();
  }
  if (e.shiftKey) {
    activeCommands = !!dynamicFunction(getCommandSwitch[letter], resetCommands);
  }
};

document.body.addEventListener('keydown', getCommands, false);
