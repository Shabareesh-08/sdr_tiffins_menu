# Sahadeva Reddy Sweets, Snacks and Tiffins QR Menu

Mobile-first QR digital menu built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and lucide-react. The menu is fully static and configured for deployment on Cloudflare Pages.

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

Run the app locally or deploy to Cloudflare, then open:

```text
/qr
```

The QR page generates table URLs for tables 1-20 using the `?table=N` query parameter. Before printing, replace the base URL with your deployed Cloudflare URL, for example:

```text
https://yourdomain.pages.dev
```

Each generated QR points to:

```text
https://yourdomain.pages.dev?table=1
https://yourdomain.pages.dev?table=2
...
https://yourdomain.pages.dev?table=20
```

## Deployment

The project is configured for static export (`output: "export"` in `next.config.mjs`). 

To deploy to Cloudflare Pages:
1. Push the repository to GitHub.
2. In the Cloudflare Dashboard, go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select this repository.
4. Set the build framework to **Next.js (Static HTML Export)**.
5. Set the build command to `npm run build`.
6. Set the build output directory to `out`.
7. Click **Save and Deploy**.

```bash
npm run build
```

## Design Notes

The menu is intentionally text-first: one active category at a time, flat category tabs, and classic item rows with dotted price leaders. No food photos, item descriptions, ordering flow, gradients, or card-style item containers are used.
