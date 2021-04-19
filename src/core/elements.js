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
} from '../styles/style.js';
import {dragEndEventSetter, dragMoveEventSetter, dragStartEventSetter} from './drag.js';

export const Elements = {};

const styleNewElementTemplate = () => ({
  'background-color': getRandomColor(500),
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

export class ElementBuilder {
  constructor(parent, tag, className = '', text = '') {
    const {sizeMode} = enums.mod;

    this.id = unicGlobalVarNameGenerator();
    elementId = this.id;
    this.mode = sizeMode;
    this.style = styleNewElementTemplate();

    this.sizeInPixels = {};
    this.tag = tag;

    this.className = className;
    this.text = text;

    this.onDraggingElement = false;

    this.initialPositionX = 0;
    this.initialPositionY = 0;

    this.positionX = 0;
    this.positionY = 0;

    this.calcValueX = 0;
    this.calcValueY = 0;

    this.element = createElement({
      tag: this.tag,
      id: this.id,
      className,
      text,
    });

    this.element.addEventListener('mousedown', dragStartEventSetter, false);
    this.element.addEventListener('mousemove', dragMoveEventSetter, false);
    this.element.addEventListener('mouseup', dragEndEventSetter, false);
    this.element.addEventListener('contextmenu', builderMenu);

    parent.appendChild(this.element);
    Elements[this.id] = this;

    this.styleDynamic = {};
    Object.keys(propertySizeInPixels).forEach(property => {
      this.styleDynamic[`${property}Absolute`] = this.element[propertySizeInPixels[property]];
      this.styleDynamic[`${property}Relative`] = this.style[property] || 0;
    });
  }

  _sizeConverter(type, plus, resumeOutput = false) {
    // eslint-disable-next-line no-restricted-globals
    const sizeType = isNaN(this.styleDynamic[`${type}Relative`])
      ? regex.getsizeType(this.styleDynamic[`${type}Relative`])
      : false;
    if (sizeType !== false) {
      const valueType = parseFloat(this.styleDynamic[`${type}Relative`]);

      const absoluteSizeBefore = this.styleDynamic[`${type}Absolute`];
      const absoluteSizeAfter = absoluteSizeBefore + plus;

      const relativeSizeAfter = (absoluteSizeAfter * valueType) / absoluteSizeBefore;

      return (resumeOutput ? relativeSizeAfter.toFixed(2) : relativeSizeAfter) + sizeType;
    }
    return this.style[type] + (plus || '');
  }

  get _helperBubbleTextRender() {
    const {sizeMode, moveMode} = enums.mod;
    let output;
    const resumeOutput = true;

    switch (this.mode) {
      case sizeMode:
      default:
        output =
          fixPropertySize(
            this._sizeConverter('height', this.calcValueY, resumeOutput),
            'height',
            true
          ) +
          fixPropertySize(
            this._sizeConverter('width', this.calcValueX, resumeOutput),
            'width',
            true
          );
        break;
      case moveMode:
        output =
          fixPropertySize(this._sizeConverter('top', this.calcValueY, resumeOutput), 'top', true) +
          fixPropertySize(this._sizeConverter('left', this.calcValueX, resumeOutput), 'left', true);
        break;
    }

    return output;
  }

  _dynamicStylePropertiesTextSetter() {
    const {tune, search} = enums.icons;
    let info = this._helperBubbleTextRender;
    let icon = tune;

    if (!this.onDraggingElement) {
      info = '';
      icon = search;
    }

    updateHelperBubble(info, icon);
  }

  _fixSizeTypes(property) {
    let output;

    if (regex.test(this.style[property], regex.only_numbers)) {
      output = parseFloat(this.style[property]);
    } else {
      output = this.style[property];
    }

    this.style[property] = output;
  }

  _updateDynamicProperties() {
    const styleAttributeHTML = this._helperBubbleTextRender;

    this._fixSizeTypes('height');
    this._fixSizeTypes('width');
    this._fixSizeTypes('top');
    this._fixSizeTypes('left');

    this.element.setAttribute('style', styleAttributeHTML);
  }

  _updateElementStyles() {
    const {sizeMode, moveMode} = enums.mod;
    switch (this.mode) {
      case sizeMode:
      default:
        this.style.width = this._sizeConverter('width', this.calcValueX);
        this.style.height = this._sizeConverter('height', this.calcValueY);
        break;
      case moveMode:
        this.style.left = this._sizeConverter('left', this.calcValueX);
        this.style.top = this._sizeConverter('top', this.calcValueY);
        break;
    }
  }

  // TODO: create sub dragMethods
  // eslint-disable-next-line complexity
  dragEvents(e, type) {
    const x = e.clientX;
    const y = e.clientY;

    // eslint-disable-next-line default-case
    switch (type) {
      case 'start':
        this.onDraggingElement = true;

        this.initialPositionX = x;
        this.initialPositionY = y;

        this.calcValueX = 0;
        this.calcValueY = 0;

        Object.keys(propertySizeInPixels).forEach(property => {
          this.styleDynamic[`${property}Absolute`] = this.element[propertySizeInPixels[property]];
          this.styleDynamic[`${property}Relative`] = this.style[property] || 0;
        });

        console.log('this.styleDynamic');
        console.log('this.styleDynamic :', this.styleDynamic);

        styleTagUpdater();
        makeOnlyElementtouchable(this.element);
        break;
      case 'move':
        if (this.onDraggingElement) {
          this.PositionX = x;
          this.PositionY = y;

          this.calcValueX = this.PositionX - this.initialPositionX;
          this.calcValueY = this.PositionY - this.initialPositionY;

          this._updateDynamicProperties();
        }
        break;
      case 'end':
        this.onDraggingElement = false;

        this._updateElementStyles();

        console.log('this.style.width :', this.style.width);

        this.calcValueX = 0;
        this.calcValueY = 0;

        styleTagUpdater();
        break;
    }

    this._dynamicStylePropertiesTextSetter();
  }
}
