/* eslint-disable no-undef */

var dragBegins = false;

var initialX;
var initialY;

var moveX;
var moveY;

var resizeX = 0;
var resizeY = 0;

var element;

const dragStart = e => {
  const {events} = enums;
  dragBegins = true;
  const pSize = e.target.children[0];
  pSize.innerHTML = `${elementAttributes.width}px x ${elementAttributes.height}px`;

  if (e.type === events.touchstart) {
    initialX = e.touches[0].layerX;
    initialY = e.touches[0].layerY;
  } else {
    initialX = e.layerX;
    initialY = e.layerY;
  }

  resizeX = 0;
  resizeY = 0;
};

const drag = e => {
  const {events, html} = enums;

  if (dragBegins) {
    if (e.type === events.touchstart) {
      moveX = e.touches[0].layerX;
      moveY = e.touches[0].layerY;
    } else {
      moveX = e.layerX;
      moveY = e.layerY;
    }

    resizeX = moveX - initialX;
    resizeY = moveY - initialY;

    element = e.target;
    const pSize = element.children[0];
    pSize.innerHTML = `${elementAttributes.width + resizeX}px x ${
      elementAttributes.height + resizeY
    }px`;
    element.setAttribute(
      html.style,
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

const builderElement = () => {
  const {events} = enums;
  console.log('String to insert');
  const size = createElementor({tag: 'p', className: 'model-size noselect'});
  element = createElementor({tag: 'div', className: 'model', chield: [size]});
  element.addEventListener(events.mousedown, dragStart, false);
  element.addEventListener(events.mousemove, drag, false);
  element.addEventListener(events.mouseup, dragEnd, false);

  document.body.appendChild(element);
};

builderElement();
