const PriorityQueue = require("./PriorityQueue");

const q = new PriorityQueue();

const notSortedCities = [
  { name: "New York", population: 8.6 },
  { name: "Chicago", population: 2.7 },
  { name: "San Francisco", population: 0.84 },
  { name: "Houston", population: 2 },
];

notSortedCities.forEach((city) => q.add(city, city.population));

console.log(q.peek());
console.log(q.poll());

console.log(q);
