import { ClinicDetail } from "@/src/features/clinics/components/ClinicDetail";

type PageProps = { params: Promise<{ id: string }> };

export default async function ClinicDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ClinicDetail id={id} />;
}
