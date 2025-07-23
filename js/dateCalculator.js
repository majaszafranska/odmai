function calculateDateDiff() {
  const start = document.getElementById('date-start').value;
  const end = document.getElementById('date-end').value;
  const output = document.getElementById('date-diff-result');

  if (!start || !end) {
    output.textContent = 'Wybierz obie daty.';
    return;
  }

  const date1 = new Date(start);
  const date2 = new Date(end);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  output.textContent = `${diffDays} ${diffDays === 1 ? 'dzień' : 'dni'}`;
}
