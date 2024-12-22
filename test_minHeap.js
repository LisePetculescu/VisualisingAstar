import MinHeap from "./MinHeap.js";
import Node from "./Node.js";

export default function testMinHeap() {
  console.log("MinHeap tests");

  runAllTests();
}

function runAllTests() {
  console.log("Running all tests...");

  testPeek();
  console.log("");

  testInsert();
  console.log("");

  testExtractMin();
  console.log("");

  testReplaceRoot();
  console.log("");

  testRemoveNode();
  console.log("");

  testHeapifyUpAndDown();
  console.log("");

  testIsEmptyAndSize();
  console.log("");

  console.log("All tests completed.");
}

function testPeek() {
  console.log("Testing peek():");
  const heap = new MinHeap();
  console.log(`--- Expected: null - Output: ${heap.peek()}`);
  console.log(heap.peek() === null ? "✅ Passed" : "❌ Failed");

  const node = new Node(1, 0, 0, 2, 3);
  heap.insert(node);
  console.log(`--- Expected: Node {} - Output:`, heap.peek());
  console.log(heap.peek() === node ? "✅ Passed" : "❌ Failed");
}

function testInsert() {
  console.log("Testing insert():");
  const heap = new MinHeap();

  const node1 = new Node(1, 0, 0, 2, 3);
  const node2 = new Node(2, 0, 1, 1, 2);
  const node3 = new Node(3, 1, 1, 0, 4);

  heap.insert(node1);
  heap.insert(node2);
  heap.insert(node3);

  const isRootCorrect = heap.peek() === node2;
  console.log(`--- Expected: node2 {id:2} - Output: `, heap.peek());
  console.log(isRootCorrect ? "✅ Passed" : "❌ Failed");
}

function testExtractMin() {
  console.log("Testing extractMin():");
  const heap = new MinHeap();

  const node1 = new Node(1, 0, 0, 2, 3);
  const node2 = new Node(2, 0, 1, 1, 2);
  const node3 = new Node(3, 1, 1, 0, 4);

  heap.insert(node1);
  heap.insert(node2);
  heap.insert(node3);

  const minNode = heap.extractMin();
  console.log(`--- Expected: minNode = node {id: 2} - Output:`, minNode);
  console.log(minNode === node2 ? "✅ Passed" : "❌ Failed");
  console.log(`--- Expected: root = node {id: 3} - Output:`, heap.peek());
  console.log(heap.peek() === node3 ? "✅ Passed" : "❌ Failed");
}

function testReplaceRoot() {
  console.log("Testing replaceRoot():");
  const heap = new MinHeap();

  const node1 = new Node(1, 0, 0, 2, 3);
  const node2 = new Node(2, 0, 1, 1, 2);
  const node3 = new Node(3, 1, 1, 0, 4);

  heap.insert(node1);
  heap.insert(node2);
  console.log(heap.peek());
  console.log(`Replace root node {id: 2} with node {id: 3}`);
  heap.replaceRoot(node3);
  console.log(`--- Expected: node {id: 3} - Output: `, heap.peek());
  console.log(heap.peek() === node3 ? "✅ Passed" : "❌ Failed");
}

function testRemoveNode() {
  console.log("Testing removeNode():");
  const heap = new MinHeap();

  const node1 = new Node(1, 0, 0, 2, 3);
  const node2 = new Node(2, 0, 1, 1, 2);
  const node3 = new Node(3, 1, 1, 0, 4);

  heap.insert(node1);
  heap.insert(node2);
  heap.insert(node3);

  const removedNode = heap.removeNode(heap.indexOf(node2));
  console.log(`--- Expected: node {id: 2} - Output: `, removedNode);
  console.log(removedNode === node2 ? "✅ Passed" : "❌ Failed");
  console.log(`--- Expected: root: node {id: 3} - Output:`, heap.peek());
  console.log(heap.peek() === node3 ? "✅ Passed" : "❌ Failed");
}

function testHeapifyUpAndDown() {
  console.log("Testing heapifyUp() and heapifyDown():");
  const heap = new MinHeap();

  const node1 = new Node(1, 0, 0, 5, 3);
  const node2 = new Node(2, 0, 1, 3, 2);
  const node3 = new Node(3, 1, 1, 2, 4);

  heap.insert(node1);
  heap.insert(node2);
  heap.insert(node3);

  console.log(`--- Expected: root: node {id: 2} - Output:`, heap.peek());
  console.log(heap.peek() === node2 ? "✅ Passed" : "❌ Failed");

  const minNode = heap.extractMin();
  console.log(`--- Expected: Extracted minNode: node {id: 2} - Output:`, minNode);
  console.log(minNode === node2 ? "✅ Passed" : "❌ Failed");

  console.log(`--- Expected: new root: node {id: 3} - Output:`, heap.peek());
  console.log(heap.peek() === node3 ? "✅ Passed" : "❌ Failed");
}

function testIsEmptyAndSize() {
  console.log("Testing isEmpty() and size():");
  const heap = new MinHeap();

  console.log(`--- Expected: isEmpty() = true - Output:`, heap.isEmpty());
  console.log(heap.isEmpty() === true ? "✅ Passed" : "❌ Failed");
  console.log(`--- Expected: size() = 0 - Output:`, heap.size());
  console.log(heap.size() === 0 ? "✅ Passed" : "❌ Failed");

  const node = new Node(1, 0, 0, 2, 3);
  heap.insert(node);

  console.log(`--- Expected: isEmpty() = false - Output:`, heap.isEmpty());
  console.log(heap.isEmpty() === false ? "✅ Passed" : "❌ Failed");
  console.log(`--- Expected: size() = 1 - Output:`, heap.size());
  console.log(heap.size() === 1 ? "✅ Passed" : "❌ Failed");
}
