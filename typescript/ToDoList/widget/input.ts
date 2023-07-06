import { widget } from "./baseWidget";
import { ControlBase } from "./core";

type Option = {
  id: string;
  inputType: string;
  checked?: boolean;
  onclick?: (event: MouseEvent) => void;
};

export interface Input extends ControlBase {
  type: "input";
  getValue: () => string;
  clear: () => void;
  focus: () => void;
}

function _createInput(option: Option): Input {
  const inputEl = document.createElement("input");
  inputEl.type = option.inputType;

  if (option.checked) {
    inputEl.checked = option.checked;
  }

  if (option.onclick) {
    inputEl.onclick = option.onclick;
  }

  return {
    id: option.id,
    type: "input",
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
}

export const createInput = widget(_createInput);
