import Queue from "./queue";

beforeEach(() => {
  let a = new Queue();
});

test("Test isEmpty", () => {
  let a = new Queue();
  expect(a.isEmpty()).toBeTruthy();
  a.enqueue(42);
  expect(a.isEmpty()).toBeFalsy();
});

test("Peek without Enqueue", () => {
  let a = new Queue();
  expect(a.peek()).toBeUndefined();
});

test("Enqueue and Peek", () => {
  let a = new Queue();
  a.enqueue(42);
  expect(a.peek()).toBe(42);
});

test("Dequeue without Enqueue", () => {
  let a = new Queue();
  expect(a.dequeue()).toBeUndefined();
});

test("Enqueue 5 elements then Dequeue 4 elements and Peek", () => {
  let a = new Queue();
  for (let i = 0; i < 5; i++) {
    a.enqueue(i);
  }
  for (let i = 0; i < 4; i++) {
    expect(a.dequeue()).toBe(i);
  }
  expect(a.peek()).toBe(4);
});
