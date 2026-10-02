# Vitanova Health Care

A premium, modern marketing website for **Vitanova Health Care**, a health and
social care provider based in Balbriggan, Co. Dublin, Ireland.

Built with **React + Vite (JavaScript)** and **CSS Modules**. The visual system
follows the attached `DESIGN.md` style reference — a forest-green + pastel-room
healthcare aesthetic with a single DM Sans type voice, flat borderless surfaces,
soft rounded cards and a single coral CTA.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Tech stack

- **React 18** with **react-router-dom 6** for client-side routing
- **Vite 5** for dev/build tooling
- **CSS Modules** for component-scoped styles + a global design-token layer
- No UI/animation libraries — animations use CSS + a tiny IntersectionObserver hook

## Project structure

```
api/
  apply.js                 Vercel serverless function for Careers submissions
netlify/
  functions/apply.js       Netlify Function equivalent of api/apply.js
server/
  sendApplicationEmail.js  Shared validation + email-sending (Resend API)
  parseMultipart.js        Shared multipart/form-data parser (busboy)
public/
  logo.png                 Official brand logo (used across the site)
  application-form.html    Standalone printable/PDF application form
  robots.txt, sitemap.xml  SEO
  _redirects               Netlify SPA fallback + API rewrite + legacy URL redirect
src/
  styles/tokens.css        Design tokens (colors, type, spacing, radii)
  styles/global.css        Base styles + utilities
  data/site.js             Single source of truth for all site content
  data/pastel.js           Pastel-surface → colour mapping
  hooks/                   useDocumentMeta (SEO), useReveal (scroll reveal)
  components/              Header, Footer, Layout, Button, ServiceCard,
                           CheckList, CtaBand, PageHero, EnquiryForm,
                           CareerApplicationForm, Icon …
  pages/                   Home, About, Services, ServiceDetail,
                           Careers, Contact, NotFound
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services overview |
| `/services/24-hour-care` | 24 Hour Health Care |
| `/services/home-services` | Home Services |
| `/services/general-care` | General Care |
| `/services/care-support` | Care Support |
| `/services/homelessness` | Homelessness |
| `/careers` | Careers (formerly `/application`, which now redirects here at every level — client-side route, `_redirects`, and `vercel.json`) |
| `/contact` | Contact |

## Deployment notes

This is a single-page app using the HTML5 history API, so the host must serve
`index.html` for unknown paths (deep links & refreshes). Config is included for:

- **Netlify** — `public/_redirects`, `netlify.toml` (also declares the Functions directory)
- **Vercel** — `vercel.json` (serverless functions under `/api` are detected automatically)

For other hosts, add an equivalent SPA fallback rule, and port `api/apply.js`
to that host's serverless/function format (it only depends on `server/`, which
is plain Node). Update the domain in `public/sitemap.xml` and
`public/robots.txt` to the production URL before launch.

## Careers application emails

Submitting the Careers page form (`/careers`) posts to `/api/apply`, a
serverless function (Vercel: `api/apply.js`; Netlify: `netlify/functions/apply.js`,
reached via the `/api/apply` rewrite in `public/_redirects`) that validates the
submission server-side and emails it to the recruitment inbox via the
[Resend](https://resend.com) API. The browser never talks to Resend directly
and never sees an API key.

**Required environment variables** (set in your hosting provider's dashboard —
see `.env.example`):

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | Your Resend API key. Without it, every submission fails with a clear "email service is not configured" error — the form never reports success in that case. |
| `APPLICATIONS_TO_EMAIL` | No (defaults to `applications@vitanovahealthcare.ie`) | Recipient inbox. |
| `APPLICATIONS_FROM_EMAIL` | No (defaults to Resend's sandbox sender) | Must be an address on a domain verified in your Resend account for production delivery. |

The email includes the applicant's name, email, phone, position of interest,
message and submission date, with the applicant's address set as `reply-to`.
An optional CV (PDF or Word, up to 8MB) is attached to the email.

**⚠️ Not yet verified end-to-end**: this environment has no `RESEND_API_KEY`
configured, so the email send has **not** been tested against a live Resend
account. Set the variables above on your host and submit a real test
application before relying on this in production.

## Content & branding

- All copy is adapted from the source website's published content, with the brand
  name replaced by **Vitanova Health Care**. No services, claims, statistics,
  qualifications or testimonials were invented.
- The general enquiry form on the Contact page validates on the client and opens
  the visitor's email app (`mailto:`) pre-filled — it does **not** post to a
  backend, and the UI says so. The Careers application form is different: it
  posts to the serverless `/api/apply` endpoint described above.
- The contact email uses the new brand domain
  (`info@vitanovahealthcare.com`) in place of the source's brand-specific address.
  The Careers notification inbox (`applications@vitanovahealthcare.ie`) uses a
  different TLD, as explicitly requested — confirm this is intentional before
  launch.
  Update these before launch if they should point elsewhere.
