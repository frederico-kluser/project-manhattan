/* eslint-disable no-undef */

var Elements = {};
const styleTemplate = {
  height: 200,
  left: 0,
  position: 'relative',
  top: 0,
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
      className: 'model',
      chield: [this.info],
      id: this.id,
    });

    this.element.addEventListener('mousedown', dragStart, false);
    this.element.addEventListener('mousemove', dragMove, false);
    this.element.addEventListener('mouseup', dragEnd, false);

    parent.appendChild(this.element);
    Elements[this.id] = this;
  }

  get getElement() {
    return this.element;
  }

  set setInfo(info) {
    this.info.innerHTML = info;
  }

  setDragInfo(type) {
    const {height, width} = this.style;
    let info;

    switch (type) {
      case 'start':
      case 'move':
        info = `${width + this.calcValueX}px x ${height + this.calcValueY}px`;
        break;
      case 'end':
      default:
        info = '';
        break;
    }

    this.setInfo = info;
  }

  set setStyle(style) {
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

        this.setDragInfo(type);
        break;
      case 'move':
        if (this.dragBegins) {
          this.PositionX = e.layerX;
          this.PositionY = e.layerY;

          this.calcValueX = this.PositionX - this.initialPositionX;
          this.calcValueY = this.PositionY - this.initialPositionY;

          const {height, width} = this.style;
          this.setStyle = `width:${width + this.calcValueX}px;height:${
            height + this.calcValueY
          }px;`;

          this.setDragInfo(type);
        }
        break;
      case 'end':
      default:
        this.dragBegins = false;

        this.style.width += this.calcValueX;
        this.style.height += this.calcValueY;

        this.calcValueX = 0;
        this.calcValueY = 0;

        this.setDragInfo(type);
        break;
    }
  }
}

window.ElementBuilder = ElementBuilder;
window.elementId = elementId;
