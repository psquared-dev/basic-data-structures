const Queue = require("./Queue");

const q1 = new Queue();

q1.enqueue("one");
q1.enqueue("two");
q1.enqueue("three");
console.log(q1.peek());
console.log(q1.isEmpty());
q1.dequeue();
q1.dequeue();
q1.dequeue();

console.log(q1.toString());
