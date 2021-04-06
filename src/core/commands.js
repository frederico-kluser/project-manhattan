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
  const {html} = enums;

  // eslint-disable-next-line default-case
  switch (command) {
    case html.width:
      elementAttributes.width = parseFloat(value);
      break;
    case html.height:
      elementAttributes.height = parseFloat(value);
      break;
  }

  element.setAttribute(
    html.style,
    `width:${elementAttributes.width}px;height:${elementAttributes.height}px;`
  );
  console.log(element);
  console.log(`${elementAttributes.width}px x ${elementAttributes.height}px`);
  resetCommands();
};

const getValue = () => {
  const {html} = enums;
  if (keyCodeCommands[key] !== undefined || keyCodeNumbers[key] !== undefined) {
    switch (keyCodeCommands[key]) {
      case html.backspace:
        shortCutCommands.value = backSpaceText(shortCutCommands.value);
        break;
      case html.enter:
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
  w: () => setCommands(enums.html.width),
  h: () => setCommands(enums.html.height),
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

document.body.addEventListener(enums.events.keydown, getCommands, false);
