"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Printer, RefreshCw } from "lucide-react";
import { Logo } from "./Logo";

const tables = Array.from({ length: 20 }, (_, index) => index + 1);

export function QrBatch() {
  const [baseUrl, setBaseUrl] = useState(() =>
    typeof window === "undefined"
      ? "https://yourdomain.vercel.app"
      : window.location.origin,
  );
  const [codes, setCodes] = useState<Record<number, string>>({});

  const urls = useMemo(
    () =>
      Object.fromEntries(
        tables.map((table) => [table, `${baseUrl.replace(/\/$/, "")}?table=${table}`]),
      ) as Record<number, string>,
    [baseUrl],
  );

  useEffect(() => {
    let cancelled = false;

    async function generateCodes() {
      const nextCodes: Record<number, string> = {};
      for (const table of tables) {
        nextCodes[table] = await QRCode.toDataURL(urls[table], {
          margin: 1,
          width: 260,
          color: {
            dark: "#1F5C3F",
            light: "#FDF8F0",
          },
        });
      }
      if (!cancelled) setCodes(nextCodes);
    }

    generateCodes();
    return () => {
      cancelled = true;
    };
  }, [urls]);

  return (
    <main className="min-h-screen bg-cream px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-4 border border-ink/15 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="font-display text-2xl font-bold">
                Table QR Codes
              </h1>
              <p className="text-sm text-ink/62">Tables 1-20 for print testing.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:w-[28rem] sm:flex-row">
            <label className="flex min-h-11 flex-1 items-center gap-2 border border-ink/20 bg-cream px-3">
              <RefreshCw aria-hidden="true" className="h-4 w-4 text-forest" />
              <span className="sr-only">Base URL</span>
              <input
                value={baseUrl}
                onChange={(event) => setBaseUrl(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-forest px-4 text-sm font-bold text-white"
            >
              <Printer aria-hidden="true" className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {tables.map((table) => (
            <article
              key={table}
              className="break-inside-avoid border border-ink/15 bg-white p-4 text-center"
            >
              <p className="font-display text-3xl font-bold text-forest">
                Table {table}
              </p>
              <div className="mx-auto my-3 grid h-[260px] w-[260px] max-w-full place-items-center bg-cream p-3">
                {codes[table] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={codes[table]}
                    alt={`QR code for table ${table}`}
                    className="h-full w-full"
                  />
                ) : (
                  <span className="text-sm text-ink/50">Generating...</span>
                )}
              </div>
              <p className="break-all text-xs leading-5 text-ink/60">{urls[table]}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
