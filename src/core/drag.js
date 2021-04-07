/* eslint-disable no-undef */

const dragStart = e => {
  const {id} = e.target;
  Elements[id].drag(e, 'start');
};

const dragMove = e => {
  const {id} = e.target;
  Elements[id].drag(e, 'move');
};

const dragEnd = e => {
  const {id} = e.target;
  Elements[id].drag(e, 'end');
};

// eslint-disable-next-line no-new
new ElementBuilder(document.body, 'div');

window.dragStart = dragStart;
window.dragMove = dragMove;
window.dragEnd = dragEnd;
