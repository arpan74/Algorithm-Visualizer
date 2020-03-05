import isValid from "./isValid";

let grid = [];

beforeEach(() => {
  let row;
  for (let i = 0; i < 100; i++) {
    row = [];
    for (let j = 0; j < 100; j++) {
      row.push("data");
    }
    grid.push(row);
  }
});

test("Below 0", () => {
  expect(isValid(-2, 0, grid)).toBeFalsy();
  expect(isValid(-0, -30, grid)).toBeFalsy();
  expect(isValid(-2, -23, grid)).toBeFalsy();
});

test("At 0", () => {
  expect(isValid(0, 0, grid)).toBeTruthy();
});

test("At max length", () => {
  expect(isValid(99, 99, grid)).toBeTruthy();
});
