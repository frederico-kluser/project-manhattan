/* eslint-disable no-undef */

var dragBegins = false;

var initialX;
var initialY;

var moveX;
var moveY;

var resizeX;
var resizeY;

var width = 200;
var height = 100;

var element;

const dragStart = e => {
  dragBegins = true;
  const pSize = e.target.children[0];
  pSize.innerHTML = `${width}px x ${height}px`;

  if (e.type === 'touchstart') {
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
  if (dragBegins) {
    if (e.type === 'touchstart') {
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
    pSize.innerHTML = `${width + resizeX}px x ${height + resizeY}px`;
    element.setAttribute('style', `width:${width + resizeX}px;height:${height + resizeY}px;`);
  }
};

const dragEnd = e => {
  dragBegins = false;
  width += resizeX;
  height += resizeY;

  element = e.target;
  const pSize = element.children[0];
  console.log(element);
  console.log(`${width}px x ${height}px`);
  pSize.innerHTML = '';
};

const builderElement = () => {
  console.log('String to insert');
  const size = createElementor({tag: 'p', className: 'model-size noselect'});
  element = createElementor({tag: 'div', className: 'model', chield: [size]});
  element.addEventListener('mousedown', dragStart, false);
  element.addEventListener('mousemove', drag, false);
  element.addEventListener('mouseup', dragEnd, false);

  document.body.appendChild(element);
};

builderElement();
