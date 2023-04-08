const Comparator = require("../utils/comparator/Comparator");

class MinHeap {
  constructor(comparatorFn) {
    this.heapContainer = [];
    this.heapElements = new Map();
    this.compare = new Comparator(comparatorFn);
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const temp = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = temp;
  }

  isEmpty() {
    return this.heapContainer.length === 0;
  }

  find(item, comparator = this.compare) {
    const foundItemsIndices = [];

    for (let index = 0; index < this.heapContainer.length; index++) {
      if (comparator.equal(item, this.heapContainer[index])) {
        foundItemsIndices.push(index);
      }
    }

    return foundItemsIndices;
  }

  toString() {
    return this.heapContainer.toString();
  }

  heapifyBottom(index = this.heapContainer.length - 1) {
    let currentIndex = index;

    while (
      this.hasParent(currentIndex) &&
      this.compare.greaterThan(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(this.getParentIndex(currentIndex), currentIndex);
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyTop(index = 0) {
    let currIndex = index;

    const leftChildIndex = this.getLeftChildIndex(currIndex);
    const rightChildIndex = this.getRightChildIndex(currIndex);

    let smallIndex = index;

    if (
      leftChildIndex < this.heapContainer.length &&
      this.compare.lessThan(
        this.heapContainer[leftChildIndex],
        this.heapContainer[smallIndex]
      )
    ) {
      smallIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heapContainer.length &&
      this.compare.lessThan(
        this.heapContainer[rightChildIndex],
        this.heapContainer[smallIndex]
      )
    ) {
      smallIndex = rightChildIndex;
    }

    if (smallIndex !== index) {
      this.swap(smallIndex, index);
      this.heapifyTop(smallIndex);
    }
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyBottom();
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyTop();
    return item;
  }
}

module.exports = MinHeap;
