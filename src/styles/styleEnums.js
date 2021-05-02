import {enums} from '../helpers/enums.js';

const {gray, white} = enums.colors;
const {helperBubble, helperInput, helperText} = enums.helperBubble;

const helperBubbleDefaultPixelSize = 30;

export const inputExtraSize = 2;

export const globalStyleObject = {
  night: `
body {
  background-color: ${gray[900]};
}
`,
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
.${helperBubble} {
  background-color: ${gray[900]};
  border-radius: 10px;
  border: 1px solid ${white};
  height: ${helperBubbleDefaultPixelSize}px;
  left: 25px;
  max-width: ${helperBubbleDefaultPixelSize}px;
  min-width: ${helperBubbleDefaultPixelSize}px;
  opacity: 0.1;
  overflow: hidden;
  position: fixed;
  text-align: center;
  top: 25px;
  transition-timing-function: linear;
  transition: all 0.25s;
  transition: opacity 0.25s, max-width 0.5s;
  width: auto;
}

.${helperBubble}:hover {
  opacity: 1;
}
`,
  helperIcons: `
.${helperBubble} .material-icons {
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
.${helperText} {
  color: ${white};
  float: left;
  font-family: ${enums.font.roboto};
  font-helperBubbleDefaultPixelSize: 14px;
  height: ${helperBubbleDefaultPixelSize}px;
  line-height: ${helperBubbleDefaultPixelSize}px;
  margin-left: ${helperBubbleDefaultPixelSize + 8}px;
  padding-right: 16px;
  position: relative;
  text-align: right;
}

.${helperText}:empty {
  display: none;
}
`,
  helperInput: `
.${helperInput} {
  background-color: transparent;
  border: none;
  color: ${gray[200]};
  display: none;
  float: left;
  font-family: ${enums.font.roboto};
  height: ${helperBubbleDefaultPixelSize}px;
  line-height: ${helperBubbleDefaultPixelSize}px;
  outline: none;
  padding-right: 16px;
  padding: 0px;
}

.${helperInput}::placeholder {
  color: ${gray[400]};
}
`,
};
