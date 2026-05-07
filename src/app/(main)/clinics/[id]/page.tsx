type PageProps = { params: Promise<{ id: string }> };

export default async function ClinicDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <main className="p-6">Klinika tafsiloti: {id} (TODO)</main>;
}
