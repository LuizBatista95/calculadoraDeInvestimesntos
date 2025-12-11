const calculatorBtn = document.getElementById('calculatorBtn');
const startingAmount = document.getElementById('initial-investment');
const timeHorizon = document.getElementById('term');
const timePeriod = document.getElementById('evaluation-period');
const monthlyContribution = document.getElementById('add-contributions');
const returnRate = document.getElementById('return-rate');
const returnTimeFrame = document.getElementById('evaluation-period');

import { generateReturnsArray } from './investment.js';

calculatorBtn.addEventListener('click', () => {
  generateReturnsArray(
    startingAmount.value,
    timeHorizon.value,
    timePeriod.value,
    monthlyContribution.value,
    returnRate.value,
    returnTimeFrame.value
  );
  console.log('Botão clicado');
  console.log(generateReturnsArray);
});
