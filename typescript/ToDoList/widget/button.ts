import { ControlBase } from "./core";

type Option = {
  id: string;
  content: string;
  onclick: (event: MouseEvent) => void;
};

export class ButtonControl extends ControlBase {
  protected _element: HTMLButtonElement;

  constructor(option: Option) {
    super(option.id);

    const buttonEl = document.createElement("button");
    buttonEl.textContent = option.content;
    buttonEl.onclick = option.onclick;
    this._element = buttonEl;
  }
}
