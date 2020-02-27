function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function isValid(r, c, grid) {
  if (r < 0 || c < 0) {
    return false;
  }
  if (r < grid.length && c < grid[r].length) {
    return true;
  }
  return false;
}

export default function recursiveBacktracker(grid, startNode, endNode) {
  // Fill Grid with walls
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      grid[r][c].isWall = true;
    }
  }

  let visited = new Set();
  let stack = [startNode];
  let neighbors = [
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2]
  ];
  while (stack.length > 0) {
    let cur = stack.pop();
    let r = cur[0],
      c = cur[1];
    console.log(r, c);
    visited.add(r + "." + c);
    grid[r][c].isWall = false;
    let neighborsOfCur = [];
    for (let n of neighbors) {
      let rr = r + n[0];
      let cc = c + n[1];
      if (isValid(rr, cc, grid) && !visited.has(rr + "." + cc)) {
        neighborsOfCur.push([n[0] / 2, n[1] / 2, rr, cc]);
      }
    }
    shuffle(neighborsOfCur);
    for (let j of neighborsOfCur) {
      let n = neighborsOfCur[Math.floor(Math.random() * neighborsOfCur.length)];
      if (n !== undefined) {
        grid[r + n[0]][c + n[1]].isWall = false;
        stack.push([n[2], n[3]]);
      }
    }
  }
  return grid;
}
