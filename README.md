# Sahadeva Reddy Sweets, Snacks and Tiffins QR Menu

Mobile-first QR digital menu built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and lucide-react. The menu is fully static and ready for Vercel.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Use `?table=N` to show a subtle table chip in the header:

```text
http://localhost:3000?table=12
```

## Update Menu Items

All menu categories, items, and prices live in:

```text
lib/menu-data.ts
```

No database, API keys, or environment variables are required.

## Generate Table QR Codes

Run the app locally or deploy to Vercel, then open:

```text
/qr
```

The QR page generates table URLs for tables 1-20 using the `?table=N` query parameter. Before printing, replace the base URL with the deployed Vercel URL, for example:

```text
https://yourdomain.vercel.app
```

Each generated QR points to:

```text
https://yourdomain.vercel.app?table=1
https://yourdomain.vercel.app?table=2
...
https://yourdomain.vercel.app?table=20
```

## Deployment

Push the repository to GitHub and import it in Vercel. The project has no required environment variables.

```bash
npm run build
```

## Design Notes

The menu is intentionally text-first: one active category at a time, flat category tabs, and classic item rows with dotted price leaders. No food photos, item descriptions, ordering flow, gradients, or card-style item containers are used.
