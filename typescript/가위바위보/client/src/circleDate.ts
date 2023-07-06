import { Item } from "./item";

export class CircleData {
  private items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  public getAll(): Item[] {
    return this.items;
  }

  public getNext(item: Item): Item {
    const currentIndex = this.items.indexOf(item);

    return this.items[(currentIndex + 1) % this.items.length];
  }
}
