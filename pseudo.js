// *********** A* pseudo code ***********
// could also use linkedlist as pathlist

function reconstructPathFromStartToGoal(cameFrom, currentNode) {
  // create list to add nodes from path starting at goal moving towards start
  let pathList = [currentNode];

  // predesessorsList is a map of nodes that are the predessesor of the current nodes
  while (currentNode in cameFrom) {
    // set current to old current's predessesor
    currentNode = cameFrom[currentNode];

    // add new current to pathList
    pathList.push(currentNode);
  }
  /* when all predessesors has been added to pathList, 
     ending at the startNode, path is reconstructed */
  return pathList.reverse();
}

/* chebyshevDistance heuristic finds the shortest distance from start to goal,
    when diagonal as well as up-down, righ-left movement is possible
    so moving in a total of 8 directions.
    is does it by subtracting start.x from goal.x and start.y from goal.y
    to find the biggest number and returns it
*/
function heuristic(currentNode, goalNode) {
  return Math.max(Math.abs(goalNode.x - currentNode.x), Math.abs(goalNode.y - currentNode.y));
}

// h is the heuristic which is the returned result from chebyshevDistance(node, goal)
function AStar(startNode, goalNode) {
  // init the openSet as a priority queue using a min-heap
  // the priority is ordered by the node with the lowest fScore at the top
  let openSet = new MinHeap();

  // add start node to the openSet, the only known node right now
  openSet.insert(startNode);

  // init a map of predessesors. a map because nodes should only be added once.
  // predessesors being the node right before the currentNode on the cheapest path so far
  let cameFrom = new Map();

  // gScore is the currently known cheapest path from start to current node
  // all nodes are initiated with a gScore = infinity, in node class
  // set startnode gScore = 0, as it costs zero to go from start to start
  startNode.gScore = 0;

  // calculate hScore for startNode
  // hScore is the cost of going from current node to goal node
  startNode.hScore = heuristic(startNode, goalNode);

  // calculate fScore
  // fScore is the estimated cheapest path from start to goal through current node
  startNode.fScore = startNode.gScore + startNode.hScore;

  // while the openSet is not empty, we search through neighbors of the current node,
  // to fint the cheapest path to goal
  while (openSet.length > 0) {
    // set currentNode to node in the openSet that has the lowest fScore
    // in a minHeap this is the root, and it finds it in O(log n) time.
    currentNode = openSet.peek();
    // currentNode = openSet["node with lowest fScore"];

    // check if currentNode is the goalNode
    // if yes, the cheapest path has been found
    if ((currentNode === goalNode)) {
      return reconstructPathFromStartToGoal(cameFrom, currentNode);
    }

    // remove currentNode from openList as it has been evaluated
    openSet.remove(currentNode);

    // go through each neigbor of the currentNode,
    // to see which to add to the openSet
    currentNode.neighbors.forEach((neighbor) => {
      /* calculate the tentative gScore of the neighbor,
         so the cost of going from start to this neighbor through the current node */
      /* d(currentNode, neighbor) is weight of the edge from current to neighbor,
        also known as the calculated cost to move from one node to the neighbor.
        as the cost can vary */
      const tentative_gScore = currentNode.gScore + d(currentNode, neighbor);

      // check if the tentative_gScore is lower than the neighbors current gScore
      // if the tentative_gScore is smaller, then we have found a cheaper path to this neighbor node
      if (tentative_gScore <= neighbor.gScore) {
        // add currentNode as predessesor of the neighbor node
        cameFrom.set(neighbor, currentNode);
        // cameFrom[neighbor] = current;

        // update the gScore of the neighbor node
        neighbor.gScore = tentative_gScore;

        // recalculate the fScore of the neighbor node
        neighbor.fScore = tentative_gScore + heuristic(neighbor, goalNode);

        // add neighbor to the openSet if it is not already in it
        // it is added as the neighbor's neighbors needs to be checked as well
        if (!openSet.contains(neighbor)) {
          openSet.insert(neighbor);
        }
      }
    });
  }
  /*if the openSet is empty and we haven't found the goal
    the algorithm coulnd't find a path from stsrt to the goal,
    and then we return null */
  return null;
}
