const BinarySearchTreeNode = require("./BinarySearchTreeNode");

const b1 = new BinarySearchTreeNode();
b1.insert(9, { id: 1, name: "99" });
b1.insert(5, { id: 1, name: "55" });
b1.insert(20, { id: 1, name: "20" });
b1.insert(6, { id: 1, name: "66" });

b1.insert(90, { id: 2, name: "66" });
b1.insert(18, { id: 2, name: "66" });
b1.insert(8, { id: 4, name: "66" });
b1.insert(2, { id: 4, name: "66" });

// console.log(b1.find(6).parent.parent.value);
// console.log(b1.findMin().value);
// console.log(b1.findMax().value);
// console.log(b1.findMax().value);

// console.log(b1.findSuccessor(20).value);
// console.log(b1.findSuccessor(5).value);
// console.log(b1.findSuccessor(9).value);
// console.log(b1.findSuccessor(2).value);

// console.log(b1.findPredecessor(9).value);
// console.log(b1.findPredecessor(20).value);
// console.log(b1.findPredecessor(8).value);
// console.log(b1.findPredecessor(90).value);
// console.log(b1.findPredecessor(18).value);

// console.log(b1.delete(9));

b1.inorder();
console.log();
b1.postorder();
console.log();
b1.preorder();
