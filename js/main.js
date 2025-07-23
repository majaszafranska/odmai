function showSection(id) {
  document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

function switchLang(lang) {
  localStorage.setItem('lang', lang);
  translate(lang);
}

function translate(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
}

// function translate(lang) {
//   const elements = document.querySelectorAll('[data-i18n]');
//   elements.forEach(el => {
//     const key = el.getAttribute('data-i18n');
//     const translation = translations[lang]?.[key];
//     if (translation) el.textContent = translation;
//   });
// }

window.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  const lang = localStorage.getItem('lang') || 'pl';
  document.querySelector('.lang-switch').value = lang;
  translate(lang);
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
});
