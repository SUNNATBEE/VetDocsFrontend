import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/src/lib/toast/toast.store";
import ToastContainer from "@/src/components/shared/ToastContainer";

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
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
