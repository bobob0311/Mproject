const items = [...document.querySelectorAll(".item")];
const boxes = [...document.querySelectorAll(".box")];
let canChangeItems = [];
// 복사해서 추가하는데 사용됨
let copyItem;

// 자리 체인지할 때 사용할 거임
const handleDragOver = (e) => {
  let draggingItem =
    copyItem == null ? document.querySelector(".dragging") : copyItem;

  // 박스안에 있는 체인지 가능한 요소들
  boxes.forEach((box) => {
    canChangeItems = [...box.querySelectorAll(".item"), ...canChangeItems];
  });

  const targetExistsInItems = canChangeItems.some((item) => item === e.target);

  if (targetExistsInItems) {
    e.target.parentNode.insertBefore(draggingItem, e.target);
  } else {
    e.currentTarget.append(draggingItem);
  }

  /*
  const boxInItems = boxes.some((box) => box === e.target);

  if (boxInItems) {
    e.target.append(draggingItem);
  }

  let changeTarget = canChangeItems.find((item) => {
    return e.clientY <= item.offsetTop + item.offsetHeight / 2;
  });
  if (changeTarget != undefined) {
    changeTarget.parentNode.insertBefore(draggingItem, changeTarget);
  } else {
    boxes[0].append(draggingItem);
  }
  */
};

items.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    setTimeout(e.target.classList.add("dragging"), 0);

    copyItem = item.cloneNode(true);

    copyItem.classList.remove("dragging");

    copyItem.addEventListener("dragstart", (e) => {
      setTimeout(() => {
        e.target.classList.add("dragging");
      }, 0);
    });

    copyItem.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
  });

  item.addEventListener("dragend", (e) => {
    copyItem = null;
    e.target.classList.remove("dragging");
  });
});

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    handleDragOver(e);
  });
});
