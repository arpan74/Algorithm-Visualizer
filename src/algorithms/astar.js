import PriorityQueue from "./data structures/priorityqueue";
import isValid from "./isValid";

export default function astar(grid, startNode, endNode) {
  function calculateHeuristic(r, c) {
    let row = (endNode[0] - r) ** 2;
    let col = (endNode[1] - c) ** 2;
    return (row + col) ** (1 / 2);
  }

  let dist = [], // represents distances from start to node
    visited = [], // list of all the nodes A* visits
    ordering = []; // final ordering

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
  let d = 0;
  let pqueue = new PriorityQueue();
  let priority = calculateHeuristic(startNode[0], startNode[1]) + d;
  pqueue.enqueue([startNode[0], startNode[1], startNode, d], priority);
  let cur,
    neighbors = [
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
      d = cur.element[3];

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
      if (!isValid(rr, cc, grid)) {
        continue;
      }

      let dd = d + grid[rr][cc].weight;
      if (dd < dist[rr][cc]) {
        priority = dd + calculateHeuristic(rr, cc);
        pqueue.enqueue([rr, cc, [r, c], dd], priority);
      }
    }
  }

  let path = [endNode];

  let r = endNode[0],
    c = endNode[1];
  while (r !== startNode[0] || c !== startNode[1]) {
    path.push(ordering[r][c]);
    if (ordering[r][c] !== null) {
      [r, c] = ordering[r][c];
    } else {
      break;
    }
  }
  path.reverse();
  return { visited, path };
}
