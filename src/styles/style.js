/* eslint-disable no-undef */
const {black, white} = enums.colors;

const size = 30;
const inputExtraSize = 2;
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
  helperBubble: `
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
  transition: all 0.25s;
  transition: opacity 0.25s, max-width 0.5s;
  transition-timing-function: linear;
  width: auto;
}

.kluser_helper:hover {
  opacity: 1;
}
`,
  helperIcons: `
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
`,
  helperText: `
.kluser_text {
  color: ${white};
  float: left;
  font-family: ${enums.font.roboto};
  font-size: 14px;
  height: ${size}px;
  line-height: ${size}px;
  padding-right: 16px;
  position: relative;
  text-align: right;
  margin-left: ${size + 8}px;
}

.kluser_text:empty {
  display: none;
}
`,
  helperInput: `
.kluser_input {
  background-color: transparent;
  border: none;
  color: ${white};
  display: none;
  float: left;
  font-family: ${enums.font.roboto};
  height: ${size}px;
  line-height: ${size}px;
  outline: none;
  padding: 0px;
  padding-right: 16px;
}

.kluser_input::placeholder {
  color: ${white};
}
`,
};

const autoReizeInput = ({target}) => {
  const {length} = target.value;
  target.setAttribute('size', length + inputExtraSize);
  target.setAttribute('maxlength', length + inputExtraSize);
};

var globalStyle;
var helper = {};
helper.symbol = enums.icons.search;
helper.icon = createElement({tag: 'span', className: 'material-icons', text: helper.symbol});
helper.text = createElement({tag: 'div', className: 'kluser_text'});
helper.input = createElement({tag: 'input', className: 'kluser_input'});
helper.element = createElement({
  tag: 'div',
  className: 'kluser_helper',
  chield: [helper.icon, helper.text, helper.input],
});

const updateHelper = (
  info = '',
  icon = helper.symbol,
  inputPlaceholder = '',
  inputType = 'text',
  inputValue = ''
) => {
  helper.text.innerText = info;
  helper.symbol = icon;
  helper.icon.innerText = icon;
  helper.input.setAttribute('placeholder', inputPlaceholder);
  helper.input.setAttribute('type', inputType);
  helper.input.setAttribute('size', inputValue.length + inputExtraSize);
  helper.input.setAttribute('maxlength', inputValue.length + inputExtraSize);
  helper.input.value = inputValue;
  helper.input.setAttribute('style', inputPlaceholder ? `display: initial;` : '');
  if (inputPlaceholder) {
    helper.input.setAttribute('type', inputType);
    setTimeout(() => {
      helper.input.focus();
    }, 1);
  }
  helper.input.addEventListener('keydown', autoReizeInput, false);
  helper.element.setAttribute(
    'style',
    info ? `opacity:1;max-width:500px;` : 'transition: opacity 0.25s;'
  );
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
      const value = cssReference[cssKey]
        ? regex.adjut(style[cssKey], regex.only_numbers, cssReference[cssKey])
        : style[cssKey];
      sortAttributes.push(`\t${cssKey}: ${value};\n`);
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
        value:
          'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
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
