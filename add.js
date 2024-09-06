const items = [...document.querySelectorAll(".item")];

let target;
items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    target = item;
  });
  item.addEventListener("dragend", () => {
    target = null;
  });
});

const boxes = [...document.querySelectorAll(".box")];

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  box.addEventListener("drop", (e) => {
    if (target == null) {
      return;
    }
    const copyItem = target.cloneNode(true);
    copyItem.classList.add("clone");
    box.append(copyItem);
    change();
  });
});

const change = () => {
  const allbox = [...document.querySelectorAll(".box")];

  let cloneItems = [];
  allbox.forEach((box) => {
    cloneItems = [...box.querySelectorAll(".item"), ...cloneItems];
  });
  console.log(cloneItems);
  let draggingItem;

  const handleDragOver = (e) => {
    draggingItem = document.querySelector(".dragging");
    if (draggingItem == null) {
      return;
    }
    const otherItem = [
      ...draggingItem.parentNode.querySelectorAll(".item:not(.dragging)"),
    ];

    let changeTarget = otherItem.find((item) => {
      return e.clientY <= item.offsetTop + item.offsetHeight / 2;
    });

    draggingItem.parentNode.insertBefore(draggingItem, changeTarget);
  };

  cloneItems.forEach((item) => {
    item.addEventListener("dragstart", () => {
      setTimeout(item.classList.add("dragging"), 0);
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    item.addEventListener("dragover", handleDragOver);
  });
};
