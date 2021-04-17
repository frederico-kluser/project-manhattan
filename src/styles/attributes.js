import {shortCutCommandsSetter} from '../core/commands.js';
import {elementIdGetter, Elements} from '../core/elements.js';

const setStyle = ({command, value}) => {
  Elements[elementIdGetter()].style[command] = value;
  return true;
};

const attributeBuilder = (attribute, shiftCommand = true, hasSizeType = true) => {
  const _attributeShiftCommands =
    shiftCommand === true
      ? {[attribute.charAt(0)]: () => shortCutCommandsSetter(attribute)}
      : shiftCommand;
  const _attributesHasSizeType = hasSizeType === true ? {[attribute]: hasSizeType} : hasSizeType;

  return {
    [attribute]: {
      _attributeShiftCommands,
      _attributesHasSizeType,
      _attributeCommands: {[attribute]: setStyle},
    },
  };
};

const attributeFunctions = {
  ...attributeBuilder('height'),
  ...attributeBuilder('width'),
  ...attributeBuilder('left'),
  ...attributeBuilder('top'),
  ...attributeBuilder('margin'),
  ...attributeBuilder('padding'),
};

export let attributeShiftCommands = {};
export let attributesHasSizeType = {};
export let attributeCommands = {};

(() => {
  Object.values(attributeFunctions).forEach(
    ({_attributesHasSizeType, _attributeCommands, _attributeShiftCommands}) => {
      if (_attributeShiftCommands) {
        attributeShiftCommands = {
          ..._attributeShiftCommands,
          ...attributeShiftCommands,
        };
      }

      if (_attributesHasSizeType) {
        attributesHasSizeType = {
          ..._attributesHasSizeType,
          ...attributesHasSizeType,
        };
      }

      if (_attributeCommands) {
        attributeCommands = {
          ..._attributeCommands,
          ...attributeCommands,
        };
      }
    }
  );
})();
