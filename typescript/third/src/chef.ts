import { Menu } from "./menu";

export class Chef {
  private status: boolean;

  constructor() {
    this.status = true;
  }

  public isAvailable(): boolean {
    return this.status;
  }

  public cookAsync(menu: Menu): Promise<boolean> {
    this.convertStatus();

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.convertStatus();
        resolve(true);
      }, menu.time);
    });
  }

  private convertStatus(): void {
    this.status = this.status ? false : true;
  }
}
