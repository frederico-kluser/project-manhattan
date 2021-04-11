/* eslint-disable no-undef */
var key;

var activeCommands = false;
var shortCutCommands = {
  command: '',
  value: '',
  placeholder: '...',
};

const resetCommands = () => {
  activeCommands = false;
  shortCutCommands = {
    command: '',
    value: '',
    placeholder: '...',
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
    case 'width':
      Elements[elementId].style[command] = value;
      break;
    case 'left':
    case 'margin':
    case 'padding':
    case 'top':
      if (!regex.test(value, regex.only_numbers)) {
        alert('To types thats not is width/height we only support pixels by now');
      } else {
        Elements[elementId].style[command] = parseFloat(value);
      }
      break;
    case sizeMode:
    case moveMode:
      Elements[elementId].mode = command;
      break;
  }

  updateGlobalStyle();
  resetCommands();
};

const setCommands = (command, placeholder = '...') => {
  shortCutCommands.command = command;
  shortCutCommands.placeholder = placeholder;
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

  n: () => setCommands('new'),
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
      updateHelper('', enums.icons.search);
    }
  },
  false
);
window.activeCommands = activeCommands;
window.shortCutCommands = shortCutCommands;
