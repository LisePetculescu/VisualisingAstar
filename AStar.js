import Node from "./Node.js";
import MinHeap from "./MinHeap.js";

// ******* Helper functions *******

function reconstructPath(goalNode) {
  // initiate an array to push the path nodes into, from goal to start
  let reconstructedPathList = [];

  let current = goalNode;

  while (current !== null) {
    // add new current to pathList
    reconstructedPathList.push(current);

    // set current to the predesessor of the current node
    current = current.parent;
  }

  // reversing the list so first node is the startNode and it ends with the goalNode
  return reconstructedPathList.reverse();
}

/* heuristic function to find the shortest distance from current to goal,
 using chebyshevDistance because it can move in 8 directions. */
function heuristic(currentNode, goalNode) {
  // Math.max returns the largest of the two numbers.
  /* Math.abs returns the absolute value of a number,
    so it returns the biggest number as a positive number, 
    since distance between cells can't be negative */
  return Math.max(Math.abs(goalNode.x - currentNode.x), Math.abs(goalNode.y - currentNode.y));
}

// ******* A* Code *******

export default function A_Star(grid, startNode, goalNode) {
  // init the openSet as a priority queue using a min-heap
  // the priority is ordered by the node with the lowest fScore at the top
  let openSet = new MinHeap();

  // add start node to the openSet, the only known node right now
  openSet.insert(startNode);

  // init a map of predessesors. a map because nodes should only be added once.
  let cameFrom = new Map();

  // **** calculate scores for startNode ****
  // gScore is the currently known cheapest path from start to current node
  // all nodes in my project are initiated with a gScore = infinity, in node class
  // set startnode gScore = 0, as it costs zero to go from start to start
  // hScore is the cost of going from current node to goal node
  // fScore is the estimated cheapest path from start to goal through current node, calculated in node Class
  startNode.updateScores(0, heuristic(startNode, goalNode));

  // while the openSet is not empty, we search through neighbors of the current node, to find the cheapest path to goal
  while (openSet.length > 0) {
    // get node with lowest fScore from openSet
    let currentNode = openSet.extractMin();

    // check if currentNode is the goalNode
    // if yes, the cheapest path has been found
    if (currentNode === goalNode) {
      return reconstructPath(goalNode);
    }

    // get all neighbours of the currentNode that are not obstacles
    let neighbours = grid.neighbours(currentNode);

    // iterate through all neighbours
    for (let neighbour of neighbours) {
      // if neighbour is an obstacle, skip it
      if (neighbour.isObstacle) {
        continue;
      }

      // calculate gScore for neighbour
      /* usualy the cost is d(current, neighbour), as it can be different,
       in this case, the cost is 1 for all neighbours */
      let tentativeGScore = currentNode.gScore + 1;

      // if the neighbour is not in the openSet, add it
      if (!openSet.contains(neighbour)) {
        openSet.insert(neighbour);
      } else if (tentativeGScore >= neighbour.gScore) {
        // if the neighbour is already in the openSet and the new path is not cheaper, skip it
        continue;
      }

      // this path is the best until now, so record it
      cameFrom.set(neighbour, currentNode);

      // update scores for neighbour
      neighbour.updateScores(tentativeGScore, heuristic(neighbour, goalNode));
    }
  }

  // if the openSet is empty and no path is found, return null
  return null;
}
