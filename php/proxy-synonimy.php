<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

$word = $_GET['q'] ?? '';
$type = $_GET['type'] ?? 'synonyms';
if (!$word) {
    http_response_code(400);
    echo "Brak słowa do wyszukania.";
    exit;
}

$url = "https://synonim.net/ajax/synonyms?q=" . urlencode($word);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_REFERER, "https://synonim.net/");
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] ?? "Mozilla/5.0");

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
