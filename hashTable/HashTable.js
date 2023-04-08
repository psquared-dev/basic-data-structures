const LinkedList = require("../linkedList/LinkedList");

const defaultBucketSize = 32;

class HashTable {
  constructor(buckets = defaultBucketSize) {
    this.buckets = Array(buckets)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;
    for (const char of key) {
      hashCode += char.charCodeAt();
    }

    return hashCode % this.buckets.length;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const list = this.buckets[hashCode];
    const node = list.find({ callback: (node) => node.key === key });

    if (node) {
      // update the value
      node.value.value = value;
    } else {
      // append value
      list.append({ key, value });
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const list = this.buckets[hashCode];
    const node = list.find({ callback: (node) => node.key === key });

    return node ? node.value.value : undefined;
  }

  delete(key) {
    const hashCode = this.hash(key);
    const list = this.buckets[hashCode];
    const node = list.find({ callback: (node) => node.key === key });

    if (node) {
      list.delete(node.value);
      return true;
    }

    return false;
  }
}

module.exports = HashTable;
