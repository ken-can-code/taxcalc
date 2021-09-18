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
  // console.log('userSelectedMaritalStatus', userSelectedMaritalStatus);
  numberOfDependents = document.getElementById('dependents').value;
  // console.log('dependents', numberOfDependents);
  grossIncome = document.getElementById('grossIncome').value;
  // console.log ('gross!', grossIncome);
  state = document.getElementById('states').value;
  // console.log ('state', state);
let bracket;
  // ${enteredIncome} * stateRules.${enteredState}.${bracket}
  if (grossIncome > stateRules.state.bracket1) {
    if (grossIncome > stateRules.state.bracket2) {
      if (grossIncome > stateRules.state.bracket3) {
        bracket = 'bracket4';
      } else {
        bracket = 'bracket3';
      }
    } else {
      bracket = 'bracket2';
    }
  } else {
    bracket = 'bracket1';
  }
  const displayAmount = grossIncome * stateRules.state.bracket
  const displaySection = document.getElementById('displayTaxAmount');
  displaySection.textContent = displayAmount;
  resultsDisplay();
}

function resultsDisplay() {
  results.innerHTML = (
  `<p>State: ${state}</p>
   <p>Marital Status: ${userSelectedMaritalStatus}</p>
   <p>Dependents: ${mooch}</p>
   <p>Gross Income: ${grossIncome}</p><br>
   
   <p>Based on the info you've given us, your state income taxes will be: $50000</p>
  `)
}
submitButton.addEventListener('click', handleSubmit);

// *grabbed income input*  * stateRules.multiplier
