function updateLengthLabel(val) {
  document.getElementById('length-value').textContent = val;
}

function generatePassword() {
  const length = +document.getElementById('length').value;
  const useUpper = document.getElementById('include-uppercase').checked;
  const useLower = document.getElementById('include-lowercase').checked;
  const useNumbers = document.getElementById('include-numbers').checked;
  const useSymbols = document.getElementById('include-symbols').checked;

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_+=';

  let chars = '';
  if (useUpper) chars += upper;
  if (useLower) chars += lower;
  if (useNumbers) chars += numbers;
  if (useSymbols) chars += symbols;

  if (!chars) {
    document.getElementById('password-output').textContent = 'Wybierz przynajmniej jeden zestaw znaków.';
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById('password-output').textContent = password;
}

function copyPassword() {
  const pass = document.getElementById('password-output').textContent;
  navigator.clipboard.writeText(pass);
}
