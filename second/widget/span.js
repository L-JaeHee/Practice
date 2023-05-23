// option
// content(string)

export function createSpan(option) {
  var spanEl = document.createElement("span");
  spanEl.textContent = option.content;

  return {
    element: spanEl,
  };
}
