import {enums} from '../helpers/enums.js';
import {
  builderMenu,
  createElement,
  getRandomColor,
  unicGlobalVarNameGenerator,
} from '../helpers/general.js';
import regex from '../helpers/regex.js';
import {propertySizeInPixels} from '../styles/cssProperties.js';
import {
  makeOnlyElementtouchable,
  styleTagUpdater,
  updateHelperBubble,
  fixPropertySize,
} from '../styles/styleGeneral.js';
import {dragEndEventSetter, dragMoveEventSetter, dragStartEventSetter} from './drag.js';

export const Elements = {};

const stylePropertyDefault = () => ({
  border: '1px solid black',
  height: 100,
  left: 100,
  position: 'relative',
  top: 100,
  width: 100,
});

let elementId;
export const elementIdGetter = () => elementId;
export const elementIdSetter = value => {
  elementId = value;
};

export const ElementConfig = (id, element) => {
  const {sizeMode} = enums.mod;
  const {backgroundColor} = enums.style;

  elementIdSetter(id);
  let _mode = sizeMode;
  const _style = stylePropertyDefault();
  _style[backgroundColor] = getRandomColor(500);

  let _onDraggingElement = false;

  let _initialPositionX = 0;
  let _initialPositionY = 0;

  let _positionX = 0;
  let _positionY = 0;

  let _calcValueX = 0;
  let _calcValueY = 0;

  const _element = element;

  const _styleDynamic = {};
  Object.keys(propertySizeInPixels).forEach(property => {
    _styleDynamic[`${property}Absolute`] = _element[propertySizeInPixels[property]];
    _styleDynamic[`${property}Relative`] = _style[property] || 0;
  });

  const _sizeConverter = (type, plus, resumeOutput = false) => {
    // eslint-disable-next-line no-restricted-globals
    const sizeType = isNaN(_styleDynamic[`${type}Relative`])
      ? regex.getSizeType(_styleDynamic[`${type}Relative`])
      : false;
    if (sizeType !== false) {
      const valueType = parseFloat(_styleDynamic[`${type}Relative`]);

      const absoluteSizeBefore = _styleDynamic[`${type}Absolute`];
      const absoluteSizeAfter = absoluteSizeBefore + plus;

      const relativeSizeAfter = (absoluteSizeAfter * valueType) / absoluteSizeBefore;

      return (resumeOutput ? relativeSizeAfter.toFixed(2) : relativeSizeAfter) + sizeType;
    }
    return _style[type] + (plus || '');
  };

  const _helperBubbleTextRender = () => {
    const {moveMode} = enums.mod;
    let output;
    const resumeOutput = true;

    switch (_mode) {
      case sizeMode:
      default:
        output =
          fixPropertySize(_sizeConverter('height', _calcValueY, resumeOutput), 'height', true) +
          fixPropertySize(_sizeConverter('width', _calcValueX, resumeOutput), 'width', true);
        break;
      case moveMode:
        output =
          fixPropertySize(_sizeConverter('top', _calcValueY, resumeOutput), 'top', true) +
          fixPropertySize(_sizeConverter('left', _calcValueX, resumeOutput), 'left', true);
        break;
    }

    return output;
  };

  const _dynamicStylePropertiesTextSetter = () => {
    const {tune, search} = enums.icons;
    let info = _helperBubbleTextRender();
    let icon = tune;

    if (!_onDraggingElement) {
      info = '';
      icon = search;
    }

    updateHelperBubble(info, icon);
  };

  const _fixSizeTypes = property => {
    let output;

    if (regex.test(_style[property], regex.onlyNumbers)) {
      output = parseFloat(_style[property]);
    } else {
      output = _style[property];
    }

    _style[property] = output;
  };

  const _updateDynamicProperties = () => {
    const styleAttributeHTML = _helperBubbleTextRender();

    _fixSizeTypes('height');
    _fixSizeTypes('width');
    _fixSizeTypes('top');
    _fixSizeTypes('left');

    _element.setAttribute('style', styleAttributeHTML);
  };

  const _updateElementStyles = () => {
    const {moveMode} = enums.mod;

    switch (_mode) {
      case sizeMode:
      default:
        _style.width = _sizeConverter('width', _calcValueX);
        _style.height = _sizeConverter('height', _calcValueY);
        break;
      case moveMode:
        _style.left = _sizeConverter('left', _calcValueX);
        _style.top = _sizeConverter('top', _calcValueY);
        break;
    }
  };

  return {
    elementGetter: () => _element,
    dragEvents: (e, type) => {
      const x = e.clientX;
      const y = e.clientY;

      switch (type) {
        case 'start':
          _onDraggingElement = true;

          _initialPositionX = x;
          _initialPositionY = y;

          _calcValueX = 0;
          _calcValueY = 0;

          Object.keys(propertySizeInPixels).forEach(property => {
            _styleDynamic[`${property}Absolute`] = _element[propertySizeInPixels[property]];
            _styleDynamic[`${property}Relative`] = _style[property] || 0;
          });

          styleTagUpdater();
          makeOnlyElementtouchable(_element);
          break;
        case 'move':
          if (_onDraggingElement) {
            _positionX = x;
            _positionY = y;

            _calcValueX = _positionX - _initialPositionX;
            _calcValueY = _positionY - _initialPositionY;

            _updateDynamicProperties();
          }
          break;
        case 'end':
          _onDraggingElement = false;

          _updateElementStyles();

          _calcValueX = 0;
          _calcValueY = 0;

          styleTagUpdater();
          break;
      }

      _dynamicStylePropertiesTextSetter();
    },
    modeSetter: mode => {
      _mode = mode;
    },
    styleGetter: () => _style,
    styleSetter: (command, value) => {
      _style[command] = value;
    },
  };
};

export const ElementBuilder = (parent, tag, className = '', text = '') => {
  const id = unicGlobalVarNameGenerator();
  const element = createElement({className, id, tag, text});
  element.addEventListener('mousedown', dragStartEventSetter);
  element.addEventListener('mousemove', dragMoveEventSetter);
  element.addEventListener('mouseup', dragEndEventSetter);
  element.addEventListener('contextmenu', builderMenu);
  parent.appendChild(element);

  Elements[id] = ElementConfig(id, element);
};
