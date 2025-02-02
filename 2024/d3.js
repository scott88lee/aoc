const data = require("fs").readFileSync('d3.txt', 'utf8');

let sum = 0;
let status = "do"
for (let i = 0; i < data.length; i++) {
  updatePermissions(data, i);

  if (foundInstructions(data, i)) {
    console.log(`Found instructions at index: ${i}`);
    printBlock(data, i);

    const found = findCloseBracket(data, i + 4);
    if (found) {
      console.log(`Bracket position: ${found} char away`);      
      const validInputs = validateInputs(data, i + 4, found);
      if (validInputs) {
        console.log(`Valid inputs`);
        if (status === "do") {
          cumulate(validInputs);  
        }
        i += 4 + found;
      }
    }
  }
}
console.log(`Sum: ${sum}`);

function cumulate(arr) {
  sum += arr[0] * arr[1];
}

function validateInputs(data, start, end) {
  const inputs = data.slice(start, start + end).split(",");
  if (inputs.length === 2) {
    return inputs;
  }
}


function findCloseBracket(data, pointer) {
  let start = pointer;
  for (let i = pointer; i < pointer + 8; i++) {
    if (data[i] === ")") {
      return i - start;
    }
  }
}

function updatePermissions(data, pointer) {
  if (data.startsWith("do()", pointer)) {
    status = "do";
  }
  if (data.startsWith("don't()", pointer)) {
    status = "don't";
  }
}

function foundInstructions(data, pointer) {
  if (data.startsWith("mul(", pointer)) {
    return pointer + 4;
  }
}

function printBlock(data, i) {
  console.log(`${i} - ${data[i]}${data[i + 1]}${data[i + 2]}${data[i + 3]}${data[i + 4]}${data[i + 5]}${data[i + 6]}${data[i + 7]}${data[i + 8]}${data[i + 9]}${data[i + 10]}${data[i + 11]}`);
}