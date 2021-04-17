import {elementIdSetter, Elements} from './elements.js';

export const dragStartEventSetter = e => {
  if (e.which === 1) {
    const {id} = e.target;
    elementIdSetter(id);
    Elements[id].dragEvents(e, 'start');
  }
};

export const dragMoveEventSetter = e => {
  const {id} = e.target;
  Elements[id].dragEvents(e, 'move');
};

export const dragEndEventSetter = e => {
  const {id} = e.target;
  Elements[id].dragEvents(e, 'end');
};
