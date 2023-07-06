import { widget } from "./baseWidget";
import { ControlBase } from "./core";

declare global {
  type data = {
    id: string;
    content: string;
    checked: boolean;
  };
  type column = { render: (item: data) => HTMLElement };
}

type Option = {
  id: string;
  datas: data[];
  columns: column[];
};

export interface Ul extends ControlBase {
  type: "ul";
  reload: (datas: data[]) => void;
}

function _createUl(option: Option): Ul {
  const ulEl = document.createElement("ul");
  ulEl.style.listStyle = "none";
  ulEl.style.padding = "0";

  render(option.datas, option.columns);

  return {
    id: option.id,
    type: "ul",
    element: ulEl,
    reload: function (datas: data[]): void {
      ulEl.innerHTML = "";
      render(datas, option.columns);
    },
  };

  function render(datas: data[], columns: column[]) {
    datas.forEach((data) => {
      const liEl = document.createElement("li");

      columns.forEach((column) => {
        liEl.append(column.render(data));
      });

      ulEl.append(liEl);
    });
  }
}

export const createUl = widget(_createUl);
