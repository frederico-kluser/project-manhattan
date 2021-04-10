var enums = {
  colors: {
    black: '#212121',
    white: '#FFFFFF',
  },
  icons: {
    add_circle: 'add_circle',
    code: 'code',
    keyboard: 'keyboard',
    search: 'search',
    tune: 'tune',
  },
  mod: {
    sizeMode: 'sizeMode',
    moveMode: 'moveMode',
  },
};

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

window.keyCodeLetters = keyCodeLetters;
window.keyCodeNumbers = keyCodeNumbers;
window.keyCodeCommands = keyCodeCommands;

window.enums = enums;
