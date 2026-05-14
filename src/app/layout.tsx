import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/features/auth/components/AuthProvider";

export const metadata: Metadata = {
  title: "Vet Clinic Frontend",
  description: "Veterinary clinics platform frontend",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
