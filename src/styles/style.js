import {enums} from '../helpers/enums.js';
import {Elements} from '../core/elements.js';
import regex from '../helpers/regex.js';
import {createElement} from '../helpers/general.js';
import {attributesHasSizeType} from './attributes.js';
import {stopKeyboardCommandsSetter} from '../core/commands.js';

const {gray, white} = enums.colors;

const helperBubbleDefaultPixelSize = 30;
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
  background-color: ${gray[900]};
  border-radius: 10px;
  height: ${helperBubbleDefaultPixelSize}px;
  left: 25px;
  max-width: ${helperBubbleDefaultPixelSize}px;
  min-width: ${helperBubbleDefaultPixelSize}px;
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
  background-color: ${gray[900]};
  color: ${white};
  font-size: 20px;
  left: 0px;
  line-height: ${helperBubbleDefaultPixelSize}px;
  position: absolute;
  width: ${helperBubbleDefaultPixelSize}px;
  z-index: 1;
}
`,
  helperText: `
.kluser_text {
  color: ${white};
  float: left;
  font-family: ${enums.font.roboto};
  font-helperBubbleDefaultPixelSize: 14px;
  height: ${helperBubbleDefaultPixelSize}px;
  line-height: ${helperBubbleDefaultPixelSize}px;
  padding-right: 16px;
  position: relative;
  text-align: right;
  margin-left: ${helperBubbleDefaultPixelSize + 8}px;
}

.kluser_text:empty {
  display: none;
}
`,
  helperInput: `
.kluser_input {
  background-color: transparent;
  border: none;
  color: ${gray[200]};
  display: none;
  float: left;
  font-family: ${enums.font.roboto};
  height: ${helperBubbleDefaultPixelSize}px;
  line-height: ${helperBubbleDefaultPixelSize}px;
  outline: none;
  padding: 0px;
  padding-right: 16px;
}

.kluser_input::placeholder {
  color: ${gray[400]};
}
`,
};

const autoReizeInput = ({target}) => {
  const {length} = target.value;
  target.setAttribute('size', length + inputExtraSize);
  target.setAttribute('maxlength', length + inputExtraSize);
};

let styleTagElement;
export const styleTagElementGetter = () => styleTagElement;
export const styleTagElementSetter = value => {
  styleTagElement = value;
};

export const helperBubbleStructure = {};
helperBubbleStructure.symbol = enums.icons.search;
helperBubbleStructure.icon = createElement({
  tag: 'span',
  className: 'material-icons',
  text: helperBubbleStructure.symbol,
});
helperBubbleStructure.text = createElement({tag: 'div', className: 'kluser_text'});
helperBubbleStructure.input = createElement({tag: 'input', className: 'kluser_input'});
helperBubbleStructure.element = createElement({
  tag: 'div',
  className: 'kluser_helper',
  chield: [helperBubbleStructure.icon, helperBubbleStructure.text, helperBubbleStructure.input],
});

export const updateHelperBubble = (
  info = '',
  icon = helperBubbleStructure.symbol,
  inputPlaceholder = '',
  inputType = 'text',
  inputValue = ''
) => {
  stopKeyboardCommandsSetter(info);
  helperBubbleStructure.text.innerText = info;
  helperBubbleStructure.symbol = icon;
  helperBubbleStructure.icon.innerText = icon;
  helperBubbleStructure.input.setAttribute('placeholder', inputPlaceholder);
  helperBubbleStructure.input.setAttribute('type', inputType);
  helperBubbleStructure.input.setAttribute('size', inputValue.length + inputPlaceholder.length);
  helperBubbleStructure.input.setAttribute(
    'maxlength',
    inputValue.length + inputPlaceholder.length
  );
  helperBubbleStructure.input.value = inputValue;
  helperBubbleStructure.input.setAttribute('style', inputPlaceholder ? `display: initial;` : '');
  if (inputPlaceholder) {
    helperBubbleStructure.input.setAttribute('type', inputType);
    setTimeout(() => {
      helperBubbleStructure.input.focus();
    }, 1);
  }
  helperBubbleStructure.input.addEventListener('keydown', autoReizeInput, false);
  helperBubbleStructure.element.setAttribute(
    'style',
    info !== '' ? `opacity:1;max-width:500px;` : 'transition: opacity 0.25s;'
  );
};

export const fixAttributeSize = (value, cssAttribute, printMode = false) => {
  const defaultSizeType = 'px';
  const output = attributesHasSizeType[cssAttribute]
    ? regex.adjut(value, regex.only_numbers, defaultSizeType)
    : value;

  return printMode ? ` ${cssAttribute}: ${output};` : output;
};

export const styleTagUpdater = () => {
  let css = Object.values(globalStyleObject).join('');

  Object.keys(Elements).forEach(elementKey => {
    css += `\n#${elementKey} {\n`;
    const {element, style} = Elements[elementKey];
    element.removeAttribute('style');
    const sortAttributes = [];

    Object.keys(style).forEach(cssAttribute => {
      const value = fixAttributeSize(style[cssAttribute], cssAttribute);
      sortAttributes.push(`\t${cssAttribute}: ${value};\n`);
    });

    sortAttributes.sort();

    sortAttributes.forEach(attribute => {
      css += attribute;
    });

    css += '}\n';
  });

  styleTagElement.innerHTML = css;
  updateHelperBubble();
};

export const injectedCssUpdater = () => {
  styleTagElementSetter(
    createElement({
      tag: 'style',
      attributes: [{attribute: 'type', value: 'text/css'}],
    })
  );
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
  document.getElementsByTagName('head')[0].appendChild(styleTagElement);
  document.body.appendChild(helperBubbleStructure.element);
  styleTagUpdater();
};

export const makeOnlyElementtouchable = draggableElement => {
  // TODO - in future i will need improve this function for all page elements

  Object.keys(Elements).forEach(elementKey => {
    const {element} = Elements[elementKey];
    if (element !== draggableElement && element.contains(draggableElement) === false) {
      element.setAttribute('style', 'pointer-events: none !important;');
    }
  });
};
