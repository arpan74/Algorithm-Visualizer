export default class Queue {
  constructor() {
    this.queue = [];
    this.offset = 0;
  }

  getLength() {
    return this.queue.length - this.offset;
  }

  isEmpty() {
    return 0 === this.queue.length;
  }

  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    if (this.queue.length === 0) {
      return undefined;
    }

    let item = this.queue[this.offset];

    if (++this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }

    return item;
  }

  peek() {
    return this.queue.length > 0 ? this.queue[this.offset] : undefined;
  }
}
