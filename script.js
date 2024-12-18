window.addEventListener("load", start);

function start() {
  console.log("🥳 js is running!");
  displayPlayer();
  // displayCatLeft();
  // displayCatRight();
  displayAlgorithmEnemy();
}

// ***************** Model *****************

const gameField = {
  width: 600, //px
  height: 500 // px
};

// rodent
let player = {
  x: gameField.width / 2 - 32,
  y: 80,
  width: 30,
  height: 20,
  speed: 50,
  moving: false
};

// cat left
let enemy1 = {
  x: 0,
  y: gameField.height / 2,
  width: 30,
  height: 40,
  speed: 60,
  moving: true
};

// cat right
let enemy2 = {
  x: gameField.width - 50,
  y: gameField.height / 2,
  width: 30,
  height: 40,
  speed: 60,
  moving: true
};

// girl / algorithm
let enemy3 = {
  x: gameField.width / 2 - 20,
  y: gameField.height - 60,
  width: 40,
  height: 50,
  speed: 60,
  moving: true
};

// ***************** View *****************

function displayPlayer() {
  const shownPlayer = document.querySelector("#player");

  shownPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function displayCatRight() {
  const shownCatRight = document.querySelector("#enemy2");

  shownCatRight.style.translate = `${enemy2.x}px ${enemy2.y}px`;
}

function displayCatLeft() {
  const shownCatRight = document.querySelector("#enemy1");

  shownCatRight.style.translate = `${enemy1.x}px ${enemy1.y}px`;
}

function displayAlgorithmEnemy() {
  const shownAlgorithmEnemy = document.querySelector("#enemy3");

  shownAlgorithmEnemy.style.translate = `${enemy3.x}px ${enemy3.y}px`;
}

// ***************** Controller *****************
