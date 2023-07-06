import { Menu } from "./menu";
import { Server } from "./server";
import { Chef } from "./chef";
import { MenuList } from "./menuList";

const orders = new MenuList("orders");
const cookings = new MenuList("cookings");
const servings = new MenuList("servings");

const chefs = [new Chef(), new Chef()];
const servers = [new Server(1000), new Server(2000)];

const soonBtn = document.getElementById("soon");
const haeBtn = document.getElementById("hae");

if (soonBtn) {
  soonBtn.onclick = () => {
    run(new Menu("순댓국", 1000));
  };
}

if (haeBtn) {
  haeBtn.onclick = () => {
    run(new Menu("해장국", 2000));
  };
}

function run(menu: Menu): void {
  orders.add(menu);

  findChefAsync()
    .then((chef) => {
      orders.remove(menu);
      cookings.add(menu);

      return chef.behaveAsync(menu);
    })
    .then(() => findServerAsync())
    .then((server) => {
      cookings.remove(menu);
      servings.add(menu);

      return server.behaveAsync(menu);
    })
    .then((menu) => {
      servings.remove(menu);
    });
}

function findChefAsync(): Promise<Chef> {
  return new Promise<Chef>((resolve) => {
    let target: Chef | undefined;

    let timer = setInterval(() => {
      target = chefs.find((chef) => chef.isAvailable());

      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, 100);
  });
}

function findServerAsync(): Promise<Server> {
  return new Promise((resolve) => {
    let target: Server | undefined;

    let timer = setInterval(() => {
      target = servers.find((server) => server.isAvailable());

      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, 100);
  });
}
