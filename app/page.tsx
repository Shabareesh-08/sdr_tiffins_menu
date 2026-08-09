import { Suspense } from "react";
import { MenuApp } from "@/components/MenuApp";
import { MenuRoute } from "@/components/MenuRoute";

export default function Home() {
  return (
    <Suspense fallback={<MenuApp table={null} />}>
      <MenuRoute />
    </Suspense>
  );
}
