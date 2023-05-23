// option
// id: 식별Id
// sortOption
// createLi: function()
// sortList: function()

export function createUl(option) {
  var ulEl = document.createElement("ul");
  ulEl.style.listStyle = "none";
  ulEl.style.padding = "0";
  ulEl.id = option.id;

  return {
    element: ulEl,
    reload: function (items) {
      reload(items);
    },
  };

  function reload(items) {
    ulEl.innerHTML = "";

    for (var item of items) {
      var liEl = document.createElement("li");
      var checkbox = Widget.input({
        type: "checkbox",
      });

      var span = Widget.span({
        content: item.content,
      });

      var button = Widget.button({
        label: "삭제",
        callbacks: {
          onClick: function () {
            items.splice(items.indexOf(item), 1);
          },
        },
      });

      liEl.append(checkbox.element);
      liEl.append(span.element);
      liEl.append(button.element);

      ulEl.append(liEl);
    }
  }
}
