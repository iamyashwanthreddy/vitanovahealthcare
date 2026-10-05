// Netlify Function — /.netlify/functions/contact, rewritten from /api/contact
// by public/_redirects. See README.md for required env vars.

import { validateEnquiry, sendEnquiryEmail } from '../../server/sendApplicationEmail.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return respond(405, { success: false, error: 'Method not allowed.' });
  }
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body || '{}';
    const fields = JSON.parse(raw);
    const errors = validateEnquiry(fields);
    if (Object.keys(errors).length > 0) {
      return respond(400, { success: false, errors });
    }
    await sendEnquiryEmail({ fields });
    return respond(200, { success: true });
  } catch (err) {
    console.error('Contact enquiry submission failed:', err);
    return respond(500, {
      success: false,
      error: err?.message || 'Something went wrong. Please try again.',
    });
  }
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
