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
