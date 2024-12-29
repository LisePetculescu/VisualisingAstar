window.addEventListener("load", start);
import testMinHeap from "./helperFunctions/test_minHeap.js";
import testTileMap from "./helperFunctions/testTileMap.js";

function start() {
  console.log("🥳 js is running!");
  // tests();

  displayPlayer();
  // displayCatLeft();
  // displayCatRight();
  displayAlgorithmEnemy();
}

function tests() {
  testMinHeap();
  testTileMap();
}

// ***************** Model *****************

const gameField = {
  width: 600, //px
  height: 500, // px
};

// 10 x 10
const tiles = [
  [0, 1, 1, 1, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 2, 0, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const GRID_WIDTH = tiles[0].length;
const GRID_HEIGHT = tiles.length;
const TILE_SIZE = 32; // px
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
  const row = Math.floor(x / TILE_SIZE);
  const col = Math.floor(y / TILE_SIZE);

  return { row, col };
}

// returns a pos {x,y} calculated from a coord {row, col}
function posFromCoord({ row, col }) {
  const x = row * TILE_SIZE;
  const y = col * TILE_SIZE;
  return { x, y };
}

// rodent
let player = {
  x: gameField.width / 2 - 32,
  y: 80,
  width: 30,
  height: 20,
  speed: 50,
  moving: false,
};

// cat left
let enemy1 = {
  x: 0,
  y: gameField.height / 2,
  width: 30,
  height: 40,
  speed: 60,
  moving: true,
};

// cat right
let enemy2 = {
  x: gameField.width - 50,
  y: gameField.height / 2,
  width: 30,
  height: 40,
  speed: 60,
  moving: true,
};

// girl / algorithm
let enemy3 = {
  x: gameField.width / 2 - 20,
  y: gameField.height - 60,
  width: 40,
  height: 50,
  speed: 60,
  moving: true,
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
