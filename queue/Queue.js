const LinkedList = require("../linkedList/LinkedList.js");

class Queue {
  constructor() {
    this.LinkedList = new LinkedList();
  }

  enqueue(value) {
    this.LinkedList.append(value);
  }

  dequeue() {
    const removedNode = this.LinkedList.deleteHead();
    return removedNode ? removedNode.value : null;
  }

  isEmpty() {
    return this.LinkedList.head == null;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.LinkedList.head.value;
  }

  toString(callback) {
    return this.LinkedList.toString(callback);
  }
}

module.exports = Queue;
