import { Widget } from "./widget";

const items: data[] = [];

render();

function render() {
  const div = Widget.div({ id: "root" });
  document.body.append(div.element);

  div.append(
    Widget.input({
      id: "inputControl",
      inputType: "text",
    })
  );

  div.append(
    Widget.button({
      id: "inputBtnControl",
      content: "입력",
      onclick: (event: MouseEvent) => {}, //! handler로 교체
    })
  );

  div.append(
    Widget.ul({
      id: "todolist",
      datas: [], //! 교체
      columns: [],
    })
  );

  div.append(
    Widget.ul({
      id: "donelist",
    })
  );
}
