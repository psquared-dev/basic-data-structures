const Queue = require("../queue/Queue");

class Node {
  constructor(data = null, parent = null) {
    this.data = data;
    this.parent = parent;
    this.children = [];
  }

  appendChild(data) {
    const node = new Node(data, this.root);
    this.children.push(node);
    return node;
  }

  find(data) {
    return this.children.filter((node) => node.data === data);
  }

  toString() {
    return this.data;
  }
}

class NTree {
  constructor(data) {
    this.root = null;
  }

  addRoot(data) {
    this.root = new Node(data);
  }

  find(data) {
    return this.root.find(data);
  }

  appendChild(data) {
    return this.root.appendChild(data);
  }

  bfs() {
    const q = new Queue();
    q.enqueue(this.root);
    const output = [];

    while (!q.isEmpty()) {
      const curr = q.dequeue();

      output.push(curr);

      for (const child of curr.children) {
        q.enqueue(child);
      }
    }

    return output;
  }

  toString() {
    return this.root.toString();
  }
}

const t = new NTree();
t.addRoot(1);

const two = t.appendChild(2);
const three = t.appendChild(3);
const four = t.appendChild(4);

// console.log(JSON.stringify(t.root, null, 4));

two.appendChild(5);
two.appendChild(6);
// console.log(two);

three.appendChild(7);
three.appendChild(8);
three.appendChild(9);
three.appendChild(10);
// console.log(three);

console.log(JSON.stringify(t.root, null, 4));

console.log(t.bfs().map((node) => node.data));
