/* eslint-disable no-new */
import {
  keyboardShortcutsListenerBool,
  keyboardShortcutsListener,
  commandResetter,
} from './src/core/commands.js';
import {mouseMoveEvent, positionSetter} from './src/core/drag.js';
import {
  // domElementsGetter,
  ElementBuilder,
  elementIdGetter,
  Elements,
  initialConfigDomElements,
} from './src/core/elements.js';
import {injectedCssUpdater, updateHelperBubble} from './src/styles/styleGeneral.js';

ElementBuilder(document.body, 'div');

const element = Elements[elementIdGetter()].elementGetter();
ElementBuilder(element, 'div');
ElementBuilder(element, 'div');
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
document.addEventListener('mousemove', mouseMoveEvent, false);

document.addEventListener('mousedown', positionSetter);
document.addEventListener('mousemove', positionSetter);
document.addEventListener('mouseup', positionSetter);

initialConfigDomElements();
