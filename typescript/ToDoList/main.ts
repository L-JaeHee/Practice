import { Widget, Model } from "./widget";

const items: data[] = [];

render();

function render() {
  const div = new Model.DivControl({ id: "root" });
  document.body.append(div.element);

  div.append(new Model.inputControl({ id: "inputControl", inputType: "text" }));
  div.append(new Model.ButtonControl({ id: "inputBtnControl", content: "입력", onclick: inputBtnClickHandler }));
  div.append(
    new Model.UlControl({
      id: "todolist",
      datas: getSortedItems({ checked: false }),
      columns: [{ render: renderColumnDone }, { render: renderColumnTodo }, { render: renderColumnDelete }],
    })
  );
  div.append(
    new Model.UlControl({
      id: "donelist",
      datas: getSortedItems({ checked: true }),
      columns: [{ render: renderColumnDone }, { render: renderColumnTodo }, { render: renderColumnDelete }],
    })
  );
}

function inputBtnClickHandler(): void {
  const inputControl = Widget.getControl("inputControl");

  if (inputControl instanceof Model.inputControl) {
    if (!inputControl.getValue()) {
      alert("할일을 입력해주세요");
      return;
    }

    items.push({
      id: crypto.randomUUID(),
      content: inputControl.getValue(),
      checked: false,
    });

    inputControl.clear();
    inputControl.focus();
  }

  const todolistControl = Widget.getControl("todolist");

  if (todolistControl instanceof Model.UlControl) {
    todolistControl.reload(getSortedItems({ checked: false }));
  }
}

function getSortedItems(option: { checked: boolean }): data[] {
  return items.filter((item) => {
    return item.checked === option.checked;
  });
}

function renderColumnDone(data: data): HTMLElement {
  const checkbox = new Model.inputControl({
    id: data.id,
    inputType: "checkbox",
    checked: data.checked,
    onclick: (event: MouseEvent) => {
      data.checked = (event.target as HTMLInputElement).checked;

      const donelist = Widget.getControl("donelist");
      const todolist = Widget.getControl("todolist");

      if (donelist instanceof Model.UlControl && todolist instanceof Model.UlControl) {
        donelist.reload(getSortedItems({ checked: true }));
        todolist.reload(getSortedItems({ checked: false }));
      }
    },
  });

  return checkbox.element;
}

function renderColumnTodo(data: data): HTMLElement {
  const span = new Model.SpanControl({ id: data.id, content: data.content });

  return span.element;
}

function renderColumnDelete(data: data): HTMLElement {
  const button = new Model.ButtonControl({
    id: data.id,
    content: "삭제",
    onclick: (event: MouseEvent) => {
      items.splice(items.indexOf(data), 1);

      const donelist = Widget.getControl("donelist");
      const todolist = Widget.getControl("todolist");

      if (donelist instanceof Model.UlControl && todolist instanceof Model.UlControl) {
        data.checked ? donelist.reload(getSortedItems({ checked: true })) : todolist.reload(getSortedItems({ checked: false }));
      }
    },
  });

  return button.element;
}
