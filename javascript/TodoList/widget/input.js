// option
// id(string): 식별Id
// type(string): input 타입
// onClick

import { addControl } from "./core";

export function createInput(option) {
  var inputEl = document.createElement("input");
  inputEl.type = option.type;
  inputEl.checked = option.done;

  if (option.callbacks) {
    for (var callback of Object.keys(option.callbacks)) {
      inputEl[callback.toLowerCase()] = option.callbacks[callback];
    }
  }

  var control = {
    id: option.id,
    element: inputEl,
    getValue: function () {
      return inputEl.value;
    },
    clear: function () {
      inputEl.value = "";
    },
    focus: function () {
      inputEl.focus();
    },
  };

  addControl(control);

  return control;
}
