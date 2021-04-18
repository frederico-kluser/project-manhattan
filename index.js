/* eslint-disable no-new */
import {
  keyboardShortcutsListenerBool,
  keyboardShortcutsListener,
  commandResetter,
} from './src/core/commands.js';
import {ElementBuilder, elementIdGetter, Elements} from './src/core/elements.js';
import {injectedCssUpdater, updateHelperBubble} from './src/styles/style.js';

new ElementBuilder(document.body, 'div');

const {element} = Elements[elementIdGetter()];
new ElementBuilder(element, 'div');
new ElementBuilder(element, 'div');
injectedCssUpdater();

document.addEventListener('keydown', keyboardShortcutsListener, false);
document.addEventListener(
  'mousemove',
  () => {
    if (keyboardShortcutsListenerBool) {
      commandResetter();
      updateHelperBubble();
    }
  },
  false
);
