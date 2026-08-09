"use client";

import { useSearchParams } from "next/navigation";
import { normalizeTable } from "@/lib/utils";
import { MenuApp } from "./MenuApp";

export function MenuRoute() {
  const searchParams = useSearchParams();
  return <MenuApp table={normalizeTable(searchParams.get("table") ?? undefined)} />;
}
