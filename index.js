let stateRules = { // one option for dynamically calculating tax
  Califoria: '1.2x',
  Texas: '2.5x',
}
const results = document.getElementById('results');
const maritalStatus = document.getElementsByName('maritalStatus');
const submitButton = document.getElementById('formSubmit');

let userSelectedMaritalStatus;
let mooch;
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
  mooch = document.getElementById('mooch').value;
  // console.log('mooch', mooch);
  grossIncome = document.getElementById('grossIncome').value;
  // console.log ('gross!', grossIncome);
  state = document.getElementById('states').value;
  // console.log ('state', state);

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
