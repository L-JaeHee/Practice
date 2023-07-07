const controls: Map<string, ControlBase> = new Map();

export abstract class ControlBase {
  protected _id: string;
  protected abstract _element: HTMLElement;

  constructor(id: string) {
    this._id = id;
    addControl(this);
  }

  get id(): string {
    return this._id;
  }

  get element(): HTMLElement {
    return this._element;
  }

  public dispose() {
    removeControl(this._id);
  }

  public append(control: ControlBase): this {
    this._element.append(control.element);
    return this;
  }
}

export function getControl(id: string): ControlBase | undefined {
  return controls.get(id);
}

function addControl(control: ControlBase): void {
  controls.set(control.id, control);
}

function removeControl(id: string): void {
  controls.delete(id);
}
