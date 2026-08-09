"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  categories,
  menu,
  type CategoryName,
  type MenuCategory,
  type MenuSubsection,
} from "@/lib/menu-data";
import { Header } from "./Header";
import { CategoryNav } from "./CategoryNav";
import { MenuSection } from "./MenuSection";

type FilteredCategory = MenuCategory & {
  subsections: MenuSubsection[];
};

export function MenuApp({ table }: { table: number | null }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryName>(categories[0]);

  const filteredMenu = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categories.map((category) => ({
        category,
        data: menu[category] as MenuCategory,
      }));
    }

    return categories
      .map((category) => {
        const categoryData = menu[category];
        const subsections = categoryData.subsections
          .map((subsection) => ({
            ...subsection,
            items: subsection.items.filter((item) =>
              item.name.toLowerCase().includes(query),
            ),
          }))
          .filter((subsection) => subsection.items.length > 0);

        if (subsections.length === 0) return null;

        return {
          category,
          data: {
            ...categoryData,
            subsections,
          } as FilteredCategory,
        };
      })
      .filter(Boolean) as Array<{ category: CategoryName; data: FilteredCategory }>;
  }, [search]);

  const visibleCategories = filteredMenu.map((entry) => entry.category);
  const displayedActiveCategory = visibleCategories.includes(activeCategory)
    ? activeCategory
    : visibleCategories[0] ?? categories[0];
  const activeEntry = filteredMenu.find(
    (entry) => entry.category === displayedActiveCategory,
  );

  const paginate = (newDirection: number) => {
    const currentIndex = visibleCategories.indexOf(displayedActiveCategory);
    if (currentIndex === -1) return;

    if (newDirection === 1 && currentIndex < visibleCategories.length - 1) {
      const nextCategory = visibleCategories[currentIndex + 1];
      setActiveCategory(nextCategory);
      const btn = document.getElementById(`cat-${nextCategory.replace(/\s+/g, "-")}`);
      btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    } else if (newDirection === -1 && currentIndex > 0) {
      const prevCategory = visibleCategories[currentIndex - 1];
      setActiveCategory(prevCategory);
      const btn = document.getElementById(`cat-${prevCategory.replace(/\s+/g, "-")}`);
      btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink overflow-hidden">
      <div className="sticky top-0 z-30">
        <Header search={search} onSearchChange={setSearch} table={table} />
        <CategoryNav
          categories={visibleCategories.length ? visibleCategories : categories}
          active={displayedActiveCategory}
          onSelect={setActiveCategory}
          disabled={visibleCategories.length === 0}
        />
      </div>

      <main className="min-h-[60vh] overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeEntry ? (
            <motion.div
              key={`${activeEntry.category}-${search}`}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -50) {
                  paginate(1);
                } else if (offset.x > 50) {
                  paginate(-1);
                }
              }}
              className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <MenuSection
                category={activeEntry.category}
                data={activeEntry.data}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6"
            >
              <p className="font-display text-2xl font-bold text-ink">
                No items found
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                Try searching a category or item name like dosa, chaat, pizza,
                or juice.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-ink/10 bg-white/60 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl text-sm leading-6 text-ink/62">
          <p className="font-bold text-ink">Sahadeva Reddy Sweets, Snacks and Tiffins</p>
          <p>Gaddiannaram, Dilshuknagar</p>
        </div>
      </footer>
    </div>
  );
}
