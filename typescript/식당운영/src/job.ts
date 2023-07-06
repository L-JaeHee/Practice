import { Menu } from "./menu";

export abstract class Job {
  private status: boolean;

  constructor() {
    this.status = true;
  }

  protected convertStatus(): void {
    this.status = this.status ? false : true;
  }

  public isAvailable(): boolean {
    return this.status;
  }

  public abstract behaveAsync(menu: Menu): Promise<Menu>;
}
