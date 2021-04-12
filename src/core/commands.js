/* eslint-disable no-undef */
var key;

var activeCommands = false;
var shortCutCommands = {
  command: '',
  icon: enums.icons.search,
  placeholder: '',
  value: '',
};

const resetCommands = () => {
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
  const {command, value} = shortCutCommands;
  const {sizeMode, moveMode} = enums.mod;
  const {newElement} = enums.command;

  console.log('Execute command');
  console.log(command);

  let resetCommandsBool = true;

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
    case newElement:
      resetCommandsBool = false;
      shortCutCommands.command = 'className';
      shortCutCommands.icon = enums.icons.playlist_add;
      shortCutCommands.placeholder = 'classes separated by space';
      break;
    case 'className':
      resetCommandsBool = false;
      shortCutCommands.command = 'innerText';
      shortCutCommands.placeholder = 'text thats will inserted';
      break;
    case 'innerText':
      console.log('Finish');
      break;
  }

  updateGlobalStyle();

  if (resetCommandsBool) {
    resetCommands();
  } else {
    updateHelper(shortCutCommands.command, shortCutCommands.icon, shortCutCommands.placeholder);
  }
};

const setCommands = (command, placeholder = '...') => {
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
  h: () => setCommands('height'),
  l: () => setCommands('left'),
  m: () => setCommands('margin'),
  p: () => setCommands('padding'),
  t: () => setCommands('top'),
  w: () => setCommands('width'),

  n: () => setCommands(enums.command.newElement, 'div, h1, p'),
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
      updateHelper();
    }
  },
  false
);
window.activeCommands = activeCommands;
window.shortCutCommands = shortCutCommands;
