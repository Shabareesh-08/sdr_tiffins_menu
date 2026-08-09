"use client";

import { motion } from "framer-motion";
import type { CategoryName, MenuCategory, MenuItem } from "@/lib/menu-data";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export function MenuSection({
  category,
  data,
}: {
  category: CategoryName;
  data: MenuCategory;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="border-b border-ink/15 pb-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-saffron/70">
          Sahadeva Reddy Menu
        </p>
        <div className="flex items-end justify-between gap-5">
          <h2 className="font-display text-3xl font-bold leading-none text-ink sm:text-4xl">
            {category}
          </h2>
          {data.note ? (
            <p className="shrink-0 border-l border-ink/15 pl-4 text-right text-xs font-semibold uppercase leading-5 tracking-wide text-ink/50">
              {data.note}
            </p>
          ) : null}
        </div>
      </header>

      <motion.div
        className="mt-6 grid gap-x-12 gap-y-8 lg:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {data.subsections.map((subsection, index) => (
          <motion.section
            key={subsection.title}
            className="break-inside-avoid"
            variants={itemVariant}
          >
            <h3 className="mb-3 flex items-center gap-2 border-b border-ink/10 pb-2.5 font-display text-lg font-bold text-forest">
              <span className="text-saffron/40">—</span>
              {subsection.title}
            </h3>
            <div className="space-y-0.5">
              {subsection.items.map((item) => (
                <MenuRow key={item.name} item={item} />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div
      className={`flex min-h-9 items-baseline gap-2 rounded-lg px-2 py-2 transition-colors ${
        item.hero
          ? "bg-saffron-light"
          : "hover:bg-ink/[0.02]"
      }`}
    >
      <span className="flex items-center gap-2 font-display text-[0.95rem] font-semibold leading-5 text-ink">
        {item.name}
        {item.hero ? (
          <span className="whitespace-nowrap rounded-full bg-saffron/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-saffron">
            Popular
          </span>
        ) : null}
      </span>
      <span className="mb-1 flex-1 border-b border-dotted border-ink/15" />
      <span className="shrink-0 text-sm font-bold leading-5 text-saffron tabular-nums">
        ₹{item.price}
      </span>
    </div>
  );
}
