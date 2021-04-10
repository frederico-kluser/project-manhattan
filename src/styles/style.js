/* eslint-disable no-undef */
const {black, white} = enums.colors;

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
  height: 50px;
  left: 25px;
  opacity: 0.1;
  overflow: hidden;
  position: fixed;
  text-align: center;
  top: 25px;
  transition: all 0.5s;
  width: 50px;
}

.kluser_helper:hover {
  opacity: 1;
}

.kluser_helper .material-icons {
  background-color: ${black};
  color: ${white};
  font-size: 30px;
  left: 0px;
  line-height: 50px;
  position: absolute;
  width: 50px;
  z-index: 1;
}

.kluser_text {
  color: ${white};
  font-family: Roboto;
  height: 50px;
  line-height: 50px;
  padding-right: 16px;
  position: relative;
  text-align: right;
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

const updateHelper = () => {
  helper.icon.innerText = helper.symbol;
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
