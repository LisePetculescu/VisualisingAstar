window.addEventListener("load", start);

import testMinHeap from "./helperFunctions/test_minHeap.js";
import testTileMap from "./helperFunctions/testTileMap.js";

function start() {
  console.log("🥳 js is running!");
  // tests();

  createGameField();
  createTiles();
  createPlayer();
  createAlgorithmEnemy();

  displayTiles();
  displayPlayer();
  displayAlgorithmEnemy();
  // displayCatLeft();
  // displayCatRight();

  document.querySelector("#btn-playState").addEventListener("click", startGame);
  // check which key is pressed
  document.addEventListener("keydown", (event) => {
    updateKeyState(event.key, true);
  });

  // check when key is no longer pressed
  document.addEventListener("keyup", (event) => {
    updateKeyState(event.key, false);
  });
}

function tests() {
  testMinHeap();
  testTileMap();
}

let lastTime = 0;
let gameRunning = false;

function startGame() {
  const button = document.querySelector("#btn-playState");
  gameRunning = !gameRunning;
  button.textContent = gameRunning ? "Pause" : "Start";

  if (gameRunning) {
    lastTime = performance.now();
    requestAnimationFrame(tick);
  }

  // const button = document.querySelector("#btn-playState");

  // if (gameRunning) {
  //   // pause game
  //   gameRunning = false;
  //   button.innerHTML = "Start";
  // } else {
  //   // start game
  //   gameRunning = true;
  //   button.innerHTML = "Pause";
  //   lastTime = performance.now();
  //   requestAnimationFrame(tick);
  // }
}

// ***************** Model *****************



// rodent
let player = {
  x: 360,
  y: 290,
  width: 30,
  height: 20,
  speed: 60, // px/s
  moving: false,
  animationDirection: "",
};

// girl / algorithm
let enemy3 = {
  x: 550,
  y: 550,
  width: 40,
  height: 50,
  speed: 50, // px/s
  moving: true,
  animationDirection: "",
};

// // cat left
// let enemy1 = {
//   x: 0,
//   y: gameField.height / 2,
//   width: 30,
//   height: 40,
//   speed: 60, // px/s
//   moving: true,
// };

// // cat right
// let enemy2 = {
//   x: gameField.width - 50,
//   y: gameField.height / 2,
//   width: 30,
//   height: 40,
//   speed: 60, // px/s
//   moving: true,
// };

// 20 x 20
const tiles = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
  [2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
  [2, 2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2],
  [2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2],
  [2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2],
  [2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 3, 2, 2],
  [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 1, 1, 1, 1],
  [2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
];

const TILE_SIZE = 32; // px
const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;

const GAMEFIELD_WIDTH = TILE_SIZE * GRID_WIDTH;
const GAMEFIELD_HEIGHT = TILE_SIZE * GRID_HEIGHT;

function createGameField() {
  const gamefield = document.querySelector("#gamefield");

  gamefield.style.setProperty("--width", GAMEFIELD_WIDTH);
  gamefield.style.setProperty("--height", GAMEFIELD_HEIGHT);
}

// const gameField = {
//   width: GAMEFIELD_WIDTH, //px
//   height: GAMEFIELD_HEIGHT, // px
// };

// // coord = placement in grid = which tile {row, col}
// // pos = placement on screen = in pixels {x,y}

// returns the tile type at the given {row,col}
function getTileAtCoord({ row, col }) {
  return tiles[row][col];
}

// returns the the tile type at {row, col} calculated out from pos {x,y}
function getTileAtPos({ x, y }) {
  return getTileAtCoord(coordFromPos({ x: x, y: y }));
}

// returns a coord {row, col} object calculated from a pos {x,y}
function coordFromPos({ x, y }) {
  const row = Math.floor(y / TILE_SIZE);
  const col = Math.floor(x / TILE_SIZE);

  return { row, col };
}

// returns a pos {x,y} calculated from a coord {row, col}
function posFromCoord({ row, col }) {
  const x = col * TILE_SIZE;
  const y = row * TILE_SIZE;
  return { x, y };
}

// returns coordinates for the tile a player is on
function getTileCoordUnder(player) {
  return coordFromPos({ x: player.x, y: player.y });
  // return getTileAtPos({ x: player.x, y: player.y });
}

// ***************** View *****************

function createTiles() {
  const background = document.querySelector("#background");

  // Set CSS variables
  background.style.setProperty("--GRID_WIDTH", GRID_WIDTH);

  background.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);

  background.style.setProperty("--TILE_SIZE", `${TILE_SIZE}px`);

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      background.appendChild(tile);
    }
  }
}

function getClassForTiletype(tileType) {
  switch (tileType) {
    case 0:
      return "floor";
    case 1:
      return "grass";
    case 2:
      return "wall";
    case 3:
      return "mouseDoor";
  }
}

function displayTiles() {
  const visualTiles = document.querySelectorAll("#background .tile");

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const tileTypeNumber = getTileAtCoord({ row: row, col: col });
      const tileType = getClassForTiletype(tileTypeNumber);
      const tile = row * GRID_WIDTH + col;
      const visualTile = visualTiles[tile];
      visualTile.className = "tile " + tileType;
    }
  }
}

function createPlayer() {
  const characters = document.querySelector("#characters");

  const player = document.createElement("div");
  player.classList.add("player");
  characters.appendChild(player);
}

function displayPlayer() {
  const shownPlayer = document.querySelector(".player");

  shownPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function createAlgorithmEnemy() {
  const characters = document.querySelector("#characters");

  const algorithmEnemy = document.createElement("div");
  algorithmEnemy.classList.add("enemy3");
  characters.appendChild(algorithmEnemy);
}

function displayAlgorithmEnemy() {
  const shownAlgorithmEnemy = document.querySelector(".enemy3");

  shownAlgorithmEnemy.style.translate = `${enemy3.x}px ${enemy3.y}px`;
}

// function displayCatRight() {
//   const shownCatRight = document.querySelector("#enemy2");

//   shownCatRight.style.translate = `${enemy2.x}px ${enemy2.y}px`;
// }

// function displayCatLeft() {
//   const shownCatRight = document.querySelector("#enemy1");

//   shownCatRight.style.translate = `${enemy1.x}px ${enemy1.y}px`;
// }

// ***************** Tick / view *****************

function tick(time) {
  // if gameRunning false pause animations
  if (!gameRunning) return;

  requestAnimationFrame(tick);

  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  movePlayer(deltaTime);
  displayPlayer();
}

// ***************** Controller *****************

// reset keys
let controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

function updateKeyState(key, isPressed) {
  console.log(key, isPressed);

  switch (key) {
    case "w":
    case "ArrowUp":
      controls.up = isPressed;
      break;
    case "s":
    case "ArrowDown":
      controls.down = isPressed;
      break;
    case "a":
    case "ArrowLeft":
      controls.left = isPressed;
      break;
    case "d":
    case "ArrowRight":
      controls.right = isPressed;
      break;
  }
}

// check temporary position is valid before moving player object
let playerDirection = { x: 0, y: 0 };
function movePlayer(deltaTime) {
  // const deltaSpeed = player.speed * deltaTime;
  // player.x = player.x + deltaSpeed;
  // player.y = player.y +1;

  // reset player direction
  playerDirection.x = 0;
  playerDirection.y = 0;

  // check which direction to move player depending on keyPress
  // y axis
  if (controls.up) {
    playerDirection.y = -1;
  } else if (controls.down) {
    playerDirection.y = +1;
  }
  // x axis
  if (controls.left) {
    playerDirection.x = -1;
  } else if (controls.right) {
    playerDirection.x = +1;
  }

  // checks if player is moving - if not return
  if (playerDirection.x == 0 && playerDirection.y == 0) return;

  // calculate distance to make sure player doesn't move faster diagonally
  const dist = Math.hypot(playerDirection.x, playerDirection.y);
  playerDirection.x /= dist;
  playerDirection.y /= dist;

  // calculate steady players speed for movement
  const movement = {
    x: playerDirection.x * player.speed * deltaTime,
    y: playerDirection.y * player.speed * deltaTime,
  };

  // update temp position with movement
  const position = { x: player.x, y: player.y };
  position.x += movement.x;
  position.y += movement.y;

  console.log(player.x, position.x);

  // if temp position is valid update playes position
  if (canMove(player, position)) {
    player.x = position.x;
    player.y = position.y;
  }
}

function canMove(player, position) {
  if (position.x < 0 || position.y < 0 || position.x > gameField.width - player.width || position.y > gameField.height - player.height) return false;

  return true;
}
