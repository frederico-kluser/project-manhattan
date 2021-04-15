import {setCommands} from '../core/commands.js';
import {elementIdGetter, Elements} from '../core/elements.js';

const setStyle = ({command, value}) => {
  Elements[elementIdGetter()].style[command] = value;
  return true;
};

const attributeFunctions = {
  height: {
    attributeReference: {height: 'px'},
    executeCommands: {height: setStyle},
    getShiftCommands: {h: () => setCommands('height')},
  },
  width: {
    attributeReference: {width: 'px'},
    executeCommands: {width: setStyle},
    getShiftCommands: {w: () => setCommands('width')},
  },
  left: {
    attributeReference: {left: 'px'},
    executeCommands: {left: setStyle},
    getShiftCommands: {l: () => setCommands('left')},
  },
  top: {
    attributeReference: {top: 'px'},
    executeCommands: {top: setStyle},
    getShiftCommands: {t: () => setCommands('top')},
  },
  margin: {
    attributeReference: {margin: 'px'},
    executeCommands: {margin: setStyle},
    getShiftCommands: {m: () => setCommands('margin')},
  },
  padding: {
    attributeReference: {padding: 'px'},
    executeCommands: {padding: setStyle},
    getShiftCommands: {p: () => setCommands('padding')},
  },
};

export let attributeShiftCommands = {};
export let cssReference = {};
export let attributeCommands = {};

(() => {
  Object.values(attributeFunctions).forEach(
    ({attributeReference, executeCommands, getShiftCommands}) => {
      if (getShiftCommands) {
        attributeShiftCommands = {
          ...getShiftCommands,
          ...attributeShiftCommands,
        };
      }

      if (attributeReference) {
        cssReference = {
          ...attributeReference,
          ...cssReference,
        };
      }

      if (executeCommands) {
        attributeCommands = {
          ...executeCommands,
          ...attributeCommands,
        };
      }
    }
  );
})();
