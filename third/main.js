import Menu from "./menu.js";
import Server from "./server.js";
import Chef from "./chef.js";

var orders = [];
var cookings = [];
var servings = [];

var chefs = [new Chef(), new Chef()];
var servers = [new Server(1000), new Server(2000)];

document.getElementById("soon").onclick = function () {
  run(new Menu("순댓국", 1000));
};

document.getElementById("hae").onclick = function () {
  run(new Menu("해장국", 2000));
};

function run(menu) {
  orders.push(menu);
  renderList({
    id: "orders",
    list: orders,
  });

  findChefAsync()
    .then(function (chef) {
      orders.splice(orders.indexOf(menu), 1);
      cookings.push(menu);

      renderList({
        id: "orders",
        list: orders,
      });

      renderList({
        id: "cookings",
        list: cookings,
      });

      return chef.cookAsync(menu);
    })
    .then(function () {
      return findServerAsync();
    })
    .then(function (server) {
      cookings.splice(cookings.indexOf(menu), 1);
      servings.push(menu);

      renderList({
        id: "cookings",
        list: cookings,
      });
      renderList({
        id: "servings",
        list: servings,
      });

      return server.serveAsync(menu);
    })
    .then(function (menu) {
      servings.splice(servings.indexOf(menu), 1);
      renderList({
        id: "servings",
        list: servings,
      });
    });
}

function renderList(option) {
  var listEl = document.getElementById(option.id);
  listEl.innerHTML = "";

  option.list.forEach(function (item) {
    var liEl = document.createElement("li");
    liEl.textContent = item.name;

    listEl.append(liEl);
  });
}

function findChefAsync() {
  return new Promise(function (resolve) {
    var target;

    var timer = setInterval(function () {
      target = chefs.find(function (chef) {
        return chef.isAvailable();
      });

      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, 100);
  });
}

function findServerAsync() {
  return new Promise(function (resolve) {
    var target;

    var timer = setInterval(function () {
      target = servers.find(function (server) {
        return server.isAvailable();
      });

      if (target) {
        clearInterval(timer);
        resolve(target);
      }
    }, 100);
  });
}
