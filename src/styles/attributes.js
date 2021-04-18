import {shortCutCommandsSetter} from '../core/commands.js';
import {elementIdGetter, Elements} from '../core/elements.js';

const setStyle = ({command, value}) => {
  Elements[elementIdGetter()].style[command] = value;
  return true;
};

const attributeBuilder = (
  attribute,
  shiftCommand = false,
  hasSizeType = false,
  sizeInPixels = false
) => {
  const _attributeShiftCommands =
    shiftCommand === true
      ? {[attribute.charAt(0)]: () => shortCutCommandsSetter(attribute)}
      : shiftCommand;
  const _attributesHasSizeType = hasSizeType === true ? {[attribute]: hasSizeType} : hasSizeType;
  const _attributeSizeInPixels =
    sizeInPixels !== false ? {[attribute]: sizeInPixels} : sizeInPixels;

  return {
    [attribute]: {
      _attributeShiftCommands,
      _attributesHasSizeType,
      _attributeCommands: {[attribute]: setStyle},
      _attributeSizeInPixels,
    },
  };
};

const attributeFunctions = {
  ...attributeBuilder('height', true, true, 'clientHeight'),
  ...attributeBuilder('width', true, true, 'clientWidth'),
  ...attributeBuilder('left', true, true, 'offsetLeft'),
  ...attributeBuilder('top', true, true, 'offsetTop'),
  ...attributeBuilder('margin', true, true),
  ...attributeBuilder('padding', true, true),
};

export const attributesWithDynamicSizeArr = ['height', 'width', 'left', 'top', 'margin', 'padding'];
export let attributeShiftCommands = {};
export let attributesHasSizeType = {};
export let attributeCommands = {};
export let attributeSizeInPixels = {};

(() => {
  Object.values(attributeFunctions).forEach(
    ({
      _attributesHasSizeType,
      _attributeCommands,
      _attributeShiftCommands,
      _attributeSizeInPixels,
    }) => {
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

      if (_attributeSizeInPixels) {
        attributeSizeInPixels = {
          ..._attributeSizeInPixels,
          ...attributeSizeInPixels,
        };
      }
    }
  );
})();
