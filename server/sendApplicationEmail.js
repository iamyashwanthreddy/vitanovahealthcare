/**
 * Core logic for validating and emailing a Careers application. Shared by
 * both serverless adapters (/api/apply.js for Vercel, and
 * /netlify/functions/apply.js for Netlify) so the behaviour is identical
 * regardless of host.
 *
 * Sends via the Resend HTTP API (https://resend.com) using plain `fetch` —
 * no SDK dependency needed. Required environment variables are documented
 * in README.md and .env.example.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const MAX_CV_BYTES = 8 * 1024 * 1024; // 8MB

/** Validates the plain-text application fields. Returns a map of field → message. */
export function validateApplication(fields = {}) {
  const errors = {};
  if (!fields.firstName?.trim()) errors.firstName = 'First name is required.';
  if (!fields.lastName?.trim()) errors.lastName = 'Last name is required.';
  if (!fields.email?.trim() || !EMAIL_RE.test(fields.email.trim())) {
    errors.email = 'A valid email address is required.';
  }
  if (!fields.message?.trim()) {
    errors.message = 'Please tell us a little about your application.';
  }
  return errors;
}

/** Validates an (optional) uploaded CV. Returns an error string, or null if valid/absent. */
export function validateCv(file) {
  if (!file) return null;
  if (!ALLOWED_CV_TYPES.has(file.mimeType)) {
    return 'CV must be a PDF or Word document (.pdf, .doc, .docx).';
  }
  if (file.buffer.length > MAX_CV_BYTES) {
    return 'CV must be smaller than 8MB.';
  }
  return null;
}

/**
 * Sends the application notification email via Resend.
 * Throws with a human-readable message on any failure — callers must not
 * report success unless this resolves without throwing.
 */
export async function sendApplicationEmail({ fields, cv }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Email service is not configured on the server (missing RESEND_API_KEY). The application was not sent.'
    );
  }

  const to = process.env.APPLICATIONS_TO_EMAIL || 'applications@vitanovahealthcare.ie';
  const from =
    process.env.APPLICATIONS_FROM_EMAIL || 'Vitanova Health Care <onboarding@resend.dev>';
  const submittedAt = new Date().toLocaleString('en-IE', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const rows = [
    ['Name', `${fields.firstName} ${fields.lastName}`],
    ['Email', fields.email],
    ['Phone', fields.phone || '—'],
    ['Position of interest', fields.position || '—'],
    ['Submitted', submittedAt],
  ];

  const html = `
    <h2 style="font-family:sans-serif;color:#241f5e;margin:0 0 16px">New Job Application</h2>
    <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:600;color:#241f5e;vertical-align:top">${k}</td><td>${escapeHtml(
              v
            )}</td></tr>`
        )
        .join('')}
    </table>
    <h3 style="font-family:sans-serif;color:#241f5e;margin:20px 0 8px">Message</h3>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
      fields.message
    )}</p>
    <p style="font-family:sans-serif;font-size:13px;color:#7a7a7a">
      ${cv ? `CV attached: ${escapeHtml(cv.filename)}` : 'No CV was attached.'}
    </p>
  `;

  const text = [
    'New Job Application — Vitanova Health Care',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    fields.message,
    '',
    cv ? `CV attached: ${cv.filename}` : 'No CV was attached.',
  ].join('\n');

  const payload = {
    from,
    to: [to],
    reply_to: fields.email,
    subject: 'New Job Application – Vitanova Health Care',
    html,
    text,
  };

  if (cv) {
    payload.attachments = [
      {
        filename: cv.filename,
        content: cv.buffer.toString('base64'),
      },
    ];
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(
      `The email provider rejected the message (status ${res.status}). ${detail}`.trim()
    );
  }

  const json = await res.json().catch(() => ({}));
  return { id: json.id };
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
