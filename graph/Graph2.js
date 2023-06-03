const Stack = require("../stack/Stack");
const Queue = require("../queue/Queue");

class Graph {
  constructor(order) {
    this.vertices = order;
    this.edges = 0;
    this.adj = [];
    this.visited = [];

    for (let index = 0; index < this.vertices; index++) {
      this.adj[index] = [];
      this.visited[index] = false;
    }
  }

  addEdge(startVertex, endVertex) {
    this.adj[startVertex].push(endVertex);
    this.adj[endVertex].push(startVertex);
    this.edges++;
  }

  show() {
    let output = "";

    for (let i = 0; i < this.adj.length; i++) {
      output += `${i} => `;
      for (let j = 0; j < this.adj[i].length; j++) {
        output += `${this.adj[i][j]} `;
      }

      output += "\n";
    }

    return output;
  }

  dfs(startVertex) {
    console.log(startVertex);
    this.visited[startVertex] = true;

    for (const vertex of this.adj[startVertex]) {
      if (this.visited[vertex] === false) {
        this.dfs(vertex);
      }
    }
  }

  bfs(startVertex) {
    const output = [];
    const q1 = new Queue();

    q1.enqueue(startVertex);

    while (q1.isEmpty() === false) {
      const el = q1.dequeue();
      this.visited[el] = true;
      output.push(el);
      for (const vertex of this.adj[el]) {
        if (this.visited[vertex] === false) {
          q1.enqueue(vertex);
        }
      }
    }

    return output;
  }
}

const g1 = new Graph(5);
// g1.addEdge(0, 3);
// g1.addEdge(1, 2);
// g1.addEdge(1, 3);
// // g1.addEdge(4, 3);

g1.addEdge(0, 1);
g1.addEdge(0, 2);
g1.addEdge(0, 3);

g1.addEdge(1, 4);

g1.addEdge(2, 4);
g1.addEdge(2, 5);

g1.addEdge(3, 5);

g1.addEdge(4, 6);
g1.addEdge(5, 6);

console.log(g1.show());
g1.dfs(0);
console.log(g1.bfs(2));
