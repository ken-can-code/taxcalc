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
  // We'll assume grossIncome is $20000
  
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
  console.log('grossIncome', grossIncome);
// let bracket;
//   // ${enteredIncome} * stateRules.${enteredState}.${bracket}
//   if (grossIncome > stateRules.state.bracket1) {
//     if (grossIncome > stateRules.state.bracket2) {
//       if (grossIncome > stateRules.state.bracket3) {
//         bracket = 'bracket4';
//       } else {
//         bracket = 'bracket3';
//       }
//     } else {
//       bracket = 'bracket2';
//     }
//   } else {
//     bracket = 'bracket1';
//   }
  // const displayAmount = grossIncome * stateRules.state.bracket
  // const displaySection = document.getElementById('displayTaxAmount');
  // displaySection.textContent = displayAmount;
  resultsDisplay();
}

function resultsDisplay() {
  results.innerHTML = (
  `<p>State: ${state}</p>
   <p>Marital Status: ${userSelectedMaritalStatus}</p>
   <p>Dependents: ${numberOfDependents}</p>
   <p>Gross Income: ${taxCalculation(grossIncome)}</p><br>
   
   <p>Based on the info you've given us, your state income taxes will be: $50000</p>
  `)
}
submitButton.addEventListener('click', handleSubmit);

// *grabbed income input*  * stateRules.multiplier
