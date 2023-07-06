import { Menu } from "./menu";

export class Server {
  private time: number;
  private status: boolean;

  constructor(time: number) {
    this.time = time;
    this.status = true;
  }

  public isAvailable(): boolean {
    return this.status;
  }

  public serveAsync(menu: Menu): Promise<Menu> {
    this.convertStatus();

    return new Promise<Menu>((resolve) => {
      setTimeout(() => {
        this.convertStatus();
        resolve(menu);
      }, this.time);
    });
  }

  private convertStatus(): void {
    this.status = this.status ? false : true;
  }
}
