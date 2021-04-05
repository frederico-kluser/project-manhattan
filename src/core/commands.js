/* eslint-disable no-undef */
var key;

const keyCodeLetters = {
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
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

  // eslint-disable-next-line default-case
  switch (command) {
    case 'width':
      width = parseFloat(value);
      break;
    case 'height':
      height = parseFloat(value);
      break;
  }

  element.setAttribute('style', `width:${width}px;height:${height}px;`);
  console.log(element);
  console.log(`${width}px x ${height}px`);
  resetCommands();
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
  t: () => {
    recognition.continuous = false;
    recognition.start();
  },
};

const getCommands = e => {
  key = e.which || e.keyCode;
  console.log('key :', key);
  const letter = keyCodeLetters[key];

  if (activeCommands) {
    getValue();
  } else if (e.shiftKey) {
    activeCommands = !!dynamicFunction(getCommandSwitch[letter], resetCommands);
  }
};

document.body.addEventListener('keydown', getCommands, false);
