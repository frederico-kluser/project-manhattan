import {activeCommands, getCommands, resetCommands} from './src/core/commands.js';
import {ElementBuilder} from './src/core/elements.js';
import {updateHelper} from './src/styles/style.js';

// eslint-disable-next-line no-new
new ElementBuilder(document.body, 'div');

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
