<?php
// Shared helpers for the Hostinger form endpoints (apply.php, contact.php).
// This file only defines functions, so requesting it directly outputs nothing.

const VH_EMAIL_RE = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

/** Settings: defaults below, overridden by anything set in config.php. */
function vh_config(): array {
    $host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? 'localhost'));
    $host = preg_replace('/[^a-z0-9.-]/', '', preg_replace('/^www\./', '', $host));

    $config = [
        'to'        => 'applications@vitanovahealthcare.ie',
        'from'      => 'no-reply@' . $host,
        'from_name' => 'Vitanova Health Care',
    ];

    $file = __DIR__ . '/config.php';
    $custom = is_file($file) ? require $file : [];
    if (is_array($custom)) {
        foreach ($custom as $key => $value) {
            if (is_string($value) && trim($value) !== '') {
                $config[$key] = trim($value);
            }
        }
    }
    return $config;
}

function vh_respond(int $status, array $body): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function vh_require_post(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        vh_respond(405, ['success' => false, 'error' => 'Method not allowed.']);
    }
}

/** Collapses a value to a single line so it can never inject extra mail headers. */
function vh_line(string $value): string {
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

function vh_encode_header(string $value): string {
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/**
 * Sends a plain-text email, optionally with one attachment.
 * Returns false if the server refused to accept it.
 *
 * @param array{filename:string,mime:string,data:string}|null $attachment
 */
function vh_send_mail(string $subject, string $text, string $replyTo, ?array $attachment = null): bool {
    $config = vh_config();
    $from = vh_encode_header($config['from_name']) . ' <' . vh_line($config['from']) . '>';

    $headers = [
        'From: ' . $from,
        'Reply-To: ' . vh_line($replyTo),
        'MIME-Version: 1.0',
    ];

    if ($attachment === null) {
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $headers[] = 'Content-Transfer-Encoding: base64';
        $body = chunk_split(base64_encode($text));
    } else {
        $boundary = 'vh_' . bin2hex(random_bytes(12));
        $filename = preg_replace('/[^A-Za-z0-9._ -]/', '_', basename($attachment['filename']));
        $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

        $body  = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($text)) . "\r\n";
        $body .= "--$boundary\r\n";
        $body .= 'Content-Type: ' . $attachment['mime'] . '; name="' . $filename . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= 'Content-Disposition: attachment; filename="' . $filename . "\"\r\n\r\n";
        $body .= chunk_split(base64_encode($attachment['data'])) . "\r\n";
        $body .= "--$boundary--";
    }

    return mail($config['to'], vh_encode_header($subject), $body, implode("\r\n", $headers));
}

function vh_submitted_at(): string {
    return (new DateTime('now', new DateTimeZone('Europe/Dublin')))->format('l, j F Y, H:i');
}
