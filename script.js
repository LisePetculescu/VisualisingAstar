window.addEventListener("load", start);

function start() {
  console.log("🥳 js is running!");
  displayPlayer();
}

// ***************** Model *****************

const gameField = {
  width: 600, //px
  height: 500, // px
};

// rodent
let player = {
  x: gameField.width / 2 - 32,
  y: 100,
  width: 32,
  height: 20,
  speed: 50,
  moving: false,
};

// cat left
let enemy1 = {
  x: 10,
  y: gameField.height / 2,
  width: 30,
  height: 40,
  speed: 60,
  moving: true,
};

// cat right
let enemy2 = {
  x: gameField.width - 10,
  y: gameField.height / 2,
  width: 30,
  height: 40,
  speed: 60,
  moving: true,
};

// girl / algorithm
let enemy3 = {
  x: gameField.width / 2,
  y: gameField.height - 10,
  width: 30,
  height: 40,
  speed: 60,
  moving: true,
};

// ***************** View *****************

function displayPlayer() {
  const shownPlayer = document.querySelector("#player");

  shownPlayer.style.translate = `${player.x}px ${player.y}px`;
}

// ***************** Controller *****************
