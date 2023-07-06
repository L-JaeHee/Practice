import { widget } from "./baseWidget";
import { ControlBase } from "./core";

type Option = {
  id: string;
};

export interface Div extends ControlBase {
  type: "div";
  append: (control: ControlBase) => void;
}

function _createDiv(option: Option): Div {
  const divEl = document.createElement("div");

  return {
    id: option.id,
    type: "div",
    element: divEl,
    append: function (control) {
      divEl.append(control.element);
    },
  };
}

export const createDiv = widget(_createDiv);
