let stateRules = {
  California: {
    Married: {
      taxBracket: [],
      taxRates: [],
    },
    Single: {
      taxBracket: [],
      taxRates: [],
    },
  },
  
  Texas: {
    SanAntonio: 'is it a county?',
  },
};

function taxCalculation(grossIncome) {
  let taxSum = 0;
  
  function calculateTaxForBracket(ceilingOfBracket, floorOfBracket, taxRate) {
    const maxAmount = ceilingOfBracket - floorOfBracket;
    taxSum += (grossIncome > ceilingOfBracket ? maxAmount : grossIncome - floorOfBracket) * taxRate;
  }

  if (grossIncome >= 0) {
    calculateTaxForBracket(8808.99, 0, .01);
  }

  if (grossIncome >= 8809) {
    calculateTaxForBracket(20882.99, 8809, .02);
  }

  if (grossIncome >= 20883) {
    calculateTaxForBracket(32960, 20883, .04);
  }

  return taxSum.toFixed(2);
}

const results = document.getElementById('results');
const maritalStatus = document.getElementsByName('maritalStatus');
const submitButton = document.getElementById('formSubmit');

let userSelectedMaritalStatus;
let numberOfDependents;
let grossIncome;
let state;
function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < maritalStatus.length; i += 1) {
    if (maritalStatus[i].checked === true) {
      userSelectedMaritalStatus = maritalStatus[i].value;
      break;
    }
  }

  numberOfDependents = document.getElementById('dependents').value;
  grossIncome = document.getElementById('grossIncome').value;
  state = document.getElementById('states').value;
  resultsDisplay();
}

function resultsDisplay() {
  results.innerHTML = (
  `<p>Based on the info you've given us, your state
  income taxes will be: $${taxCalculation(grossIncome)}</p><br>
   <p>Gross Income: ${grossIncome}</p>
   <p>State: ${state}</p>
   <p>Marital Status: ${userSelectedMaritalStatus}</p>
   <p>Dependents: ${numberOfDependents}</p>`
  )
}

submitButton.addEventListener('click', handleSubmit);
