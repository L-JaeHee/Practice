import { createButton } from "./button.js";
import { getControl } from "./core.js";
import { createDiv } from "./div.js";
import { createInput } from "./input.js";
import { createSpan } from "./span.js";
import { createUl } from "./ul.js";

window.Widget = {
  button: createButton,
  ul: createUl,
  input: createInput,
  span: createSpan,
  div: createDiv,
  getControl: getControl,
};
