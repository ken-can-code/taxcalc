let stateRules;
const states = document.getElementById('states');
const maritalStatus = document.getElementsByName('maritalStatus');
const mooch = document.getElementById('mooch');
const grossIncome = document.getElementById('grossIncome');
const submitButton = document.getElementById('formSubmit');

console.log('maritalStatus', maritalStatus);
console.log('mooch', mooch);

// if (state === texas) {
//   stateRules = texasRules;
// } else if (state === 'California') {
//   blah blah
// }

function handleSubmit(event) {
  event.preventDefault();
  console.log('maritalStatus inside handleSubmit', maritalStatus);
  console.log('event', event.target);
}


submitButton.addEventListener('click', handleSubmit);

// *grabbed income input*  * stateRules.multiplier
let userSelectedMaritalStatus;

for (let i = 0; i < maritalStatus.length; i += 1) {
  if (maritalStatus[i].checked === true) {
    userSelectedMaritalStatus = maritalStatus[i].value;
  }
}