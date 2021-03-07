const HARD = 6;
const EASY = 3;
let level = HARD;
let colors = [];
for (let i = 0; i < level; i++) {
  colors.push(randomColor());
}

let squares = document.querySelectorAll(".square");
let textDisplay = document.querySelector("#textDisplay");
let newGameBtn = document.querySelector("#newColor");
let ezBtn = document.querySelector("#easymode");
let hardBtn = document.querySelector("#hardmode");

let answer = colors[pickedColor()];
document.querySelector("#colorDisplay").textContent = answer;
hardBtn.classList.add("selected");

for (let i = 0; i < squares.length; i++) {
  //set square colors
  squares[i].style.backgroundColor = colors[i];

  //events
  squares[i].addEventListener("click", function() {
    if (this.style.backgroundColor === answer) {
      //CORRECT
      document.querySelector(".headTitle").style.backgroundColor = answer;
      changeAllColor(answer);
      textDisplay.textContent = "CORRECT!";
      newGameBtn.textContent = "Play Again?";
    } else {
      // this.classList.add("fadeout");
      this.style.backgroundColor = "#232323";
      textDisplay.textContent = "TRY AGAIN";
    }
  });
}

//BUTTON EVENTS
newGameBtn.addEventListener("click", newSetup);

ezBtn.addEventListener("click", function() {
  hardBtn.classList.remove("selected");
  this.classList.add("selected");
  level = EASY;
  for (let i = 3; i < squares.length; i++) {
    squares[i].hidden = true;
  }
  newSetup();
});

hardBtn.addEventListener("click", function() {
  ezBtn.classList.remove("selected");
  this.classList.add("selected");
  level = HARD;
  for (let i = 3; i < squares.length; i++) {
    squares[i].hidden = false;
  }
  newSetup();
});
// END BUTTONS EVENTS

function changeAllColor(color) {
  for (let i = 0; i < level; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function randomColor() {
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function pickedColor() {
  return Math.floor(Math.random() * colors.length);
}

function newSetup() {
  this.textContent = "New Colors";
  textDisplay.textContent = "";
  colors.splice(0, colors.length);

  for (let i = 0; i < level; i++) {
    colors.push(randomColor());
  }
  answer = colors[pickedColor()];
  document.querySelector(".headTitle").style.backgroundColor = "#121212";
  document.querySelector("#colorDisplay").textContent = answer;
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
}
