// option
// id: 식별Id
// label: textContent
// onClick: 콜백
export function createButton(option) {
  var buttonEl = document.createElement("button");
  buttonEl.id = option.id;
  buttonEl.textContent = option.label;
  buttonEl.onclick = option.onClick;

  return {
    element: buttonEl,
  };
}
