var items = [];

render();

function render() {
  var root = document.getElementById("root");
  var inputControl = Widget.input({
    id: "inputControl",
    type: "text",
  });
  var inputBtnControl = Widget.button({
    id: "inputBtnControl",
    label: "입력",
    callbacks: {
      onClick: function () {
        inputBtnClickHandler();
        todolist.reload(getSortedItems({ done: false }));
      },
    },
  });
  var todolist = Widget.ul({
    id: "todo-list",
    items: items,
  });
  var donelist = Widget.ul({
    id: "done-list",
    items: items,
  });

  root.append(inputControl.element);
  root.append(inputBtnControl.element);
  root.append(todolist.element);
  root.append(donelist.element);
}

function inputBtnClickHandler() {
  items.push({
    id: crypto.randomUUID(),
    content: document.getElementById("inputControl").value,
    done: false,
  });
}

function getSortedItems(option) {
  return items.filter(function (item) {
    return item.done === option.done;
  });
}
