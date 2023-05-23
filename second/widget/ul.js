// option
// datas
// columns

export function createUl(option) {
  var ulEl = document.createElement("ul");
  ulEl.style.listStyle = "none";
  ulEl.style.padding = "0";
  ulEl.id = option.id;

  render(option.datas, option.columns);

  return {
    element: ulEl,
    reload: function (datas) {
      ulEl.innerHTML = "";
      render(datas, option.columns);
    },
  };

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
