import {elementIdSetter, Elements} from './elements.js';

export const dragStart = e => {
  if (e.which === 1) {
    const {id} = e.target;
    elementIdSetter(id);
    Elements[id].drag(e, 'start');
  }
};

export const dragMove = e => {
  const {id} = e.target;
  Elements[id].drag(e, 'move');
};

export const dragEnd = e => {
  const {id} = e.target;
  Elements[id].drag(e, 'end');
};
