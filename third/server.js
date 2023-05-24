export default function Server(time) {
  this.time = time;
  this.status = true;
}

Server.prototype.isAvailable = function () {
  return this.status;
};

Server.prototype.serveAsync = function (menu) {
  var that = this;
  this.status = false;

  return new Promise(function (resolve) {
    setTimeout(function () {
      that.status = true;
      resolve(menu);
    }, that.time);
  });
};
