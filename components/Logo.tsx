import Image from "next/image";

export function Logo() {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white">
      <Image
        src="/icon-192.png"
        alt="Sahadeva Reddy Logo"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    </div>
  );
}
