const readline = require('readline-sync');
const messages = require('./messages.json');
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

prompt(messages.welcome);
do {
  console.clear();
  let loanAmount = getInput('loanAmount');
  let apr = getInput('apr') / 100;
  let loanDurationYears = getInput('loanDurationYears');
  let loanDurationMonths = getInput('loanDurationMonths');
  let totalLoanDuration = loanDurationYears + (loanDurationMonths / 12);
  let monthlyInterestRate = apr / 12;
  let totalDurationMonths =  totalLoanDuration * 12;
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
} while (continueCalculation && continueCalculation !== 'n');

prompt(messages.endMessage);