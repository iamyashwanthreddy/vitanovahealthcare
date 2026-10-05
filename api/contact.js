// Vercel serverless function — POST /api/contact. Emails the Contact page
// enquiry via server/sendApplicationEmail.js. See README.md for env vars.

import { validateEnquiry, sendEnquiryEmail } from '../server/sendApplicationEmail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }
  try {
    const fields = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const errors = validateEnquiry(fields);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    await sendEnquiryEmail({ fields });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact enquiry submission failed:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Something went wrong. Please try again.',
    });
  }
}
