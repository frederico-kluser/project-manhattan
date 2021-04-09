/* eslint-disable no-undef */
/* eslint-disable complexity */
/* eslint-disable-next-line complexity */

var globalStyle;

const nameGenerator = () => `_${Math.random().toString(36).substr(2, 9)}`;

const unicGlobalVarNameGenerator = () => {
  let name;
  do {
    name = nameGenerator();
    // eslint-disable-next-line no-prototype-builtins
  } while (window.hasOwnProperty(name));
  return name;
};

const updateGlobalStyle = () => {
  const cssReference = {
    height: 'px',
    left: 'px',
    margin: 'px',
    padding: 'px',
    top: 'px',
    width: 'px',
  };

  let css = '';

  Object.keys(Elements).forEach(elementKey => {
    css += `#${elementKey} {\n`;
    const {element, style} = Elements[elementKey];
    element.removeAttribute('style');
    const sortAttributes = [];

    Object.keys(style).forEach(cssKey => {
      sortAttributes.push(`\t${cssKey}: ${style[cssKey]}${cssReference[cssKey] || ''};\n`);
    });

    sortAttributes.sort();

    sortAttributes.forEach(attribute => {
      css += attribute;
    });

    css += '}\n';
  });

  globalStyle.innerHTML = css;
};

const injectCSS = () => {
  globalStyle = document.createElement('style');
  globalStyle.setAttribute('type', 'text/css');
  document.getElementsByTagName('head')[0].appendChild(globalStyle);
  updateGlobalStyle();
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
window.globalStyle = globalStyle;
window.injectCSS = injectCSS;
window.updateGlobalStyle = updateGlobalStyle;
window.random = random;
