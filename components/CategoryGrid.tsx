"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { categories, type CategoryName, menu } from "@/lib/menu-data";

const categoryImages: Record<CategoryName, string> = {
  Tiffins: "/categories/tiffins.png",
  Chaat: "/categories/chaat.png",
  "Pav Bhaji": "/categories/pav-bhaji.png",
  Sandwiches: "/categories/sandwiches.png",
  Pizzas: "/categories/pizzas.png",
  "Fruit Juices": "/categories/fruit-juices.png",
  Milkshakes: "/categories/milkshakes.png",
  "Fruit Bowls": "/categories/fruit-bowls.png",
};

const categorySubtitles: Record<CategoryName, string> = {
  Tiffins: "Idly, Dosa, Vada & More",
  Chaat: "Street Food Favourites",
  "Pav Bhaji": "Mumbai Style",
  Sandwiches: "Grilled & Toasted",
  Pizzas: "Fresh From the Oven",
  "Fruit Juices": "Fresh & Natural",
  Milkshakes: "Thick & Creamy",
  "Fruit Bowls": "Healthy & Fresh",
};

function getItemCount(category: CategoryName): number {
  const data = menu[category];
  return data.subsections.reduce((sum, s) => sum + s.items.length, 0);
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function CategoryGrid({
  onSelect,
}: {
  onSelect: (category: CategoryName) => void;
}) {
  return (
    <motion.div
      className="mx-auto max-w-5xl px-4 py-6 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-ink/40">
        Explore our menu
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            variants={cardVariants}
            type="button"
            onClick={() => onSelect(category)}
            className="group relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl border border-ink/8 bg-white p-4 text-left shadow-card transition-shadow hover:shadow-soft sm:min-h-[180px] sm:p-5"
          >
            {/* Text content */}
            <div className="relative z-10">
              <h2 className="font-display text-lg font-bold leading-tight text-ink sm:text-xl">
                {category}
              </h2>
              <p className="mt-0.5 text-xs font-medium text-ink/50 sm:text-sm">
                {categorySubtitles[category]}
              </p>
            </div>

            {/* Item count + arrow */}
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-xs font-semibold text-saffron">
                {getItemCount(category)} items
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-saffron/10 transition-colors group-hover:bg-saffron/20">
                <ChevronRight className="h-3.5 w-3.5 text-saffron" />
              </span>
            </div>

            {/* Illustration */}
            <div className="absolute -bottom-2 -right-2 h-24 w-24 opacity-80 transition-transform group-hover:scale-105 sm:h-28 sm:w-28">
              <Image
                src={categoryImages[category]}
                alt={category}
                width={112}
                height={112}
                className="h-full w-full object-contain"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
