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

const getValue = () => {
  if (keyCodeCommands[key] !== undefined || keyCodeNumbers[key] !== undefined) {
    switch (keyCodeCommands[key]) {
      case 'backspace':
        shortCutCommands.value = backSpaceText(shortCutCommands.value);
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

const getCommandSwitch = {
  w: () => {
    shortCutCommands.command = 'width';
    activeCommands = true;
  },
};

const getCommands = e => {
  key = e.which || e.keyCode;
  console.log('key :', key);
  const letter = keyCodeLetters[key];

  if (activeCommands) {
    getValue();
  }
  if (e.shiftKey) {
    dynamicFunction(getCommandSwitch[letter], resetCommands);
  }
};

document.body.addEventListener('keydown', getCommands, false);
