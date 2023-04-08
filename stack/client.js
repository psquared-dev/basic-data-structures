const Stack = require("./Stack");

const s1 = new Stack();
console.log(s1.isEmpty());
s1.push(100);
s1.push(200);
s1.push(300);
// console.log(s1.isEmpty());
// console.log(s1.pop());
// console.log(s1.pop());
// console.log(s1.pop());
console.log(s1.peek());
console.log(s1.toArray());
console.log(s1.toString());
