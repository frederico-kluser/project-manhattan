import {enums} from '../helpers/enums.js';
import {Elements} from '../core/elements.js';
import regex from '../helpers/regex.js';
import {createElement} from '../helpers/general.js';
import {propertyHasSizeType} from './cssProperties.js';
import {stopKeyboardCommandsSetter} from '../core/commands.js';
import {globalStyleObject, inputExtraSize} from './styleEnums.js';

const {helperBubble, helperInput, helperText} = enums.helperBubble;

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
helperBubbleStructure.text = createElement({tag: 'div', className: helperText});
helperBubbleStructure.input = createElement({tag: 'input', className: helperInput});
helperBubbleStructure.element = createElement({
  tag: 'div',
  className: helperBubble,
  chield: [helperBubbleStructure.icon, helperBubbleStructure.text, helperBubbleStructure.input],
});

export const updateHelperBubble = (
  info = '',
  icon = helperBubbleStructure.symbol,
  inputPlaceholder = '',
  inputType = 'text',
  inputValue = ''
) => {
  const size = inputValue.length + inputPlaceholder.length;
  stopKeyboardCommandsSetter(info);
  helperBubbleStructure.text.innerText = info;
  helperBubbleStructure.symbol = icon;
  helperBubbleStructure.icon.innerText = icon;
  helperBubbleStructure.input.setAttribute('placeholder', inputPlaceholder);
  helperBubbleStructure.input.setAttribute('type', inputType);
  helperBubbleStructure.input.setAttribute('size', size);
  helperBubbleStructure.input.setAttribute('maxlength', size);
  helperBubbleStructure.input.value = inputValue;
  helperBubbleStructure.input.setAttribute('style', inputPlaceholder ? `display: initial;` : '');
  if (inputPlaceholder) {
    // refactor this
    setTimeout(() => {
      helperBubbleStructure.input.focus();
    }, 1);
  }
  helperBubbleStructure.input.addEventListener('keydown', autoReizeInput);
  helperBubbleStructure.element.setAttribute(
    'style',
    info !== '' ? `opacity:1;max-width:500px;border:none;` : 'transition: opacity 0.25s;'
  );
};

export const fixPropertySize = (value, cssAttribute, printMode = false) => {
  const defaultSizeType = 'px';
  const output = propertyHasSizeType[cssAttribute]
    ? regex.insertSizeType(value, regex.onlyNumbers, defaultSizeType)
    : value;

  return printMode ? `${cssAttribute}: ${output};` : output;
};

export const styleTagUpdater = () => {
  let css = Object.values(globalStyleObject).join('');

  Object.keys(Elements).forEach(elementKey => {
    css += `\n.${elementKey} {\n`;
    const element = Elements[elementKey].elementGetter();
    const style = Elements[elementKey].styleGetter();

    element.removeAttribute('style');
    const sortAttributes = [];

    Object.keys(style).forEach(cssAttribute => {
      sortAttributes.push(`\t${fixPropertySize(style[cssAttribute], cssAttribute, true)}\n`);
    });

    sortAttributes.sort();
    sortAttributes.forEach(attribute => {
      css += attribute;
    });

    css += '}\n';
  });

  styleTagElementGetter().innerHTML = css;
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
  document.getElementsByTagName('head')[0].appendChild(styleTagElementGetter());
  document.body.appendChild(helperBubbleStructure.element);
  styleTagUpdater();
};

export const makeOnlyElementtouchable = draggableElement => {
  Object.keys(Elements).forEach(elementKey => {
    const element = Elements[elementKey].elementGetter();
    if (element !== draggableElement && element.contains(draggableElement) === false) {
      element.setAttribute('style', 'pointer-events: none !important;');
    }
  });
};

// eslint-disable-next-line no-unused-vars
const elementCssSelectors = element => {
  const sheets = document.styleSheets;
  const apliedCSS = [];

  // eslint-disable-next-line no-param-reassign
  element.matches =
    element.matches ||
    element.webkitMatchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector ||
    element.oMatchesSelector;
  Object.values(sheets).forEach(sheet => {
    const rules = sheet.rules || sheet.cssRules;
    Object.values(rules).forEach(rule => {
      if (element.matches(rule.selectorText)) {
        apliedCSS.push(rule.cssText);
      }
    });
  });

  return apliedCSS;
};

// eslint-disable-next-line complexity
export const getAllStyles = element => {
  if (!element) return {}; // Element does not exist, empty list.
  const win = document.defaultView || window;
  const styleNode = {};
  const style = win.getComputedStyle(element, '');
  Object.values(style).forEach(property => {
    styleNode[property] = style.getPropertyValue(property);
  });

  // https://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element
  return styleNode;
};
