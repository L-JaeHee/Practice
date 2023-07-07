import { Widget, Model } from "./widget";

const items: data[] = [];

render();

function render() {
  const rootDiv = new Model.DivControl({ id: "root" });
  document.body.append(rootDiv.element);

  rootDiv
    .append(new Model.InputControl({ id: "inputControl", inputType: "text" }))
    .append(new Model.ButtonControl({ id: "inputBtnControl", content: "입력", onclick: inputBtnClickHandler }))
    .append(
      new Model.UlControl({
        id: "todolist",
        datas: getItemsByChecked(false),
        columns: [{ render: renderColumnDone }, { render: renderColumnTodo }, { render: renderColumnDelete }],
      })
    )
    .append(
      new Model.UlControl({
        id: "donelist",
        datas: getItemsByChecked(true),
        columns: [{ render: renderColumnDone }, { render: renderColumnTodo }, { render: renderColumnDelete }],
      })
    );
}

function inputBtnClickHandler(): void {
  const inputControl = Widget.getControl("inputControl") as InstanceType<typeof Model.InputControl>;

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

  reloadTodoList();
}

function getItemsByChecked(checked: boolean): data[] {
  return items.filter((item) => {
    return item.checked === checked;
  });
}

function renderColumnDone(data: data): HTMLElement {
  const checkbox = new Model.InputControl({
    id: `${data.id}:done`,
    inputType: "checkbox",
    checked: data.checked,
    onclick: (event: MouseEvent) => {
      data.checked = (event.target as HTMLInputElement).checked;

      reloadDoneList();
      reloadTodoList();
    },
  });

  return checkbox.element;
}

function renderColumnTodo(data: data): HTMLElement {
  const span = new Model.SpanControl({ id: `${data.id}:todo`, content: data.content });

  return span.element;
}

function renderColumnDelete(data: data): HTMLElement {
  const button = new Model.ButtonControl({
    id: `${data.id}:delete`,
    content: "삭제",
    onclick: (event: MouseEvent) => {
      items.splice(items.indexOf(data), 1);
      data.checked ? reloadDoneList() : reloadTodoList();

      ["done", "todo", "delete"].forEach((keyWord) => {
        Widget.getControl(`${data.id}:${keyWord}`)?.dispose();
      });
    },
  });

  return button.element;
}

function reloadDoneList(): void {
  const donelist = Widget.getControl("donelist") as InstanceType<typeof Model.UlControl>;
  donelist.reload(getItemsByChecked(true));
}

function reloadTodoList(): void {
  const todolist = Widget.getControl("todolist") as InstanceType<typeof Model.UlControl>;
  todolist.reload(getItemsByChecked(false));
}
