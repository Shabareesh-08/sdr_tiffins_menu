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

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="sticky top-0 z-30">
        <Header search={search} onSearchChange={setSearch} table={table} />
        <CategoryNav
          categories={visibleCategories.length ? visibleCategories : categories}
          active={displayedActiveCategory}
          onSelect={setActiveCategory}
          disabled={visibleCategories.length === 0}
        />
      </div>

      <main>
        <AnimatePresence mode="wait">
          {activeEntry ? (
            <MenuSection
              key={`${activeEntry.category}-${search}`}
              category={activeEntry.category}
              data={activeEntry.data}
            />
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
          <p>{"// TODO: add contact info"}</p>
        </div>
      </footer>
    </div>
  );
}
