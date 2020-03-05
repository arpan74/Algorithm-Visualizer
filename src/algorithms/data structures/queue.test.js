import Queue from "./queue";
let a;

beforeEach(() => {
  a = new Queue();
});

test("Test isEmpty", () => {
  expect(a.isEmpty()).toBeTruthy();
  a.enqueue(42);
  expect(a.isEmpty()).toBeFalsy();
});

test("Peek without Enqueue", () => {
  expect(a.peek()).toBeUndefined();
});

test("Enqueue and Peek", () => {
  let a = new Queue();
  a.enqueue(42);
  expect(a.peek()).toBe(42);
});

test("Dequeue without Enqueue", () => {
  expect(a.dequeue()).toBeUndefined();
});

test("Enqueue 5 elements then Dequeue 4 elements and Peek", () => {
  for (let i = 0; i < 5; i++) {
    a.enqueue(i);
  }
  for (let i = 0; i < 4; i++) {
    expect(a.dequeue()).toBe(i);
  }
  expect(a.peek()).toBe(4);
});
