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
public/
  logo.png                 Official brand logo (used across the site)
  application-form.html    Standalone printable/PDF application form
  robots.txt, sitemap.xml  SEO
  _redirects               Netlify SPA fallback
src/
  styles/tokens.css        Design tokens (colors, type, spacing, radii)
  styles/global.css        Base styles + utilities
  data/site.js             Single source of truth for all site content
  data/pastel.js           Pastel-surface → colour mapping
  hooks/                   useDocumentMeta (SEO), useReveal (scroll reveal)
  components/              Header, Footer, Layout, Button, ServiceCard,
                           CheckList, CtaBand, PageHero, EnquiryForm, Icon …
  pages/                   Home, About, Services, ServiceDetail,
                           Application, Contact, NotFound
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
| `/application` | Application |
| `/contact` | Contact |

## Deployment notes

This is a single-page app using the HTML5 history API, so the host must serve
`index.html` for unknown paths (deep links & refreshes). Config is included for:

- **Netlify** — `public/_redirects`
- **Vercel** — `vercel.json`

For other hosts, add an equivalent SPA fallback rule. Update the domain in
`public/sitemap.xml` and `public/robots.txt` to the production URL before launch.

## Content & branding

- All copy is adapted from the source website's published content, with the brand
  name replaced by **Vitanova Health Care**. No services, claims, statistics,
  qualifications or testimonials were invented.
- The enquiry forms validate on the client and open the visitor's email app
  (`mailto:`) pre-filled — they do **not** post to a backend, and the UI says so.
- The contact email uses the new brand domain
  (`info@vitanovahealthcare.com`) in place of the source's brand-specific address.
  Update it to the client's real inbox before launch.
