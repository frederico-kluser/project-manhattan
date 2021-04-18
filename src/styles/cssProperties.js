import {shortCutCommandsSetter} from '../core/commands.js';
import {elementIdGetter, Elements} from '../core/elements.js';

const setStyle = ({command, value}) => {
  Elements[elementIdGetter()].style[command] = value;
  return true;
};

const propertyBuilder = (
  property,
  shiftCommand = false,
  hasSizeType = false,
  sizeInPixels = false
) => {
  const _propertyShiftCommands =
    shiftCommand === true
      ? {[property.charAt(0)]: () => shortCutCommandsSetter(property)}
      : shiftCommand;
  const _propertiesHasSizeType = hasSizeType === true ? {[property]: hasSizeType} : hasSizeType;
  const _propertySizeInPixels = sizeInPixels !== false ? {[property]: sizeInPixels} : sizeInPixels;

  return {
    [property]: {
      _propertyShiftCommands,
      _propertiesHasSizeType,
      _propertyCommands: {[property]: setStyle},
      _propertySizeInPixels,
    },
  };
};

const propertyFunctions = {
  ...propertyBuilder('height', true, true, 'clientHeight'),
  ...propertyBuilder('width', true, true, 'clientWidth'),
  ...propertyBuilder('left', true, true, 'offsetLeft'),
  ...propertyBuilder('top', true, true, 'offsetTop'),
  ...propertyBuilder('margin', true, true),
  ...propertyBuilder('padding', true, true),
};

export const propertiesWithDynamicSizeArr = ['height', 'width', 'left', 'top', 'margin', 'padding'];
export let propertyShiftCommands = {};
export let propertyHasSizeType = {};
export let propertyCommands = {};
export let propertySizeInPixels = {};

(() => {
  Object.values(propertyFunctions).forEach(
    ({
      _propertiesHasSizeType,
      _propertyCommands,
      _propertyShiftCommands,
      _propertySizeInPixels,
    }) => {
      if (_propertyShiftCommands) {
        propertyShiftCommands = {
          ..._propertyShiftCommands,
          ...propertyShiftCommands,
        };
      }

      if (_propertiesHasSizeType) {
        propertyHasSizeType = {
          ..._propertiesHasSizeType,
          ...propertyHasSizeType,
        };
      }

      if (_propertyCommands) {
        propertyCommands = {
          ..._propertyCommands,
          ...propertyCommands,
        };
      }

      if (_propertySizeInPixels) {
        propertySizeInPixels = {
          ..._propertySizeInPixels,
          ...propertySizeInPixels,
        };
      }
    }
  );
})();
