// option
// id(string): 식별Id
// type(string): input 타입
// callbacks(object{event: function()}): 넣어줄 콜백들 배열

export function createInput(option) {
  var inputEl = document.createElement("input");
  inputEl.type = option.type;
  inputEl.id = option.id;

  if (option.callbacks) {
    for (var callback of Object.keys(option.callbacks)) {
      inputEl[callback.toLowerCase()] = option.callbacks[callback];
    }
  }

  return {
    element: inputEl,
  };
}
