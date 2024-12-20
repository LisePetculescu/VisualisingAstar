import Node from "./Node.js";

export default class Grid {
  grid = [];

  constructor(rows, cols) {
    this.grid = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      this.grid.push([]);
      for (let c = 0; c < cols; c++) {
        this.grid[r].push(new Node(i++, r, c));
      }
    }
    console.log(this.grid);
  }

  paramsHelper(rowOrObj, col) {
    if (typeof rowOrObj === "object") {
      return rowOrObj;
    } else {
      return { row: rowOrObj, col: col };
    }
  }

  //   - `set( row, col, value )` - sætter `value` på den angivne plads.
  set(rowOrObj, colParam, value) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    this.grid[row][col] = value;
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

    return neighbours;
  }

  // - `neighbourValues( row, col )` - returnerer en liste over alle nabocellers values.
  neighbourValues(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    let values = [];
    this.neighbours({ row, col }).forEach((neighbour) => {
      values.push(neighbour.value);
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

  // - `north( row, col )` - returnerer cellen over denne, eller undefined, hvis der ikke er nogen
  north(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row - 1 < 0 || col >= this.cols()) {
      return undefined;
    } else {
      return this.grid[row - 1][col];
    }
  }

  // - `south( row, col )` - returnerer cellen under denne, eller undefined, hvis der ikke er nogen
  south(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row + 1 >= this.rows() || col >= this.cols()) {
      return undefined;
    } else {
      return this.grid[row + 1][col];
    }
  }

  // - `west( row, col )` - returnerer cellen til venstre for denne, eller undefined, hvis der ikke er nogen
  west(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row >= this.rows() || col - 1 < 0) {
      return undefined;
    } else {
      return this.grid[row][col - 1];
    }
  }

  // - `east( row, col )` - returnerer cellen til højre for denne, eller undefined, hvis der ikke er nogen
  east(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row >= this.rows() || col + 1 >= this.cols()) {
      return undefined;
    } else {
      return this.grid[row][col + 1];
    }
  }

  northEast(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row - 1 < 0 || col + 1 >= this.cols()) {
      return undefined;
    } else {
      return this.grid[row - 1][col + 1];
    }
  }

  northWest(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row - 1 < 0 || col - 1 < 0) {
      return undefined;
    } else {
      return this.grid[row - 1][col - 1];
    }
  }

  southEast(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row + 1 >= this.rows() || col + 1 >= this.cols()) {
      return undefined;
    } else {
      return this.grid[row + 1][col + 1];
    }
  }

  southWest(rowOrObj, colParam) {
    const { row, col } = this.paramsHelper(rowOrObj, colParam);
    if (row + 1 >= this.rows() || col - 1 < 0) {
      return undefined;
    } else {
      return this.grid[row + 1][col - 1];
    }
  }

  // Der skal være et par metoder til at fortælle noget om strukturen

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

  // - `fill( value )` - skriver den angivne value ind i alle celler
  fill(value) {
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        this.grid[r][c] = value;
      }
    }
    // return value;
  }
}
