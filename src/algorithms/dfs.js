export default function dfs(grid, startNode, endNode) {
  function getNeighbors(i, j) {
    function isValid(r, c) {
      if (r < 0 || c < 0) {
        return false;
      }
      if (r < grid.length && c < grid[r].length) {
        return true;
      }
      return false;
    }

    range = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ];
    neighbors = [];
    range.forEach((k, index) => {
      i += k[0];
      j += k[1];
      if (isValid(i, j)) {
        neighbors.push([i, j]);
      }
      i -= k[0];
      j -= k[1];
    });
    return neighbors;
  }

  let visited = [];
  let visitedSet = new Set();
  let stack = [];

  // empty array represents shortest path
  startNode.push([]);
  stack.push(startNode);
  let cur, range, neighbors;
  while (stack.length > 0) {
    cur = stack.pop();
    visited.push([cur[0], cur[1]]);
    visitedSet.add([cur[0], cur[1]].toString());
    if (cur[0] === endNode[0] && cur[1] === endNode[1]) {
      break;
    }

    neighbors = getNeighbors(cur[0], cur[1]);
    neighbors.forEach((n, index) => {
      if (!visitedSet.has([n[0], n[1]].toString())) {
        let newPath = cur[2].concat([[n[0], n[1]]]);
        stack.push([n[0], n[1], newPath]);
        visitedSet.add([n[0], n[1]].toString());
      }
    });
  }
  return { visited: visited, path: cur[2] };
}
