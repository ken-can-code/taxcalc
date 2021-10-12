const results = document.getElementById('results');
const maritalStatus = document.getElementsByName('maritalStatus');
const submitButton = document.getElementById('formSubmit');

let userSelectedMaritalStatus;
let state;
let grossIncome;
let taxYear = document.getElementById('taxYear'); // result is an array of blank after 0

(async function getLatestYear() {
  const taxData = await fetch('https://data.ftb.ca.gov/resource/hqma-83bw.json');
  const parsedTaxData = await taxData.json();
  const latestYear = parsedTaxData[0].taxable_year;
  for (let i = 1; i < 40; i += 1) { // change # of loops to support n most recent years
    const option = document.createElement('option');
    taxYear.appendChild(option);
    taxYear.children[i].innerHTML = latestYear - i + 1;
    taxYear.children[i].value = latestYear - i + 1;
  }
})(); // self invoking function

function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < maritalStatus.length; i += 1) {
    if (maritalStatus[i].checked === true) {
      userSelectedMaritalStatus = maritalStatus[i].value;
      if (userSelectedMaritalStatus === 'Married') {
        userSelectedMaritalStatus = 'Married Filing Jointly';
      }
      break;
    }
  }

  grossIncome = document.getElementById('grossIncome').value;
  state = document.getElementById('states').value;
  taxYear = document.getElementById('taxYear').value;
  taxCalculation(grossIncome);
}

function taxCalculation(grossIncome) {
  let taxSum = 0;
  
  function calculateTaxForBracket(ceilingOfBracket, floorOfBracket, taxRate) {
    const maxAmount = ceilingOfBracket - floorOfBracket;
    taxSum += (grossIncome > ceilingOfBracket ? maxAmount : grossIncome - floorOfBracket) * taxRate;
  }

  async function getStateTax(url) {
    const stateTaxInfoObj = await fetch(url, {
      type: 'GET',
      data: {
        '$limit': 5000,
        '$$token': 'Ut41h2xirXzLlPG5oLaXgOfrk',
      }
    });
    const parsedData = await stateTaxInfoObj.json();
    return parsedData;
  }

  const stateTaxRates = async function() {
    const taxBrackets = [0];
    const taxRates = [];
    const stateTaxInfo = await getStateTax(`https://data.ftb.ca.gov/resource/hqma-83bw.json?taxable_year=${taxYear}&filing_status=${userSelectedMaritalStatus}`);
  
    stateTaxInfo.forEach((bracket, i) => {
      const textToParse = bracket.taxable_income;
      let numBuilder = '';
      if (i === stateTaxInfo.length - 1) {
        taxBrackets.push(Infinity);
      } else {
        let highLimitStartIndex;
        for (let i = textToParse.length - 1; i >= 0; i -= 1) {
          const currentChar = textToParse[i];
          if (currentChar === ' ') {
            highLimitStartIndex = i + 1;
            break;
          }
        }
        for (let i = highLimitStartIndex; i < textToParse.length; i += 1) {
          const currentChar = textToParse[i];
          if (currentChar !== ',') {
            numBuilder += currentChar;
          }
        }
        taxBrackets.push(+numBuilder);
      }
      taxRates.push(bracket.tax_rate_percentage / 10000);
    });
    for (let i = 0; grossIncome > taxBrackets[i]; i += 1) {
      calculateTaxForBracket(taxBrackets[i + 1], taxBrackets[i], taxRates[i]);
    }

    resultsDisplay(taxSum.toFixed(2));
  }
  stateTaxRates();
}

async function resultsDisplay(taxDisplay) {
  if (userSelectedMaritalStatus === 'Married Filing Jointly') {
    userSelectedMaritalStatus = 'Married';
  }
  results.innerHTML = (
  `<p>Based on the info you've given us, your state
  income taxes will be: $${taxDisplay}</p><br>
   <p>Tax Year: ${taxYear}</p>
   <p>Gross Income: ${grossIncome}</p>
   <p>State: ${state}</p>
   <p>Marital Status: ${userSelectedMaritalStatus}</p>`
  );
}

submitButton.addEventListener('click', handleSubmit);
