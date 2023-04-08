var LinkedListNode = require("./LinkedListNode.js");

class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }
      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.head.value == value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  toArray() {
    const elements = [];

    if (!this.head) {
      return elements;
    }

    let curr = this.head;

    while (curr) {
      elements.push(curr);
      curr = curr.next;
    }

    return elements;
  }

  deleteTail() {
    if (!this.head) {
      return null;
    }

    let curr = this.head;

    let deletedNode;

    if (this.head === this.tail) {
      deletedNode = this.head;
      this.head = this.tail = null;
      return deletedNode;
    }

    while (curr.next !== this.tail) {
      curr = curr.next;
    }

    deletedNode = this.tail;
    curr.next = null;
    this.tail = curr;
    return deletedNode;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    let deletedNode;

    deletedNode = this.head;

    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }

    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let curr = this.head;

    while (curr) {
      if (callback && callback(curr.value)) {
        return curr;
      }

      if (curr.value === value) {
        return curr;
      }
      curr = curr.next;
    }

    return null;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}

module.exports = LinkedList;
