import { ControlBase } from "./core";

type Option = {
  id: string;
  inputType: string;
  checked?: boolean;
  onclick?: (event: MouseEvent) => void;
};

export class InputControl extends ControlBase {
  protected _element: HTMLInputElement;

  constructor(option: Option) {
    super(option.id);

    const inputEl = document.createElement("input");
    inputEl.type = option.inputType;
    inputEl.checked = option.checked ?? false;
    inputEl.onclick = option.onclick ?? null;

    this._element = inputEl;
  }

  public getValue(): string {
    return this._element.value;
  }

  public clear(): void {
    this._element.value = "";
  }

  public focus(): void {
    this._element.focus();
  }
}
