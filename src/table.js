const isNonEmptyArray = (arrayElement) =>
  Array.isArray(arrayElement) && arrayElement.length > 0;

export const createTable = (colunsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(colunsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      'Colunas e dados devem ser arrays não vazios e um ID de tabela válido deve ser fornecido. '
    );
  }

  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== 'TABLE') {
    throw new Error(
      'Elemento de tabela com o ID fornecido não encontrado ou inválido.'
    );
  }

  createTableHeader(tableElement, colunsArray);
  createTableBody(tableElement, dataArray, colunsArray);
};

function createTableHeader(tableReference, colunsArray) {
  function createTHead(tableReference) {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }

  const theadElement =
    tableReference.querySelector('thead') ?? createTHead(tableReference);

  const headerRow = document.createElement('tr');
  colunsArray.forEach((columnName) => {
    const th = document.createElement('th');
    th.textContent = columnName.colunsLabel;
    th.classList.add(
      'text-center',
      'bg-blue-700',
      'text-white',
      'sticky',
      'top-0'
    );
    headerRow.appendChild(th);
  });
  theadElement.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, colunsArray) {
  function createTBody(tableReference) {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tbodyElement =
    tableReference.querySelector('tbody') ?? createTBody(tableReference);

  for (const [itemIndex, items] of tableItems.entries()) {
    const row = document.createElement('tr');
    for (const columnName of colunsArray) {
      const formatFn = columnName.format ?? ((value) => value);
      const td = document.createElement('td');
      td.textContent = formatFn(items[columnName.acessor]);
      td.classList.add('text-center');
      if (itemIndex % 2 === 0) {
        td.classList.add('bg-blue-200');
      }
      row.appendChild(td);
    }
    tbodyElement.appendChild(row);
  }
}
