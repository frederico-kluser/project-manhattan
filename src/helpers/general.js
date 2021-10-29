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

const distanceBetweenTwoPoints = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

export const closestDistance = e => {
  let point = {};

  const {offsetHeight, offsetWidth} = e.target;
  const {layerX, layerY} = e;

  const {
    quadrant1,
    quadrant2,
    quadrant3,
    quadrant4,
    quadrantCenter,
    quadrantCenterBottom,
    quadrantCenterTop,
    quadrantCenterLeft,
    quadrantCenterRight,
  } = enums.quadrants;

  const points = [
    {name: quadrant2, x: 0, y: 0},
    {name: quadrant1, x: offsetWidth, y: 0},
    {name: quadrant3, x: 0, y: offsetHeight},
    {name: quadrant4, x: offsetWidth, y: offsetHeight},
    {name: quadrantCenter, x: parseInt(offsetWidth / 2), y: parseInt(offsetHeight / 2)},
    {name: quadrantCenterBottom, x: parseInt(offsetWidth / 2), y: offsetHeight},
    {name: quadrantCenterTop, x: parseInt(offsetWidth / 2), y: 0},
    {name: quadrantCenterLeft, x: 0, y: parseInt(offsetHeight / 2)},
    {name: quadrantCenterRight, x: offsetWidth, y: parseInt(offsetHeight / 2)},
  ];

  points.forEach(({name, x, y}, index) => {
    const distance = distanceBetweenTwoPoints(layerX, layerY, x, y);
    if (!index) {
      point = {name, distance};
    } else if (distance < point.distance) {
      point = {name, distance};
    }
  });

  return point.name;
};
