import PriorityQueue from "./priorityqueue";

let queue;

beforeEach(() => {
  queue = new PriorityQueue();
});

test("Test isEmpty", () => {
  expect(queue.isEmpty()).toBeTruthy();
  queue.enqueue(5, 4);
  expect(queue.isEmpty()).toBeFalsy();
});

test("Test Enqueue and Dequeue", () => {
  queue.enqueue(5, 4);
  queue.enqueue(10, 1);
  expect(queue.dequeue()).toEqual({ element: 10, priority: 1 });
});
