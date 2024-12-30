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
  // debugHighlightTile({ row: 1, col: 1 });

  displayPlayer();
  // debugShowTileUnderPlayer(player);

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
  x: 400,
  y: 350,
  width: 15,
  height: 25,
  regX: 8,
  regY: 10,
  speed: 80, // px/s
  moving: false,
  animationDirection: "",
};

// girl / algorithm
let enemy3 = {
  x: 600,
  y: 620,
  width: 30,
  height: 50,
  regX: 15,
  regY: 25,
  speed: 60, // px/s
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

const TILE_SIZE = 35;
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

// ********* Tiles *********

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
  const visualTiles = document.querySelectorAll(".tile");

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

// returns the tile div for given coords
function getVisualTileFromCoords({ row, col }) {
  const visualTiles = document.querySelectorAll(".tile");

  const tile = row * GRID_WIDTH + col;
  const visualTile = visualTiles[tile];

  return visualTile;
}

// ********* Player *********
function createPlayer() {
  const characters = document.querySelector("#characters");

  const player = document.createElement("div");
  player.classList.add("player");
  characters.appendChild(player);
}

function displayPlayer() {
  const shownPlayer = document.querySelector(".player");

  shownPlayer.style.translate = `${player.x - player.regX}px ${player.y - player.regY}px`;
}

// ********* Enemy *********

function createAlgorithmEnemy() {
  const characters = document.querySelector("#characters");

  const algorithmEnemy = document.createElement("div");
  algorithmEnemy.classList.add("enemy3");
  characters.appendChild(algorithmEnemy);
}

function displayAlgorithmEnemy() {
  const shownAlgorithmEnemy = document.querySelector(".enemy3");

  shownAlgorithmEnemy.style.translate = `${enemy3.x - enemy3.regX}px ${enemy3.y - enemy3.regY}px`;
}

// ********* Debugging *********
function debugHighlightTile({ row, col }) {
  const visualTiles = document.querySelectorAll(".tile");

  const tile = row * GRID_WIDTH + col;
  const visualTile = visualTiles[tile];
  visualTile.classList.add("highlight");
}

function debugUnHighlightTile({ row, col }) {
  const visualTiles = document.querySelectorAll(".tile");

  const tile = row * GRID_WIDTH + col;
  const visualTile = visualTiles[tile];
  visualTile.classList.remove("highlight");
}

let previousTile = undefined;
function debugShowTileUnderPlayer() {
  const tileUnderPlayer = getTileCoordUnder(player);
  const tileToHighlight = getVisualTileFromCoords(tileUnderPlayer);

  if (tileToHighlight) {
    if (previousTile) {
      const previousHighlightedTile = getVisualTileFromCoords(previousTile);
      if (previousHighlightedTile) {
        previousHighlightedTile.classList.remove("highlight");
      }
    }
  }

  tileToHighlight.classList.add("highlight");

  previousTile = tileUnderPlayer;
}

function debugShowPlayerRect() {
  const visualPlayer = document.querySelector(".player");

  visualPlayer.classList.add("show-rect");
}

function debugShowPlayerRegPoint() {
  const visualPlayer = document.querySelector(".player");

  visualPlayer.style.setProperty("--regX", `${player.regX}px`);
  visualPlayer.style.setProperty("--regY", `${player.regY}px`);

  visualPlayer.classList.add("show-reg-point");
}

function debugShowEnemy3Rect() {
  const visualEnemy = document.querySelector(".enemy3");

  visualEnemy.classList.add("show-rect");
}

function debugShowEnemy3RegPoint() {
  const visualEnemy = document.querySelector(".enemy3");

  visualEnemy.style.setProperty("--regX", `${enemy3.regX}px`);
  visualEnemy.style.setProperty("--regY", `${enemy3.regY}px`);

  visualEnemy.classList.add("show-reg-point");
}

function showDebugging() {
  debugShowTileUnderPlayer();
  debugShowPlayerRect();
  debugShowPlayerRegPoint();
  debugShowEnemy3Rect();
  debugShowEnemy3RegPoint();
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
  showDebugging();
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
  // console.log(key, isPressed);

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

  // console.log(player.x, position.x);

  // if temp position is valid update playes position
  if (canMove(player, position)) {
    player.x = position.x;
    player.y = position.y;
  }
}

function canMove(player, position) {
  // if (position.x < 0 || position.y < 0 || position.x > GAMEFIELD_WIDTH - player.width || position.y > GAMEFIELD_HEIGHT - player.height) return false;

  const coord = getTileCoordUnder(position);
  // console.log("coord: ", coord);
  // console.log(GRID_HEIGHT);

  if (coord.row < 0 || coord.row >= GRID_HEIGHT || coord.col < 0 || coord.col >= GRID_WIDTH) {
    return false;
  }

  const tileValue = getTileAtPos(position);
  // console.log(tileValue);

  switch (tileValue) {
    // walkable tiletypes
    case 0:
    case 1:
    case 3:
      return true;
    // non walkable tiletype
    case 2:
      return false;
  }
  return true;
}
