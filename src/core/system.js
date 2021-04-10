/* eslint-disable no-undef */

var Elements = {};
const styleTemplate = {
  'background-color': 'lightblue',
  height: 200,
  left: 100,
  margin: 50,
  position: 'relative',
  top: 100,
  width: 300,
};
var elementId;

class ElementBuilder {
  constructor(parent, tag) {
    const {infoClass} = enums.helpers;
    const {sizeMode} = enums.mod;

    this.id = unicGlobalVarNameGenerator();
    elementId = this.id;
    this.info = createElement({tag: 'span', className: infoClass});
    this.mode = sizeMode;
    this.style = styleTemplate;
    this.tag = tag;

    this.dragBegins = false;

    this.initialPositionX = 0;
    this.initialPositionY = 0;

    this.positionX = 0;
    this.positionY = 0;

    this.calcValueX = 0;
    this.calcValueY = 0;

    this.element = createElement({
      tag: this.tag,
      chield: [this.info],
      id: this.id,
    });

    this.element.addEventListener('mousedown', dragStart, false);
    this.element.addEventListener('mousemove', dragMove, false);
    this.element.addEventListener('mouseup', dragEnd, false);
    this.element.addEventListener('contextmenu', builderMenu);

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
    const {sizeMode, moveMode} = enums.mod;
    const {width, height, left, top} = this.style;
    let info = '';

    switch (this.mode) {
      case sizeMode:
      default:
        info = `${height + this.calcValueY}px X ${width + this.calcValueX}px`;
        break;
      case moveMode:
        info = `${top + this.calcValueY}px X ${left + this.calcValueX}px`;
        break;
    }

    if (type === 'move' && !this.dragBegins) {
      info = '';
    }
    this.info.innerHTML = info;
  }

  setStyleTagAttribute() {
    const {sizeMode, moveMode} = enums.mod;
    const {width, height, left, top} = this.style;
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

    this.element.setAttribute('style', style);
  }

  updateStyleElement() {
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

  drag(e, type) {
    const x = e.clientX;
    const y = e.clientY;

    switch (type) {
      case 'start':
        elementId = this.id;
        this.dragBegins = true;

        this.initialPositionX = x;
        this.initialPositionY = y;

        this.calcValueX = 0;
        this.calcValueY = 0;
        break;
      case 'move':
        if (this.dragBegins) {
          this.PositionX = x;
          this.PositionY = y;

          this.calcValueX = this.PositionX - this.initialPositionX;
          this.calcValueY = this.PositionY - this.initialPositionY;

          this.setStyleTagAttribute();
        }
        break;
      case 'end':
      default:
        this.dragBegins = false;

        this.updateStyleElement();

        this.calcValueX = 0;
        this.calcValueY = 0;

        updateGlobalStyle();
        break;
    }

    this.setInfo(type);
  }
}

// eslint-disable-next-line no-new
new ElementBuilder(document.body, 'div');
window.elementId = elementId;
