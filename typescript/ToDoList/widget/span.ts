import { ControlBase } from "./core";
import { widget } from "./baseWidget";

type Option = {
  id: string;
  content: string;
};

export interface Span extends ControlBase {
  type: "span";
}

function _createSpan(option: Option): Span {
  const spanEl = document.createElement("span");
  spanEl.textContent = option.content;

  return {
    type: "span",
    id: option.id,
    element: spanEl,
  };
}

export const createSpan = widget(_createSpan);
