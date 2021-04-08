/* eslint-disable no-undef */

var Elements = {};
const styleTemplate = {
  'background-color': 'lightblue',
  height: 200,
  left: 10,
  position: 'relative',
  top: 10,
  width: 300,
};
var elementId;

class ElementBuilder {
  constructor(parent, tag) {
    const {infoClass} = enums.helpers;
    const {resize} = enums.mod;

    this.id = unicGlobalVarNameGenerator();
    elementId = this.id;
    this.info = createElementor({tag: 'span', className: infoClass});
    this.mode = resize;
    this.style = styleTemplate;
    this.tag = tag;

    this.dragBegins = false;

    this.initialPositionX = 0;
    this.initialPositionY = 0;

    this.positionX = 0;
    this.positionY = 0;

    this.calcValueX = 0;
    this.calcValueY = 0;

    this.element = createElementor({
      tag: this.tag,
      chield: [this.info],
      id: this.id,
    });

    this.element.addEventListener('mousedown', dragStart, false);
    this.element.addEventListener('mousemove', dragMove, false);
    this.element.addEventListener('mouseup', dragEnd, false);

    parent.appendChild(this.element);
    Elements[this.id] = this;
    if (globalStyle === undefined) {
      injectCSS();
    }
  }

  get getElement() {
    return this.element;
  }

  setInfo(type) {
    const {resize} = enums.mod;
    const {width, height} = this.style;
    let info = '';

    switch (this.mode) {
      case resize:
      default:
        info = `${height + this.calcValueY}px X ${width + this.calcValueX}px`;
        break;
    }

    if (type === 'move' && !this.dragBegins) {
      info = '';
    }
    this.info.innerHTML = info;
  }

  setStyle() {
    const {resize} = enums.mod;
    const {width, height} = this.style;
    let style = '';

    switch (this.mode) {
      case resize:
      default:
        style = `width:${width + this.calcValueX}px;height:${height + this.calcValueY}px;`;
        break;
    }

    this.element.setAttribute('style', style);
  }

  drag(e, type) {
    switch (type) {
      case 'start':
        elementId = this.id;
        this.dragBegins = true;

        this.initialPositionX = e.layerX;
        this.initialPositionY = e.layerY;

        this.calcValueX = 0;
        this.calcValueY = 0;
        break;
      case 'move':
        if (this.dragBegins) {
          this.PositionX = e.layerX;
          this.PositionY = e.layerY;

          this.calcValueX = this.PositionX - this.initialPositionX;
          this.calcValueY = this.PositionY - this.initialPositionY;

          this.setStyle();
        }
        break;
      case 'end':
      default:
        this.dragBegins = false;

        this.style.width += this.calcValueX;
        this.style.height += this.calcValueY;

        this.calcValueX = 0;
        this.calcValueY = 0;

        updateGlobalStyle();
        break;
    }

    this.setInfo(type);
  }
}

window.ElementBuilder = ElementBuilder;
window.elementId = elementId;
