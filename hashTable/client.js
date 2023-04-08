const HashTable = require("./HashTable");

const h1 = new HashTable();
h1.set("one", "some");
h1.set("two", "three##");
h1.set("three", "three@@");
console.log(h1.get("one"));
console.log(h1.get("two"));
console.log(h1.delete("one"));
console.log(h1.delete("oness"));
// console.log(h1);
