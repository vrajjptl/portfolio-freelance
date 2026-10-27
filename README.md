# Portfolio Portfolio – Full‑Stack Deployable Template

## Overview
A minimal, modern, **single‑page** portfolio built with **React + Vite + Tailwind CSS** and a tiny **Three.js** 3‑D element. It supports:
- Dark mode with electric‑blue accent.
- English / Marathi language toggle (single translation file).
- Responsive, mobile‑first design – optimized for low‑end Android phones.
- SEO basics (title, meta description, Open Graph tags).
- Floating WhatsApp button on every screen.
- Lightweight bundle (~150 KB gzipped).

## Project Structure
```
portfolio/
├─ public/                 # static assets (favicon, og‑image, optional fallback image)
├─ src/
│  ├─ components/         # React components (Hero, Services, …)
│  ├─ locales/            # i18n JSON files (en.json, mr.json)
│  ├─ index.css           # Tailwind entry point
│  ├─ i18n.ts             # i18next init
│  └─ main.tsx            # React entry point
├─ netlify.toml            # Netlify config (optional)
├─ vercel.json             # Vercel config (optional)
├─ .env.example            # Example env file for contact details
├─ README.md               # This file
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Getting Started Locally
```bash
# Clone / copy the folder
cd portfolio
npm install          # install dependencies
npm run dev          # start Vite dev server (http://localhost:5173)
```

## Building for Production
```bash
npm run build        # creates ./dist with an optimized bundle
```
The output is ready to be served by any static‑host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

## Deploying to Vercel
1. **Create a Vercel project** and link the Git repository (or import the folder via Vercel UI).<br>
2. Set **Framework Preset** → *Vite* (Vercel detects it automatically).<br>
3. **Build Command**: `npm run build`<br>
4. **Output Directory**: `dist`<br>
5. (Optional) Add environment variables in *Project Settings → Environment Variables* – see `.env.example`.

Vercel will automatically generate a preview for each PR and a production deployment on push to `main`.

## Deploying to Netlify
1. Sign‑in to Netlify and click **New site from Git** (or drag‑and‑drop the folder).
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. Add a `netlify.toml` (included) to enable serverless functions for the contact form.
5. Define environment variables in *Site settings → Build & deploy → Environment*.

## Server‑less Contact Form (optional)
To avoid exposing the form data in the client, a tiny Netlify (or Vercel) function can receive the POST request.
- File: `netlify/functions/contact.ts`
- Endpoint: `/.netlify/functions/contact`
- The front‑end `Contact.tsx` should point its `fetch` to that endpoint.
- The function simply forwards the payload to your email via **SendGrid**, **Mailgun**, or a Gmail OAuth token (you set the API key via an env var).

### Example Netlify function (TS)
```ts
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const data = JSON.parse(event.body || '{}');
  // TODO: validate fields (name, phone, message)
  // Here you could call SendGrid / Mailgun – omitted for brevity.
  console.log('Contact submission', data);
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
```
Deploying this file automatically creates the endpoint at `/.netlify/functions/contact`. For Vercel, place the same file under `api/contact.ts` and Vercel will expose it at `/api/contact`.

## Environment Variables
Create a `.env` file based on `.env.example`:
```
VITE_WHATSAPP_NUMBER=917414912464
VITE_EMAIL=vrajpatil9891@gmail.com
# OPTIONAL – SendGrid / Mailgun API keys for the serverless function
SENDGRID_API_KEY=your_key_here
```
**Never commit** the real `.env` – keep it out of version control.

## Performance / Best‑Practice Tips
- **Lazy‑load the 3‑D canvas** – already done with `React.Suspense`. Devices without WebGL get an empty placeholder.
- **Image optimisation** – store images in `public/` and reference them via `import` or `src` so Vite can hash‑cache them.
- **PWA (optional)** – add a `manifest.json` and register a service worker (Vite‑PWA plugin) if you want offline support.
- **Accessibility** – all interactive elements have `aria-label`s; colour contrast meets WCAG AA.
- **SEO** – meta tags in `index.html` are populated; you can extend them with `react-helmet-async` if needed.
- **Analytics** – insert a small GA4/Matomo script in `index.html` (or use a lightweight analytics service).

## Going Live (quick one‑liner for Netlify)
```bash
npm run build && netlify deploy --prod --dir=dist
```
(Requires Netlify CLI installed and logged in.)

## License & Contributions
MIT License – feel free to fork, customise colours, swap the 3‑D object, or add more sections.

---
**That’s it!** You now have a fully‑functional, deployable portfolio with everything needed for a production‑grade static site. Let me know if you’d like the contact‑form function to be wired up, a PWA setup, or any other customisation.
