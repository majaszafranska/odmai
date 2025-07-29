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
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `https://synonim.net/synonim/${encodeURIComponent(word)}`;
    const res = await fetch(proxy + url, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const synonyms = Array.from(doc.querySelectorAll("#mall ul li a")).map(el => el.textContent.trim());

    if (synonyms.length > 0) {
      showResult(`<strong>Synonimy słowa: ${word}</strong><br>` + synonyms.join(", "));
    } else {
      showResult("❌ Brak synonimów dla tego słowa.");
    }
  } catch {
    showResult("⚠️ Błąd podczas pobierania synonimów (możliwe ograniczenie CORS).");
  }
}

async function searchAntonyms() {
  const word = getWord();
  if (!word) return;

  showLoading("Antonimy");

  try {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `https://antonim.net/antonim/${encodeURIComponent(word)}`;
    const res = await fetch(proxy + url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const mall = doc.querySelector("#mall");
    if (mall) {
      const antonyms = [...mall.querySelectorAll("ul li a")].map(a => a.textContent.trim());
      if (antonyms.length > 0) {
        showResult(`<strong>Antonimy słowa: ${word}</strong><br>` + antonyms.join(", "));
      } else {
        showResult("❌ Brak antonimów dla tego słowa.");
      }
    } else {
      showResult("❌ Nie znaleziono sekcji antonimów.");
    }
  } catch {
    showResult("⚠️ Błąd podczas pobierania antonimów (możliwe ograniczenie CORS).");
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
