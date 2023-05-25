import Menu from "./menu.js";
import Server from "./server.js";
import Chef from "./chef.js";
import List from "./List.js";

var orders = new List("orders");
var cookings = new List("cookings");
var servings = new List("servings");

var chefs = [new Chef(), new Chef()];
var servers = [new Server(1000), new Server(2000)];

document.getElementById("soon").onclick = function () {
  run(new Menu("순댓국", 1000));
};

document.getElementById("hae").onclick = function () {
  run(new Menu("해장국", 2000));
};

function run(menu) {
  orders.add(menu);

  findChefAsync()
    .then(function (chef) {
      orders.remove(menu);
      cookings.add(menu);

      return chef.cookAsync(menu);
    })
    .then(function () {
      return findServerAsync();
    })
    .then(function (server) {
      cookings.remove(menu);
      servings.add(menu);

      return server.serveAsync(menu);
    })
    .then(function (menu) {
      servings.remove(menu);
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
