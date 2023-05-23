// option
// id(string): 식별Id
// type(string): input 타입
// onClick

export function createInput(option) {
  var inputEl = document.createElement("input");
  inputEl.type = option.type;
  inputEl.id = option.id;
  inputEl.checked = option.done;

  inputEl.onclick = option.onClick;

  return {
    element: inputEl,
  };
}
