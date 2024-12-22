// source: https://en.wikipedia.org/wiki/Heap_(data_structure)

export default class MinHeap {
  constructor(heap = []) {
    this.heap = heap;
  }

  // see root node value / the smallest value in the heap
  peek() {
    if (this.size() <= 0) {
      return null;
    } 
    return this.heap[0];
  }

  // insert a new node to the heap. restoring heap with heapifyUp()
  insert(node) {
    // insert node at the end of heap
    this.heap.push(node);

    // restore balance in heap from the index of the new node
    this.heapifyUp(this.size() - 1);
  }

  // remove and return the root node/ smallest value. get new root through heapifyDown()
  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    // swap root node with last node in heap
    const indexForLastNode = this.size() - 1;
    this.swap(0, indexForLastNode);

    // remove last node / old root
    // save root node to return
    const oldRootToReturn = this.heap.pop();

    // restore balance from root with heapifyDown
    this.heapifyDown(0);

    // return old root node
    return oldRootToReturn;
  }

  // replacing root with new node, to save having to extract then insert
  replaceRoot(newNode) {
    // insert new node at root
    this.heap[0] = newNode;

    // restore balance with heapifyDown()
    this.heapifyDown(0);
  }

  // move node up in the tree to restore heap balance - used for insert
  heapifyUp(index) {
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = this.parentIndex(currentIndex);
      const currentNode = this.heap[currentIndex];
      const parentNode = this.heap[parentIndex];

      // Compare nodes using compareNodes method from Node class
      // swap current node with parent node if current node's fScore is lower
      if (currentNode.compareNodes(parentNode) < 0) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        // stop loop if the smallest fScore is at the top of the tree
        break;
      }
    }
  }

  // move node down the tree to restore heap balance - used for extraction
  heapifyDown(index) {
    let currentIndex = index;

    while (true) {
      const leftIndex = this.leftChildIndex(currentIndex);
      const rightIndex = this.rightChildIndex(currentIndex);
      const currentNode = this.heap[currentIndex];

      // smallest being the index for the node with the smallest fScore
      let smallest = currentIndex;

      // compare current smallest with leftChild
      if (leftIndex !== null && currentNode.compareNodes(this.heap[leftIndex]) > 0) {
        smallest = leftIndex;
      }

      // compare current smallest with rightChild
      if (rightIndex !== null && this.heap[smallest].compareNodes(this.heap[rightIndex]) > 0) {
        smallest = rightIndex;
      }

      // stop loop if smallest is the node at the current index
      if (smallest === currentIndex) {
        break;
      }

      // swap nodes when child's fScore is smaller
      this.swap(currentIndex, smallest);
      currentIndex = smallest;
    }
  }

  // deletes a node at given index from heap
  removeNode(index) {
    if (index < 0 || index >= this.size()) return;

    // swap with last element
    this.swap(index, this.size() - 1);

    // remove last node
    const nodeToRemove = this.heap.pop();

    // restore balance in heap
    this.heapifyDown(index);
    this.heapifyUp(index);

    return nodeToRemove;
  }

  // returns index for parent of node at given index
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // returns index for left child of node at given index
  // returns null if index is bigger than length of heap
  leftChildIndex(index) {
    const leftIndex = 2 * index + 1;
    return leftIndex < this.size() ? leftIndex : null;
  }

  // returns index for right child of node at given index
  // returns null if index is bigger than length of heap
  rightChildIndex(index) {
    const rightIndex = 2 * index + 2;
    return rightIndex < this.size() ? rightIndex : null;
  }

  // returns the index of a given node
  indexOf(node) {
    for (let i = 0; i < this.size(); i++) {
      if (this.heap[i].isSameNode(node)) {
        return i;
        // Return the index if the node matches
      }
    }
    // Return -1 if the node is not found
    return -1;
  }

  // swaps the two nodes at the two given indexes
  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  // return number of nodes in heap
  size() {
    return this.heap.length;
  }

  // return true if heap is empty
  isEmpty() {
    return this.size() === 0;
  }

  // empties the heap
  clear() {
    this.heap = [];
  }
}
