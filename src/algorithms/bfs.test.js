import bfs from "./bfs";

let rows = 50;
let cols = 50;
let grid = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    row.push(0);
  }
  grid.push(row);
}

test("BFS where startNode != endNode", () => {
  let searchResult = [
    [0, 0],
    [1, 0],
    [0, 1],
    [2, 0],
    [1, 1],
    [0, 2],
    [3, 0],
    [2, 1],
    [1, 2],
    [0, 3],
    [4, 0],
    [3, 1],
    [2, 2],
    [1, 3],
    [0, 4],
    [5, 0],
    [4, 1],
    [3, 2],
    [2, 3],
    [1, 4],
    [0, 5]
  ];
  expect(bfs(grid, [0, 0], [0, 5]).visited.toString()).toBe(
    searchResult.toString()
  );
});

test("BFS where startNode == endNode", () => {
  let searchResult = [[1, 1]];
  expect(bfs(grid, [1, 1], [1, 1]).visited.toString()).toBe(
    searchResult.toString()
  );
});
