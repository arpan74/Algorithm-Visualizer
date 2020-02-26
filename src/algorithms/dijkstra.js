import PriorityQueue from "./data structures/priorityqueue";

export default function dijkstra(grid, startNode, endNode) {
  function isValid(r, c) {
    if (r < 0 || c < 0) {
      return false;
    }
    if (r < grid.length && c < grid[r].length) {
      return true;
    }
    return false;
  }
  let dist = [],
    visited = [],
    ordering = [];
  for (let r = 0; r < grid.length; r++) {
    let row = [],
      orderingRow = [];
    for (let c = 0; c < grid[r].length; c++) {
      row.push(Number.MAX_VALUE);
      orderingRow.push(null);
    }
    dist.push(row);
    ordering.push(orderingRow);
  }

  let pqueue = new PriorityQueue();
  pqueue.enqueue([startNode[0], startNode[1], startNode], 0);
  let cur;
  let neighbors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  while (!pqueue.isEmpty()) {
    cur = pqueue.dequeue();
    let r = cur.element[0],
      c = cur.element[1],
      origin = cur.element[2],
      d = cur.priority;
    visited.push([r, c]);
    if (dist[r][c] <= d) {
      continue;
    }
    ordering[r][c] = origin;
    dist[r][c] = d;

    if (r === endNode[0] && c === endNode[1]) {
      break;
    }

    for (let n of neighbors) {
      let rr = r + n[0];
      let cc = c + n[1];
      if (!isValid(rr, cc)) {
        continue;
      }
      let dd = d + grid[rr][cc].weight;
      if (dd < dist[rr][cc]) {
        pqueue.enqueue([rr, cc, [r, c]], dd);
      }
    }
  }

  let path = [endNode];

  let r = endNode[0],
    c = endNode[1];

  while (r !== startNode[0] || c !== startNode[1]) {
    path.push(ordering[r][c]);
    [r, c] = ordering[r][c];
  }
  path.reverse();
  return { visited: visited, path: path };
}
