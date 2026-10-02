// Vercel serverless function — served automatically at POST /api/apply.
// Parses the multipart Careers application submission and emails it via
// server/sendApplicationEmail.js. See README.md for required env vars.

import { parseMultipartBuffer } from '../server/parseMultipart.js';
import {
  validateApplication,
  validateCv,
  sendApplicationEmail,
} from '../server/sendApplicationEmail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const buffer = await bufferRequest(req);
    const { fields, cv, fileTooLarge } = await parseMultipartBuffer(req.headers, buffer);

    const errors = validateApplication(fields);
    if (fileTooLarge) {
      errors.cv = 'CV must be smaller than 8MB.';
    } else {
      const cvError = validateCv(cv);
      if (cvError) errors.cv = cvError;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    await sendApplicationEmail({ fields, cv });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Careers application submission failed:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Something went wrong. Please try again.',
    });
  }
}

function bufferRequest(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
