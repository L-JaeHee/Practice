const controls: ControlBase[] = [];

export interface ControlBase {
  type: string;
  id: string;
  element: HTMLElement;
}

export function addControl(control: ControlBase): void {
  controls.push(control);
}

export function getControl(id: string): ControlBase | undefined {
  return controls.find((control) => {
    return control.id === id;
  });
}

export function removeControl(id: string): void {
  controls.splice(
    controls.findIndex((control) => control.id === id),
    1
  );
}
