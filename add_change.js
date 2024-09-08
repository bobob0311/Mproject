const items = [...document.querySelectorAll(".item")];
const boxes = [...document.querySelectorAll(".box")];

// 복사해서 추가하는데 사용됨
let copyItem;

// 자리 체인지할 때 사용할 거임
const handleDragOver = (e) => {
  let draggingItem =
    copyItem == null ? document.querySelector(".dragging") : copyItem;
  let otherItems = [];
  boxes.forEach((box) => {
    otherItems = [...box.querySelectorAll(".item"), ...otherItems];
  });

  otherItems.forEach((item) => {
    item.addEventListener("dragstart", () => {
      setTimeout(item.classList.add("dragging"), 0);
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    item.addEventListener("dragover", handleDragOver);
  });

  let changeTarget = otherItems.find((item) => {
    return e.clientY <= item.offsetTop + item.offsetHeight / 2;
  });
  if (changeTarget != undefined) {
    changeTarget.parentNode.insertBefore(draggingItem, changeTarget);
  } else {
    boxes[0].append(draggingItem);
  }
};

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    setTimeout(item.classList.add("dragging"), 0);
    copyItem = item.cloneNode(true);
    copyItem.classList.remove("dragging");
  });

  item.addEventListener("dragover", handleDragOver);

  item.addEventListener("dragend", () => {
    copyItem = null;
    item.classList.remove("dragging");
  });
});

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    if (box.children.length == 0) {
      box.append(copyItem);
    }
  });
});
