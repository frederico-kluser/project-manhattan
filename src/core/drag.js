/* eslint-disable no-undef */

const dragStart = e => {
  const {id} = e.target;
  Elements[id].dragStart(e);
};

const drag = e => {
  const {id} = e.target;
  Elements[id].drag(e);
};

const dragEnd = e => {
  const {id} = e.target;
  Elements[id].dragEnd();
};

// eslint-disable-next-line no-new
new ElementBuilder(document.body, 'div');

window.dragStart = dragStart;
window.drag = drag;
window.dragEnd = dragEnd;
