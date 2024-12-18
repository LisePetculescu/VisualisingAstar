// source: https://en.wikipedia.org/wiki/Heap_(data_structure) 

export default class MinHeap {
   
  constructor( heap = []) {}

  // insert a new node to the heap. restoring heap with heapifyUp()
  insert(value) {}

  // remove and return the root node/ smallest value. get new root through heapifyDown()
  extractMin() {}

  // see root node value/ the smallest value in the heap
  peek() {}

  // move node up in the tree to restore heap balance - used for insert
  heapifyUp() {}

  // move node down the tree to restore heap balance - used for extraction
  heapifyDown() {}

  // returns index for parent of node at given index
  parentIndex(index) {}

  // returns index for left child of node at given index
  leftChildIndex(index) {}

  // returns index for right child of node at given index
  rightChildIndex(index) {}

  // swaps the two nodes at the two given indexes
  swap(index1, index2) {}

  // return number of nodes in heap
  size() {}

  // return true if heap is empty
  isEmpty() {}
}

