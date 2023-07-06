import { CircleData } from "./circleDate";
import { Item } from "./item";

const itemButtonsEl = document.getElementById("item-buttons");
const startBtn = document.getElementById("start");
const comEl = document.getElementById("com");

let timerId: NodeJS.Timer;
const items = new CircleData([new Item("가위", game), new Item("바위", game), new Item("보", game)]);
let comCurrentItem: Item = items.getAll()[0];

if (itemButtonsEl) {
  items.getAll().forEach((item) => {
    item.render(itemButtonsEl);
    item.disable();
  });
}

if (startBtn) {
  startBtn.onclick = () => {
    invertStateOfButtons(false);

    timerId = setInterval(() => {
      comCurrentItem = items.getNext(comCurrentItem);
      if (comEl instanceof HTMLElement) {
        comEl.textContent = comCurrentItem.name;
      }
    }, 100);
  };
}

function game(this: Item) {
  const next = items.getNext(this);

  if (this === comCurrentItem) {
    alert("비겼습니다.");
  } else if (next === comCurrentItem) {
    alert("졌습니다.");
  } else {
    alert("이겼습니다.");
  }

  clearInterval(timerId);
  invertStateOfButtons(true);
}

function invertStateOfButtons(stateOfStartButton: boolean) {
  if (startBtn instanceof HTMLElement) {
    if (stateOfStartButton) {
      startBtn.removeAttribute("disabled");
      items.getAll().forEach(function (item) {
        item.disable();
      });
    } else {
      startBtn.setAttribute("disabled", "true");
      items.getAll().forEach(function (item) {
        item.enable();
      });
    }
  }
}
