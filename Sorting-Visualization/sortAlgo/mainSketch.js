let displayWidth = document.querySelector(".col").offsetWidth;
let displayHeight = 200;
let RECT_WIDTH = 5;
let COLOR = 222;
const fps = 12.5;
let q;

let bubble = new p5(bubbleSort, "bubble-sort");
let selection = new p5(selectionSort, "selection-sort");
let insertion = new p5(insertionSort, "insertion-sort");
let quick = new p5(quickSort, "quick-sort");
let merge = new p5(mergeSort, "merge-sort")
let tim = new p5(timSort, "tim-sort")

function newBubble() {
  q = document.querySelector("#bubble-sort");
  q.removeChild(q.childNodes[0]);
  bubble = new p5(bubbleSort, "bubble-sort");
}
function newSelection() {
  q = document.querySelector("#selection-sort");
  q.removeChild(q.childNodes[0]);
  selection = new p5(selectionSort, "selection-sort");
}
function newInsertion() {
  q = document.querySelector("#insertion-sort");
  q.removeChild(q.childNodes[0]);
  insertion = new p5(insertionSort, "insertion-sort");
}
function newQuick() {
  q = document.querySelector("#quick-sort");
  q.removeChild(q.childNodes[0]);
  quick = new p5(quickSort, "quick-sort");
}
function newMerge() {
  q = document.querySelector("#merge-sort");
  q.removeChild(q.childNodes[0]);
  quick = new p5(mergeSort, "merge-sort");
}
function newTim() {
  q = document.querySelector("#tim-sort");
  q.removeChild(q.childNodes[0]);
  quick = new p5(timSort, "tim-sort");
}


document.querySelector("#bubbleBtn").addEventListener("click", newBubble);
document.querySelector("#selectionBtn").addEventListener("click", newSelection);
document.querySelector("#insertionBtn").addEventListener("click", newInsertion);
document.querySelector("#quickBtn").addEventListener("click", newQuick);
document.querySelector("#mergeBtn").addEventListener("click", newMerge);
document.querySelector("#timBtn").addEventListener("click", newTim);
