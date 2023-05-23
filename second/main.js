(function () {
  var items = [];

  var todolist;
  var donelist;
  var inputControl;

  render();

  function render() {
    var root = document.getElementById("root");
    inputControl = Widget.input({
      id: "inputControl",
      type: "text",
    });

    var inputBtnControl = Widget.button({
      id: "inputBtnControl",
      label: "입력",
      onClick: function () {
        inputBtnClickHandler();
        todolist.reload(getSortedItems({ done: false }));
      },
    });

    todolist = Widget.ul({
      datas: getSortedItems({ done: false }),
      columns: [
        { render: renderColumnDone },
        { render: renderColumnTodo },
        { render: renderColumnDelete },
      ],
    });

    donelist = Widget.ul({
      datas: getSortedItems({ done: true }),
      columns: [
        { render: renderColumnDone },
        { render: renderColumnTodo },
        { render: renderColumnDelete },
      ],
    });

    root.append(inputControl.element);
    root.append(inputBtnControl.element);
    root.append(todolist.element);
    root.append(donelist.element);
  }

  function inputBtnClickHandler() {
    if (!inputControl.element.value) {
      alert("할일을 입력해주세요");
      return;
    }

    items.push({
      id: crypto.randomUUID(),
      content: inputControl.element.value,
      done: false,
    });

    inputControl.element.value = "";
    inputControl.element.focus();
  }

  function getSortedItems(option) {
    return items.filter(function (item) {
      return item.done === option.done;
    });
  }

  function renderColumnDone(item) {
    var checkbox = Widget.input({
      type: "checkbox",
      done: item.done,
      onClick: function (e) {
        item.done = e.target.checked;

        donelist.reload(getSortedItems({ done: true }));
        todolist.reload(getSortedItems({ done: false }));
      },
    });

    return checkbox.element;
  }

  function renderColumnTodo(item) {
    var span = Widget.span({
      content: item.content,
    });

    return span.element;
  }

  function renderColumnDelete(item) {
    var button = Widget.button({
      label: "삭제",
      onClick: function (e) {
        items.splice(items.indexOf(item), 1);
        item.done
          ? donelist.reload(getSortedItems({ done: true }))
          : todolist.reload(getSortedItems({ done: false }));
      },
    });

    return button.element;
  }
})();
