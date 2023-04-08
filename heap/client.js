const MinHeap = require("./MinHeap");

const h1 = new MinHeap();
h1.add(40);
h1.add(30);
h1.add(20);
h1.add(10);
h1.peek();
console.log(h1.poll());
console.log(h1.poll());
console.log(h1.poll());
console.log(h1.poll());
console.log(h1);
