/* eslint-disable complexity */

import {enums} from './enums.js';

const nameGenerator = () => `_${Math.random().toString(36).substr(2, 9)}`;

export const unicGlobalVarNameGenerator = () => {
  let name;
  do {
    name = nameGenerator();
    // eslint-disable-next-line no-prototype-builtins
  } while (window.hasOwnProperty(name));
  return name;
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomColor = (intensity = 500) => {
  let color;
  const colorIndex = random(1, Object.keys(enums.colors).length - 3);
  Object.keys(enums.colors).forEach((key, index) => {
    if (index === colorIndex) {
      // eslint-disable-next-line prefer-destructuring
      color = enums.colors[key][intensity];
    }
  });

  return color;
};

export const createElement = ({
  attributes = [],
  chield = [],
  className,
  html,
  id,
  tag,
  text,
  style,
}) => {
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

export const dynamicFunction = (func1, func2, conditional) => {
  if (func1 || func2) {
    let func = func1 || func2;

    if (conditional === false) {
      func = func2;
    }
    return !!func();
  }
  return false;
};

export const builderMenu = e => {
  console.log(e);
  e.preventDefault();
};
