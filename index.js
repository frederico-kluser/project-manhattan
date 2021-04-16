/* eslint-disable no-new */
import {activeCommands, getCommands, resetCommands} from './src/core/commands.js';
import {ElementBuilder, elementIdGetter, Elements} from './src/core/elements.js';
import {updateGlobalStyle, updateHelper} from './src/styles/style.js';

new ElementBuilder(document.body, 'div');

const {element} = Elements[elementIdGetter()];
new ElementBuilder(element, 'div');
new ElementBuilder(element, 'div');
updateGlobalStyle();

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
