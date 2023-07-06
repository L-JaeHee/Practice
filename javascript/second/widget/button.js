// option
// id: 식별Id
// label: textContent

import { addControl, removeControl } from "./core";

// onClick: 콜백
export function createButton(option) {
  var buttonEl = document.createElement("button");
  buttonEl.textContent = option.label;

  if (option.callbacks) {
    for (var callback of Object.keys(option.callbacks)) {
      buttonEl[callback.toLowerCase()] = option.callbacks[callback];
    }
  }

  var control = {
    id: option.id,
    element: buttonEl,
    dispose: function () {
      buttonEl.remove();
      removeControl(id);
    },
  };

  addControl(control);

  return control;
}
