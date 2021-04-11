/* eslint-disable no-undef */
const {black, white} = enums.colors;

const size = 30;
const globalStyleObject = {
  generalConfig: `
body {
  margin: 0px;
  padding: 0px;
}

.noselect {
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
`,
  helper: `
.kluser_helper {
  background-color: ${black};
  border-radius: 10px;
  height: ${size}px;
  left: 25px;
  max-width: ${size}px;
  min-width: ${size}px;
  opacity: 0.1;
  overflow: hidden;
  position: fixed;
  text-align: center;
  top: 25px;
  transition: opacity 0.25s, max-width 1s;
  transition-timing-function: linear;
  width: auto;
}

.kluser_helper:hover {
  opacity: 1;
}

.kluser_helper .material-icons {
  background-color: ${black};
  color: ${white};
  font-size: 20px;
  left: 0px;
  line-height: ${size}px;
  position: absolute;
  width: ${size}px;
  z-index: 1;
}

.kluser_text {
  color: ${white};
  font-family: Roboto;
  font-size: 14px;
  height: ${size}px;
  line-height: ${size}px;
  padding-right: 16px;
  position: relative;
  text-align: right;
  margin-left: ${size}px;
}

.kluser_text:empty {
  display: none;
}
`,
};

var globalStyle;
var helper = {};
helper.symbol = enums.icons.search;
helper.icon = createElement({tag: 'span', className: 'material-icons', text: helper.symbol});
helper.text = createElement({tag: 'div', className: 'kluser_text mdc-typography--headline1'});
helper.element = createElement({
  tag: 'div',
  className: 'kluser_helper',
  chield: [helper.icon, helper.text],
});

const updateHelper = (info = '', icon = helper.symbol) => {
  helper.text.innerText = info;
  helper.symbol = icon;
  helper.icon.innerText = icon;
  helper.element.setAttribute('style', info ? `opacity:1;max-width:500px;` : '');
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
  const linkFonts = createElement({
    tag: 'link',
    attributes: [
      {
        attribute: 'href',
        value: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
      },
      {
        attribute: 'rel',
        value: 'stylesheet',
      },
    ],
  });

  document.getElementsByTagName('head')[0].appendChild(linkIcons);
  document.getElementsByTagName('head')[0].appendChild(linkFonts);
  document.getElementsByTagName('head')[0].appendChild(globalStyle);
  document.body.appendChild(helper.element);
  updateGlobalStyle();
};

window.updateGlobalStyle = updateGlobalStyle;
window.globalStyle = globalStyle;
window.helper = helper;
window.injectCSS = injectCSS;
window.updateHelper = updateHelper;
