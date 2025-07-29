<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

$word = $_GET['q'] ?? '';
if (!$word) {
    http_response_code(400);
    echo "Brak słowa do wyszukania.";
    exit;
}

$url = "https://pl.wiktionary.org/wiki/" . urlencode($word);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_REFERER, "https://pl.wiktionary.org/");
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] ?? "Mozilla/5.0");
curl_setopt($ch, CURLOPT_COOKIEJAR, '/tmp/cookie.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/cookie.txt');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
