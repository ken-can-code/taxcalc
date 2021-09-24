let stateRules = {
  California: {
    Married: {
      taxBrackets: [0,
        17618,
        41766,
        65920,
        91506,
        115648,
        590746,
        708890,
        1000000,
        1181484,
        Infinity],
      taxRates: [.01,
        .02,
        .04,
        .06,
        .08,
        .093,
        .103,
        .113,
        .123,
        .133],
    },
    Single: {
      taxBrackets: [0,
        8809,
        20883,
        32960,
        45753,
        57824,
        295373,
        354445,
        590742,
        1000000,
        Infinity],
      taxRates: [.01,
        .02,
        .04,
        .06,
        .08,
        .093,
        .103,
        .113,
        .123,
        .133],
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
  const stateAndMaritalStatus = stateRules[state][userSelectedMaritalStatus];
  for (let i = 0; grossIncome > stateAndMaritalStatus.taxBrackets[i]; i += 1) {
    calculateTaxForBracket(stateAndMaritalStatus.taxBrackets[i + 1],
      stateAndMaritalStatus.taxBrackets[i],
      stateAndMaritalStatus.taxRates[i]);
      // console.log('SAMS', stateAndMaritalStatus.taxBrackets[i + 1], stateAndMaritalStatus.taxBrackets[i]);
      // console.log('taxRates', stateAndMaritalStatus.taxRates[i]);
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
