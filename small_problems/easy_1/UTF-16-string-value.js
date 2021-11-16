// Write a function that determines and returns the UTF-16 
// string value of a string passed in as an argument.

function utf16Value (str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count += str[i].charCodeAt();
  }

  return count;
}

console.log(utf16Value('Four score'));
console.log(utf16Value('Launch School'));
console.log(utf16Value('a'));
console.log(utf16Value(''));

// The next three lines demonstrate that the code
// works with non-ASCII characters from the UTF-16
// character set.
const OMEGA = "\u03A9";
console.log(utf16Value(OMEGA));
console.log(utf16Value(OMEGA + OMEGA + OMEGA));