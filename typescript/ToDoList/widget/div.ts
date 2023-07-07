import { ControlBase } from "./core";

type Option = {
  id: string;
};

export class DivControl extends ControlBase {
  protected _element: HTMLDivElement;

  constructor(option: Option) {
    super(option.id);

    const divEl = document.createElement("div");
    this._element = divEl;
  }
}
