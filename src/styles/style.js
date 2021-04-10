/* eslint-disable no-undef */
const {black, white} = enums.colors;

const globalStyleObject = {
  generalConfig: `
body {
  margin: 0px;
  padding: 0px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
`,
  helper: `
.kluser_helper {
  position: fixed;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  background-color: ${black};
  border-radius: 10px;
  opacity: 0.1;
  text-align: center;
  transition: all 0.5s;
}

.kluser_helper:hover {
  opacity: 1;
}

.kluser_helper .material-icons {
  font-size: 30px;
  line-height: 50px;
  color: ${white};
}
`,
};

var globalStyle;
var helper = {};
helper.symbol = enums.icons.search;
helper.icon = createElement({tag: 'span', className: 'material-icons', text: helper.symbol});
helper.element = createElement({tag: 'div', className: 'kluser_helper', chield: [helper.icon]});

const updateHelper = () => {};

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

  Object.values(globalStyleObject).forEach(style => {
    css += style;
  });

  Object.keys(Elements).forEach(elementKey => {
    css += `\n#${elementKey} {\n`;
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
  updateHelper();
};

const injectCSS = () => {
  globalStyle = createElement({
    tag: 'style',
    attributes: [{attribute: 'type', value: 'text/css'}],
  });
  const linkIcons = createElement({
    tag: 'link',
    attributes: [
      {
        attribute: 'href',
        value: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        attribute: 'rel',
        value: 'stylesheet',
      },
    ],
  });

  document.getElementsByTagName('head')[0].appendChild(linkIcons);
  document.getElementsByTagName('head')[0].appendChild(globalStyle);
  document.body.appendChild(helper.element);
  updateGlobalStyle();
};

window.updateGlobalStyle = updateGlobalStyle;
window.globalStyle = globalStyle;
window.helper = helper;
window.injectCSS = injectCSS;
