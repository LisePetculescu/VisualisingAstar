window.addEventListener("load", start);
import testMinHeap from "./helperFunctions/test_minHeap.js";
import testTileMap from "./helperFunctions/testTileMap.js";

function start() {
  console.log("🥳 js is running!");
  // tests();

  createTiles();
  createPlayer();
  createAlgorithmEnemy();
  displayTiles();
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
  height: 600, // px
};

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

const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;
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
  speed: 60,
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
  x: 550,
  y: gameField.height - 60,
  width: 40,
  height: 50,
  speed: 50,
  moving: true,
};

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

function displayCatRight() {
  const shownCatRight = document.querySelector("#enemy2");

  shownCatRight.style.translate = `${enemy2.x}px ${enemy2.y}px`;
}

function displayCatLeft() {
  const shownCatRight = document.querySelector("#enemy1");

  shownCatRight.style.translate = `${enemy1.x}px ${enemy1.y}px`;
}

// ***************** Controller *****************
