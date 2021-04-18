import {enums} from '../helpers/enums.js';
import {
  builderMenu,
  createElement,
  getRandomColor,
  unicGlobalVarNameGenerator,
} from '../helpers/general.js';
import regex from '../helpers/regex.js';
import {attributesWithDynamicSizeArr, attributeSizeInPixels} from '../styles/attributes.js';
import {
  styleTagElementGetter,
  injectedCssUpdater,
  makeOnlyElementtouchable,
  styleTagUpdater,
  updateHelperBubble,
  fixAttributeSize,
} from '../styles/style.js';
import {dragEndEventSetter, dragMoveEventSetter, dragStartEventSetter} from './drag.js';

export const Elements = {};

const styleNewElementTemplate = () => ({
  'background-color': getRandomColor(900),
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

    this.dragBegins = false;

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
    if (styleTagElementGetter() === undefined) {
      injectedCssUpdater();
    }
  }

  get _modeTextRender() {
    const {sizeMode, moveMode} = enums.mod;
    const {width, height, left, top} = this.style;
    let output;

    switch (this.mode) {
      case sizeMode:
      default:
        output =
          fixAttributeSize(height + this.calcValueY, 'height', true) +
          fixAttributeSize(width + this.calcValueX, 'width', true);
        break;
      case moveMode:
        output =
          fixAttributeSize(top + this.calcValueY, 'top', true) +
          fixAttributeSize(left + this.calcValueX, 'left', true);
        break;
    }

    return output;
  }

  _dynamicStyleAttributesTextSetter() {
    const {tune, search} = enums.icons;
    let info = this._modeTextRender;
    let icon = tune;

    if (!this.dragBegins) {
      info = '';
      icon = search;
    }

    updateHelperBubble(info, icon);
  }

  _fixSizeTypes(attribute) {
    let output;

    if (regex.test(this.style[attribute], regex.only_numbers)) {
      output = parseFloat(this.style[attribute]);
    } else {
      output = this.element[attributeSizeInPixels[attribute]];
    }

    this.style[attribute] = output;
  }

  _updateDynamicAttributes() {
    const styleAttribute = this._modeTextRender;

    this._fixSizeTypes('height');
    this._fixSizeTypes('width');
    this._fixSizeTypes('top');
    this._fixSizeTypes('left');

    this.element.setAttribute('style', styleAttribute);
  }

  _updateElementStyles() {
    const {sizeMode, moveMode} = enums.mod;
    switch (this.mode) {
      case sizeMode:
      default:
        this.style.width += this.calcValueX;
        this.style.height += this.calcValueY;
        break;
      case moveMode:
        this.style.left += this.calcValueX;
        this.style.top += this.calcValueY;
        break;
    }
  }

  _getDynamicSizes() {
    Object.keys(this.style).forEach(property => {
      if (
        attributesWithDynamicSizeArr.indexOf(property) !== -1 &&
        attributeSizeInPixels[property]
      ) {
        console.log('');
      }
    });
  }

  dragEvents(e, type) {
    //  conditional with id in all function
    // ------------------
    const x = e.clientX;
    const y = e.clientY;

    switch (type) {
      case 'start':
        this.dragBegins = true;

        this.initialPositionX = x;
        this.initialPositionY = y;

        this.calcValueX = 0;
        this.calcValueY = 0;

        this._getDynamicSizes();
        styleTagUpdater();
        makeOnlyElementtouchable(this.element);
        break;
      case 'move':
        if (this.dragBegins) {
          this.PositionX = x;
          this.PositionY = y;

          this.calcValueX = this.PositionX - this.initialPositionX;
          this.calcValueY = this.PositionY - this.initialPositionY;

          this._updateDynamicAttributes();
        }
        break;
      case 'end':
      default:
        this.dragBegins = false;

        this._updateElementStyles();

        this.calcValueX = 0;
        this.calcValueY = 0;

        styleTagUpdater();
        break;
    }

    this._dynamicStyleAttributesTextSetter();
  }
}
