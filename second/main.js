(function () {
  var items = [];

  render();

  function render() {
    var div = Widget.div({ id: "root" });
    document.querySelector("body").append(div.element);

    div.append(
      Widget.input({
        id: "inputControl",
        type: "text",
      })
    );

    div.append(
      Widget.button({
        id: "inputBtnControl",
        label: "입력",
        callbacks: {
          onClick: inputBtnClickHandler,
        },
      })
    );

    div.append(
      Widget.ul({
        id: "todolist",
        datas: getSortedItems({ done: false }),
        columns: [
          { render: renderColumnDone },
          { render: renderColumnTodo },
          { render: renderColumnDelete },
        ],
      })
    );

    div.append(
      Widget.ul({
        id: "donelist",
        datas: getSortedItems({ done: true }),
        columns: [
          { render: renderColumnDone },
          { render: renderColumnTodo },
          { render: renderColumnDelete },
        ],
      })
    );
  }

  function inputBtnClickHandler() {
    var inputControl = Widget.getControl("inputControl");

    if (!inputControl.getValue()) {
      alert("할일을 입력해주세요");
      return;
    }

    items.push({
      id: crypto.randomUUID(),
      content: inputControl.getValue(),
      done: false,
    });

    inputControl.clear();
    inputControl.focus();

    Widget.getControl("todolist").reload(getSortedItems({ done: false }));
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
      callbacks: {
        onClick: function (e) {
          item.done = e.target.checked;

          Widget.getControl("donelist").reload(getSortedItems({ done: true }));
          Widget.getControl("todolist").reload(getSortedItems({ done: false }));
        },
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
      callbacks: {
        onClick: function (e) {
          items.splice(items.indexOf(item), 1);
          item.done
            ? Widget.getControl("donelist").reload(getSortedItems({ done: true }))
            : Widget.getControl("todolist").reload(getSortedItems({ done: false }));
        },
      },
    });

    return button.element;
  }
})();
