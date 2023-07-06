import { createButton } from "./button";
import { getControl } from "./core";
import { createDiv } from "./div";
import { createInput } from "./input";
import { createSpan } from "./span";
import { createUl } from "./ul";

export const Widget = {
  button: createButton,
  ul: createUl,
  input: createInput,
  span: createSpan,
  div: createDiv,
};

export const WidgetMethod = {
  getControl: getControl,
};
