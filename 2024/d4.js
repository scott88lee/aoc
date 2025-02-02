const grid = require('fs').readFileSync('data/d4.txt', 'utf8').split('\n').map(row => row.split(''));

let count = 0;
let count2 = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (col < grid[row].length - 2 && row < grid.length - 2) {
      checkPattern(row, col);
    }
    
    if (col < grid[row].length - 3) {
      checkHorizontal(row, col);

      if (row < grid.length - 3) {
        checkSlash(row, col);
        checkBackSlash(row, col);
      }
    }

    if (row < grid.length - 3) {
      if (checkVertical(row, col)) {
        count++;
      }
    }
  }
}

console.log(count);
console.log(count2);

function checkPattern(row, col) {
  if (grid[row+1][col+1] === "A" ) {
    // m m Pattern 1 
    // s s
    if (
        grid[row][col] === "M" &&
        grid[row][col+2] === "M" &&
        grid[row+2][col] === "S" &&
        grid[row+2][col+2] === "S"
    ) {
      count2++;
    }

    // s s Pattern 2
    // m m

    if (
        grid[row][col] === "S" &&
        grid[row][col+2] === "S" &&
        grid[row+2][col] === "M" &&
        grid[row+2][col+2] === "M"
    ) {
      count2++;
    }

    // m s Pattern 3
    // m s
    if (
        grid[row][col] === "M" &&
        grid[row][col+2] === "S" &&
        grid[row+2][col] === "M" &&
        grid[row+2][col+2] === "S"
    ) {
      count2++;
    }

    // Pattern 4
    if (
        grid[row][col] === "S" &&
        grid[row][col+2] === "M" &&
        grid[row+2][col] === "S" &&
        grid[row+2][col+2] === "M"
    ) {
      count2++;
    }
  }
}

function checkHorizontal(row, col) {
  if (
    grid[row][col] === "X" &&
    grid[row][col + 1] === "M" &&
    grid[row][col + 2] === "A" &&
    grid[row][col + 3] === "S"  
  ) {
    count++;
  }
  if (
    grid[row][col] === "S" &&
    grid[row][col + 1] === "A" &&
    grid[row][col + 2] === "M" &&
    grid[row][col + 3] === "X"  
  ) {
    count++;
  }
}

function checkVertical(x, y) {
  if (
    grid[x][y] === "X" &&
    grid[x + 1][y] === "M" &&
    grid[x + 2][y] === "A" &&
    grid[x + 3][y] === "S"  
  ) {
    return true;
  }

  if (
    grid[x][y] === "S" &&
    grid[x + 1][y] === "A" &&
    grid[x + 2][y] === "M" &&
    grid[x + 3][y] === "X"  
  ) {
    return true;
  }
}

function checkSlash(x, y) {
  // check forward
  if (
    grid[x][y] === "X" &&
    grid[x + 1][y + 1] === "M" &&
    grid[x + 2][y + 2] === "A" &&
    grid[x + 3][y + 3] === "S"  
  ) {
    count++;
  }

  if (
    grid[x][y] === "S" &&
    grid[x + 1][y + 1] === "A" &&
    grid[x + 2][y + 2] === "M" &&
    grid[x + 3][y + 3] === "X"  
  ) {
    count++;
  }
}

function checkBackSlash(x, y) {
  // check forward
  if (
    grid[x][y + 3] === "X" &&
    grid[x + 1][y + 2] === "M" &&
    grid[x + 2][y + 1] === "A" &&
    grid[x + 3][y] === "S"  
  ) {
    count++;
  }

  if (
    grid[x][y + 3] === "S" &&
    grid[x + 1][y + 2] === "A" &&
    grid[x + 2][y + 1] === "M" &&
    grid[x + 3][y] === "X"  
  ) {
    count++;
  }
}