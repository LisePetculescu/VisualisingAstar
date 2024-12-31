export default class Node {
  constructor(id, row, col, gScore = Infinity, hScore = 0, parent = null, isObstacle = false, tileTypeNumber = 0) {
    this.id = id;

    //coordinates in grid
    this.col = col;
    this.row = row;

    // gScore is the cost from startNode to current node
    this.gScore = gScore;
    // hScore is the heuristic cost from current node to goal node
    this.hScore = hScore;
    // fScore is the total cost from start to goal through current node
    this.fScore = gScore + hScore;

    // to get the path from finish to start
    this.parent = parent;

    // to rule out nodes that are obstacles from being visited
    this.isObstacle = isObstacle;

    this.tileTypeNumber = tileTypeNumber;
  }

  // comparing fScores to use in MinHeap
  compareNodes(otherNode) {
    if (this.fScore < otherNode.fScore) return -1;
    if (this.fScore > otherNode.fScore) return 1;
    return 0;
  }

  // update gScore and fScore when cheaper path is found
  updateScores(gScore, hScore) {
    this.gScore = gScore;
    this.hScore = hScore;
    this.fScore = this.gScore + this.hScore;
  }

  // returns true if it is the same node it is comparing to
  isSameNode(otherNode) {
    return this.id === otherNode.id;
  }

  // returns numbervalue for tileType ex. 0 = grass in game model
  getTileTypeNumber() {
    return this.tileTypeNumber;
  }
}
