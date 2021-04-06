/* eslint-disable no-undef */

var dragBegins = false;

var initialX;
var initialY;

var moveX = 0;
var moveY = 0;

var resizeX = 0;
var resizeY = 0;

var element;

const dragStart = e => {
  dragBegins = true;
  const pSize = e.target.children[0];
  pSize.innerHTML = `${elementAttributes.width}px x ${elementAttributes.height}px`;

  initialX = e.layerX;
  initialY = e.layerY;

  resizeX = 0;
  resizeY = 0;
};

const drag = e => {
  if (dragBegins) {
    moveX = e.layerX;
    moveY = e.layerY;

    resizeX = moveX - initialX;
    resizeY = moveY - initialY;

    element = e.target;
    const pSize = element.children[0];
    pSize.innerHTML = `${elementAttributes.width + resizeX}px x ${
      elementAttributes.height + resizeY
    }px`;
    element.setAttribute(
      'style',
      `width:${elementAttributes.width + resizeX}px;height:${elementAttributes.height + resizeY}px;`
    );
  }
};

const dragEnd = e => {
  dragBegins = false;
  elementAttributes.width += resizeX;
  elementAttributes.height += resizeY;

  element = e.target;
  const pSize = element.children[0];
  console.log(element);
  console.log(`${elementAttributes.width}px x ${elementAttributes.height}px`);
  pSize.innerHTML = '';
};

new ElementBuilder(document.body, 'div').getElement();

window.dragStart = dragStart;
window.drag = drag;
window.dragEnd = dragEnd;
