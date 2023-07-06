const controls: ControlBase[] = [];

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
}

export function getControl(id: string): ControlBase | undefined {
  return controls.find((control) => {
    return control.id === id;
  });
}

function addControl(control: ControlBase): void {
  controls.push(control);
}

function removeControl(id: string): void {
  controls.splice(
    controls.findIndex((control) => control.id === id),
    1
  );
}
