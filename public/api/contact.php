<?php
// Contact enquiry endpoint for Hostinger (PHP). Reached at POST /api/contact
// via public/.htaccess. Mirrors api/contact.js (Vercel) and
// netlify/functions/contact.js: JSON body in, JSON out.

require __DIR__ . '/_common.php';

vh_require_post();

$input = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($input)) {
    vh_respond(400, ['success' => false, 'error' => 'Invalid request.']);
}

$fields = [];
foreach (['firstName', 'lastName', 'email', 'phone', 'subject', 'message'] as $key) {
    $fields[$key] = is_string($input[$key] ?? null) ? trim($input[$key]) : '';
}

$errors = [];
if ($fields['firstName'] === '') $errors['firstName'] = 'First name is required.';
if ($fields['lastName'] === '')  $errors['lastName']  = 'Last name is required.';
if ($fields['email'] === '' || !preg_match(VH_EMAIL_RE, $fields['email'])) {
    $errors['email'] = 'A valid email address is required.';
}
if ($fields['message'] === '') $errors['message'] = 'Please tell us how we can help.';

if ($errors) {
    vh_respond(400, ['success' => false, 'errors' => $errors]);
}

$name = vh_line($fields['firstName'] . ' ' . $fields['lastName']);

$text = implode("\n", [
    'New Website Enquiry - Vitanova Health Care',
    '',
    'Name: ' . $name,
    'Email: ' . $fields['email'],
    'Phone: ' . ($fields['phone'] !== '' ? vh_line($fields['phone']) : '-'),
    'Subject: ' . ($fields['subject'] !== '' ? vh_line($fields['subject']) : '-'),
    'Submitted: ' . vh_submitted_at(),
    '',
    'Message:',
    $fields['message'],
]);

if (!vh_send_mail('New Website Enquiry - ' . $name, $text, $fields['email'])) {
    error_log('Vitanova contact enquiry: mail() refused the message.');
    vh_respond(500, [
        'success' => false,
        'error' => 'We could not send your message right now. Please try again.',
    ]);
}

vh_respond(200, ['success' => true]);
