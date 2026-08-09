import Image from "next/image";

export function Logo() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cream">
      <Image
        src="/icon-192.png"
        alt="Sahadeva Reddy Logo"
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
      />
    </div>
  );
}
