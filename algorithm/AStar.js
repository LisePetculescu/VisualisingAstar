import MinHeap from "../helperFunctions/MinHeap.js";

// ******* Helper functions *******

function reconstructPath(cameFrom, goalNode) {
  // initiate an array to push the path nodes into, from goal to start
  let reconstructedPathList = [];

  let current = goalNode;

  // adding goalnode to list
  reconstructedPathList.push(current);

  while (cameFrom.has(current)) {
    // set current to the predesessor of the current node
    current = cameFrom.get(current);

    // add new current to pathList
    reconstructedPathList.push(current);
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
  // console.log("H current, goal", currentNode, goalNode);

  const result = Math.max(Math.abs(goalNode.col - currentNode.col), Math.abs(goalNode.row - currentNode.row));
  // console.log(result);

  return result;
}

// Function to highlight the open set
function highlightOpenSet(openSet) {
  // Remove previous highlights
  const highlightedTiles = document.querySelectorAll(".tile.highlight-open-set");
  highlightedTiles.forEach((tile) => tile.classList.remove("highlight-open-set"));

  // Highlight the new open set
  openSet.forEach((node) => {
    const { row, col } = node;
    const tileIndex = row * 20 + col;
    const visualTile = document.querySelectorAll(".tile")[tileIndex];
    visualTile.classList.add("highlight-open-set");
  });
}

// ******* A* Code *******

export default function A_Star(grid, startNode, goalNode) {
  console.log("#########################");
  console.log("");
  console.log("A*: ", "grid: ", grid, "startNode: ",startNode, "goalNode: ", goalNode);
  console.log("");
  console.log("#########################");

  console.log("12341234 grid: ",grid);
  

  // init the openSet as a priority queue using a min-heap
  // the priority is ordered by the node with the lowest fScore at the top
  let openSet = new MinHeap();

  // add start node to the openSet, the only known node right now
  openSet.insert(startNode);

  console.log("OpenSet: ", openSet);
  highlightOpenSet(openSet.heap);

  // init a map of predessesors. a map because nodes should only be added once.
  let cameFrom = new Map();

  // **** calculate scores for startNode ****
  // gScore is the currently known cheapest path from start to current node
  // all nodes in my project are initiated with a gScore = infinity, in node class
  // set startnode gScore = 0, as it costs zero to go from start to start
  // hScore is the cost of going from current node to goal node
  // fScore is the estimated cheapest path from start to goal through current node, calculated in node Class
  startNode.updateScores(0, heuristic(startNode, goalNode));
  // console.log("Updated startNode: ", startNode);

  // console.log("openset length", openSet.size());

  // while the openSet is not empty, we search through neighbors of the current node, to find the cheapest path to goal
  while (openSet.size() > 0) {
    // get node with lowest fScore from openSet
    let currentNode = openSet.extractMin();
    // console.log("Current Node:", currentNode);

    // check if currentNode is the goalNode
    // if yes, the cheapest path has been found
    if (currentNode === goalNode) {
      // // console.log("Goal Node Reached:", goalNode);
      // return reconstructPath(cameFrom, goalNode);
      const path = reconstructPath(cameFrom, goalNode);

      return path;
    }

    // // remove currentNode from openSet as it has been evaluated
    // openSet.removeNode(currentNode);

    // get all neighbours of the currentNode that are not obstacles
    let neighbours = grid.neighbours(currentNode);
    // console.log("A* neighbors: ", neighbours);

    // iterate through all neighbours
    for (let neighbour of neighbours) {
      // if neighbour is an obstacle (ex. a wall), skip it
      // console.log("neighbor isObst: ", neighbour.isObstacle);
      if (neighbour.isObstacle) {
        continue;
      }

      // calculate gScore for neighbour
      /* usualy the cost is d(current, neighbour), as it can be different,
       in this case, the cost is 1 for all neighbours, 
       so the cost goes up by 1 every time we move to the next */
      let tentativeGScore = currentNode.gScore + 1;

      if (tentativeGScore < neighbour.gScore) {
        // add currentNode as predessesor to the neighbor to cameFrom map
        cameFrom.set(neighbour, currentNode);

        // update gScore and fScore for neighbour
        neighbour.updateScores(tentativeGScore, heuristic(neighbour, goalNode));

        // rebalance openSet if neighbour is already in it and the new path is cheaper
        // this also makes sure the neighbour is in the openSet with the new gScore
        //   const index = openSet.indexOf(neighbour);
        // console.log("neighbor, index of neighbor:", neighbour, index);

        //   if (index != -1) {
        //     openSet.removeNode(index);
        //   }
        //   openSet.insert(neighbour);'

        if (openSet.contains(neighbour)) {
          openSet.removeNode(neighbour);
          highlightOpenSet(openSet.heap);
        }
        openSet.insert(neighbour);
        highlightOpenSet(openSet.heap);
      }

      // else {
      //   console.log("Skipping neighbour with higher gScore:", neighbour);
      // }

      // console.log(openSet.size());
    }
    // Highlight the open set
    // if (highlightOpenSetCallback) {
    //   console.log("Highlighting open set");
    //   highlightOpenSetCallback(openSet.heap);
    // }
  }

  // if the openSet is empty and no path is found, return null
  console.error("No path found");
  return null;
}
