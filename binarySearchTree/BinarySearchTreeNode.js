class BinarySearchTreeNode {
  constructor(value = null, data = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.data = data;
    this.value = value;
  }

  setNull() {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.data = null;
    this.value = null;
  }

  /**
   *  Set properties of the root node to properties of the specified node
   * @param {*} node
   */
  setRoot(node) {
    this.left = node.left;
    this.right = node.right;
    this.parent = null;
    this.data = node.data;
    this.value = node.value;
  }

  isLeaf(node) {
    return node.left === null && node.right === null;
  }

  hasSingleChild(node) {
    return (
      (node.left === null && node.right) || (node.left && node.right === null)
    );
  }

  hasBothChild(node) {
    return node.left && node.right;
  }

  find(value) {
    if (this.value === null) {
      return null;
    }

    let curr = this;

    while (curr) {
      if (curr.value === value) {
        return curr;
      } else if (value < curr.value) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    return null;
  }

  insert(value, data) {
    if (this.value === null) {
      this.value = value;
      this.data = data;
      return this;
    }

    let curr = this;
    let prev;

    while (curr) {
      if (value == curr.value) {
        // update node
        curr.data = data;
        return;
      } else if (value < curr.value) {
        prev = curr;
        curr = curr.left;
      } else {
        prev = curr;
        curr = curr.right;
      }
    }

    const node = new BinarySearchTreeNode(value, data);
    node.parent = prev;

    if (value < prev.value) {
      prev.left = node;
    } else {
      prev.right = node;
    }

    return this;
  }

  findMin(root = null) {
    if (this.value === null) {
      return null;
    }

    let curr = root === null ? this : root;
    let prev;

    while (curr) {
      prev = curr;
      curr = curr.left;
    }

    return prev;
  }

  findMax(root = null) {
    if (this.value == null) {
      return null;
    }

    let curr = root === null ? this : root;
    let prev;

    while (curr) {
      prev = curr;
      curr = curr.right;
    }

    return prev;
  }

  findSuccessor(value) {
    if (this.value === null) {
      return null;
    }

    const node = this.find(value);

    if (node == null) {
      return null;
    }

    if (node.right) {
      return this.findMin(node.right);
    }

    let parent = node.parent;

    while (parent) {
      if (parent.left && parent.value > node.value) {
        return parent;
      }
      parent = parent.parent;
    }

    return null;
  }

  findPredecessor(value) {
    if (this.value === null) {
      return null;
    }

    const node = this.find(value);

    if (node == null) {
      return null;
    }

    if (node.left) {
      return this.findMax(node.left);
    }

    let parent = node.parent;

    while (parent) {
      if (parent.right && parent.value < node.value) {
        return parent;
      }
      parent = parent.parent;
    }

    return null;
  }

  delete(value) {
    if (!this.value == null) {
      return null;
    }

    const node = this.find(value);

    // If node to be deleted is a leaf node
    if (this.isLeaf(node)) {
      const parent = node.parent;

      //   If node is the root
      if (parent === null) {
        this.setNull();
        return this;
      }

      if (value < parent.value) {
        parent.left = null;
      } else {
        parent.right = null;
      }

      return this;
    }

    // If node to be deleted has a single child
    if (this.hasSingleChild(node)) {
      let child;
      if (node.left === null && node.right) {
        child = node.right;
      } else {
        child = node.left;
      }

      const parent = node.parent;

      if (parent === null) {
        this.setRoot(child);
        return this;
      }

      if (value < parent.value) {
        parent.left = child;
      } else {
        parent.right = child;
      }

      return this;
    }

    // If node to be deleted has both the children
    if (this.hasBothChild(node)) {
      const successor = this.findSuccessor(value);
      node.value = successor.value;
      node.data = successor.data;

      const parent = successor.parent;

      if (successor.value < parent.value) {
        parent.left = successor.right;
      } else {
        parent.right = successor.right;
      }
      return this;
    }
  }

  dfs(node = this, type) {
    if (node.value === null) {
      return;
    }

    if (type === "preorder") {
      console.log(node.value);
    }

    if (node.left) {
      this.dfs(node.left, type);
    }

    if (type === "inorder") {
      console.log(node.value);
    }

    if (node.right) {
      this.dfs(node.right, type);
    }

    if (type === "postorder") {
      console.log(node.value);
    }
  }

  inorder() {
    this.dfs(this, "inorder");
  }

  postorder() {
    this.dfs(this, "postorder");
  }

  preorder() {
    this.dfs(this, "preorder");
  }

  toString() {
    return `${this.value}`;
  }
}

module.exports = BinarySearchTreeNode;
