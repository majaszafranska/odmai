<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$word = $_GET['q'] ?? '';
if (!$word) {
    echo json_encode(["error" => "Brak słowa do wyszukania."]);
    exit;
}

$url = "https://pl.wiktionary.org/wiki/" . urlencode($word);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] ?? "Mozilla/5.0");
$html = curl_exec($ch);
curl_close($ch);

if (!$html) {
    echo json_encode(["error" => "Nie udało się pobrać strony."]);
    exit;
}

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);
$xpath = new DOMXPath($dom);

$tables = $xpath->query("//table[contains(@class, 'wikitable')]");

$results = [];

foreach ($tables as $table) {
    $section = [];
    $rows = $xpath->query(".//tr", $table);
    
    foreach ($rows as $row) {
        $cells = $xpath->query("./td|./th", $row);
        $rowData = [];
        foreach ($cells as $cell) {
            $rowData[] = trim($cell->textContent);
        }
        if (!empty(array_filter($rowData))) {
            $section[] = $rowData;
        }
    }
    
    if (!empty($section)) {
        $results[] = $section;
    }
}

if (empty($results)) {
    echo json_encode(["error" => "Nie znaleziono odmiany."]);
} else {
    echo json_encode(["word" => $word, "tables" => $results]);
}
