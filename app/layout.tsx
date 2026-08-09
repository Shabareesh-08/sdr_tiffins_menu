import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahadeva Reddy Sweets, Snacks and Tiffins Menu",
  description:
    "QR digital menu for Sahadeva Reddy Sweets, Snacks and Tiffins, a 100% pure vegetarian Indian tiffins, chaat, juice, and snacks restaurant.",
  applicationName: "Sahadeva Reddy Menu",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF8F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
