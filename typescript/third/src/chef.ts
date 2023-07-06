import { Menu } from "./menu";
import { Job } from "./job";

export class Chef extends Job {
  constructor() {
    super();
  }

  public override behaveAsync(menu: Menu): Promise<Menu> {
    this.convertStatus();

    return new Promise((resolve) => {
      setTimeout(() => {
        this.convertStatus();
        resolve(menu);
      }, menu.time);
    });
  }
}
