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

const executeCommands = () => {
  const {command, value} = shortCutCommands;

  // eslint-disable-next-line default-case
  switch (command) {
    case 'width':
    case 'height':
    case 'left':
    case 'top':
      Elements[elementId].style[command] = parseFloat(value);
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

const getCommandSwitch = {
  w: () => setCommands('width'),
  h: () => setCommands('height'),
  l: () => setCommands('left'),
  t: () => setCommands('top'),
  v: () => {
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
