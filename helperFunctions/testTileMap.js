export default function testTileMap() {
  // 10 x 10
  const tiles10 = [
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

  // 20 x 20
  const tiles20 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  ];

  const GRID_WIDTH = tiles10[0].length;
  const GRID_HEIGHT = tiles10.length;
  const TILE_SIZE = 32; // px

  // returns the tile type at the given {row,col}
  function getTileAtCoord({ row, col }) {
    return tiles10[row][col];
  }

  // returns the the tile type at {row, col} calculated out from pos {x,y}
  function getTileAtPos({ x, y }) {
    return getTileAtCoord(coordFromPos({ x: 96, y: 64 }));
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

  console.log("***** Test Tile Map *****");
  console.log("");
  console.log("Test getTileAtCoord, expected: 2 - result: ", getTileAtCoord({ row: 3, col: 2 }));
  console.log("Test getTileAtpos, expected: 2 - result: ", getTileAtPos({ x: 96, y: 64 }));
  console.log("test coordFromPos, expected: { row: 3, col: 2 } - result: ", coordFromPos({ x: 96, y: 64 }));
  console.log("test posFromCoord, expected: {x: 96, y: 64} - result: ", posFromCoord({ row: 3, col: 2 }));
  console.log("");
  console.log("All tile map tests completed");
  console.log("");
}
