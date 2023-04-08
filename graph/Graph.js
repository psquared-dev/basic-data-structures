const LinkedList = require("../linkedList/LinkedList");

class Node {
  constructor() {
    // type Edge
    this.edges = [];
  }
}

class GraphEdge {
  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  toString() {
    return this.getKey();
  }
}

class GraphVertex {
  constructor(value) {
    // type Nodes
    this.value = value;
    this.edges = new LinkedList();
  }

  addEdge(edge) {
    this.edges.append(edge);
    return this;
  }

  deleteEdge(edge) {
    this.edges.delete(edge);
  }

  getEdges() {
    return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
  }

  findEdge(vertex) {
    const edgeFinder = (edge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  getKey() {
    return this.value;
  }
}

class Graph {
  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;
    return this;
  }

  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  addEdge(edge) {
    // Try to find and end start vertices.
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    // Insert start vertex if it wasn't inserted.
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    // Insert end vertex if it wasn't inserted.
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    // Check if edge has been already added.
    if (this.edges[edge.getKey()]) {
      throw new Error("Edge has already been added before");
    } else {
      this.edges[edge.getKey()] = edge;
    }

    // Add edge to the vertices.
    if (this.isDirected) {
      // If graph IS directed then add the edge only to start vertex.
      startVertex.addEdge(edge);
    } else {
      // If graph ISN'T directed then add the edge to both vertices.
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge) {
    // Delete edge from the list of edges.
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error("Edge not found in graph");
    }

    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  // toString() {
  //   return Object.keys(this.vertices).toString();
  // }
}

const network = new Graph();

// Create users.
const bill = new GraphVertex("Bill");
const mary = new GraphVertex("Mary");
const john = new GraphVertex("John");
const jane = new GraphVertex("Jane");

// Register users in our network.
network.addVertex(bill).addVertex(mary).addVertex(john).addVertex(jane);
// network.getVertexByKey("Bill"); // -> bill
// network.getVertexByKey("Mary"); // -> mary

network
  .addEdge(new GraphEdge(bill, mary))
  .addEdge(new GraphEdge(john, jane))
  .addEdge(new GraphEdge(jane, mary));

// Check if specific users are friends.
network.findEdge(bill, mary); // -> GraphEdge entity
network.findEdge(john, jane); // -> GraphEdge entity
network.findEdge(bill, john); // -> null

console.log(bill.findEdge(mary));

// console.log(network);
