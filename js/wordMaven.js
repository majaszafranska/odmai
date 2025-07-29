async function searchMeaning() {
  const word = getWord();
  if (!word) return;

  const url = `https://pl.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(word)}`;
  showLoading("Znaczenie");

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.extract) {
      showResult(`<strong>${data.title}</strong><br>${data.extract}`);
    } else {
      showResult("❌ Nie znaleziono znaczenia.");
    }
  } catch {
    showResult("⚠️ Błąd podczas pobierania danych.");
  }
}

async function searchSynonyms() {
  const word = getWord();
  if (!word) return;

  showLoading("Synonimy");

  try {
    const url = `/php/proxy-synonimy.php?q=${encodeURIComponent(word)}`;
    const res = await fetch(url);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const listItems = [...doc.querySelectorAll("li")].map(li => li.textContent.trim());

    if (listItems.length > 0) {
      showResult(`<strong>Synonimy słowa "${word}":</strong><br>${listItems.join(", ")}`);
    } else {
      showResult("❌ Brak synonimów dla tego słowa.");
    }
  } catch {
    showResult("⚠️ Błąd podczas pobierania synonimów.");
  }
}

async function searchAntonyms() {
  const word = getWord();
  if (!word) return;

  showLoading("Antonimy");

  try {
    const url = `/php/proxy-synonimy.php?q=${encodeURIComponent(word)}&type=antonimy`;
    const res = await fetch(url);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const antonymSection = [...doc.querySelectorAll("h2, h3")].find(h =>
      h.textContent.toLowerCase().includes("antonimy")
    );

    let listItems = [];

    if (antonymSection) {
      const nextUL = antonymSection.nextElementSibling;
      if (nextUL && nextUL.tagName === "UL") {
        listItems = [...nextUL.querySelectorAll("li")].map(li => li.textContent.trim());
      }
    }

    if (listItems.length > 0) {
      showResult(`<strong>Antonimy słowa "${word}":</strong><br>${listItems.join(", ")}`);
    } else {
      showResult("❌ Brak antonimów dla tego słowa.");
    }
  } catch {
    showResult("⚠️ Błąd podczas pobierania antonimów.");
  }
}

async function searchDeclension() {
  const word = getWord();
  if (!word) return;

  showLoading("Odmiana");

  try {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `https://pl.wiktionary.org/wiki/${encodeURIComponent(word)}`;
    const res = await fetch(proxy + url);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const table = doc.querySelector(".wikitable");

    if (table) {
      showResult(table.outerHTML);
    } else {
      showResult("❌ Nie znaleziono tabeli odmiany.");
    }
  } catch {    
    showResult("⚠️ Błąd podczas pobierania odmiany (możliwe ograniczenie dostępu CORS).");
  }
}

function getWord() {
  const word = document.getElementById("data-word").value.trim();
  if (!word) alert("Wpisz słowo.");
  return word;
}

function showResult(html) {
  document.getElementById("wordMaven-result").innerHTML = html;
}

function showLoading(label) {
  document.getElementById("wordMaven-result").innerHTML = `⏳ Szukam: ${label}...`;
}
