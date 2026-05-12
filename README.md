# IDOWU MATÉRIAUX

Bilingual (French/English) single-page landing site for IDOWU MATÉRIAUX — a construction-supply business in Abidjan, Côte d'Ivoire.

> **Live:** https://idowu-materiaux.vercel.app

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.5 |
| Styling | Tailwind CSS 3.4 |
| 3D | React Three Fiber 8 + Drei 9 + Three.js 0.166 |
| Animation | Framer Motion 11 |
| Email | Resend 4 |
| Deploy | Vercel |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your RESEND_API_KEY

# 3. Start dev server
npm run dev
# → http://localhost:3000  (redirects to /fr automatically)
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Get from https://resend.com — needed for contact form emails |
| `CONTACT_TO_EMAIL` | Email address that receives devis form submissions |

---

## Build & Deploy

```bash
# Verify build passes
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel --prod
```

---

## How to Replace Content

### Portrait photo
Replace `public/images/abel-portrait.jpg` with a real photo of Abel.
- Recommended: 800×1000px, JPEG, ≤300KB
- The `alt` text and `blurDataURL` are already wired up

### Project photos
Replace the 6 placeholder files in `public/images/projects/`:
```
project-1.jpg  →  project-6.jpg
```
- Recommended: 800×600px, JPEG, ≤200KB each
- They appear in a 2×3 grid in the "Recent Projects" section

### Case study numbers
Edit `lib/i18n/fr.json` (French) and `lib/i18n/en.json` (English):
```json
"projects": {
  "caseStudy": {
    "title":   "Villa R+1, Cocody",
    "before":  "Devis original : 12 000 000 CFA",
    "after":   "Prix final : 9 200 000 CFA",
    "savings": "Économie : 2 800 000 CFA"
  }
}
```

---

## How to Edit Copy

All user-visible text lives in two files:
- `lib/i18n/fr.json` — French
- `lib/i18n/en.json` — English

TypeScript will error if the two files diverge in structure.

---

## How to Add a Third Locale

1. Copy `lib/i18n/fr.json` → `lib/i18n/pt.json` and translate.
2. In `app/[locale]/layout.tsx`, add `'pt'` to the `locales` array and import the new JSON.
3. In `app/[locale]/page.tsx`, add the locale to `generateStaticParams` and `generateMetadata`.
4. In `app/sitemap.ts`, add the `/pt` URL.
5. Update `LanguageToggle` to handle 3-way cycling if needed.

---

## How to Add a Custom Domain (60 seconds)

1. Go to [vercel.com](https://vercel.com) → your project → **Settings → Domains**
2. Click **Add** → enter your domain (e.g. `idowu-materiaux.com`)
3. Vercel shows you DNS records — add them at your registrar
4. Vercel auto-provisions an SSL certificate within minutes
5. Update `app/robots.ts` and `app/sitemap.ts` with your real domain

---

## Contact Constants

Located in `lib/constants.ts`:
```ts
WHATSAPP_NUMBER = "2250707264235"
CALL_NUMBER     = "+2250575555366"
EMAIL           = "abelidowu100@gmail.com"
SOCIAL.instagram = "https://instagram.com/idowu_abel_destinee"
```

Update `SOCIAL.facebook` and `SOCIAL.telegram` when you have real handles.
