/* eslint-disable no-undef */
var key;

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

// eslint-disable-next-line complexity
const executeCommands = () => {
  const {command, value} = shortCutCommands;
  const {sizeMode, moveMode} = enums.mod;

  console.log('Execute command');
  console.log(command);

  // eslint-disable-next-line default-case
  switch (command) {
    case 'height':
    case 'left':
    case 'margin':
    case 'padding':
    case 'top':
    case 'width':
      Elements[elementId].style[command] = parseFloat(value) || 0;
      break;
    case sizeMode:
    case moveMode:
      Elements[elementId].mode = command;
      break;
  }

  updateGlobalStyle();
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
};

const setCommands = command => {
  shortCutCommands.command = command;
  return true;
};

const getControlCommands = {
  s: () => setCommands('sizeMode'),
  1: () => setCommands('sizeMode'),
  m: () => setCommands('moveMode'),
  2: () => setCommands('moveMode'),
};

const getShiftCommands = {
  h: () => setCommands('height'),
  l: () => setCommands('left'),
  m: () => setCommands('margin'),
  p: () => setCommands('padding'),
  t: () => setCommands('top'),
  w: () => setCommands('width'),

  v: () => {
    recognition.continuous = false;
    recognition.start();
  },
};

// eslint-disable-next-line complexity
const getCommands = e => {
  key = e.which || e.keyCode;
  console.log('key :', key);
  const letter = keyCodeLetters[key];
  const number = keyCodeNumbers[key];

  if (activeCommands) {
    getValue();
  } else if (e.shiftKey) {
    activeCommands = dynamicFunction(getShiftCommands[letter], resetCommands);
    if (activeCommands) {
      updateHelper(shortCutCommands.command, enums.icons.shortcut, '...');
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
      updateHelper('', enums.icons.search);
    }
  },
  false
);
window.activeCommands = activeCommands;
window.shortCutCommands = shortCutCommands;
