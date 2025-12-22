import { generateReturnsArray } from './investment.js';
import { Chart } from 'chart.js/auto';

const form = document.getElementById('investment-form');
const clearBtn = document.getElementById('clearBtn');
const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');

let finalChart = null;
let finalChartBar = null;

function investment(e) {
  e.preventDefault();
  if (form.querySelector('.error')) {
    return;
  }

  const startingAmount = Number(
    document.getElementById('initial-investment').value.replace(',', '.')
  );
  const timeHorizon = Number(document.getElementById('term').value);
  const timePeriod = document.getElementById('evaluation-period').value;
  const monthlyContribution = Number(
    document.getElementById('add-contributions').value.replace(',', '.')
  );
  const returnRate = Number(
    document.getElementById('return-rate').value.replace(',', '.')
  );
  const returnTimeFrame = document.getElementById('evaluation-period').value;
  const taxRate = Number(
    document.getElementById('profit-tax').value.replace(',', '.')
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeHorizon,
    timePeriod,
    monthlyContribution,
    returnRate,
    returnTimeFrame
  );

  const finalAmount = returnsArray[returnsArray.length - 1];
  console.log(returnsArray[returnsArray.length - 1]);

  if (finalChart && finalChartBar) {
    finalChartBar.destroy();
    finalChart.destroy();
  }

  finalChart = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: ['Total Investido', 'Rendimento', 'Imposto sobre Rendimento'],
      datasets: [
        {
          data: [
            finalAmount.investedAmount.toFixed(2),
            (finalAmount.totalInterestReturn * (1 - taxRate / 100)).toFixed(2),
            (finalAmount.totalInterestReturn * (taxRate / 100)).toFixed(2),
          ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1300,
        easing: 'easeOutQuart',
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  finalChartBar = new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnsArray.map((item) => item.monthly),
      datasets: [
        {
          label: 'Total Investido',
          data: returnsArray.map((item) => item.investedAmount.toFixed(2)),
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Retorno do Investimento (após imposto)',
          data: returnsArray.map((item) =>
            (item.interestReturn * (1 - taxRate / 100)).toFixed(2)
          ),
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

function clearForm(e) {
  e.preventDefault();
  form.reset();
  if (finalChart && finalChartBar) {
    finalChart.destroy();
    finalChartBar.destroy();
  }

  form.querySelectorAll('.error').forEach((el) => {
    el.classList.remove('error');
  });

  // remove mensagens de erro
  form.querySelectorAll('p').forEach((msg) => {
    msg.remove();
  });
}

function validateInput(e) {
  if (e.target.value === '') {
    return;
  }

  const parentElement = e.target.parentElement;
  const grandParentElement = parentElement.parentElement;
  const inputValue = Number(e.target.value.replace(',', '.'));

  if (isNaN(inputValue) || inputValue <= 0) {
    parentElement.classList.add('error');
    if (!grandParentElement.querySelector('p')) {
      const errorParagraph = document.createElement('p');
      errorParagraph.innerText = 'Insira um valor númerico e maior que zero';
      errorParagraph.classList.add('text-red-500');
      grandParentElement.appendChild(errorParagraph);
    }
  } else {
    parentElement.classList.remove('error');
    const existingError = grandParentElement.querySelector('p');
    if (existingError) {
      grandParentElement.removeChild(existingError);
    }
  }
}

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('id')) {
    formElement.addEventListener('blur', validateInput);
  }
}

form.addEventListener('submit', investment);

clearBtn.addEventListener('click', clearForm);
