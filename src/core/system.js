var elementAttributes = {
  width: 300,
  height: 200,
  top: 0,
  left: 0,
};

var mode = 'resize';

var modeFunction = {
  resize: {
    dragStart: () => {},
    drag: () => {},
    dragEnd: () => {},
  },
};

window.elementAttributes = elementAttributes;
window.mode = mode;
window.modeFunction = modeFunction;
