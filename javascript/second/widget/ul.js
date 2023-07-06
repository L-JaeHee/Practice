// option
// datas
// columns

import { addControl, removeControl } from "./core";

export function createUl(option) {
  var ulEl = document.createElement("ul");
  ulEl.style.listStyle = "none";
  ulEl.style.padding = "0";

  render(option.datas, option.columns);

  var control = {
    id: option.id,
    element: ulEl,
    reload: function (datas) {
      ulEl.innerHTML = "";
      render(datas, option.columns);
    },
    dispose: function () {
      ulEl.remove();
      removeControl(id);

      // list이기 때문에 자식 요소들을 다 dispose해주어야 함. 따라서 자식 목록을 가지고 있어야 함.
    },
  };

  addControl(control);

  return control;

  function render(datas, columns) {
    datas.forEach(function (data) {
      var liEl = document.createElement("li");

      columns.forEach(function (column) {
        var control = column.render(data);
        liEl.append(control);
      });

      ulEl.append(liEl);
    });
  }
}
