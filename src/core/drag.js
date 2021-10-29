import {closestDistance, getClassUnicName} from '../helpers/general.js';
import {elementIdGetter, elementIdSetter, Elements} from './elements.js';

let startDrag = false;
let quadrant;

export const quadrantGetter = () => quadrant;

export const dragStartEventSetter = e => {
  if (e.which === 1) {
    const className = getClassUnicName(e.target.className);
    elementIdSetter(className);
    Elements[className].dragEvents('start');
    Elements[className].quadrantSetter(closestDistance(e));
    startDrag = true;
  }
};

export const dragMoveEventSetter = e => {
  const className = getClassUnicName(e.target.className);
  Elements[className].dragEvents('move');
};

export const dragEndEventSetter = e => {
  const className = getClassUnicName(e.target.className);
  Elements[className].dragEvents('end');
  startDrag = false;
};

const position = {};
export const positionGetter = () => position;
export const positionSetter = ({clientX, clientY, type}) => {
  position.x = clientX;
  position.y = clientY;
  if (type === 'mousemove' && startDrag) {
    Elements[elementIdGetter()].dragEvents('move');
  }
};

// eslint-disable-next-line no-unused-vars
export const mouseMoveEvent = e => {
  // console.log(e);
};
