import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vet Clinic Frontend",
  description: "Veterinary clinics platform frontend",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
