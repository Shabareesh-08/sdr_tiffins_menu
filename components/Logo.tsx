import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Go to home page"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white transition hover:scale-105 active:scale-95"
    >
      <Image
        src="/icon-192.png"
        alt="Sahadeva Reddy Logo"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    </Link>
  );
}
