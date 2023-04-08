const MinHeap = require("../heap/MinHeap");
const Comparator = require("../utils/comparator/Comparator");

Comparator;

class PriorityQueue extends MinHeap {
  constructor() {
    super();
    this.priorities = new Map();
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }

    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  add(item, priority) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  poll() {
    const item = this.peek();
    this.priorities.delete(item);
    super.poll();
    return item;
  }

  //   remove(item, customFindingComparator) {
  //     super.remove(item, customFindingComparator);
  //     this.priorities.delete(item);
  //     return this;
  //   }

  //   delete() {}
}

module.exports = PriorityQueue;
