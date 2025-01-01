import Node from "./Node.js";

export default class Grid {
  grid = [];

  constructor(rows, cols) {
    this.createGrid(rows, cols);
  }

  createGrid(rows, cols) {
    let i = 0;
    for (let r = 0; r < rows; r++) {
      this.grid.push([]);
      for (let c = 0; c < cols; c++) {
        this.grid[r].push(null);
      }
    }
  }

  addNode(node) {
    const { row, col } = node;
    // console.log("Node: ", node);

    if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length) {
      this.grid[row][col] = node;
    } else {
      throw new Error(`Node not found: row=${row}, col=${col}`);
    }
  }

  paramsHelper(rowOrObj, col) {
    if (typeof rowOrObj === "object") {
      return rowOrObj;
    } else {
      return { row: rowOrObj, col: col };
    }
  }

  //   - `set( row, col, value )` - sætter `value` på den angivne plads.
  set(rowOrObj, colParam, newNode) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    // Ensure the newNode is a valid Node object
    if (!newNode || newNode instanceof Node) {
      throw new Error("Not a valid node object");
    }
    this.grid[row][col] = newNode;
  }

  // - `get( row, col )` - returnerer node på den angivne plads
  get(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    return this.grid[row][col];
  }

  // - `indexFor( row, col )` - returnerer index (nummeret) på cellen i denne række+kolonne
  indexFor(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    return row * this.cols() + col;
  }

  // - `rowColFor( index )` - returnerer et `{row, col}` objekt for cellen med dette index (nummer)
  rowColFor(index) {
    let row = Math.floor(index / this.cols());
    let col = index % this.cols();
    return { row, col };
  }

  // !! CELLE er hele objekett med row og col + value !!

  // - `neighbours( row, col )` - returnerer en liste over alle 8 naboceller til denne, hvis de eksisterer
  neighbours(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    let neighbours = [];

    const northNeighbor = this.north({ row, col });
    if (northNeighbor) neighbours.push(northNeighbor);

    const southNeighbor = this.south(row, col);
    if (southNeighbor) neighbours.push(southNeighbor);

    const eastNeighbor = this.east(row, col);
    if (eastNeighbor) neighbours.push(eastNeighbor);

    const westNeighbor = this.west(row, col);
    if (westNeighbor) neighbours.push(westNeighbor);

    const northEastNeighbor = this.northEast(row, col);
    if (northEastNeighbor) neighbours.push(northEastNeighbor);

    const northWestNeighbor = this.northWest(row, col);
    if (northWestNeighbor) neighbours.push(northWestNeighbor);

    const southEastNeighbor = this.southEast(row, col);
    if (southEastNeighbor) neighbours.push(southEastNeighbor);

    const southWestNeighbor = this.southWest(row, col);
    if (southWestNeighbor) neighbours.push(southWestNeighbor);

    // remove neighbord that are undefined
    neighbours = neighbours.filter((neighbour) => neighbour !== undefined);

    return neighbours;
  }

  // - `neighbourValues( row, col )` - returnerer en liste over alle nabocellers values.
  neighbourValues(rowOrObj, colParam, prop = id) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    let values = [];
    this.neighbours({ row, col }).forEach((neighbour) => {
      values.push(neighbour[prop]);
    });
    return values;
  }

  // - `nextInRow( row, col )` - returnerer cellen til højre efter denne, eller undefined hvis der ikke er flere i den **row**
  nextInRow(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    return this.east({ row, col });
  }

  // - `nextInCol( row, col )` - returnerer cellen under denne, eller undefined hvis der ikke er flere i den **col**
  nextInCol(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    return this.south({ row, col });
  }

  isValid(row, col) {
    return row >= 0 && row < this.rows() && col >= 0 && col < this.cols();
  }

  // - `north( row, col )` - returnerer cellen over denne, eller undefined, hvis der ikke er nogen
  north(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (this.isValid(row - 1, col)) {
      return this.grid[row - 1][col];
    } else {
      return undefined;
    }
  }

  // - `south( row, col )` - returnerer cellen under denne, eller undefined, hvis der ikke er nogen
  south(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row + 1, col)) {
      return this.grid[row + 1][col];
    } else {
      return undefined;
    }
  }

  // - `west( row, col )` - returnerer cellen til venstre for denne, eller undefined, hvis der ikke er nogen
  west(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row, col - 1)) {
      return this.grid[row][col - 1];
    } else {
      return undefined;
    }
  }

  // - `east( row, col )` - returnerer cellen til højre for denne, eller undefined, hvis der ikke er nogen
  east(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row, col + 1)) {
      return this.grid[row][col + 1];
    } else {
      return undefined;
    }
  }

  northEast(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row - 1, col + 1)) {
      return this.grid[row - 1][col + 1];
    } else {
      return undefined;
    }
  }

  northWest(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row - 1, col - 1)) {
      return this.grid[row - 1][col - 1];
    } else {
      return undefined;
    }
  }

  southEast(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row + 1, col + 1)) {
      return this.grid[row + 1][col + 1];
    } else {
      return undefined;
    }
  }

  southWest(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);

    if (this.isValid(row + 1, col - 1)) {
      return this.grid[row + 1][col - 1];
    } else {
      return undefined;
    }
  }

  //  metoder til at fortælle noget om strukturen

  // - `rows()` - returnerer antallet af rækker
  rows() {
    return this.grid.length;
  }

  // - `cols()` - returnerer antallet af kolonner
  cols() {
    return this.grid[0].length;
  }

  // - `size()` - returnerer det samlede antal celler
  size() {
    return this.rows() * this.cols();
  }

  // - `fill( node )` - skriver den angivne node ind i alle celler
  fill(node) {
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        this.grid[r][c] = new Node(node);
      }
    }
  }

  // - `print()` - viser griddet i konsollen
  print() {
    console.log(this.grid);
  }

  // clear the grid
  clear() {
    this.grid = [];
  }

  // reset grid
  reset(rows, cols) {
    this.clear();
    this.createGrid(rows, cols);
  }
}
