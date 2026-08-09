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
      // Show indicator if not at the very end (5px threshold)
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
      className="relative border-b border-ink/15 bg-cream"
    >
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-5xl gap-6 overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                const btn = document.getElementById(`cat-${category.replace(/\s+/g, "-")}`);
                if (btn && scrollRef.current) {
                  const container = scrollRef.current;
                  const scrollLeft =
                    btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
                  container.scrollTo({ left: scrollLeft, behavior: "smooth" });
                }
              }}
              disabled={disabled}
              className="relative flex min-h-10 shrink-0 items-center px-0 font-display text-sm font-bold uppercase tracking-normal text-ink/62 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className={selected ? "text-saffron" : ""}>{category}</span>
              {selected ? (
                <motion.span
                  layoutId="active-category-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-saffron"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>

      {canScrollRight ? (
        <div className="pointer-events-none absolute right-0 top-0 flex h-full items-center justify-center bg-cream pl-1 pr-2 sm:hidden">
          <ChevronRight className="h-5 w-5 animate-pulse text-saffron" aria-hidden="true" />
        </div>
      ) : null}
    </nav>
  );
}
