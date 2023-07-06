export default function MenuList(id) {
  this.items = [];
  this.id = id;
}

MenuList.prototype.getList = function () {
  return items;
};

MenuList.prototype.add = function (item) {
  this.items.push(item);
  this.render(this.id);
};

MenuList.prototype.remove = function (item) {
  this.items.splice(this.items.indexOf(item), 1);
  this.render(this.id);
};

MenuList.prototype.render = function (id) {
  var listEl = document.getElementById(id);
  listEl.innerHTML = "";

  this.items.forEach(function (item) {
    var liEl = document.createElement("li");
    liEl.textContent = item.name;

    listEl.append(liEl);
  });
};
