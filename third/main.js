function Menu(name, time) {
  this.name = name;
  this.time = time;
}

function Server(time) {
  this.time = time;
  this.status = true;
}

Server.prototype.isAvailable = function () {
  return this.status;
};

Server.prototype.serveAsync = function (menu) {
  var that = this;

  return new Promise(function (resolve) {
    that.status = false;

    setTimeout(function () {
      that.status = true;
      resolve(menu);
    }, that.time);
  });
};

function Chef() {
  this.status = true;
}

Chef.prototype.isAvailable = function () {
  return this.status;
};

Chef.prototype.cookAsync = function (menu) {
  var that = this;

  return new Promise(function (resolve) {
    that.status = false;

    setTimeout(function () {
      that.status = true;
      resolve();
    }, menu.time);
  });
};

var orders = [];
var cookings = [];
var servings = [];

var chefs = [new Chef(), new Chef()];
var servers = [new Server(1000), new Server(2000)];

function renderOders() {
  var ordersEl = document.getElementById("orders");
  ordersEl.innerHTML = "";

  orders.forEach(function (order) {
    var liEl = document.createElement("li");
    liEl.textContent = order.name;

    ordersEl.append(liEl);
  });
}

function renderCookings() {
  var cookingsEl = document.getElementById("cookings");
  cookingsEl.innerHTML = "";

  cookings.forEach(function (order) {
    var liEl = document.createElement("li");
    liEl.textContent = order.name;

    cookingsEl.append(liEl);
  });
}

function renderServings() {
  var servingsEl = document.getElementById("servings");
  servingsEl.innerHTML = "";

  servings.forEach(function (order) {
    var liEl = document.createElement("li");
    liEl.textContent = order.name;

    servingsEl.append(liEl);
  });
}

document.getElementById("soon").onclick = function () {
  run(new Menu("순댓국", 1000));
};
document.getElementById("hae").onclick = function () {
  run(new Menu("해장국", 2000));
};

// 주문, 요리, 서빙의 메인 프로세스는 이 함수에서 전부 처리되어야 한다.
// 화면이 뻗으면 안됨
function run(menu) {
  // 주문 목록에 추가, 출력
  orders.push(menu);
  renderOders();

  // 대기중인 요리사 찾기 (요리사가 있을 때까지 대기해야 함)
  findChefAsync()
    .then(function (chef) {
      orders.splice(orders.indexOf(menu), 1);
      cookings.push(menu);

      renderOders();
      renderCookings();

      return chef.cookAsync(menu);
      // 요리사한테 요리 시킴
      // -- 요리 목록으로 넘어가야 함
    })
    .then(function () {
      return findServerAsync();
    })
    .then(function (server) {
      cookings.splice(cookings.indexOf(menu), 1);
      servings.push(menu);

      renderCookings();
      renderServings();

      return server.serveAsync(menu);
    })
    .then(function (menu) {
      servings.splice(servings.indexOf(menu), 1);
      renderServings();
    });

  // 서빙을 시킴
  // -- 서빙 목록으로 넘어가야 함

  // 서빙 끝나면 서빙목록에서 사라짐
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
