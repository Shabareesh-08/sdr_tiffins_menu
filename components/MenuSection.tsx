"use client";

import { motion } from "framer-motion";
import type { CategoryName, MenuCategory, MenuItem } from "@/lib/menu-data";

export function MenuSection({
  category,
  data,
}: {
  category: CategoryName;
  data: MenuCategory;
}) {
  return (
    <motion.section
      key={category}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8"
    >
      <header className="border-b border-ink/20 pb-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-saffron">
          Sahadeva Reddy Menu
        </p>
        <div className="flex items-end justify-between gap-5">
          <h2 className="font-display text-4xl font-bold leading-none text-ink sm:text-5xl">
            {category}
          </h2>
          {data.note ? (
            <p className="shrink-0 border-l border-ink/20 pl-4 text-right text-xs font-bold uppercase leading-5 tracking-normal text-ink/65">
              {data.note}
            </p>
          ) : null}
        </div>
      </header>

      <div className="mt-6 grid gap-x-12 gap-y-7 lg:grid-cols-2">
        {data.subsections.map((subsection) => (
          <section key={subsection.title} className="break-inside-avoid">
            <h3 className="mb-3 border-b border-saffron pb-2 font-display text-xl font-bold text-forest">
              {subsection.title}
            </h3>
            <div className="space-y-1">
              {subsection.items.map((item) => (
                <MenuRow key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex min-h-9 items-baseline gap-2 py-1.5">
      <span className="font-display text-[1.05rem] font-semibold leading-5 text-ink">
        {item.name}
      </span>
      <span className="mb-1 flex-1 border-b border-dotted border-ink/28" />
      <span className="shrink-0 text-base font-bold leading-5 text-saffron">
        ₹{item.price}
      </span>
    </div>
  );
}
