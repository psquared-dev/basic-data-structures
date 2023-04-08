const LinkedList = require("./LinkedList");

const list1 = new LinkedList();
list1.append(100);
list1.append(10);
list1.append(10);
list1.append(20);
list1.append(40);

// list1.delete(10);

console.log(list1.toArray());
console.log(list1.deleteTail());
console.log(list1.toArray());

console.log(list1.deleteHead());
console.log(list1.toArray());
console.log(
  list1.find({
    callback: (data) => {
      return data % 2 === 0;
    },
  })
);
console.log(list1.toArray());
console.log(list1.toString());
