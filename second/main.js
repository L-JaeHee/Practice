var todolist = [];
// donelist 추가 생각

renderTodoList();
renderDoneList();

var inputBtnEl = document.getElementById("todo-input");
var contentsEl = document.getElementById("todo-contents");

inputBtnEl.onclick = function () {
  if (!contentsEl.value) {
    alert("할일을 입력해 주세요.");
    return;
  }

  todolist.push({
    id: crypto.randomUUID(),
    contents: contentsEl.value,
    done: false,
  });

  renderTodoList();

  contentsEl.value = "";
  contentsEl.focus();
};

function renderTodoList() {
  var todolistEl = document.getElementById("todo-list");
  todolistEl.innerHTML = "";

  todolist
    .filter(function (item) {
      return !item.done;
    })
    .forEach(function (item) {
      var itemEl = createTodoItem(item);
      todolistEl.append(itemEl);
    });
}

function renderDoneList() {
  var donelistEl = document.getElementById("done-list");
  donelistEl.innerHTML = "";

  todolist
    .filter(function (item) {
      return item.done;
    })
    .forEach(function (item) {
      var itemEl = createTodoItem(item);
      donelistEl.append(itemEl);
    });
}

function createTodoItem(item) {
  var liEl = document.createElement("li");
  // 렌더링
  // 체크박스
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.done;
  checkbox.onchange = function (e) {
    item.done = e.target.checked;

    renderTodoList();
    renderDoneList();
    // target, currentTarget -> 버블링
  };

  // 컨텐츠
  var contents = document.createElement("span");
  contents.textContent = item.contents;

  // 삭제버튼
  var delBtn = document.createElement("button");
  delBtn.textContent = "삭제";
  delBtn.onclick = function () {
    todolist.splice(todolist.indexOf(item), 1);

    item.done ? renderDoneList() : renderTodoList();
  };

  liEl.append(checkbox);
  liEl.append(contents);
  liEl.append(delBtn);

  return liEl;
}
