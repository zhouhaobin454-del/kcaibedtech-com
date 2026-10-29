<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    respond(400, ['ok' => false, 'message' => 'Invalid request.']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'message' => 'Invalid JSON.']);
}

$clean = static function (string $key, int $max, bool $multiline = false) use ($data): string {
    $value = trim((string)($data[$key] ?? ''));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    if ($multiline) {
        $value = preg_replace('/\r\n?/', "\n", $value) ?? '';
    } else {
        // Single-line fields end up in mail headers: collapse every line break so nothing can inject headers.
        $value = trim(preg_replace('/[\r\n\t\x{0085}\x{2028}\x{2029}]+/u', ' ', $value) ?? '');
    }
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
};

if ($clean('website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$name = $clean('name', 100);
$email = $clean('businessEmail', 254);
$company = $clean('companyName', 150);
$country = $clean('country', 100);
$interest = $clean('productInterest', 100);
$product = $clean('specificProduct', 100);
$quantity = $clean('estimatedQuantity', 100);
$phone = $clean('phone', 50);
$message = $clean('message', 3000, true);
$consent = (bool)($data['privacyAgreement'] ?? false);

$allowedInterests = ['Adjustable Bed Frames', 'Smart Beds', 'Adjustable Mattresses', 'Leisure Chairs', 'Bed Bases', 'OEM / ODM Project'];
$length = static fn(string $value): int => function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
if ($length($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $length($company) < 2 || $country === '' || !in_array($interest, $allowedInterests, true) || $length($message) < 10 || !$consent) {
    respond(422, ['ok' => false, 'message' => 'Please check the required fields.']);
}

if (preg_match('/[\r\n]/', $email)) {
    respond(422, ['ok' => false, 'message' => 'Invalid email address.']);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'kangcai_contact_' . hash('sha256', $ip);
$now = time();
$last = is_file($rateFile) ? (int)@file_get_contents($rateFile) : 0;
if ($last > 0 && ($now - $last) < 15) {
    respond(429, ['ok' => false, 'message' => 'Please wait before sending another inquiry.']);
}
@file_put_contents($rateFile, (string)$now, LOCK_EX);

$subjectPlain = 'Website inquiry: ' . $interest . ' - ' . $company;
$subject = function_exists('mb_encode_mimeheader') ? mb_encode_mimeheader($subjectPlain, 'UTF-8', 'B', "\r\n") : $subjectPlain;
$body = implode("\n", [
    'New B2B inquiry from kcaibedtech.com',
    '',
    'Name: ' . $name,
    'Business email: ' . $email,
    'Company: ' . $company,
    'Country / region: ' . $country,
    'Product interest: ' . $interest,
    'Model / reference: ' . ($product ?: 'Not specified'),
    'Estimated quantity: ' . ($quantity ?: 'Not specified'),
    'Phone / WhatsApp: ' . ($phone ?: 'Not specified'),
    '',
    'Requirements:',
    $message,
    '',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

$headers = [
    'From: Kang Cai Website <no-reply@kcaibedtech.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
];

// Keep a backup copy outside the public web root so an inquiry is never lost if mail() fails or lands in spam.
$saved = false;
$docRoot = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string)$_SERVER['DOCUMENT_ROOT'], '/\\') : '';
$logDir = $docRoot !== '' ? dirname($docRoot) : '';
if ($logDir !== '' && is_dir($logDir) && is_writable($logDir)) {
    $entry = json_encode([
        'time' => gmdate('c'), 'name' => $name, 'email' => $email, 'company' => $company, 'country' => $country,
        'interest' => $interest, 'model' => $product, 'quantity' => $quantity, 'phone' => $phone, 'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $saved = $entry !== false && @file_put_contents($logDir . DIRECTORY_SEPARATOR . 'kangcai-inquiries.log', $entry . "\n", FILE_APPEND | LOCK_EX) !== false;
}

$sent = mail('zhouhaobin454@gmail.com', $subject, $body, implode("\r\n", $headers));
if (!$sent && !$saved) {
    respond(500, ['ok' => false, 'message' => 'Email delivery failed.']);
}

respond(200, ['ok' => true]);
