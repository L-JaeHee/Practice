import { widget } from "./baseWidget";
import { ControlBase } from "./core";

type Option = {
  id: string;
  content: string;
  onclick: (event: MouseEvent) => void;
};

export interface Button extends ControlBase {
  type: "button";
}

function _createButton(option: Option): Button {
  const buttonEl = document.createElement("button");
  buttonEl.textContent = option.content;
  buttonEl.onclick = option.onclick;

  return {
    id: option.id,
    type: "button",
    element: buttonEl,
  };
}

export const createButton = widget(_createButton);
