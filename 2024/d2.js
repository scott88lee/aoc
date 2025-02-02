const list = require('fs')
  .readFileSync('d2.txt', 'utf8')
  .split('\n')
  .map(x => x.split(' ')
    .map(x => parseInt(x)));

const checkSafety = (arr) => {
  const defaultDirection = getDirection(arr[0], arr[arr.length - 1]);

  for (let i = 0; i < arr.length - 1; i++) {
    const num1 = arr[i]; const num2 = arr[i + 1];
    
    const direction = getDirection(num1, num2);
    if (direction !== defaultDirection) {
      // console.log("Change direction");
      return i
    }

    const gap = Math.abs(num1 - num2);
    if (gap > 3 || gap === 0) {
      // console.log("Wrong gap");
      return i
    }
  }
  return "safe";
}

const getDirection = (num1, num2) => {
  return num1 - num2 > 0 ? "down" : "up";
}

const removeElement = (arr, index) => {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

let safeCount = 0;
for (const line of list) {
  const faultPosition = checkSafety(line);
  
  console.log("Run1");
  if (faultPosition === "safe") {
    // console.log("List is safe");
    safeCount++;
    continue;
  }
  
  const remove1 = removeElement(line, faultPosition);
  if (checkSafety(remove1) === "safe") {
    // console.log("List is safe");
    safeCount++;
    continue;
  }
  
  const remove2 = removeElement(line, faultPosition + 1);
  if (checkSafety(remove2) === "safe") {
    // console.log("List is safe");
    safeCount++;
    continue;
  }
}

console.log(safeCount);
