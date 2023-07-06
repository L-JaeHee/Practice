import { ControlBase } from "./core";

type Option = {
  id: string;
  content: string;
};

export class SpanControl extends ControlBase {
  protected _element: HTMLSpanElement;

  constructor(option: Option) {
    super(option.id);

    const spanEl = document.createElement("span");
    spanEl.textContent = option.content;
    this._element = spanEl;
  }
}
