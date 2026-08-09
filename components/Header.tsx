"use client";

import { Search, X } from "lucide-react";
import { Logo } from "./Logo";

export function Header({
  search,
  onSearchChange,
  table,
  compact = false,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  table: number | null;
  compact?: boolean;
}) {
  return (
    <header className="border-b border-ink/10 bg-cream">
      <div className="mx-auto max-w-5xl px-4 pb-3 pt-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h1 className="font-display text-[1.55rem] font-bold leading-tight text-ink sm:text-3xl">
                Sahadeva Reddy
                <span className="block text-base font-semibold text-forest sm:text-lg">
                  Sweets, Snacks &amp; Tiffins
                </span>
              </h1>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-forest">
                <span className="h-2 w-2 rounded-sm border border-forest bg-leaf" />
                100% Pure Veg
              </span>
              {table ? (
                <span className="border-l border-ink/20 pl-3 text-xs font-bold uppercase tracking-wide text-saffron">
                  Table {table}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {!compact && (
          <label className="mt-4 flex min-h-11 items-center gap-3 rounded-xl border border-ink/12 bg-white px-4 py-1 transition-colors focus-within:border-saffron/50 focus-within:ring-1 focus-within:ring-saffron/20">
            <Search
              aria-hidden="true"
              className="h-4.5 w-4.5 shrink-0 text-ink/40"
            />
            <span className="sr-only">Search menu</span>
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search dosa, chaat, juice..."
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
              type="search"
            />
            {search ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="grid h-8 w-8 place-items-center rounded-full text-ink/50 transition hover:bg-ink/5 hover:text-ink"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </label>
        )}
      </div>
    </header>
  );
}
