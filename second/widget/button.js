// option
// id: 식별Id
// label: textContent
// onClick: 콜백
export function createButton(option) {
  var buttonEl = document.createElement("button");
  buttonEl.id = option.id;
  buttonEl.textContent = option.label;

  if (option.callbacks) {
    for (var callback of Object.keys(option.callbacks)) {
      buttonEl[callback.toLowerCase()] = option.callbacks[callback];
    }
  }

  return {
    element: buttonEl,
  };
}
