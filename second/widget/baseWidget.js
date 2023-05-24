import { addControl } from "./core";

export function widget(creator) {
  return function () {
    var control = creator.apply(null, arguments);
    addControl(control);

    return control;
  };
}
