// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal
const readline = require('readline-sync');
const messages = require('./calculator_messages.json');
const userLanugage = 'en';

function prompt(key) {
  let message = messages[userLanugage][key];
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return Number.isNaN(Number(number)) || number.trimStart() === '';
}

let useCalculator;

prompt('welcome');

do {
  prompt('firstNumber');
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt('invalidNumber');
    number1 = readline.question();
  }

  prompt('secondNumber');
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt('invalidNumber');
    number2 = readline.question();
  }

  prompt('selectOperation');
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('listOptions');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1': // '1' represents addition
      output = Number(number1) + Number(number2);
      break;
    case '2': // '2' represents subtraction
      output = Number(number1) - Number(number2);
      break;
    case '3': // '3' represents multiplication
      output = Number(number1) * Number(number2);
      break;
    case '4': // '4' represents division
      output = Number(number1) / Number(number2);
      break;
  }

  console.log(`=> ${messages[userLanugage].result} ${output}`); // couldn't use prompt because it uses the variable 'output'

  prompt('continue');
  useCalculator = readline.question();

} while (useCalculator && useCalculator[0].toLowerCase() === 'y');
