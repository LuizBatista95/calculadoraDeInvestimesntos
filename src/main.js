import { generateReturnsArray } from './investment.js';
const form = document.getElementById('investment-form');

function investment(e) {
  e.preventDefault();
  const startingAmount = Number(
    document.getElementById('initial-investment').value
  );
  const timeHorizon = Number(document.getElementById('term').value);
  const timePeriod = document.getElementById('evaluation-period').value;
  const monthlyContribution = Number(
    document.getElementById('add-contributions').value
  );
  const returnRate = Number(document.getElementById('return-rate').value);
  const returnTimeFrame = document.getElementById('evaluation-period').value;

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeHorizon,
    timePeriod,
    monthlyContribution,
    returnRate,
    returnTimeFrame
  );
  console.log('Botão clicado');
  console.log(returnsArray);
}

form.addEventListener('submit', investment);
