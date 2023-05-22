import { CircleData } from './circleData.js';
import { Item } from './item.js';

var itemButtonsEl = document.getElementById('item-buttons');
var startBtn = document.getElementById('start');
var comEl = document.getElementById('com');

var timerId;
var items = new CircleData([new Item('가위', game), new Item('바위', game), new Item('보', game)]);
var comCurrentItem = items.getAll()[0];

items.getAll().forEach(function (item) {
  item.render(itemButtonsEl);
  item.disable(true);
});

startBtn.onclick = function () {
  invertStateOfButtons(false);

  timerId = setInterval(function () {
    comCurrentItem = items.getNext(comCurrentItem);
    comEl.textContent = comCurrentItem.name;
  }, 100);
};

function game(item) {
  var next = items.getNext(item);

  if (item === comCurrentItem) {
    alert('비겼습니다.');
  } else if (next === comCurrentItem) {
    alert('졌습니다.');
  } else {
    alert('이겼습니다.');
  }

  clearInterval(timerId);
  invertStateOfButtons(true);
}

function invertStateOfButtons(stateOfStartButton) {
  if (stateOfStartButton) {
    startBtn.removeAttribute('disabled');
    items.getAll().forEach(function (item) {
      item.disable(true);
    });
  } else {
    startBtn.setAttribute('disabled', true);
    items.getAll().forEach(function (item) {
      item.disable(false);
    });
  }
}
