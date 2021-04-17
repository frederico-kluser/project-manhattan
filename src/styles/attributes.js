import {shortCutCommandsSetter} from '../core/commands.js';
import {elementIdGetter, Elements} from '../core/elements.js';

const setStyle = ({command, value}) => {
  Elements[elementIdGetter()].style[command] = value;
  return true;
};

const attributeFunctions = {
  height: {
    attributeHasSizeType: {height: 'px'},
    commandExecutor: {height: setStyle},
    getShiftCommands: {h: () => shortCutCommandsSetter('height')},
  },
  width: {
    attributeHasSizeType: {width: 'px'},
    commandExecutor: {width: setStyle},
    getShiftCommands: {w: () => shortCutCommandsSetter('width')},
  },
  left: {
    attributeHasSizeType: {left: 'px'},
    commandExecutor: {left: setStyle},
    getShiftCommands: {l: () => shortCutCommandsSetter('left')},
  },
  top: {
    attributeHasSizeType: {top: 'px'},
    commandExecutor: {top: setStyle},
    getShiftCommands: {t: () => shortCutCommandsSetter('top')},
  },
  margin: {
    attributeHasSizeType: {margin: 'px'},
    commandExecutor: {margin: setStyle},
    getShiftCommands: {m: () => shortCutCommandsSetter('margin')},
  },
  padding: {
    attributeHasSizeType: {padding: 'px'},
    commandExecutor: {padding: setStyle},
    getShiftCommands: {p: () => shortCutCommandsSetter('padding')},
  },
};

export let attributeShiftCommands = {};
export let attributesHasSizeType = {};
export let attributeCommands = {};

(() => {
  Object.values(attributeFunctions).forEach(
    ({attributeHasSizeType, commandExecutor, getShiftCommands}) => {
      if (getShiftCommands) {
        attributeShiftCommands = {
          ...getShiftCommands,
          ...attributeShiftCommands,
        };
      }

      if (attributeHasSizeType) {
        attributesHasSizeType = {
          ...attributeHasSizeType,
          ...attributesHasSizeType,
        };
      }

      if (commandExecutor) {
        attributeCommands = {
          ...commandExecutor,
          ...attributeCommands,
        };
      }
    }
  );
})();
