// option
// content(string)

import { addControl } from "./core";

export function createSpan(option) {
  var spanEl = document.createElement("span");
  spanEl.textContent = option.content;

  var control = {
    id: option.id,
    element: spanEl,
  };

  addControl(control);

  return control;
}
