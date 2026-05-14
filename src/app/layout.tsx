import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/features/auth/components/AuthProvider";
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
          <AuthProvider>
            {children}
          </AuthProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}

