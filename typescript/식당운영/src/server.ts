import { Menu } from "./menu";
import { Job } from "./job";

export class Server extends Job {
  private time: number;

  constructor(time: number) {
    super();
    this.time = time;
  }

  public override behaveAsync(menu: Menu): Promise<Menu> {
    this.convertStatus();

    return new Promise((resolve) => {
      setTimeout(() => {
        this.convertStatus();
        resolve(menu);
      }, this.time);
    });
  }
}
