let stateRules = {
  California: {
    '10000': .05,
    '30000': .07,
    SanFrancisco: 'placeholder',
    SanMateo: 'placeholderier',
  },
  
  Texas: {
    SanAntonio: 'is it a county?',
  },
};

function taxCalculation(grossIncome) {
  const taxBrackets = [0, 8809, 20883, 32960, 45753, 57824, 295373, 354445, 590742, 1000000, Infinity];
  const taxRates = [.01, .02, .04, .06, .08, .093, .103, .113, .123, .133];
  let taxSum = 0;
  
  function calculateTaxForBracket(ceilingOfBracket, floorOfBracket, taxRate) {
    const maxAmount = ceilingOfBracket - floorOfBracket;
    taxSum += (grossIncome > ceilingOfBracket ? maxAmount : grossIncome - floorOfBracket) * taxRate;
  }

  for (let i = 0; i < taxRates.length; i += 1) {
    if (grossIncome >= taxBrackets[i]) {
      calculateTaxForBracket(taxBrackets[i + 1], taxBrackets[i], taxRates[i]);
    }
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
  `<p>State: ${state}</p>
   <p>Marital Status: ${userSelectedMaritalStatus}</p>
   <p>Dependents: ${numberOfDependents}</p>
   <p>Gross Income: ${grossIncome}</p><br>
   
   <p>Based on the info you've given us, your state income taxes will be: ${taxCalculation(grossIncome)}</p>
  `)
}
submitButton.addEventListener('click', handleSubmit);

// *grabbed income input*  * stateRules.multiplier
