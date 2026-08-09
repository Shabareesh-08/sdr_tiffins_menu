"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { CategoryGrid } from "./CategoryGrid";

type FilteredCategory = MenuCategory & {
  subsections: MenuSubsection[];
};

type View = "landing" | "menu";

export function MenuApp({ table }: { table: number | null }) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<View>("landing");
  const [activeCategory, setActiveCategory] =
    useState<CategoryName>(categories[0]);

  // Browser back button / swipe-back support
  const goToLanding = useCallback(() => {
    setView("landing");
    setSearch("");
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.hash !== "#menu") {
        goToLanding();
      } else {
        setView("menu");
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [goToLanding]);

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
              item.name.toLowerCase().includes(query)
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
      .filter(Boolean) as Array<{
      category: CategoryName;
      data: FilteredCategory;
    }>;
  }, [search]);

  const visibleCategories = filteredMenu.map((entry) => entry.category);
  const displayedActiveCategory = visibleCategories.includes(activeCategory)
    ? activeCategory
    : visibleCategories[0] ?? categories[0];
  const activeEntry = filteredMenu.find(
    (entry) => entry.category === displayedActiveCategory
  );

  const paginate = (newDirection: number) => {
    const currentIndex = visibleCategories.indexOf(displayedActiveCategory);
    if (currentIndex === -1) return;

    if (newDirection === 1 && currentIndex < visibleCategories.length - 1) {
      const nextCategory = visibleCategories[currentIndex + 1];
      setActiveCategory(nextCategory);
      const btn = document.getElementById(
        `cat-${nextCategory.replace(/\s+/g, "-")}`
      );
      btn?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else if (newDirection === -1 && currentIndex > 0) {
      const prevCategory = visibleCategories[currentIndex - 1];
      setActiveCategory(prevCategory);
      const btn = document.getElementById(
        `cat-${prevCategory.replace(/\s+/g, "-")}`
      );
      btn?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleCategorySelect = (category: CategoryName) => {
    setActiveCategory(category);
    setView("menu");
    window.history.pushState(null, "", "#menu");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.trim() && view !== "menu") {
      setView("menu");
      window.history.pushState(null, "", "#menu");
    }
  };

  const handleBackToLanding = () => {
    if (window.location.hash === "#menu") {
      window.history.back();
    } else {
      goToLanding();
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink overflow-hidden">
      <div className="sticky top-0 z-30">
        <Header
          search={search}
          onSearchChange={handleSearchChange}
          table={table}
          compact={view === "menu"}
        />
        {view === "menu" && (
          <CategoryNav
            categories={
              visibleCategories.length ? visibleCategories : categories
            }
            active={displayedActiveCategory}
            onSelect={setActiveCategory}
            disabled={visibleCategories.length === 0}
          />
        )}
      </div>

      <main className="min-h-[60vh] overflow-x-hidden">
        <AnimatePresence mode="wait">
          {view === "landing" ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <CategoryGrid onSelect={handleCategorySelect} />
            </motion.div>
          ) : activeEntry ? (
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
              <p className="mt-2 text-sm leading-6 text-ink/50">
                Try searching a category or item name like dosa, chaat, pizza,
                or juice.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Back to menu button when in menu view */}
      {view === "menu" && (
        <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
          <button
            type="button"
            onClick={handleBackToLanding}
            className="w-full rounded-xl border border-ink/10 bg-white py-3 text-center text-sm font-semibold text-forest transition-colors hover:bg-forest-light"
          >
            ← Back to all categories
          </button>
        </div>
      )}

      <footer className="border-t border-ink/8 bg-white/50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="font-display text-lg font-bold text-ink">
            Sahadeva Reddy
          </p>
          <p className="font-display text-sm font-semibold text-forest">
            Sweets, Snacks &amp; Tiffins
          </p>
          <div className="mt-3 space-y-1 text-xs leading-5 text-ink/50">
            <p>16-11-740/9/A/38, Gaddiannaram,</p>
            <p>Dilsukhnagar, Hyderabad, Telangana 500060</p>
          </div>
          <div className="mt-4 h-px bg-ink/8" />
          <p className="mt-3 text-[0.65rem] uppercase tracking-widest text-ink/30">
            100% Pure Vegetarian
          </p>
        </div>
      </footer>
    </div>
  );
}
