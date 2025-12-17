import { generateReturnsArray } from './investment.js';
const form = document.getElementById('investment-form');
const clearBtn = document.getElementById('clearBtn');

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

function clearForm(e) {
  e.preventDefault();
  form.reset();

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
