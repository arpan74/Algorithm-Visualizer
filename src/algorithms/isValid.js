export default function isValid(r, c, grid) {
  if (r < 0 || c < 0) {
    return false;
  }
  if (r < grid.length && c < grid[r].length && !grid[r][c].isWall) {
    return true;
  }
  return false;
}
