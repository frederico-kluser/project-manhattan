import {elementIdGetter, elementIdSetter, Elements} from './elements.js';

let startDrag = false;

export const dragStartEventSetter = e => {
  if (e.which === 1) {
    const {id} = e.target;
    elementIdSetter(id);
    Elements[id].dragEvents('start');
    startDrag = true;
  }
};

export const dragMoveEventSetter = e => {
  const {id} = e.target;
  Elements[id].dragEvents('move');
};

export const dragEndEventSetter = e => {
  const {id} = e.target;
  Elements[id].dragEvents('end');
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
