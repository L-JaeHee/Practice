export default function Chef() {
  this.status = true;
}

Chef.prototype.isAvailable = function () {
  return this.status;
};

Chef.prototype.cookAsync = function (menu) {
  var that = this;
  this.status = false;

  return new Promise(function (resolve) {
    setTimeout(function () {
      that.status = true;
      resolve();
    }, menu.time);
  });
};
