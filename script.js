window.addEventListener("load", start);

import testMinHeap from "./helperFunctions/test_minHeap.js";
import testTileMap from "./helperFunctions/testTileMap.js";
import Grid from "./helperFunctions/Grid.js";
import Node from "./helperFunctions/Node.js";
import A_Star from "./algorithm/AStar.js";

function start() {
  console.log("🥳 js is running!");
  // tests();

  createGameField();

  document.querySelector("#btn-playState").addEventListener("click", gameState);
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
let pathFound = false;
let pathToWalk = [];

function gameState() {
  const button = document.querySelector("#btn-playState");
  gameRunning = !gameRunning;
  button.textContent = gameRunning ? "Pause" : "Start";

  if (gameRunning) {
    lastTime = performance.now();
    requestAnimationFrame(tick);
  }
}

// ***************** Model *****************

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

const TILE_SIZE = 32;
const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;

const GAMEFIELD_WIDTH = TILE_SIZE * GRID_WIDTH;
const GAMEFIELD_HEIGHT = TILE_SIZE * GRID_HEIGHT;

const initPlayerX = 90;
const initPlayerY = 55;
// rodent
let player = {
  // x: GAMEFIELD_WIDTH - 45,
  // x: GAMEFIELD_WIDTH / 2 + 140,
  // x: GAMEFIELD_WIDTH / 2 + 140,
  // x: GAMEFIELD_WIDTH / 2 + 180,
  // x: GAMEFIELD_WIDTH / 2 + 20,
  x: initPlayerX,
  y: initPlayerY,
  // y: GAMEFIELD_HEIGHT / 2 - 180,
  width: 15,
  height: 25,
  regX: 8,
  regY: 12,
  speed: 80, // px/s
  moving: false,
  animationDirection: "",
};

const initEnemyX = GAMEFIELD_WIDTH / 2 - 15;
const initEnemyY = GAMEFIELD_HEIGHT - 100;

// girl / algorithm
let enemy3 = {
  x: initEnemyX,
  y: initEnemyY,
  width: 30,
  height: 38,
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

let grid;

function createGameField() {
  console.log("create gamefield");

  const gamefield = document.querySelector("#gamefield");

  gamefield.style.setProperty("--width", GAMEFIELD_WIDTH);
  gamefield.style.setProperty("--height", GAMEFIELD_HEIGHT);

  // init the Grid for the algorithm
  grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

  // init tiles and add them as nodes in grid
  createTiles(grid);
  displayTiles();
  console.log(grid);

  createPlayer();
  displayPlayer();

  createAlgorithmEnemy();
  displayAlgorithmEnemy();

  // initAlgorithm(grid);

  // displayCatLeft();
  // displayCatRight();
}

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
// function posFromCoord({ row, col }) {
//   const x = col * TILE_SIZE;
//   const y = row * TILE_SIZE;
//   return { x, y };
// }
function posFromCoord(coord) {
  return {
    x: coord.col * TILE_SIZE + TILE_SIZE / 2,
    y: coord.row * TILE_SIZE + TILE_SIZE / 2,
  };
}

// returns coordinates for the tile a player is on
function getTileCoordUnder(player) {
  return coordFromPos({ x: player.x, y: player.y });
  // return getTileAtPos({ x: player.x, y: player.y });
}

// ***************** View *****************

// ********* Tiles *********

function createTiles(grid) {
  console.log("create tiles");

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

      // create node instaces of the tiles
      const tileTypeNumber = getTileAtCoord({ row, col });
      // 2 = wall & 3 = mousedoor
      const isObstacle = tileTypeNumber === 2 || tileTypeNumber === 3;

      const node = new Node(`${row}-${col}`, row, col, Infinity, 0, null, isObstacle, tileTypeNumber);

      // console.log("Node: ", node);

      // add node to grid
      grid.addNode(node);
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

// ********* A* Algorithm *********

// delay 1000ms = 1 second
const algorithmRetryDelay = 1000;
let startNode;
let goalNode;
function initAlgorithm() {
  console.log("before");

  // Reset any previous state to avoid residual values
  startNode = null;
  goalNode = null;
  pathToWalk = [];
  pathFound = false;

  console.log(grid);

  // Get start and goal nodes
  startNode = grid.get(getTileCoordUnder(enemy3));
  console.log("startNode enemy:", startNode);

  if (!startNode) {
    console.error("Start node not found");
    return;
  }

  goalNode = grid.get(getTileCoordUnder(player));
  console.log("goalnode - player: ", goalNode);

  if (!goalNode) {
    console.error("Goal node not found");
    return;
  }

  // Run A* algorithm to find the path
  pathToWalk = A_Star(grid, startNode, goalNode);
  console.log("Path:", pathToWalk);
  console.log("after");

  // Check if a path was found
  if (pathToWalk && pathToWalk.length > 0) {
    debugHighlightPath(pathToWalk);
    pathFound = true;
  } else {
    console.error("No path found");

    // Retry the algorithm after a delay
    setTimeout(initAlgorithm, algorithmRetryDelay);
  }
}

// function initAlgorithm() {
//   console.log("before");

//   const startNode = grid.get(getTileCoordUnder(enemy3));
//   console.log("startNode enemy:", startNode);

//   if (!startNode) {
//     console.error("Start node not found");
//     return;
//   }

//   const goalNode = grid.get(getTileCoordUnder(player));
//   console.log("goalnode - player: ", goalNode);

//   if (!goalNode) {
//     console.error("Goal node not found");
//     return;
//   }

//   pathToWalk = A_Star(grid, startNode, goalNode);
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!Path: ", pathToWalk);
//   console.log("after");

//   if (pathToWalk && pathToWalk.length > 0) {
//     debugHighlightPath(pathToWalk);
//     pathFound = true;
//   } else {
//     // console.error("No path found");

//     console.error("No path found, retrying...");
//     setTimeout(initAlgorithm, algorithmRetryDelay); // Retry after a delay
//   }
// }

// Function to highlight the path
function debugHighlightPath(path) {
  // Remove previous highlights
  const highlightedTiles = document.querySelectorAll(".tile.highlight-path");
  highlightedTiles.forEach((tile) => tile.classList.remove("highlight-path"));

  // Highlight the new path
  path.forEach((node) => {
    const { row, col } = node;
    const tileIndex = row * GRID_WIDTH + col;
    const visualTile = document.querySelectorAll(".tile")[tileIndex];
    visualTile.classList.add("highlight-path");
  });
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

function positionsAreEqual(pos1, pos2) {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}

// let pathToWalk = [];
let prevPlayerTile = null;
let lastAlgorithmCallTime = 0; // Timestamp of the last algorithm call
const algorithmCallDelay = 500;
function tick(time) {
  // if gameRunning false pause animations
  if (!gameRunning) return;

  requestAnimationFrame(tick);

  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  movePlayer(deltaTime);
  displayPlayer();
  showDebugging();

  const currentPlayerTile = getTileCoordUnder(player);
  const currentEnemyTile = getTileCoordUnder(enemy3);

  // Check if the player  has moved to a new tile
  if (!prevPlayerTile || !positionsAreEqual(currentPlayerTile, prevPlayerTile)) {
    pathFound = false;
    prevPlayerTile = currentPlayerTile;
  }

  // If no path found, reset the algorithm
  if (!pathFound && time - lastAlgorithmCallTime > algorithmCallDelay) {
    console.log("No path found, resetting the algorithm.");

    // Reset grid and reinitialize the algorithm

    resetGrid();
    initAlgorithm(); // Call the algorithm again to find a new path

    // Update the timestamp of the last algorithm call
    lastAlgorithmCallTime = time;
  } else {
    moveEnemy3(pathToWalk, deltaTime);
    displayAlgorithmEnemy();
    console.log("Path found, enemy is moving.");
  }

  if (currentPlayerTile.col === currentEnemyTile.col && currentPlayerTile.row === currentEnemyTile.row) {
    console.log("Enemy3 has reached the player. Stopping the game.");
    gameRunning = false;
    resetGame();
  }
}

// // let pathToWalk = [];
// let prevPlayerTile = null;
// let lastAlgorithmCallTime = 0; // Timestamp of the last algorithm call
// const algorithmCallDelay = 500;
// function tick(time) {
//   // if gameRunning false pause animations
//   if (!gameRunning) return;

//   requestAnimationFrame(tick);

//   const deltaTime = (time - lastTime) / 1000;
//   lastTime = time;

//   movePlayer(deltaTime);
//   displayPlayer();
//   showDebugging();

//   const currentPlayerTile = getTileCoordUnder(player);
//   const currentEnemyTile = getTileCoordUnder(enemy3);

//   // Check if the player or enemy has moved to a new tile
//   if (!prevPlayerTile || !positionsAreEqual(currentPlayerTile, prevPlayerTile)) {
//     pathFound = false;
//     prevPlayerTile = currentPlayerTile;
//   }

//   // If no path found, reset the algorithm
//   if (!pathFound && time - lastAlgorithmCallTime > algorithmCallDelay) {
//     console.log("No path found, resetting the algorithm.");

//     // Reset or reinitialize the algorithm
//     resetAlgorithmVariables(); // Reset any algorithm-related variables
//     resetGrid();
//     initAlgorithm(); // Call the algorithm again to find a new path

//     // Update the timestamp of the last algorithm call
//     lastAlgorithmCallTime = time;
//   } else {
//     moveEnemy3(pathToWalk, deltaTime);
//     displayAlgorithmEnemy();
//     console.log("Path found, enemy is moving.");
//   }

//   // if (enemy3.x === player.x && enemy3.y === player.y) {
//   //   console.log("Enemy3 has reached the player. Stopping the game.");
//   //   gameRunning = false;
//   // }
//   if (currentPlayerTile.col === currentEnemyTile.col && currentPlayerTile.row === currentEnemyTile.row) {
//     console.log("Enemy3 has reached the player. Stopping the game.");
//     gameRunning = false;
//     resetGame();
//   }
// }

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

  // if temp position is valid update players position
  if (canMove(player, position)) {
    player.x = position.x;
    player.y = position.y;
  }
}

// // move visualEnemy
// function moveEnemy3(path) {
//   let index = 0;

//   function move() {
//     if (index < path.length) {
//       const node = path[index];
//       enemy3.x = node.col * TILE_SIZE + enemy3.regX;
//       enemy3.y = node.row * TILE_SIZE + enemy3.regY;
//       displayAlgorithmEnemy();
//       index++;
//       setTimeout(move, 500); // Adjust the speed as needed
//     }
//   }

//   move();
// }

let enemyDirection = { x: 0, y: 0 };
function moveEnemy3(pathToWalk, deltaTime) {
  if (!pathToWalk || pathToWalk === 0) return;

  console.log("pathToWalk.length: ", pathToWalk.length);
  // console.log(getTileCoordUnder(player));

  // should start at index 1 as index 0 is current tile
  const nextNode = pathToWalk[1];
  // console.log("nextNode: ", nextNode);

  const currentCoord = getTileCoordUnder(enemy3);
  // console.log(currentCoord);

  // Check if the enemy is on the nextNode tile
  if (currentCoord.row === nextNode.row && currentCoord.col === nextNode.col) {
    // console.log("Enemy reached next node.");
    pathToWalk.shift(); // Remove the current node from the path
    if (pathToWalk.length === 0) {
      console.log("Enemy has reached the end of the path.");
      return; // No more nodes to move to
    }
  }

  // Calculate direction towards the next node
  const targetPos = posFromCoord(nextNode); // Convert grid coordinates to pixel position
  const enemyDirection = {
    x: targetPos.x - enemy3.x,
    y: targetPos.y - enemy3.y,
  };

  // console.log("enemy direction: ", enemyDirection);

  // highlight enemy3 path to player
  debugHighlightTile(coordFromPos(targetPos));

  // calculate distance to make sure player doesn't move faster diagonally
  const dist = Math.hypot(enemyDirection.x, enemyDirection.y);
  enemyDirection.x /= dist;
  enemyDirection.y /= dist;

  // calculate steady players speed for movement
  const movement = {
    x: enemyDirection.x * enemy3.speed * deltaTime,
    y: enemyDirection.y * enemy3.speed * deltaTime,
  };

  // // update temp position with movement
  // const position = { x: enemy3.x, y: enemy3.y };
  // position.x += movement.x;
  // position.y += movement.y;

  // // if temp position is valid update enemys position
  // if (canMove(enemy3, position)) {
  //   enemy3.x = position.x;
  //   enemy3.y = position.y;
  // }

  // Check for collision with walls
  const newPosition = { x: enemy3.x + movement.x, y: enemy3.y + movement.y };
  // console.log("newPosition: ", newPosition);

  if (canMove(enemy3, newPosition)) {
    // Update enemy position
    enemy3.x = newPosition.x;
    enemy3.y = newPosition.y;
  } else {
    // Adjust movement to avoid obstacle
    if (!canMove(enemy3, { x: enemy3.x + movement.x, y: enemy3.y })) {
      movement.x = 0;
    }
    if (!canMove(enemy3, { x: enemy3.x, y: enemy3.y + movement.y })) {
      movement.y = 0;
    }
    enemy3.x += movement.x;
    enemy3.y += movement.y;
  }
}

function canMove(player, position) {
  // if (position.x < 0 || position.y < 0 || position.x > GAMEFIELD_WIDTH - player.width || position.y > GAMEFIELD_HEIGHT - player.height) return false;

  const coord = getTileCoordUnder(position);

  if (coord.row < 0 || coord.row >= GRID_HEIGHT || coord.col < 0 || coord.col >= GRID_WIDTH) {
    console.error("Move out of grid boundaries");
    return false;
  }

  const tileValue = getTileAtPos(position);

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

function resetGrid() {
  // clear grid and creates a new one with same row, col as before
  grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

  // populate grid with tile nodes again
  createTiles(grid);
  displayTiles();
}

function clearCharacters() {
  const characters = document.querySelector("#characters");

  // removes all characters
  characters.innerHTML = "";
}

function resetAlgorithmVariables() {
  startNode = null;
  goalNode = null;
  pathToWalk = [];
  pathFound = false;
}

function resetPositions() {
  player.x = initPlayerX;
  player.y = initPlayerY;
  enemy3.x = initEnemyX;
  enemy3.y = initEnemyY;

  displayPlayer();
  displayAlgorithmEnemy();
}

function resetVisualTiles() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.classList.remove("highlighted");
  });
}

function resetGame() {
  console.log("reset");

  // Clear visual elements (characters and tiles)
  clearCharacters();
  resetVisualTiles();
  resetAlgorithmVariables();

  const gamefield = document.querySelector("#gamefield");

  gamefield.style.setProperty("--width", GAMEFIELD_WIDTH);
  gamefield.style.setProperty("--height", GAMEFIELD_HEIGHT);

  // init the Grid for the algorithm
  // grid = grid.reset(GRID_WIDTH, GRID_HEIGHT);
  resetGrid();

  // init tiles and add them as nodes in grid
  // createTiles(grid);
  // displayTiles();
  // console.log(grid);

  createPlayer();
  displayPlayer();

  createAlgorithmEnemy();
  displayAlgorithmEnemy();

  // // Reset grid and algorithm variables
  // // grid.reset({ node: null });
  // // grid.clear();
  // grid.createGrid(GRID_HEIGHT, GRID_WIDTH);

  // // Recreate the game field
  // // createGameField();

  // Reset positions of player and enemies
  // resetPositions();

  // gameState();

  console.log("Game has been reset!");
}

// function resetGame() {
//   console.log("Resetting game...");

//   console.log(pathToWalk);

//   // Reset game variables
//   lastTime = 0;
//   gameRunning = false;
//   pathFound = false;
//   pathToWalk = [];
//   prevPlayerTile = null;
//   lastAlgorithmCallTime = 0;

//   // Reset player and enemy positions
//   player.x = 90;
//   player.y = 55;
//   enemy3.x = GAMEFIELD_WIDTH / 2 - 15;
//   enemy3.y = GAMEFIELD_HEIGHT - 100;

//   // Clear any visual highlights
//   const highlightedTiles = document.querySelectorAll(".tile.highlight-path, .tile.highlight-open-set");
//   highlightedTiles.forEach((tile) => {
//     tile.classList.remove("highlight-path");
//     tile.classList.remove("highlight-open-set");
//   });

//   // Reinitialize the grid
//   grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

//   // Restart the game
//   gameState();
// }
