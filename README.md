# Balloons by H

Fully custom luxury website — **no Shopify, no third-party storefront, no checkout**.

Built with Next.js, TypeScript, and Tailwind CSS. Deploy to Vercel with your own domain.

## Architecture

| Layer | Approach |
|---|---|
| **Frontend** | Custom Next.js App Router |
| **Products** | Local data in `src/data/site.ts` |
| **Booking** | Contact form + optional SMS (`Book Your Bouquet`) |
| **Payments** | None — no checkout built |
| **Hosting** | Vercel + your custom domain |

## Pages

- **Home** — Editorial luxury magazine layout
- **Collections** — Signature Balloon Bouquet Collection
- **Product Detail** — 15 color variations
- **About** — Brand story
- **Delivery** — LA service areas
- **Contact** — Custom inquiry form

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel + Custom Domain

1. Push this repo to GitHub
2. Import at [vercel.com](https://vercel.com) → deploy
3. In Vercel → **Settings → Domains**, add your domain (e.g. `balloonsbyh.com`)
4. Set environment variable:
   ```
   NEXT_PUBLIC_SITE_URL=https://balloonsbyh.com
   ```
5. Update DNS at your registrar per Vercel's instructions

## Configuration

Edit `src/data/site.ts`:

- `SMS_PHONE` — enables direct SMS booking links
- `BOUQUET_PRICE` — displayed price (currently $445)
- `BRAND.email` / `BRAND.instagram` — contact details

Copy `.env.example` to `.env.local` for local development.

## Signature Collection

All 15 bouquets share the same design and price — only colors change:

Rodeo Drive Lavender · Champagne Ivory · Sunset Rose · Beverly Blue · Baby Welcome · Lemon Cream · Garden Sage · French Blush · Pearl White · Mocha Latte · Cloud Blue · Golden Buttercream · Rosé Champagne · White Orchid · Black Tie
