import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import { AuthProvider } from "@/src/features/auth/components/AuthProvider";
=======
import { ToastProvider } from "@/src/lib/toast/toast.store";
import ToastContainer from "@/src/components/shared/ToastContainer";
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846

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
<<<<<<< HEAD
        <AuthProvider>{children}</AuthProvider>
=======
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
>>>>>>> fc8da0f88cb9295efddab30325bcdf78e659c846
      </body>
    </html>
  );
}
