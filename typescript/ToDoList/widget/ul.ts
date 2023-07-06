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

export class UlControl extends ControlBase {
  protected _element: HTMLUListElement;
  private _columns: column[];

  constructor(option: Option) {
    super(option.id);

    const ulEl = document.createElement("ul");
    ulEl.style.listStyle = "none";
    ulEl.style.padding = "0";

    this._element = ulEl;
    this._columns = option.columns;

    this.render(option.datas, option.columns);
  }

  public reload(datas: data[]): void {
    this._element.innerHTML = "";
    this.render(datas, this._columns);
  }

  public render(datas: data[], columns: column[]) {
    datas.forEach((data) => {
      const liEl = document.createElement("li");

      columns.forEach((column) => {
        liEl.append(column.render(data));
      });

      this._element.append(liEl);
    });
  }
}
