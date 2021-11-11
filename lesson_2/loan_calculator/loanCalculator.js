const readline = require('readline-sync');
const messages = require('./messages.json');
const MONTHS_IN_YEAR = 12;
const PERCENTAGE_BASE = 100;
let continueCalculation = true;

let prompt = text => {
  console.log('=> ' + text);
};

let invalidNumber = number => {
  return Number.isNaN(Number(number)) || number.trimStart() === '' || number < 0;
};

let getInput = (messageQuestion, messageError = 'invalidNumber') => {
  let userInput;
  prompt(messages[messageQuestion]);
  userInput = readline.question().replaceAll(',', '');
  while (invalidNumber(userInput)) {
    prompt(messages[messageError]);
    userInput = readline.question().replaceAll(',', '');
  }

  return Number(userInput);
};

console.clear();
prompt(messages.welcome);
do {
  let loanAmount = getInput('loanAmount');
  let apr = getInput('apr') / PERCENTAGE_BASE;
  let loanDurationYears = getInput('loanDurationYears');
  let loanDurationMonths = getInput('loanDurationMonths');
  let totalLoanDuration = loanDurationYears +
                      (loanDurationMonths / MONTHS_IN_YEAR);
  let monthlyInterestRate = apr / MONTHS_IN_YEAR;
  let totalDurationMonths =  totalLoanDuration * MONTHS_IN_YEAR;
  let monthlyPayments;
  if (apr === 0) {
    monthlyPayments = loanAmount / totalDurationMonths;
  } else {
    monthlyPayments = loanAmount *
              (monthlyInterestRate /
              (1 - Math.pow((1 + monthlyInterestRate),(-totalDurationMonths))));
  }
  prompt(`Your monthly payment is: $${monthlyPayments.toFixed(2)}`);
  prompt(messages.continueCalculation);
  continueCalculation = readline.question().toLowerCase()[0];
  if (continueCalculation && continueCalculation !== 'n') {
    console.clear();
  }
} while (continueCalculation && continueCalculation !== 'n');

prompt(messages.endMessage);