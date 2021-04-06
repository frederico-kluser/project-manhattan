/* eslint-disable-next-line complexity */
const createElementor = ({attributes = [], chield = [], className, html, id, tag, text, style}) => {
  const element = document.createElement(tag);
  if (className) {
    element.setAttribute('class', className);
  }
  if (attributes.length) {
    attributes.forEach(({attribute, value}) => {
      element.setAttribute(attribute, value);
    });
  }
  if (chield.length) {
    chield.forEach(item => {
      element.appendChild(item);
    });
  }
  if (text) {
    element.innerText = text;
  }
  if (id) {
    element.setAttribute('id', id);
  }
  if (style) {
    element.setAttribute('style', style);
  }
  if (html) {
    element.innerHTML = html;
  }

  return element;
};

const dynamicFunction = (func1, func2, conditional) => {
  let func = func1 || func2;

  if (conditional === false) {
    func = func2;
  }

  return func();
};

const backSpaceText = string => string.substring(0, string.length - 1);

window.createElementor = createElementor;
window.dynamicFunction = dynamicFunction;
window.backSpaceText = backSpaceText;
