const results = document.getElementById('results');
const maritalStatus = document.getElementsByName('maritalStatus');
const submitButton = document.getElementById('formSubmit');

let userSelectedMaritalStatus;
let numberOfDependents;
let grossIncome;
let state;
let taxYear;
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

  numberOfDependents = document.getElementById('dependents').value;
  grossIncome = document.getElementById('grossIncome').value;
  state = document.getElementById('states').value;
  taxYear = document.getElementById('taxYear').value;
  resultsDisplay();
}

async function getStateTax(url) {
  const stateTaxInfoObj = await fetch(url);
  const parsedData = await stateTaxInfoObj.json();
  return parsedData;
}

async function taxCalculation(grossIncome) {
  let taxSum = 0;

  const stateTaxInfo = await getStateTax(`https://data.ftb.ca.gov/resource/hqma-83bw.json?taxable_year=${taxYear}&filing_status=${userSelectedMaritalStatus}`);

  function parseTaxBracket(taxBracketStr) {
    let startIdx;
    for (let i = taxBracketStr.length - 1; i >= 0; i -= 1) {
      const char = taxBracketStr[i];
      if (char === ' ') {
        startIdx = i + 1;
        break;
      }
    }
    let numStr = '';
    for (let i = startIdx; i < taxBracketStr.length; i += 1) {
      const char = taxBracketStr[i];
      if (char !== ',') {
        numStr += char;
      }
    }

    return +numStr;
  }

  let ceilingOfPreviousBracket = 0;

  function calculateTaxForBracket(ceilingOfBracket, floorOfBracket, taxRate) {
    const maxAmount = ceilingOfBracket - floorOfBracket;
    taxSum += (grossIncome > ceilingOfBracket ? maxAmount : grossIncome - floorOfBracket) * (taxRate / 10000);
  }

  for (let i = 0; i < stateTaxInfo.length - 1; i += 1) {
    const eachBracketObj = stateTaxInfo[i];
    const taxBracketCeiling = parseTaxBracket(eachBracketObj.taxable_income);
    calculateTaxForBracket(
      taxBracketCeiling,
      ceilingOfPreviousBracket,
      eachBracketObj.tax_rate_percentage
    );
    if (grossIncome < taxBracketCeiling) {
      break;
    }
    ceilingOfPreviousBracket = taxBracketCeiling;
  }
  return taxSum.toFixed(2);
}

async function resultsDisplay() {
  const taxDisplay = await taxCalculation(grossIncome);
  if (userSelectedMaritalStatus === 'Married Filing Jointly') {
    userSelectedMaritalStatus = 'Married';
  }
  results.innerHTML = (
  `<p>Based on the info you've given us, your state
  income taxes will be: $${taxDisplay}</p><br>
   <p>Tax Year: ${taxYear}</p>
   <p>Gross Income: ${grossIncome}</p>
   <p>State: ${state}</p>
   <p>Marital Status: ${userSelectedMaritalStatus}</p>
   <p>Dependents: ${numberOfDependents}</p>`
  );
}

submitButton.addEventListener('click', handleSubmit);

