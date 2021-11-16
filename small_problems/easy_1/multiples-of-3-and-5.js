// Write a function that computes the sum of all numbers between 1 and some other number, inclusive, that are multiples of 3 or 5.

let multisum = (num) => {
  let count = 0;
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      count += i;
    }
  }

  return count;
}

console.log(multisum(3));
console.log(multisum(5));
console.log(multisum(10));
console.log(multisum(1000));