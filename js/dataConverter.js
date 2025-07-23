function convertData() {
  const value = parseFloat(document.getElementById('data-value').value);
  const from = document.getElementById('unit-from').value;
  const to = document.getElementById('unit-to').value;
  const output = document.getElementById('converter-output');

  if (isNaN(value)) {
    output.textContent = 'Wprowadź poprawną liczbę.';
    return;
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const fromIndex = units.indexOf(from);
  const toIndex = units.indexOf(to);
  const factor = 1024 ** (fromIndex - toIndex);

  const result = value * factor;
  output.textContent = `${value} ${from} = ${result.toFixed(4)} ${to}`;
}
