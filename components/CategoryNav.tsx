"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { CategoryName } from "@/lib/menu-data";

export function CategoryNav({
  categories,
  active,
  onSelect,
  disabled = false,
}: {
  categories: readonly CategoryName[];
  active: CategoryName;
  onSelect: (category: CategoryName) => void;
  disabled?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollRight(
        el.scrollWidth > el.clientWidth &&
          el.scrollLeft < el.scrollWidth - el.clientWidth - 5
      );
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  return (
    <nav
      aria-label="Menu categories"
      className="relative border-b border-ink/10 bg-cream"
    >
      <div
        ref={scrollRef}
        className="hide-scrollbar mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 py-2.5 sm:gap-2 sm:px-5"
      >
        {categories.map((category) => {
          const selected = category === active;
          return (
            <motion.button
              key={category}
              id={`cat-${category.replace(/\s+/g, "-")}`}
              type="button"
              onClick={() => {
                onSelect(category);
                const btn = document.getElementById(
                  `cat-${category.replace(/\s+/g, "-")}`
                );
                if (btn && scrollRef.current) {
                  const container = scrollRef.current;
                  const scrollLeft =
                    btn.offsetLeft -
                    container.offsetWidth / 2 +
                    btn.offsetWidth / 2;
                  container.scrollTo({ left: scrollLeft, behavior: "smooth" });
                }
              }}
              disabled={disabled}
              className={`relative flex min-h-9 shrink-0 items-center rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm ${
                selected
                  ? "bg-saffron/10 text-saffron"
                  : "text-ink/50 hover:bg-ink/4 hover:text-ink/70"
              }`}
            >
              {category}
              {selected ? (
                <motion.span
                  layoutId="active-category-pill"
                  className="absolute inset-0 rounded-full border border-saffron/25"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>

      {canScrollRight ? (
        <div className="pointer-events-none absolute right-0 top-0 flex h-full items-center justify-center bg-gradient-to-l from-cream via-cream to-transparent pl-6 pr-2 sm:hidden">
          <ChevronRight
            className="h-4 w-4 animate-pulse text-saffron"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </nav>
  );
}
