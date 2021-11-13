// ---------- Todo List ----------
// On line 12, coerce number into a Number
//                    instead of letting JS coerce it implictly
// Simplify loan duration months equation
// Simplify loop by moving code into functions
// ----------    End    ----------

const readline = require('readline-sync');
const MESSAGES = require('./messages.json');
const MONTHS_IN_YEAR = 12;
const PERCENTAGE_BASE = 100;
let continueCalculation;

let prompt = text => {
  console.log('=> ' + text);
};

let invalidNumber = number => {
  return Number.isNaN(Number(number)) || number.trimStart() === '' || number < 0;
};

let getInput = (messageQuestion, messageError = 'invalidNumber') => {
  let userInput;
  prompt(MESSAGES[messageQuestion]);
  userInput = readline.question().replaceAll(',', '');
  while (invalidNumber(userInput)) {
    prompt(MESSAGES[messageError]);
    userInput = readline.question().replaceAll(',', '');
  }

  return Number(userInput);
};

console.clear();
prompt(MESSAGES.welcome);
do {
  let loanAmount = getInput('loanAmount');
  while (loanAmount === 0) {
    loanAmount = getInput('loanAmountZero');
  }
  let apr = getInput('apr') / PERCENTAGE_BASE;
  let loanDurationYears = getInput('loanDurationYears');
  let loanDurationMonths = getInput('loanDurationMonths');
  while (loanDurationYears === 0 && loanDurationMonths === 0) {
    prompt(MESSAGES.noDurationZero);
    loanDurationYears = getInput('loanDurationYears');
    loanDurationMonths = getInput('loanDurationMonths');
  }
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
  prompt(MESSAGES.continueCalculation);
  continueCalculation = readline.question().toLowerCase();
  while (continueCalculation !== 'y' && continueCalculation !== 'n' && continueCalculation !== '') {
    prompt(MESSAGES.continueCalculationInvalid);
    continueCalculation = readline.question().toLowerCase();
  }
  if (continueCalculation && continueCalculation !== 'n') {
    console.clear();
  }
} while (continueCalculation && continueCalculation !== 'n');

prompt(MESSAGES.endMessage);