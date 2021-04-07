/* eslint-disable complexity */
/* eslint-disable-next-line complexity */

const nameGenerator = () => `_${Math.random().toString(36).substr(2, 9)}`;

const unicGlobalVarNameGenerator = () => {
  let name;
  do {
    name = nameGenerator();
    // eslint-disable-next-line no-prototype-builtins
  } while (window.hasOwnProperty(name));
  return name;
};

const injectCSS = cssCode => {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssCode;
  document.getElementsByTagName('head')[0].appendChild(style);
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createElementor = ({attributes = [], chield = [], className, html, id, tag, text, style}) => {
  const elem = document.createElement(tag);
  if (className) {
    elem.setAttribute('class', className);
  }
  if (attributes.length) {
    attributes.forEach(({attribute, value}) => {
      elem.setAttribute(attribute, value);
    });
  }
  if (chield.length) {
    chield.forEach(item => {
      elem.appendChild(item);
    });
  }
  if (text) {
    elem.innerText = text;
  }
  if (id) {
    elem.setAttribute('id', id);
  }
  if (style) {
    elem.setAttribute('style', style);
  }
  if (html) {
    elem.innerHTML = html;
  }

  return elem;
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
window.unicGlobalVarNameGenerator = unicGlobalVarNameGenerator;
window.injectCSS = injectCSS;
window.random = random;
