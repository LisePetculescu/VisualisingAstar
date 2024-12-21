export default class Node {
  constructor(id, y, x, gScore = Infinity, hScore = 0, parent = null, isObstacle = false) {
    this.id = id;

    //coordinates in grid
    this.x = x;
    this.y = y;

    // gScore is the cost from startNode to current node
    this.gScore = gScore;
    // hScore is the heuristic cost from current node to goal node
    this.hScore = hScore;
    // fScore is the total cost from start to goal through current node
    this.fScore = gScore + hScore;

    // to get the path from finish to start
    this.parent = parent;

    this.isObstacle = isObstacle;
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
}
