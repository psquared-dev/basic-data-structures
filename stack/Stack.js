const LinkedList = require("../linkedList/LinkedList");

class Stack {
  constructor() {
    this.LinkedList = new LinkedList();
  }

  isEmpty() {
    return this.LinkedList.head === null;
  }

  push(value) {
    this.LinkedList.append(value);
  }

  pop() {
    const removedNode = this.LinkedList.deleteTail();
    return removedNode ? removedNode.value : null;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.LinkedList.tail.value;
  }

  toArray() {
    return this.LinkedList.toArray().map((node) => node.value);
  }

  toString(callback) {
    return this.LinkedList.toString(callback);
  }
}

module.exports = Stack;
