import type { Metadata } from "next";
import { QrBatch } from "@/components/QrBatch";

export const metadata: Metadata = {
  title: "Table QR Codes | Sahadeva Reddy Menu",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QrPage() {
  return <QrBatch />;
}
