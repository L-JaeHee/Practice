export default function List(id) {
  this.items = [];
  this.id = id;
}

List.prototype.getList = function () {
  return items;
};

List.prototype.add = function (item) {
  this.items.push(item);
  this.render(this.id);
};

List.prototype.remove = function (item) {
  this.items.splice(this.items.indexOf(item), 1);
  this.render(this.id);
};

List.prototype.render = function (id) {
  var listEl = document.getElementById(id);
  listEl.innerHTML = "";

  this.items.forEach(function (item) {
    var liEl = document.createElement("li");
    liEl.textContent = item.name;

    listEl.append(liEl);
  });
};
