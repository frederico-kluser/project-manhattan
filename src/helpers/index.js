/* eslint-disable-next-line complexity */
const createElementor = ({attributes = [], chield = [], className, html, id, tag, text}) => {
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
  if (html) {
    element.innerHTML = html;
  }

  return element;
};

window.createElementor = createElementor;
