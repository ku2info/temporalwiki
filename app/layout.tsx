import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Temporal Atlas",
  description: "A visual atlas for temporal relationships."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
