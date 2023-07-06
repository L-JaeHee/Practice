import { Menu } from "./menu";

export class MenuList {
  private items: Menu[];
  private id: string;

  constructor(id: string) {
    this.items = [];
    this.id = id;
  }

  public getList(): Menu[] {
    return this.items;
  }

  public add(item: Menu): void {
    this.items.push(item);
    this.render(this.id);
  }

  public remove(item: Menu): void {
    this.items.splice(this.items.indexOf(item), 1);
    this.render(this.id);
  }

  private render(id: string): void {
    const listEl = document.getElementById(id);

    if (listEl) {
      listEl.innerHTML = "";

      this.items.forEach((item) => {
        const liEl = document.createElement("li");
        liEl.textContent = item.name;

        listEl.append(liEl);
      });
    }
  }
}
