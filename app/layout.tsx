import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Services & Courses | Vrit Technologies",
  description:
    "Expert design, development and blockchain services, plus trending courses you can join today.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
