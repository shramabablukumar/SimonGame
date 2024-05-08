// Game variables
let gameSequence = [];
let userSequence = [];
let level = 1;

// DOM elements
const levelDisplay = document.getElementById("level");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const buttons = document.querySelectorAll(".button");

// Generate a random color and add it to the game sequence array
function addToGameSequence() {
  const colors = ["green", "red", "yellow", "blue"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
}

// Play the game sequence by lighting up each button in order
function playGameSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const button = document.querySelector(`.${gameSequence[i]}`);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 500);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

// Check if the user sequence matches the game sequence, and update the level if it does
function checkUserSequence() {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== gameSequence[i]) {
      return false;
    }
  }
  return true;
}

// Event listener for each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const color = button.classList[1];
    userSequence.push(color);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 500);
    if (userSequence.length === gameSequence.length) {
      if (checkUserSequence()) {
        level++;
        levelDisplay.textContent = level;
        userSequence = [];
        addToGameSequence();
        setTimeout(() => {
          playGameSequence();
        }, 1000);
      } else {
        alert("Game over!");
      }
    }
  });
});

// Event listener for the start button
startBtn.addEventListener("click", () => {
  gameSequence = [];
  userSequence = [];
  level = 1;
  levelDisplay.textContent = level;
  addToGameSequence();
  playGameSequence();
});

// Event listener for the reset button
resetBtn.addEventListener("click", () => {
  gameSequence = [];
  userSequence = [];
  level = 1;
  levelDisplay.textContent = level;
});
