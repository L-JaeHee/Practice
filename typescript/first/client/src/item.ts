export class Item {
  public name: string;
  private buttonEl: HTMLButtonElement;

  constructor(name: string, onClick: (this: Item) => void) {
    this.name = name;
    this.buttonEl = document.createElement("button");

    this.buttonEl.onclick = onClick.bind(this);
    this.buttonEl.textContent = this.name;
  }

  public render(parentEl: HTMLElement): void {
    parentEl.append(this.buttonEl);
  }

  public disable(): void {
    this.buttonEl.setAttribute("disabled", "true");
  }

  public enable(): void {
    this.buttonEl.removeAttribute("disabled");
  }
}
