export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-screen p-6">{children}</main>;
}
