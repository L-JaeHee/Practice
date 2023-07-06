import { addControl } from "./core";

export function createDiv(option) {
  var divEl = document.createElement("div");

  var control = {
    id: option.id,
    element: divEl,
    append: function (control) {
      divEl.append(control.element);
    },
  };

  addControl(control);

  return control;
}
