class Node {
  constructor(value) {
    this.value = value;
    this.adjecents = new Set();
  }

  removeAdjacent(node) {
    return this.adjecents.delete(node);
  }

  addAdjacent(node) {
    return this.adjecents.add(node);
  }

  isAdjacent(node) {
    return this.adjecents.has(node);
  }
}

class Graph {
  constructor(edgeDirection = Graph.UNDIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }

  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    }

    const vertex = new Node(value);
    this.nodes.set(value, vertex);
    return vertex;
  }

  removeVertex(value) {
    const current = this.nodes.get(value);
    if (current) {
      Array.from(this.nodes.values()).forEach((node) =>
        node.removeAdjacent(current)
      );
    }

    return this.nodes.delete(value);
  }

  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addAdjacent(destinationNode);

    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }

    return [sourceNode, destinationNode];
  }

  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);

      if (Graph.edgeDirection === Graph.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode);
      }
    }

    return [sourceNode, destinationNode];
  }

  areAdjacent(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      return sourceNode.isAdjacent(destinationNode);
    }

    return false;
  }
}

Graph.UNDIRECTED = Symbol("undirected graph"); // two-way edges
Graph.DIRECTED = Symbol("directed graph"); // one-way edges

const g1 = new Graph();
g1.addVertex("bing");
g1.addVertex("google");
g1.addVertex("duck");
g1.addVertex("aws");

g1.addEdge("bing", "google");
g1.addEdge("bing", "aws");

console.log(g1);

console.log(g1.areAdjacent("google", "bing"));
