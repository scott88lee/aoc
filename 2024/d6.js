function readData(test) {
  const path = require('path')
  const fileName = test ? path.join(__dirname, '/data/d6test.txt') : path.join(__dirname, '/data/d6.txt')
  return require('fs').readFileSync(fileName, 'utf-8')
}

function createGrid(data) {
  return data
    .split('\n')
    .map(row => row.split(''))
}

function getStartingPosition(grid) {
  for (let row of grid) {
    for (let cell of row) {
      if (cell === '^') {
        return [grid.indexOf(row), row.indexOf(cell)]
      }
    }
  }
}

function scan(grid, position, direction) {
  let [row, col] = position
  //scan for ".", "#", or end of grid
  
}

function move(grid, position, direction) {
  const [row, col] = position
  switch (direction) {
    case '^':
      return [row - 1, col]
    case 'v':
      return [row + 1, col]
    case '<':
      return [row, col - 1]
    case '>':
      return [row, col + 1]
  }
}


const data = readData(true)
console.log(createGrid(data))
console.log(getStartingPosition(createGrid(data)))

module.exports = {
  createGrid,
  readData,
  getStartingPosition,
  move
}
