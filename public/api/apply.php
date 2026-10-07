<?php
// Careers application endpoint for Hostinger (PHP). Reached at POST /api/apply
// via public/.htaccess. Mirrors api/apply.js (Vercel) and
// netlify/functions/apply.js: same fields, validation and JSON responses.

require __DIR__ . '/_common.php';

vh_require_post();

const MAX_CV_BYTES = 8 * 1024 * 1024;

$fields = [];
foreach (['firstName', 'lastName', 'email', 'phone', 'position', 'message'] as $key) {
    $fields[$key] = trim((string)($_POST[$key] ?? ''));
}

$errors = [];
if ($fields['firstName'] === '') $errors['firstName'] = 'First name is required.';
if ($fields['lastName'] === '')  $errors['lastName']  = 'Last name is required.';
if ($fields['email'] === '' || !preg_match(VH_EMAIL_RE, $fields['email'])) {
    $errors['email'] = 'A valid email address is required.';
}
if ($fields['message'] === '') $errors['message'] = 'Please tell us a little about your application.';

// Optional CV (pdf / doc / docx, up to 8MB).
$attachment = null;
$upload = $_FILES['cv'] ?? null;
if ($upload && ($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    if (in_array($upload['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true)
        || $upload['size'] > MAX_CV_BYTES) {
        $errors['cv'] = 'CV must be smaller than 8MB.';
    } elseif ($upload['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($upload['tmp_name'])) {
        $errors['cv'] = 'The CV could not be uploaded. Please try again.';
    } else {
        $data = file_get_contents($upload['tmp_name']);
        $ext = strtolower(pathinfo($upload['name'], PATHINFO_EXTENSION));
        $head = substr($data, 0, 8);

        // Check the extension and the file's real signature, not the browser-supplied type.
        $mime = null;
        if ($ext === 'pdf' && strncmp($head, '%PDF', 4) === 0) {
            $mime = 'application/pdf';
        } elseif ($ext === 'docx' && strncmp($head, "PK\x03\x04", 4) === 0) {
            $mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } elseif ($ext === 'doc' && strncmp($head, "\xD0\xCF\x11\xE0", 4) === 0) {
            $mime = 'application/msword';
        }

        if ($mime === null) {
            $errors['cv'] = 'CV must be a PDF or Word document (.pdf, .doc, .docx).';
        } else {
            $attachment = ['filename' => $upload['name'], 'mime' => $mime, 'data' => $data];
        }
    }
}

if ($errors) {
    vh_respond(400, ['success' => false, 'errors' => $errors]);
}

$name = vh_line($fields['firstName'] . ' ' . $fields['lastName']);
$position = vh_line($fields['position']);

$text = implode("\n", [
    'New Job Application - Vitanova Health Care',
    '',
    'Name: ' . $name,
    'Email: ' . $fields['email'],
    'Phone: ' . ($fields['phone'] !== '' ? vh_line($fields['phone']) : '-'),
    'Position of interest: ' . ($position !== '' ? $position : '-'),
    'Submitted: ' . vh_submitted_at(),
    '',
    'Message:',
    $fields['message'],
    '',
    $attachment ? 'CV attached: ' . $attachment['filename'] : 'No CV was attached.',
]);

$subject = 'New Job Application - ' . $name
    . ($position !== '' ? " ($position)" : '')
    . ($attachment ? ' - CV attached' : '');

if (!vh_send_mail($subject, $text, $fields['email'], $attachment)) {
    error_log('Vitanova careers application: mail() refused the message.');
    vh_respond(500, [
        'success' => false,
        'error' => 'We could not send your application right now. Please try again, or email us directly.',
    ]);
}

vh_respond(200, ['success' => true]);
