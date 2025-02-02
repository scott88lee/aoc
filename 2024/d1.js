const data = require('fs').readFileSync('d1.txt', 'utf8');

const list1 = [];
const list2 = [];

data.split('\n')
  .map(
    line => {
      const pair = line.split('   ');
      list1.push(pair[0]);
      list2.push(pair[1]);
    }
  );

const quickSort = (arr, left, right) => {
  if (left < right) {
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
};

const partition = (arr, left, right) => {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, right);
  return i + 1;
}

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

quickSort(list1, 0, list1.length - 1);
quickSort(list2, 0, list2.length - 1);

console.log(list1);
console.log(list2);

let similarityScore = 0;

for (let i = 0; i < list1.length; i++) {
  if (list2.includes(list1[i])) {
    // find number of occurences of list1[i] in list2
    const count = list2.filter(x => x === list1[i]).length;
    similarityScore += count * list1[i];
  }
}
console.log(similarityScore);

