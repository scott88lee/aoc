let data = require('fs').readFileSync('data/d6test.txt', 'utf-8')

const grid = createGrid(data)

function createGrid(data) {
  return data
    .split('\n')
    .map(row => row.split(''))
}

module.exports = {
  createGrid
}
