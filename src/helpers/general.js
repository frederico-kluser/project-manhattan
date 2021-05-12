/* eslint-disable complexity */

import {enums} from './enums.js';

export const getClassUnicName = className => {
  const unicNameLocation = className.indexOf('kluser_');
  if (unicNameLocation === -1) {
    throw new Error("Don't exist unic kluser_ class");
  }
  return className.substring(unicNameLocation, unicNameLocation + 16);
};

export const unicGlobalVarNameGenerator = () => {
  let name;

  do {
    name = `kluser_${Math.random().toString(36).substr(2, 9)}`;
  } while (document.getElementsByClassName(name).length);

  return name;
};

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomColor = (intensity = 500) => {
  const colorKey = getRandomInteger(1, Object.keys(enums.colors).length - 3);
  const colorProperty = Object.keys(enums.colors)[colorKey];
  return enums.colors[colorProperty][intensity];
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

export const conditionalFunctionExecute = (func1, func2) => {
  let result;

  if (func1) {
    result = func1();
  }

  if (func2 && !result) {
    result = func2();
  }

  return !!result;
};

export const builderMenu = e => {
  e.preventDefault();
};
