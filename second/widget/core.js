var controls = [];

export function addControl(control) {
  controls.push(control);
}

export function getControl(id) {
  return controls.find(function (control) {
    return control.id === id;
  });
}
