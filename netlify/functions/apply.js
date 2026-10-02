// Netlify Function — served at /.netlify/functions/apply, rewritten from
// /api/apply by public/_redirects so the frontend's fetch('/api/apply')
// works unchanged on either host. See README.md for required env vars.

import { parseMultipartBuffer } from '../../server/parseMultipart.js';
import {
  validateApplication,
  validateCv,
  sendApplicationEmail,
} from '../../server/sendApplicationEmail.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return respond(405, { success: false, error: 'Method not allowed.' });
  }

  try {
    const buffer = Buffer.from(event.body || '', event.isBase64Encoded ? 'base64' : 'utf8');
    const headers = lowercaseHeaders(event.headers);
    const { fields, cv, fileTooLarge } = await parseMultipartBuffer(headers, buffer);

    const errors = validateApplication(fields);
    if (fileTooLarge) {
      errors.cv = 'CV must be smaller than 8MB.';
    } else {
      const cvError = validateCv(cv);
      if (cvError) errors.cv = cvError;
    }

    if (Object.keys(errors).length > 0) {
      return respond(400, { success: false, errors });
    }

    await sendApplicationEmail({ fields, cv });
    return respond(200, { success: true });
  } catch (err) {
    console.error('Careers application submission failed:', err);
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

function lowercaseHeaders(headers = {}) {
  return Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
}
