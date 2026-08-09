"use client";

import { Search, X } from "lucide-react";
import { Logo } from "./Logo";

export function Header({
  search,
  onSearchChange,
  table,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  table: number | null;
}) {
  return (
    <header className="border-b border-ink/15 bg-cream">
      <div className="mx-auto max-w-5xl px-4 pb-3 pt-4 sm:px-6">
        <div className="flex items-start gap-4">
          <Logo />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h1 className="font-display text-[1.55rem] font-bold leading-tight text-ink sm:text-3xl">
                Sahadeva Reddy
                <span className="block text-base font-semibold text-forest sm:text-xl">
                  Sweets, Snacks and Tiffins
                </span>
              </h1>
              <span className="inline-flex items-center gap-1.5 border-l-2 border-forest pl-3 text-xs font-bold uppercase tracking-normal text-forest">
                <span className="h-2 w-2 border border-forest bg-leaf" />
                100% Pure Veg
              </span>
              {table ? (
                <span className="border-l border-ink/25 pl-3 text-xs font-bold uppercase tracking-normal text-saffron">
                  Table {table}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <label className="mt-4 flex min-h-11 items-center gap-3 border-b border-ink/25 bg-cream py-1 focus-within:border-saffron">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-forest" />
          <span className="sr-only">Search menu</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search dosa, chaat, juice..."
            className="h-10 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink/45"
            type="search"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="grid h-9 w-9 place-items-center text-ink/60 transition hover:text-ink"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          ) : null}
        </label>
      </div>
    </header>
  );
}
