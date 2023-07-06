import { addControl } from "./core";
import { ControlBase } from "./core";
import { Widget } from ".";

//! 공통화 생각
export function widget(creator: Function) {
  return (): ControlBase => {
    const control = creator.apply(null, arguments);
    addControl(control);

    return control;
  };
}
