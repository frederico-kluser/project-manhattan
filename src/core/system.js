/* eslint-disable no-undef */
class ElementBuilder {
  constructor(parent, tag) {
    const {infoClass} = enums.helpers;
    const {resize} = enums.mod;
    const {mousedown, mousemove, mouseup} = enums.events;

    this.info = createElementor({tag: 'span', className: infoClass});
    this.mode = resize;
    this.style = {
      height: 100,
      left: 0,
      position: 'relative',
      top: 0,
      width: 100,
    };
    this.tag = tag;

    this.element = createElementor({tag: this.tag, className: 'model', chield: [this.info]});
    this.element.addEventListener(mousedown, dragStart, false);
    this.element.addEventListener(mousemove, drag, false);
    this.element.addEventListener(mouseup, dragEnd, false);

    parent.appendChild(this.element);
  }

  getElement() {
    return this.element;
  }
}

// eslint-disable-next-line vars-on-top
var elementAttributes = {
  width: 300,
  widthType: 'px',
  widthDynamic: 0,
  height: 200,
  top: 0,
  left: 0,
};

window.elementAttributes = elementAttributes;
window.ElementBuilder = ElementBuilder;
