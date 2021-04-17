import {enums} from '../helpers/enums.js';
import {
  builderMenu,
  createElement,
  getRandomColor,
  unicGlobalVarNameGenerator,
} from '../helpers/general.js';
import regex from '../helpers/regex.js';
import {
  styleTagElementGetter,
  injectedCssUpdater,
  makeOnlyElementtouchable,
  styleTagUpdater,
  updateHelperBubble,
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

  get getElement() {
    return this.element;
  }

  // eslint-disable-next-line complexity
  dynamicStyleAttributesTextSetter() {
    const {sizeMode, moveMode} = enums.mod;
    const {width, height, left, top} = this.style;
    const {tune, search} = enums.icons;
    let info = '';
    let icon = tune;

    switch (this.mode) {
      case sizeMode:
      default:
        info = `height: ${height + this.calcValueY}px; width: ${width + this.calcValueX}px`;
        break;
      case moveMode:
        info = `top: ${top + this.calcValueY}px left: ${left + this.calcValueX}px`;
        break;
    }

    if (!this.dragBegins) {
      info = '';
      icon = search;
    }

    updateHelperBubble(info, icon);
  }

  setTagStyleAttribute() {
    const {sizeMode, moveMode} = enums.mod;
    // eslint-disable-next-line prefer-const
    let {width, height, left, top} = this.style;

    top = parseFloat(top);
    left = parseFloat(left);
    width = regex.test(width, regex.only_numbers) ? parseFloat(width) : this.element.clientWidth;
    height = regex.test(height, regex.only_numbers)
      ? parseFloat(height)
      : this.element.clientHeight;

    let style = '';

    switch (this.mode) {
      case sizeMode:
      default:
        style = `width:${width + this.calcValueX}px;height:${height + this.calcValueY}px;`;
        break;
      case moveMode:
        style = `left:${left + this.calcValueX}px;top:${top + this.calcValueY}px;`;
        break;
    }

    this.style.left = left;
    this.style.top = top;
    this.style.width = width;
    this.style.height = height;
    this.element.setAttribute('style', style);
  }

  updateElementStyles() {
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

        styleTagUpdater();
        makeOnlyElementtouchable(this.element);
        break;
      case 'move':
        if (this.dragBegins) {
          this.PositionX = x;
          this.PositionY = y;

          this.calcValueX = this.PositionX - this.initialPositionX;
          this.calcValueY = this.PositionY - this.initialPositionY;

          this.setTagStyleAttribute();
        }
        break;
      case 'end':
      default:
        this.dragBegins = false;

        this.updateElementStyles();

        this.calcValueX = 0;
        this.calcValueY = 0;

        styleTagUpdater();
        break;
    }

    this.dynamicStyleAttributesTextSetter();
  }
}
